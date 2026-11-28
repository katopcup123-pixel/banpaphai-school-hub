package th.ac.banpaphai.bppconnect;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DownloadManager;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.webkit.CookieManager;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class MainActivity extends AppCompatActivity {
    private static final String APP_URL = "https://katopcup123-pixel.github.io/banpaphai-school-hub/";
    private static final int FILE_CHOOSER_REQ = 1001;
    private static final int PERM_REQ = 1002;

    private WebView webView;
    private ValueCallback<Uri[]> filePathCallback;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        setContentView(webView);

        requestNeededPermissions();

        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setGeolocationEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setSupportMultipleWindows(false);

        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String scheme = uri.getScheme() != null ? uri.getScheme() : "";
                String host = uri.getHost() != null ? uri.getHost() : "";
                if (scheme.equals("tel") || scheme.equals("mailto") || scheme.equals("line")) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); } catch (Exception ignored) {}
                    return true;
                }
                if (host.endsWith("github.io") || host.endsWith("script.google.com") || host.endsWith("googleusercontent.com")) {
                    return false;
                }
                if (scheme.equals("http") || scheme.equals("https")) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); } catch (Exception ignored) {}
                    return true;
                }
                return false;
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                callback.invoke(origin, true, true);
            }

            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> cb, FileChooserParams params) {
                if (filePathCallback != null) filePathCallback.onReceiveValue(null);
                filePathCallback = cb;
                try {
                    Intent intent = params.createIntent();
                    startActivityForResult(intent, FILE_CHOOSER_REQ);
                    return true;
                } catch (Exception e) {
                    filePathCallback = null;
                    return false;
                }
            }
        });

        webView.setDownloadListener((url, userAgent, contentDisposition, mimeType, contentLength) -> {
            if (url != null && url.startsWith("http")) {
                DownloadManager.Request req = new DownloadManager.Request(Uri.parse(url));
                req.setMimeType(mimeType);
                req.addRequestHeader("User-Agent", userAgent);
                String name = URLUtil.guessFileName(url, contentDisposition, mimeType);
                req.setTitle(name);
                req.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                req.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, name);
                DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
                if (dm != null) {
                    dm.enqueue(req);
                    Toast.makeText(this, "กำลังดาวน์โหลด " + name, Toast.LENGTH_SHORT).show();
                }
            }
        });

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (webView.canGoBack()) webView.goBack();
                else finish();
            }
        });

        webView.addJavascriptInterface(new BppAndroidBridge(), "BppAndroidBridge");
        webView.loadUrl(APP_URL);
    }

    private class BppAndroidBridge {
        @JavascriptInterface
        public void setUserId(String userId) {
            if (userId == null || userId.trim().isEmpty()) return;
            SharedPreferences prefs = getSharedPreferences(LocationTrackingService.PREFS_NAME, MODE_PRIVATE);
            prefs.edit().putString(LocationTrackingService.KEY_USER_ID, userId.trim()).apply();
            runOnUiThread(MainActivity.this::startGpsServiceIfPermitted);
        }

        @JavascriptInterface
        public void stopTracking() {
            SharedPreferences prefs = getSharedPreferences(LocationTrackingService.PREFS_NAME, MODE_PRIVATE);
            prefs.edit().remove(LocationTrackingService.KEY_USER_ID).apply();
            runOnUiThread(() -> stopService(new Intent(MainActivity.this, LocationTrackingService.class)));
        }
    }

    private void startGpsServiceIfPermitted() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            Intent svc = new Intent(this, LocationTrackingService.class);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                startForegroundService(svc);
            } else {
                startService(svc);
            }
        }
    }

    private void requestNeededPermissions() {
        String[] perms = Build.VERSION.SDK_INT >= 33
                ? new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.POST_NOTIFICATIONS}
                : new String[]{Manifest.permission.ACCESS_FINE_LOCATION};
        boolean need = false;
        for (String p : perms) {
            if (ContextCompat.checkSelfPermission(this, p) != PackageManager.PERMISSION_GRANTED) need = true;
        }
        if (need) ActivityCompat.requestPermissions(this, perms, PERM_REQ);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_REQ && filePathCallback != null) {
            Uri[] results = (resultCode == Activity.RESULT_OK && data != null)
                    ? WebChromeClient.FileChooserParams.parseResult(resultCode, data)
                    : null;
            filePathCallback.onReceiveValue(results);
            filePathCallback = null;
        }
    }
}
