package th.ac.banpaphai.bppconnect;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.pm.ServiceInfo;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class LocationTrackingService extends Service {
    public static final String PREFS_NAME = "bpp_gps_prefs";
    public static final String KEY_USER_ID = "user_id";
    private static final String CHANNEL_ID = "bpp_gps_channel";
    private static final int NOTIF_ID = 4101;
    private static final String BACKEND_URL = "https://script.google.com/macros/s/AKfycbyY5tXe6nNyZpdb1EWE8taHLgEJU63sYvZ_vmu8MoiNVOgQc26McD-kNoatNLeeGsYbRw/exec";

    private LocationManager locationManager;
    private LocationListener locationListener;
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private long lastSentAt = 0L;

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
        Notification notif = buildNotification();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            startForeground(NOTIF_ID, notif, ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION);
        } else {
            startForeground(NOTIF_ID, notif);
        }
        startLocationUpdates();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return START_STICKY;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel ch = new NotificationChannel(
                    CHANNEL_ID,
                    "สถานะ GPS โรงเรียนบ้านป่าไผ่",
                    NotificationManager.IMPORTANCE_LOW
            );
            ch.setDescription("อัปเดตสถานะอยู่/ไม่อยู่โรงเรียนแบบเรียลไทม์");
            NotificationManager nm = getSystemService(NotificationManager.class);
            if (nm != null) nm.createNotificationChannel(ch);
        }
    }

    private Notification buildNotification() {
        Intent openIntent = new Intent(this, MainActivity.class);
        int flags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
                ? PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
                : PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent pi = PendingIntent.getActivity(this, 0, openIntent, flags);
        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("BPP Connect")
                .setContentText("กำลังอัปเดตสถานะ GPS โรงเรียนบ้านป่าไผ่")
                .setSmallIcon(android.R.drawable.ic_menu_mylocation)
                .setOngoing(true)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .setContentIntent(pi)
                .build();
    }

    private void startLocationUpdates() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            stopSelf();
            return;
        }
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        if (locationManager == null) return;

        locationListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location loc) {
                if (loc != null) sendPingIfNeeded(loc.getLatitude(), loc.getLongitude());
            }
            @Override public void onStatusChanged(String p, int s, Bundle e) {}
            @Override public void onProviderEnabled(String p) {}
            @Override public void onProviderDisabled(String p) {}
        };

        try {
            if (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
                locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 90_000L, 25f, locationListener);
                Location last = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                if (last != null) sendPingIfNeeded(last.getLatitude(), last.getLongitude());
            }
            if (locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
                locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 90_000L, 25f, locationListener);
            }
        } catch (SecurityException ignored) {}
    }

    private void sendPingIfNeeded(double lat, double lng) {
        long now = System.currentTimeMillis();
        if (now - lastSentAt < 60_000L) return;
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        String uid = prefs.getString(KEY_USER_ID, "");
        if (uid == null || uid.trim().isEmpty()) return;
        lastSentAt = now;

        executor.execute(() -> {
            HttpURLConnection conn = null;
            try {
                String urlStr = BACKEND_URL
                        + "?action=staff_gps_ping&userId=" + URLEncoder.encode(uid, "UTF-8")
                        + "&lat=" + lat + "&lng=" + lng;
                conn = (HttpURLConnection) new URL(urlStr).openConnection();
                conn.setRequestMethod("GET");
                conn.setConnectTimeout(10_000);
                conn.setReadTimeout(10_000);
                conn.setInstanceFollowRedirects(true);
                conn.getResponseCode();
            } catch (Exception ignored) {
            } finally {
                if (conn != null) conn.disconnect();
            }
        });
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (locationManager != null && locationListener != null) {
            try { locationManager.removeUpdates(locationListener); } catch (Exception ignored) {}
        }
        executor.shutdownNow();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
