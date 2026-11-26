(() => {
  const STORAGE_FAVS = "bpp_connect_favorites_v2";
  const STORAGE_USER = "bpp_connect_user_v1";
  const STORAGE_THEME = "bpp_connect_theme_v1";
  const STORAGE_ACCENT = "bpp_connect_accent_v1";
  const STORAGE_OVERRIDE = "bpp_connect_systems_override_v4";
  const STORAGE_REMOTE = "bpp_connect_remote_url_v1";
  const STORAGE_NEWS_API = "bpp_connect_news_api_v1";
  const STORAGE_ONESIGNAL = "bpp_connect_onesignal_id_v1";
  const STORAGE_LOCAL_NEWS = "bpp_connect_local_news_v1";
  const STORAGE_USERS = "bpp_connect_users_v3";
  const STORAGE_EVENTS = "bpp_connect_events_v1";
  const STORAGE_SOUND = "bpp_connect_sound_v1";
  const STORAGE_READ_NEWS = "bpp_connect_read_news_v1";

  const STAFF_STATUSES = [
    { id: "school", label: "อยู่โรงเรียน", icon: "🏫", cls: "st-school" },
    { id: "duty", label: "ไปราชการ", icon: "🚗", cls: "st-duty" },
    { id: "leave", label: "ลาป่วย/ลากิจ", icon: "🩺", cls: "st-leave" },
    { id: "remote", label: "ทำงานนอกสถานที่", icon: "💻", cls: "st-remote" }
  ];
  const THAI_DAYS = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

  const THAI_MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  const EVENT_COLOR_HEX = { blue: "#007AFF", emerald: "#10B981", amber: "#F59E0B", rose: "#EF4444", purple: "#8B5CF6" };

  const ACCENTS = [
    { id: "blue", label: "ฟ้า iOS", hex: "#007AFF" },
    { id: "gold", label: "ทองป่าไผ่", hex: "#C69214" },
    { id: "emerald", label: "เขียวมรกต", hex: "#10B981" },
    { id: "purple", label: "ม่วง", hex: "#7C3AED" },
    { id: "orange", label: "ส้ม", hex: "#EA580C" },
    { id: "rose", label: "ชมพู", hex: "#E11D48" }
  ];

  const ICONS = {
    wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><circle cx="16.5" cy="13" r="1.2"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clipboardCheck: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    fileCheck: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/>',
    shoppingBag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    barChart: '<path d="M3 3v18h18"/><rect width="4" height="7" x="7" y="10" rx="1"/><rect width="4" height="12" x="15" y="5" rx="1"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    graduationCap: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>'
  };

  function iconSvg(name, size = 26) {
    const body = ICONS[name] || ICONS.folder;
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  }

  function starSvg(filled, size = 16) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }

  function chevronSvg() {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
  }

  function canAccessExecutive(role) {
    return role === "director" || role === "admin";
  }

  // เฉพาะ นายธานครินทร์ สุเมธาลังการ (แอดมิน) เท่านั้นที่ปรับปรุงระบบได้
  function isAdminUser(user) {
    return Boolean(user && user.id === "thanakarin" && user.role === "admin");
  }

  // เจ้าของโพสต์ข่าวหรือแอดมินสามารถแก้ไข/ลบข่าวได้
  function canManageNews(user, item) {
    if (!user || !item) return false;
    if (isAdminUser(user)) return true;
    return Boolean(
      (item.authorId && item.authorId === user.id) ||
      (item.author && item.author === user.name)
    );
  }

  function filterSystems(systems, { division, query, role, favoritesOnly, favoritesSet }) {
    const q = (query || "").trim().toLowerCase();
    return systems.filter((s) => {
      if (!canAccessExecutive(role) && s.directorOnly) return false;
      if (favoritesOnly && !favoritesSet.has(s.id)) return false;
      if (division && division !== "all" && s.division !== division) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.shortName.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    });
  }

  function authenticateUser(users, userId, pin) {
    const user = (users || []).find((u) => u.id === userId);
    if (!user) return { ok: false, reason: "not_found" };
    if (String(user.pin) !== String(pin)) return { ok: false, reason: "invalid_pin" };
    return { ok: true, user };
  }

  function getInitial(user) {
    const clean = (user.shortName || user.name || "").replace(/^(ผอ\.|ครู)/, "");
    return clean.charAt(0) || "ค";
  }

  function renderAvatarHtml(user) {
    if (user && user.avatar) {
      return `<div class="user-avatar c-${user.color || "blue"}"><img src="${user.avatar}" alt="" /></div>`;
    }
    return `<div class="user-avatar c-${user?.color || "blue"}">${getInitial(user || {})}</div>`;
  }

  function formatDateYmd(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { filterSystems, authenticateUser, canAccessExecutive, isAdminUser, canManageNews };
    return;
  }

  const config = window.SCHOOL_CONFIG;

  function loadSystems() {
    try {
      const raw = localStorage.getItem(STORAGE_OVERRIDE);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return [...config.systems];
  }

  const savedFavs = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_FAVS);
      if (raw) return new Set(JSON.parse(raw));
    } catch (_) {}
    return new Set(config.systems.filter((s) => s.pinned).map((s) => s.id));
  })();

  function loadUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_USERS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return config.users.map((u) => ({ ...u }));
  }

  function loadEvents() {
    try {
      const raw = localStorage.getItem(STORAGE_EVENTS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (_) {}
    return [...(config.calendarEvents || [])];
  }

  const nowDate = new Date();
  const state = {
    tab: "home",
    division: "all",
    query: "",
    users: loadUsers(),
    events: loadEvents(),
    calYear: nowDate.getFullYear(),
    calMonth: nowDate.getMonth(),
    calSelectedDate: formatDateYmd(nowDate),
    currentUser: null,
    selectedUser: null,
    pinBuffer: "",
    favorites: savedFavs,
    systems: loadSystems(),
    announcements: (() => {
      try {
        const raw = localStorage.getItem(STORAGE_LOCAL_NEWS);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length) return parsed;
        }
      } catch (_) {}
      return [...config.announcements];
    })(),
    obecNews: [],
    obecLoading: false,
    newsSubTab: "school",
    theme: localStorage.getItem(STORAGE_THEME) || "light",
    accent: localStorage.getItem(STORAGE_ACCENT) || "#007AFF",
    soundEnabled: localStorage.getItem(STORAGE_SOUND) !== "off",
    jiggleMode: false,
    readNewsIds: (() => {
      try {
        const raw = localStorage.getItem(STORAGE_READ_NEWS);
        if (raw) return new Set(JSON.parse(raw));
      } catch (_) {}
      return new Set();
    })(),
    balloonOpen: false,
    pushSubId: "",
    remoteConfigUrl: localStorage.getItem(STORAGE_REMOTE) || config.remoteConfigUrl || "",
    newsBackendUrl: localStorage.getItem(STORAGE_NEWS_API) || config.newsBackendUrl || "",
    oneSignalAppId: localStorage.getItem(STORAGE_ONESIGNAL) || config.oneSignalAppId || "",
    deferredInstallPrompt: null,
    swReg: null
  };

  const els = {
    metaThemeColor: document.getElementById("metaThemeColor"),
    clock: document.getElementById("iosClock"),
    island: document.getElementById("dynamicIsland"),
    islandText: document.getElementById("islandText"),
    mobilePill: document.getElementById("mobilePill"),
    mobilePillText: document.getElementById("mobilePillText"),
    splash: document.getElementById("splashOverlay"),
    login: document.getElementById("loginOverlay"),
    loginViewList: document.getElementById("loginViewList"),
    loginViewPin: document.getElementById("loginViewPin"),
    userList: document.getElementById("userList"),
    pinBackBtn: document.getElementById("pinBackBtn"),
    pinUserHead: document.getElementById("pinUserHead"),
    pinDots: document.getElementById("pinDots"),
    pinHint: document.getElementById("pinHint"),
    iosKeypad: document.getElementById("iosKeypad"),
    unlock: document.getElementById("unlockOverlay"),
    unlockName: document.getElementById("unlockName"),
    unlockPosition: document.getElementById("unlockPosition"),
    appContainer: document.getElementById("appContainer"),
    appScroll: document.getElementById("appScroll"),
    iosTabBar: document.getElementById("iosTabBar"),
    schoolLogo: document.getElementById("schoolLogo"),
    schoolName: document.getElementById("schoolName"),
    schoolSubtitle: document.getElementById("schoolSubtitle"),
    userChipBtn: document.getElementById("userChipBtn"),
    userChipLabel: document.getElementById("userChipLabel"),
    bellBtn: document.getElementById("bellBtn"),
    bellBadge: document.getElementById("bellBadge"),
    notifBalloon: document.getElementById("notifBalloon"),
    balloonList: document.getElementById("balloonList"),
    markAllReadBtn: document.getElementById("markAllReadBtn"),
    searchInput: document.getElementById("searchInput"),
    searchClear: document.getElementById("searchClear"),
    main: document.getElementById("mainContent"),
    tabItems: document.querySelectorAll(".tab-item"),
    sheetBackdrop: document.getElementById("sheetBackdrop"),
    sheetBody: document.getElementById("sheetBody"),
    inAppOverlay: document.getElementById("inAppOverlay"),
    inAppTitle: document.getElementById("inAppTitle"),
    inAppFrame: document.getElementById("inAppFrame"),
    inAppLoading: document.getElementById("inAppLoading"),
    inAppBackBtn: document.getElementById("inAppBackBtn"),
    inAppReloadBtn: document.getElementById("inAppReloadBtn"),
    inAppExternalBtn: document.getElementById("inAppExternalBtn")
  };

  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.style.setProperty("--ios-blue", state.accent);
    if (els.metaThemeColor) {
      els.metaThemeColor.content = state.theme === "dark" ? "#0B0D12" : "#F7F9FC";
    }
    try {
      localStorage.setItem(STORAGE_THEME, state.theme);
      localStorage.setItem(STORAGE_ACCENT, state.accent);
    } catch (_) {}
  }
  applyTheme();

  let audioCtx = null;
  function playSound(kind = "tap") {
    if (!state.soundEnabled) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      if (kind === "unlock" || kind === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.3, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.14);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (kind === "error") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(210, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.16);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.19);
      } else {
        osc.type = "sine";
        osc.frequency.setValueAtTime(kind === "pin" ? 680 : 520, now);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (_) {}
  }

  function haptic() {
    if (navigator.vibrate) navigator.vibrate(8);
  }

  function updateClock() {
    if (!els.clock) return;
    const now = new Date();
    els.clock.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  }
  updateClock();
  setInterval(updateClock, 15000);

  let islandTimer = null;
  function notifyIsland(msg) {
    haptic();
    if (els.island && els.islandText) {
      els.islandText.textContent = msg;
      els.island.classList.add("expanded");
    }
    if (els.mobilePill && els.mobilePillText) {
      els.mobilePillText.textContent = msg;
      els.mobilePill.classList.add("show");
    }
    clearTimeout(islandTimer);
    islandTimer = setTimeout(() => {
      if (els.island) els.island.classList.remove("expanded");
      if (els.mobilePill) els.mobilePill.classList.remove("show");
    }, 2400);
  }

  // Prevent pinch-zoom only (touch-action: manipulation handles double-tap cleanly without blocking fast taps)
  document.addEventListener("gesturestart", (e) => e.preventDefault(), { passive: false });

  // --- Cloud / OTA Sync ---
  async function syncRemoteConfig(silent = true) {
    const url = (state.remoteConfigUrl || "").trim();
    if (!url) return false;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("fetch_failed");
      const data = await res.json();
      if (Array.isArray(data.systems) && data.systems.length > 0) {
        state.systems = data.systems;
        localStorage.setItem(STORAGE_OVERRIDE, JSON.stringify(data.systems));
      }
      if (Array.isArray(data.announcements)) {
        state.announcements = data.announcements;
      }
      render();
      if (!silent) notifyIsland("ซิงก์ข้อมูลล่าสุดสำเร็จ");
      return true;
    } catch (_) {
      if (!silent) notifyIsland("ไม่สามารถดึงข้อมูลจากลิงก์คลาวด์ได้");
      return false;
    }
  }

  async function checkForAppUpdate() {
    notifyIsland("กำลังตรวจหาอัปเดต...");
    await syncRemoteConfig(true);
    try {
      if (state.swReg) {
        await state.swReg.update();
        if (state.swReg.waiting) {
          state.swReg.waiting.postMessage("SKIP_WAITING");
        }
      }
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      notifyIsland("อัปเดตเป็นเวอร์ชันล่าสุดแล้ว");
      setTimeout(() => window.location.reload(), 700);
    } catch (_) {
      window.location.reload();
    }
  }

  // --- Splash & Auth Flow ---
  function renderUserList() {
    els.userList.innerHTML = state.users
      .map(
        (u, i) => `
        <button type="button" class="user-row" style="animation-delay:${i * 40}ms" data-user="${u.id}">
          ${renderAvatarHtml(u)}
          <div class="user-meta">
            <strong>${u.name}</strong>
            <span>${u.position}</span>
          </div>
          ${chevronSvg()}
        </button>`
      )
      .join("");
  }

  function openPinPad(user) {
    haptic();
    state.selectedUser = user;
    state.pinBuffer = "";
    els.pinUserHead.innerHTML = `
      ${renderAvatarHtml(user)}
      <h3>${user.name}</h3>
      <p>${user.position}</p>
    `;
    els.pinHint.textContent = "กรอกรหัส PIN 4 หลัก";
    updatePinDots();
    els.loginViewList.classList.add("hidden");
    els.loginViewPin.classList.remove("hidden");
  }

  function backToUserList() {
    haptic();
    state.selectedUser = null;
    state.pinBuffer = "";
    els.loginViewPin.classList.add("hidden");
    els.loginViewList.classList.remove("hidden");
  }

  function updatePinDots(isError = false) {
    const spans = els.pinDots.querySelectorAll("span");
    spans.forEach((sp, idx) => sp.classList.toggle("filled", idx < state.pinBuffer.length));
    els.pinDots.classList.toggle("error", isError);
  }

  function submitPin() {
    if (!state.selectedUser) return;
    const res = authenticateUser(state.users, state.selectedUser.id, state.pinBuffer);
    if (!res.ok) {
      playSound("error");
      updatePinDots(true);
      els.pinHint.textContent = "รหัส PIN ไม่ถูกต้อง (หากลืมรหัสติดต่อแอดมิน)";
      notifyIsland("รหัสผ่านไม่ถูกต้อง");
      setTimeout(() => {
        state.pinBuffer = "";
        updatePinDots(false);
      }, 420);
      return;
    }

    playSound("unlock");
    state.currentUser = res.user;
    try { localStorage.setItem(STORAGE_USER, res.user.id); } catch (_) {}

    els.unlockName.textContent = res.user.name;
    els.unlockPosition.textContent = res.user.position;
    els.login.classList.add("hidden");
    els.unlock.classList.remove("hidden");
    notifyIsland(`ยินดีต้อนรับ ${res.user.shortName}`);
    render();

    setTimeout(() => {
      els.unlock.classList.add("hidden");
      els.appContainer.classList.remove("hidden");
      els.iosTabBar.classList.remove("hidden");
      els.appContainer.classList.remove("app-reveal");
      void els.appContainer.offsetWidth;
      els.appContainer.classList.add("app-reveal");
    }, 1050);
  }

  function showLoginScreen() {
    renderUserList();
    state.selectedUser = null;
    state.pinBuffer = "";
    els.loginViewPin.classList.add("hidden");
    els.loginViewList.classList.remove("hidden");
    els.appContainer.classList.add("hidden");
    els.iosTabBar.classList.add("hidden");
    els.login.classList.remove("hidden");
  }

  function playSplashThenLogin() {
    els.appContainer.classList.add("hidden");
    els.iosTabBar.classList.add("hidden");
    els.login.classList.add("hidden");
    els.splash.classList.remove("hidden", "exit");

    setTimeout(() => {
      els.splash.classList.add("exit");
      showLoginScreen();
      setTimeout(() => els.splash.classList.add("hidden"), 520);
    }, 1750);
  }

  els.userList.addEventListener("click", (e) => {
    const row = e.target.closest("[data-user]");
    if (!row) return;
    const user = state.users.find((u) => u.id === row.dataset.user);
    if (user) openPinPad(user);
  });

  els.pinBackBtn.addEventListener("click", backToUserList);

  // Instant 0ms keypad response on pointerdown (no 300ms iOS click lag or missed taps)
  els.iosKeypad.addEventListener("pointerdown", (e) => {
    const btn = e.target.closest("[data-key]");
    if (!btn) return;
    e.preventDefault();
    haptic();
    playSound("pin");
    const key = btn.dataset.key;
    if (key === "clear") {
      state.pinBuffer = "";
      updatePinDots(false);
      return;
    }
    if (key === "del") {
      state.pinBuffer = state.pinBuffer.slice(0, -1);
      updatePinDots(false);
      return;
    }
    if (state.pinBuffer.length >= 4) return;
    state.pinBuffer += key;
    updatePinDots(false);
    if (state.pinBuffer.length === 4) {
      setTimeout(submitPin, 110);
    }
  });

  // --- Admin System Editor Sheet (Only for ครูธานครินทร์) ---
  function openAdminSystemSheet(existingSys = null) {
    if (!isAdminUser(state.currentUser)) return;
    const s = existingSys || {
      id: "sys-" + Date.now(),
      name: "",
      shortName: "",
      description: "",
      division: "academic",
      url: "https://script.google.com/macros/s/",
      icon: "folder",
      color: "blue",
      pinned: false,
      directorOnly: false
    };

    els.sheetBody.innerHTML = `
      <h3 style="margin:0 0 10px">${existingSys ? "แก้ไขระบบงาน" : "เพิ่มระบบงาน GAS ใหม่"}</h3>
      <input class="admin-input" id="admName" placeholder="ชื่อระบบเต็ม (เช่น ระบบพัสดุ)" value="${s.name}" />
      <input class="admin-input" id="admShort" placeholder="ชื่อย่อใต้ไอคอน (เช่น พัสดุ)" value="${s.shortName}" />
      <input class="admin-input" id="admDesc" placeholder="คำอธิบายสั้นๆ" value="${s.description}" />
      <input class="admin-input" id="admUrl" placeholder="ลิงก์ GAS (https://script.google.com/...)" value="${s.url}" />
      <select class="admin-select" id="admDiv">
        <option value="academic" ${s.division === "academic" ? "selected" : ""}>ฝ่ายวิชาการ</option>
        <option value="budget" ${s.division === "budget" ? "selected" : ""}>ฝ่ายงบประมาณ</option>
        <option value="personnel" ${s.division === "personnel" ? "selected" : ""}>ฝ่ายบุคคล</option>
        <option value="general" ${s.division === "general" ? "selected" : ""}>ฝ่ายทั่วไป</option>
      </select>
      <select class="admin-select" id="admColor">
        ${["blue", "emerald", "amber", "purple", "rose", "indigo", "teal", "sky", "slate"]
          .map((c) => `<option value="${c}" ${s.color === c ? "selected" : ""}>สีไอคอน: ${c}</option>`)
          .join("")}
      </select>
      <label style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13px">
        <input type="checkbox" id="admDirector" ${s.directorOnly ? "checked" : ""} /> แสดงเฉพาะผู้บริหาร / แอดมิน
      </label>
      <button class="btn-primary" id="admSaveBtn">บันทึกการเปลี่ยนแปลง</button>
      <button class="btn-secondary" id="admCancelBtn">ยกเลิก</button>
    `;
    els.sheetBackdrop.classList.add("open");

    document.getElementById("admCancelBtn").onclick = closeSheet;
    document.getElementById("admSaveBtn").onclick = () => {
      const name = document.getElementById("admName").value.trim();
      const url = document.getElementById("admUrl").value.trim();
      if (!name) { notifyIsland("กรุณากรอกชื่อระบบ"); return; }
      const updated = {
        ...s,
        name,
        shortName: document.getElementById("admShort").value.trim() || name.slice(0, 12),
        description: document.getElementById("admDesc").value.trim() || "ระบบงาน Google Apps Script",
        url,
        division: document.getElementById("admDiv").value,
        color: document.getElementById("admColor").value,
        directorOnly: document.getElementById("admDirector").checked
      };
      if (existingSys) {
        state.systems = state.systems.map((item) => (item.id === s.id ? updated : item));
      } else {
        state.systems = [updated, ...state.systems];
      }
      localStorage.setItem(STORAGE_OVERRIDE, JSON.stringify(state.systems));
      closeSheet();
      notifyIsland("บันทึกระบบงานแล้ว");
      render();
    };
  }

  function exportConfigForGithub() {
    const updatedConfig = {
      ...config,
      newsBackendUrl: state.newsBackendUrl,
      oneSignalAppId: state.oneSignalAppId,
      remoteConfigUrl: state.remoteConfigUrl,
      users: state.users,
      calendarEvents: state.events,
      systems: state.systems,
      announcements: state.announcements
    };
    const code = `window.SCHOOL_CONFIG = ${JSON.stringify(updatedConfig, null, 2)};\n`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        () => notifyIsland("คัดลอก apps-config.js แล้ว นำไปวางบน GitHub ได้เลย"),
        () => notifyIsland("คัดลอกไม่สำเร็จ")
      );
    }
  }

  function postToBackend(payload) {
    const apiUrl = (state.newsBackendUrl || "").trim();
    if (!apiUrl) return;
    fetch(apiUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload)
    }).catch(() => {});
  }

  // --- Smart Greeting Card + Staff Live Status & Quick Contact ---
  function renderGreetingAndStaff() {
    const u = state.currentUser;
    const now = new Date();
    const hr = now.getHours();
    const greet = hr < 12 ? "อรุณสวัสดิ์" : hr < 17 ? "สวัสดีตอนบ่าย" : "สวัสดีตอนเย็น";
    const emoji = hr < 12 ? "☀️" : hr < 17 ? "🌤️" : "🌙";
    const thaiDate = `วัน${THAI_DAYS[now.getDay()]}ที่ ${now.getDate()} ${THAI_MONTHS[now.getMonth()]} ${now.getFullYear() + 543}`;
    const todayStr = formatDateYmd(now);
    const todayCount = state.events.filter((ev) => ev.date === todayStr).length;
    const urgentCount = state.announcements.filter((a) => a.urgent).length;

    const staffHtml = state.users
      .map((usr) => {
        const st = STAFF_STATUSES.find((x) => x.id === (usr.status || "school")) || STAFF_STATUSES[0];
        const isMe = u && usr.id === u.id;
        return `
          <button type="button" class="staff-pill" data-staff-id="${usr.id}">
            <div class="staff-avatar-ring ${st.cls}">
              ${renderAvatarHtml(usr)}
              <span class="staff-status-ico">${st.icon}</span>
            </div>
            <span class="staff-name">${isMe ? "ฉัน" : usr.shortName}</span>
          </button>`;
      })
      .join("");

    return `
      <div class="greeting-card">
        <div class="greeting-top">
          ${renderAvatarHtml(u || {})}
          <div class="greeting-text">
            <h2>${greet} ${u ? u.shortName : ""} ${emoji}</h2>
            <p>${thaiDate}</p>
          </div>
        </div>
        <div class="greeting-chips">
          <button type="button" class="greet-chip" id="jumpCalBtn">📅 กิจกรรมวันนี้ ${todayCount} รายการ</button>
          <button type="button" class="greet-chip" id="jumpUrgentBtn">🔔 ประกาศด่วน ${urgentCount} เรื่อง</button>
        </div>
      </div>
      <div class="section-header">
        <h2 class="section-title">สถานะบุคลากรวันนี้</h2>
        <span class="section-sub">แตะที่รูปเพื่อเปลี่ยนสถานะ / โทรด่วน</span>
      </div>
      <div class="staff-strip">${staffHtml}</div>`;
  }

  function openStaffSheet(userId) {
    const target = state.users.find((x) => x.id === userId);
    if (!target) return;
    haptic();
    playSound("tap");
    const isMe = state.currentUser && state.currentUser.id === target.id;
    const st = STAFF_STATUSES.find((x) => x.id === (target.status || "school")) || STAFF_STATUSES[0];

    els.sheetBody.innerHTML = `
      <div class="sheet-head">
        ${renderAvatarHtml(target)}
        <div>
          <h3>${target.name}</h3>
          <p>${target.position} • ${st.icon} ${st.label}</p>
        </div>
      </div>
      ${
        isMe
          ? `<div style="font-size:13px;font-weight:600;margin-bottom:4px">เปลี่ยนสถานะของฉันวันนี้</div>
             <div class="status-option-grid">
               ${STAFF_STATUSES.map(
                 (opt) => `<button type="button" class="status-opt-btn ${(target.status || "school") === opt.id ? "active" : ""}" data-set-status="${opt.id}">${opt.icon} ${opt.label}</button>`
               ).join("")}
             </div>`
          : `<div class="sheet-note">
               <div><strong>สถานะวันนี้:</strong> ${st.icon} ${st.label}</div>
               <div><strong>เบอร์ติดต่อ:</strong> ${target.phone || "ยังไม่ได้เพิ่มเบอร์ในโปรไฟล์"}</div>
             </div>
             ${target.phone ? `<a href="tel:${target.phone.replace(/[^0-9+]/g, "")}" class="btn-primary" style="display:block;text-align:center;text-decoration:none">📞 โทรออก (${target.phone})</a>` : ""}`
      }
      <button type="button" class="btn-secondary" id="staffCloseBtn">ปิด</button>
    `;
    els.sheetBackdrop.classList.add("open");
    document.getElementById("staffCloseBtn").onclick = closeSheet;
    els.sheetBody.querySelectorAll("[data-set-status]").forEach((btn) => {
      btn.onclick = () => {
        const newSt = btn.dataset.setStatus;
        const updated = { ...target, status: newSt };
        state.users = state.users.map((x) => (x.id === target.id ? updated : x));
        state.currentUser = updated;
        try { localStorage.setItem(STORAGE_USERS, JSON.stringify(state.users)); } catch (_) {}
        postToBackend({ action: "save_user", user: updated });
        playSound("success");
        const chosen = STAFF_STATUSES.find((x) => x.id === newSt);
        notifyIsland(`อัปเดตสถานะ: ${chosen ? chosen.label : newSt}`);
        closeSheet();
        render();
      };
    });
  }

  // --- Academic Calendar (Google Calendar Style on Home Screen) ---
  function renderCalendarWidget() {
    const year = state.calYear;
    const month = state.calMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = formatDateYmd(new Date());
    const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;

    let cells = "";
    for (let i = 0; i < firstDay; i++) cells += `<div class="cal-day empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const ymd = `${monthPrefix}-${String(d).padStart(2, "0")}`;
      const dayEvents = state.events.filter((ev) => ev.date === ymd);
      const cls = [
        "cal-day",
        ymd === todayStr ? "today" : "",
        ymd === state.calSelectedDate ? "selected" : ""
      ].filter(Boolean).join(" ");
      const dots = dayEvents.slice(0, 3)
        .map((ev) => `<span class="cal-dot" style="background:${EVENT_COLOR_HEX[ev.color] || "#007AFF"}"></span>`)
        .join("");
      cells += `<button type="button" class="${cls}" data-cal-day="${ymd}"><span>${d}</span><span class="cal-dots">${dots}</span></button>`;
    }

    const selectedEvents = state.events.filter((ev) => ev.date === state.calSelectedDate);
    const displayEvents = selectedEvents.length
      ? selectedEvents
      : state.events.filter((ev) => ev.date && ev.date.startsWith(monthPrefix)).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
    const agendaLabel = selectedEvents.length
      ? `กิจกรรมวันที่ ${state.calSelectedDate.split("-").reverse().join("/")}`
      : `กิจกรรมในเดือน ${THAI_MONTHS[month]} ${year + 543}`;

    return `
      <div class="section-header">
        <h2 class="section-title">ปฏิทินวิชาการ</h2>
        <span class="section-sub">${agendaLabel}</span>
      </div>
      <div class="cal-widget">
        <div class="cal-top">
          <div class="cal-month-nav">
            <button type="button" class="cal-nav-btn" id="calPrevBtn" aria-label="เดือนก่อน">&lsaquo;</button>
            <div class="cal-month-label">${THAI_MONTHS[month]} ${year + 543}</div>
            <button type="button" class="cal-nav-btn" id="calNextBtn" aria-label="เดือนถัดไป">&rsaquo;</button>
          </div>
          <button type="button" class="cal-add-btn" id="calAddBtn">+ เพิ่มกิจกรรม</button>
        </div>
        <div class="cal-weekdays"><span>อา</span><span>จ</span><span>อ</span><span>พ</span><span>พฤ</span><span>ศ</span><span>ส</span></div>
        <div class="cal-days">${cells}</div>
        <div class="cal-agenda">
          ${
            displayEvents.length === 0
              ? '<div style="text-align:center;font-size:12px;color:var(--ios-secondary);padding:6px 0">ยังไม่มีกิจกรรมในเดือนนี้ — กด "+ เพิ่มกิจกรรม" ได้เลย</div>'
              : displayEvents
                  .map(
                    (ev) => `
                    <button type="button" class="cal-event-pill" data-cal-evt="${ev.id}">
                      <span class="cal-event-bar" style="background:${EVENT_COLOR_HEX[ev.color] || "#007AFF"}"></span>
                      <div class="cal-event-info">
                        <strong>${ev.title}</strong>
                        <span>${ev.date.split("-").reverse().join("/")}${ev.time ? ` • ${ev.time} น.` : ""}${ev.location ? ` • ${ev.location}` : ""}</span>
                      </div>
                      ${chevronSvg()}
                    </button>`
                  )
                  .join("")
          }
        </div>
      </div>`;
  }

  function openCalendarEventDetail(id) {
    const ev = state.events.find((e) => e.id === id);
    if (!ev) return;
    haptic();
    const canEdit = canManageNews(state.currentUser, ev);
    els.sheetBody.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="width:12px;height:12px;border-radius:50%;background:${EVENT_COLOR_HEX[ev.color] || "#007AFF"};flex-shrink:0"></span>
        <h3 style="margin:0;font-size:17px">${ev.title}</h3>
      </div>
      <div class="sheet-note">
        <div><strong>วันที่:</strong> ${ev.date.split("-").reverse().join("/")}${ev.time ? ` เวลา ${ev.time} น.` : ""}</div>
        ${ev.location ? `<div><strong>สถานที่:</strong> ${ev.location}</div>` : ""}
        ${ev.notes ? `<div style="margin-top:6px">${ev.notes}</div>` : ""}
        ${ev.author ? `<div style="margin-top:6px;opacity:0.8">เพิ่มโดย: ${ev.author}</div>` : ""}
      </div>
      ${canEdit ? '<button class="btn-primary" id="calDetailEditBtn">แก้ไขกิจกรรม</button><button class="btn-danger" id="calDetailDelBtn">ลบกิจกรรม</button>' : ""}
      <button class="btn-secondary" id="calDetailCloseBtn">ปิด</button>
    `;
    els.sheetBackdrop.classList.add("open");
    document.getElementById("calDetailCloseBtn").onclick = closeSheet;
    if (canEdit) {
      document.getElementById("calDetailEditBtn").onclick = () => openCalendarEventSheet(ev);
      document.getElementById("calDetailDelBtn").onclick = () => {
        state.events = state.events.filter((x) => x.id !== ev.id);
        try { localStorage.setItem(STORAGE_EVENTS, JSON.stringify(state.events)); } catch (_) {}
        postToBackend({ action: "delete_event", id: ev.id });
        closeSheet();
        notifyIsland("ลบกิจกรรมแล้ว");
        render();
      };
    }
  }

  function openCalendarEventSheet(existing = null) {
    haptic();
    const u = state.currentUser;
    const esc = (v) => String(v || "").replace(/"/g, "&quot;");
    const defaultDate = existing ? existing.date : state.calSelectedDate;
    els.sheetBody.innerHTML = `
      <h3 style="margin:0 0 8px">${existing ? "แก้ไขกิจกรรมปฏิทิน" : "เพิ่มกิจกรรมปฏิทินวิชาการ"}</h3>
      <input class="admin-input" id="evTitle" placeholder="ชื่อกิจกรรม (เช่น ประชุมวิชาการ / สอบปลายภาค)" value="${esc(existing?.title)}" />
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <input class="admin-input" id="evDate" type="date" value="${esc(defaultDate)}" />
        <input class="admin-input" id="evTime" type="time" value="${esc(existing?.time || "09:00")}" />
      </div>
      <input class="admin-input" id="evLocation" placeholder="สถานที่ (ถ้ามี)" value="${esc(existing?.location)}" />
      <textarea class="admin-input" id="evNotes" rows="2" placeholder="รายละเอียดเพิ่มเติม...">${existing?.notes || ""}</textarea>
      <select class="admin-select" id="evColor">
        <option value="blue" ${(existing?.color || "blue") === "blue" ? "selected" : ""}>สีฟ้า (ทั่วไป/ประชุม)</option>
        <option value="emerald" ${existing?.color === "emerald" ? "selected" : ""}>สีเขียว (วิชาการ)</option>
        <option value="amber" ${existing?.color === "amber" ? "selected" : ""}>สีส้ม (งบประมาณ/กิจกรรม)</option>
        <option value="rose" ${existing?.color === "rose" ? "selected" : ""}>สีแดง (สำคัญ/กำหนดส่ง)</option>
        <option value="purple" ${existing?.color === "purple" ? "selected" : ""}>สีม่วง (อบรม/นิเทศ)</option>
      </select>
      <button class="btn-primary" id="evSaveBtn">บันทึกกิจกรรม</button>
      <button class="btn-secondary" id="evCancelBtn">ยกเลิก</button>
    `;
    els.sheetBackdrop.classList.add("open");
    document.getElementById("evCancelBtn").onclick = closeSheet;
    document.getElementById("evSaveBtn").onclick = () => {
      const title = document.getElementById("evTitle").value.trim();
      const date = document.getElementById("evDate").value;
      if (!title || !date) { notifyIsland("กรุณากรอกชื่อกิจกรรมและวันที่"); return; }
      const saved = {
        id: existing ? existing.id : "evt-" + Date.now(),
        title,
        date,
        time: document.getElementById("evTime").value,
        location: document.getElementById("evLocation").value.trim(),
        notes: document.getElementById("evNotes").value.trim(),
        color: document.getElementById("evColor").value,
        authorId: existing ? existing.authorId : (u ? u.id : ""),
        author: existing ? existing.author : (u ? u.name : "")
      };
      if (existing) {
        state.events = state.events.map((x) => (x.id === existing.id ? saved : x));
      } else {
        state.events = [...state.events, saved];
      }
      state.calSelectedDate = date;
      const parts = date.split("-");
      state.calYear = Number(parts[0]);
      state.calMonth = Number(parts[1]) - 1;
      try { localStorage.setItem(STORAGE_EVENTS, JSON.stringify(state.events)); } catch (_) {}
      postToBackend({ action: "save_event", event: saved });
      closeSheet();
      notifyIsland(existing ? "อัปเดตกิจกรรมแล้ว" : "เพิ่มกิจกรรมลงปฏิทินแล้ว");
      render();
    };
  }

  // --- Self Profile / Photo / PIN Editor + Admin User Manager ---
  function openSelfProfileSheet() {
    const u = state.currentUser;
    if (!u) return;
    haptic();
    let avatarData = u.avatar || "";
    const esc = (v) => String(v || "").replace(/"/g, "&quot;");
    els.sheetBody.innerHTML = `
      <h3 style="margin:0 0 8px">แก้ไขโปรไฟล์และรหัสผ่าน</h3>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
        <div id="selfAvatarWrap">${renderAvatarHtml({ ...u, avatar: avatarData })}</div>
        <div>
          <label class="admin-mini-btn" style="display:inline-flex;align-items:center;gap:5px;cursor:pointer">
            <span>📷 เปลี่ยนรูปโปรไฟล์</span>
            <input type="file" id="selfAvatarFile" accept="image/*" style="display:none" />
          </label>
          <button type="button" class="admin-mini-btn del ${avatarData ? "" : "hidden"}" id="selfClearAvatar" style="margin-left:4px">ลบรูป</button>
        </div>
      </div>
      <input class="admin-input" id="selfName" placeholder="ชื่อ-นามสกุล" value="${esc(u.name)}" />
      <input class="admin-input" id="selfShort" placeholder="ชื่อเรียกสั้นๆ (เช่น ครูน้ำเพชร)" value="${esc(u.shortName)}" />
      <input class="admin-input" id="selfPhone" type="tel" placeholder="เบอร์โทรศัพท์ (สำหรับโทรด่วนในแอป)" value="${esc(u.phone)}" />
      <input class="admin-input" id="selfPin" type="tel" maxlength="4" placeholder="รหัส PIN 4 หลักใหม่ (เว้นว่างหากไม่เปลี่ยน)" />
      <button class="btn-primary" id="selfSaveBtn">บันทึกข้อมูลส่วนตัว</button>
      <button class="btn-secondary" id="selfCancelBtn">ยกเลิก</button>
    `;
    els.sheetBackdrop.classList.add("open");

    const fileIn = document.getElementById("selfAvatarFile");
    const clearBtn = document.getElementById("selfClearAvatar");
    const wrap = document.getElementById("selfAvatarWrap");
    fileIn.onchange = async () => {
      const f = fileIn.files && fileIn.files[0];
      if (!f) return;
      try {
        avatarData = await compressImageFile(f);
        wrap.innerHTML = renderAvatarHtml({ ...u, avatar: avatarData });
        clearBtn.classList.remove("hidden");
      } catch (_) { notifyIsland("ไม่สามารถอ่านรูปภาพได้"); }
    };
    clearBtn.onclick = () => {
      avatarData = "";
      wrap.innerHTML = renderAvatarHtml({ ...u, avatar: "" });
      clearBtn.classList.add("hidden");
    };

    document.getElementById("selfCancelBtn").onclick = closeSheet;
    document.getElementById("selfSaveBtn").onclick = () => {
      const name = document.getElementById("selfName").value.trim();
      const shortName = document.getElementById("selfShort").value.trim();
      const phone = document.getElementById("selfPhone").value.trim();
      const newPin = document.getElementById("selfPin").value.trim();
      if (!name) { notifyIsland("กรุณากรอกชื่อ-นามสกุล"); return; }
      if (newPin && !/^\d{4}$/.test(newPin)) { notifyIsland("รหัส PIN ต้องเป็นตัวเลข 4 หลัก"); return; }

      const updated = {
        ...u,
        name,
        shortName: shortName || u.shortName,
        phone,
        pin: newPin || u.pin,
        avatar: avatarData
      };
      state.users = state.users.map((x) => (x.id === u.id ? updated : x));
      state.currentUser = updated;
      try { localStorage.setItem(STORAGE_USERS, JSON.stringify(state.users)); } catch (_) {}
      postToBackend({ action: "save_user", user: updated });
      closeSheet();
      notifyIsland("บันทึกโปรไฟล์เรียบร้อยแล้ว");
      render();
    };
  }

  function openAdminUserSheet(existing = null) {
    if (!isAdminUser(state.currentUser)) return;
    haptic();
    const esc = (v) => String(v || "").replace(/"/g, "&quot;");
    els.sheetBody.innerHTML = `
      <h3 style="margin:0 0 8px">${existing ? "แก้ไขผู้ใช้ / รีเซ็ตรหัสผ่าน" : "เพิ่มผู้ใช้งานใหม่"}</h3>
      <input class="admin-input" id="admUsrName" placeholder="ชื่อ-นามสกุล" value="${esc(existing?.name)}" />
      <input class="admin-input" id="admUsrShort" placeholder="ชื่อย่อ (เช่น ครูสมชาย)" value="${esc(existing?.shortName)}" />
      <input class="admin-input" id="admUsrPos" placeholder="ตำแหน่ง (เช่น ครู / เจ้าหน้าที่)" value="${esc(existing?.position)}" />
      <select class="admin-select" id="admUsrRole">
        <option value="teacher" ${(existing?.role || "teacher") === "teacher" ? "selected" : ""}>บทบาท: ครู</option>
        <option value="head" ${existing?.role === "head" ? "selected" : ""}>บทบาท: หัวหน้ากลุ่มงาน</option>
        <option value="director" ${existing?.role === "director" ? "selected" : ""}>บทบาท: ผู้อำนวยการ</option>
        <option value="admin" ${existing?.role === "admin" ? "selected" : ""}>บทบาท: แอดมิน</option>
      </select>
      <input class="admin-input" id="admUsrPin" type="tel" maxlength="4" placeholder="ตั้งรหัส PIN 4 หลัก" value="${esc(existing?.pin || "1234")}" />
      <button class="btn-primary" id="admUsrSaveBtn">บันทึกผู้ใช้งาน</button>
      <button class="btn-secondary" id="admUsrCancelBtn">ยกเลิก</button>
    `;
    els.sheetBackdrop.classList.add("open");
    document.getElementById("admUsrCancelBtn").onclick = closeSheet;
    document.getElementById("admUsrSaveBtn").onclick = () => {
      const name = document.getElementById("admUsrName").value.trim();
      const pin = document.getElementById("admUsrPin").value.trim();
      if (!name) { notifyIsland("กรุณากรอกชื่อ-นามสกุล"); return; }
      if (!/^\d{4}$/.test(pin)) { notifyIsland("รหัส PIN ต้องเป็นตัวเลข 4 หลัก"); return; }
      const saved = {
        id: existing ? existing.id : "usr-" + Date.now(),
        name,
        shortName: document.getElementById("admUsrShort").value.trim() || name.split(" ")[0],
        position: document.getElementById("admUsrPos").value.trim() || "ครู",
        role: document.getElementById("admUsrRole").value,
        pin,
        color: existing ? existing.color : ["blue", "emerald", "amber", "teal", "purple", "sky"][state.users.length % 6],
        avatar: existing ? (existing.avatar || "") : ""
      };
      if (existing) {
        state.users = state.users.map((x) => (x.id === existing.id ? saved : x));
        if (state.currentUser && state.currentUser.id === saved.id) state.currentUser = saved;
      } else {
        state.users = [...state.users, saved];
      }
      try { localStorage.setItem(STORAGE_USERS, JSON.stringify(state.users)); } catch (_) {}
      postToBackend({ action: "save_user", user: saved });
      closeSheet();
      notifyIsland(existing ? "อัปเดตข้อมูล/รหัสผ่านแล้ว" : "เพิ่มผู้ใช้งานใหม่แล้ว");
      render();
    };
  }

  // --- Real Push Notifications (Unified OneSignalSDKWorker.js — no SW conflict!) ---
  async function cleanupLegacySw() {
    if (!("serviceWorker" in navigator)) return;
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const r of regs) {
        const url = (r.active && r.active.scriptURL) || (r.installing && r.installing.scriptURL) || "";
        if (url.endsWith("/sw.js")) {
          await r.unregister();
        }
      }
    } catch (_) {}
  }

  function initOneSignal() {
    const appId = (state.oneSignalAppId || "").trim();
    if (!appId) return;
    const isGhPages = location.pathname.startsWith("/banpaphai-school-hub");
    cleanupLegacySw().then(() => {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async function (OneSignal) {
        try {
          await OneSignal.init({
            appId,
            allowLocalhostAsSecureOrigin: true,
            serviceWorkerPath: isGhPages ? "/banpaphai-school-hub/OneSignalSDKWorker.js" : "/OneSignalSDKWorker.js",
            serviceWorkerParam: { scope: isGhPages ? "/banpaphai-school-hub/" : "/" }
          });
          const sub = OneSignal.User && OneSignal.User.PushSubscription;
          if (sub && sub.id && sub.optedIn) {
            state.pushSubId = sub.id;
            if (state.tab === "settings") render();
          }
          if (sub && sub.addEventListener) {
            sub.addEventListener("change", (ev) => {
              state.pushSubId = ev.current && ev.current.optedIn ? (ev.current.id || "active") : "";
              if (state.tab === "settings") render();
            });
          }
        } catch (_) {}
      });
    });
  }

  async function enablePushNotifications() {
    haptic();
    if (!("Notification" in window)) {
      notifyIsland("บน iPhone ต้องเปิดจากไอคอนหน้าจอโฮม (iOS 16.4+)");
      return;
    }

    const appId = (state.oneSignalAppId || "").trim();
    if (appId && window.OneSignalDeferred) {
      notifyIsland("กำลังลงทะเบียนแจ้งเตือน...");
      window.OneSignalDeferred.push(async function (OneSignal) {
        try {
          await OneSignal.Notifications.requestPermission();
          const sub = OneSignal.User && OneSignal.User.PushSubscription;
          if (sub) {
            await sub.optIn();
            state.pushSubId = sub.id || (sub.optedIn ? "subscribed" : "");
          }
          playSound("success");
          notifyIsland(state.pushSubId ? "ลงทะเบียน Push สำเร็จแล้ว!" : "อนุญาตแล้ว รอซิงก์สักครู่");
          render();
        } catch (err) {
          notifyIsland("ลงทะเบียนไม่สำเร็จ ลองปิดแอปแล้วเปิดใหม่");
        }
      });
      return;
    }

    try {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        notifyIsland("อนุญาตแจ้งเตือนบนเครื่องนี้แล้ว");
        if (state.swReg && state.swReg.showNotification) {
          state.swReg.showNotification("BPP Connect", {
            body: "เปิดรับการแจ้งเตือนข่าวสารโรงเรียนบ้านป่าไผ่เรียบร้อยแล้ว",
            icon: "./icons/school-logo.png"
          });
        } else {
          new Notification("BPP Connect", {
            body: "เปิดรับการแจ้งเตือนข่าวสารโรงเรียนบ้านป่าไผ่เรียบร้อยแล้ว",
            icon: "./icons/school-logo.png"
          });
        }
      } else {
        notifyIsland("ยังไม่ได้อนุญาตการแจ้งเตือน");
      }
      render();
    } catch (_) {
      notifyIsland("บน iPhone ต้องเพิ่มลงหน้าจอโฮมก่อนเปิดแจ้งเตือน");
    }
  }

  // --- Live OBEC News + School Broadcast News ---
  async function loadLiveNews(force = false) {
    if (state.obecLoading && !force) return;
    state.obecLoading = true;
    if (state.tab === "announcements") render();

    const apiUrl = (state.newsBackendUrl || "").trim();
    if (apiUrl) {
      try {
        const res = await fetch(`${apiUrl}${apiUrl.includes("?") ? "&" : "?"}action=news`, { cache: "no-store" });
        const data = await res.json();
        if (data && data.ok) {
          if (Array.isArray(data.schoolNews) && data.schoolNews.length) {
            state.announcements = data.schoolNews;
            try { localStorage.setItem(STORAGE_LOCAL_NEWS, JSON.stringify(data.schoolNews)); } catch (_) {}
          }
          if (Array.isArray(data.calendarEvents) && data.calendarEvents.length) {
            state.events = data.calendarEvents;
            try { localStorage.setItem(STORAGE_EVENTS, JSON.stringify(data.calendarEvents)); } catch (_) {}
          }
          if (Array.isArray(data.users) && data.users.length) {
            const byId = new Map(state.users.map((u) => [u.id, u]));
            data.users.forEach((u) => {
              const prev = byId.get(u.id) || {};
              byId.set(u.id, {
                ...prev,
                ...u,
                avatar: (u.avatar && String(u.avatar).trim()) ? u.avatar : (prev.avatar || "")
              });
            });
            state.users = [...byId.values()];
            try { localStorage.setItem(STORAGE_USERS, JSON.stringify(state.users)); } catch (_) {}
            if (state.currentUser) {
              state.currentUser = state.users.find((u) => u.id === state.currentUser.id) || state.currentUser;
            }
            if (!els.login.classList.contains("hidden")) renderUserList();
          }
          if (Array.isArray(data.obecNews)) state.obecNews = data.obecNews;
          state.obecLoading = false;
          render();
          return;
        }
      } catch (_) {}
    }

    // Fallback: pull live official OBEC RSS feed directly via rss2json so OBEC news works immediately
    try {
      const rssApi = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://www.obec.go.th/feed/");
      const res = await fetch(rssApi);
      const data = await res.json();
      if (data && Array.isArray(data.items)) {
        state.obecNews = data.items.slice(0, 12).map((it) => {
          const rawHtml = it.content || it.description || "";
          const imgMatch = rawHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
          const cleanFull = String(rawHtml)
            .replace(/<\/(p|div|br|li|h[1-6])>/gi, "\n")
            .replace(/<[^>]*>/g, "")
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
          return {
            title: it.title || "",
            link: it.link || "https://www.obec.go.th",
            pubDate: (it.pubDate || "").split(" ")[0],
            summary: cleanFull.replace(/\s+/g, " ").slice(0, 140),
            content: cleanFull,
            image: it.thumbnail || (imgMatch ? imgMatch[1] : "")
          };
        });
      }
    } catch (_) {}

    state.obecLoading = false;
    if (state.tab === "announcements") render();
  }

  function compressImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          const maxW = 720;
          const scale = img.width > maxW ? maxW / img.width : 1;
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          let dataUrl = canvas.toDataURL("image/jpeg", 0.72);
          if (dataUrl.length > 46000) dataUrl = canvas.toDataURL("image/jpeg", 0.5);
          resolve(dataUrl);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function openObecReaderSheet(idx) {
    const item = state.obecNews[idx];
    if (!item) return;
    haptic();
    els.sheetBody.innerHTML = `
      <div class="reader-body">
        <div class="info-meta"><span class="obec-badge">ข่าวการศึกษา สพฐ.</span>${item.pubDate || ""}</div>
        <h3 style="margin:4px 0 8px;font-size:16.5px;line-height:1.35">${item.title}</h3>
        ${item.image ? `<img class="news-thumb" src="${item.image}" alt="" />` : ""}
        <div class="reader-content">${item.content || item.summary || "ไม่มีเนื้อหาย่อในฟีดข่าว"}</div>
      </div>
      <button class="btn-primary" id="obecOpenOriginBtn">เปิดอ่านต้นฉบับบนเว็บ สพฐ. ↗</button>
      <button class="btn-secondary" id="obecCloseBtn">ปิด</button>
    `;
    els.sheetBackdrop.classList.add("open");
    document.getElementById("obecCloseBtn").onclick = closeSheet;
    document.getElementById("obecOpenOriginBtn").onclick = () => {
      window.open(item.link, "_blank", "noopener,noreferrer");
    };
  }

  function openImagePreviewSheet(src, title) {
    haptic();
    els.sheetBody.innerHTML = `
      <h3 style="margin:0 0 8px;font-size:15px">${title || "รูปภาพประกอบข่าว"}</h3>
      <img src="${src}" alt="" style="width:100%;max-height:65dvh;object-fit:contain;border-radius:14px;display:block;background:#000" />
      <button class="btn-secondary" id="imgCloseBtn">ปิด</button>
    `;
    els.sheetBackdrop.classList.add("open");
    document.getElementById("imgCloseBtn").onclick = closeSheet;
  }

  async function deleteNewsItem(id) {
    const target = state.announcements.find((a) => a.id === id);
    if (!target || !canManageNews(state.currentUser, target)) return;
    haptic();
    state.announcements = state.announcements.filter((a) => a.id !== id);
    try { localStorage.setItem(STORAGE_LOCAL_NEWS, JSON.stringify(state.announcements)); } catch (_) {}
    render();
    notifyIsland("ลบข่าวแล้ว");

    const apiUrl = (state.newsBackendUrl || "").trim();
    if (apiUrl) {
      try {
        await fetch(apiUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ action: "delete", id })
        });
      } catch (_) {}
    }
  }

  function openBroadcastNewsSheet(existingItem = null) {
    haptic();
    const u = state.currentUser;
    let attachedImage = existingItem ? (existingItem.image || "") : "";
    const esc = (v) => String(v || "").replace(/"/g, "&quot;");

    els.sheetBody.innerHTML = `
      <h3 style="margin:0 0 6px">${existingItem ? "แก้ไขข่าวประกาศ" : "แจ้งข่าวถึงครูและ ผอ. ทุกคน"}</h3>
      <div class="info-meta">ผู้แจ้ง: ${u ? `${u.name} (${u.position})` : "บุคลากรโรงเรียน"}</div>
      <input class="admin-input" id="bcTitle" placeholder="หัวข้อข่าว / ประกาศด่วน" value="${esc(existingItem?.title)}" />
      <textarea class="admin-input" id="bcBody" rows="3" placeholder="รายละเอียดข่าวที่ต้องการแจ้งทุกคน...">${existingItem?.body || ""}</textarea>
      <div style="margin-top:10px">
        <label class="admin-mini-btn" style="display:inline-flex;align-items:center;gap:6px;cursor:pointer">
          <span>📷 แนบรูปภาพ</span>
          <input type="file" id="bcImageFile" accept="image/*" style="display:none" />
        </label>
        <button type="button" class="admin-mini-btn del ${attachedImage ? "" : "hidden"}" id="bcClearImgBtn" style="margin-left:6px">ลบรูป</button>
        <img id="bcImgPreview" class="upload-preview ${attachedImage ? "" : "hidden"}" src="${attachedImage}" alt="" />
      </div>
      <label style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13px">
        <input type="checkbox" id="bcUrgent" ${existingItem?.urgent ? "checked" : ""} /> ระบุเป็นข่าวด่วน (แถบสีแดง)
      </label>
      <button class="btn-primary" id="bcSendBtn">${existingItem ? "บันทึกการแก้ไข" : "ส่งข่าวและแจ้งเตือนทุกเครื่อง"}</button>
      <button class="btn-secondary" id="bcCancelBtn">ยกเลิก</button>
    `;
    els.sheetBackdrop.classList.add("open");

    const fileInput = document.getElementById("bcImageFile");
    const previewImg = document.getElementById("bcImgPreview");
    const clearImgBtn = document.getElementById("bcClearImgBtn");

    fileInput.onchange = async () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) return;
      try {
        attachedImage = await compressImageFile(f);
        previewImg.src = attachedImage;
        previewImg.classList.remove("hidden");
        clearImgBtn.classList.remove("hidden");
      } catch (_) {
        notifyIsland("ไม่สามารถอ่านไฟล์รูปนี้ได้");
      }
    };

    clearImgBtn.onclick = () => {
      attachedImage = "";
      previewImg.src = "";
      previewImg.classList.add("hidden");
      clearImgBtn.classList.add("hidden");
    };

    document.getElementById("bcCancelBtn").onclick = closeSheet;
    document.getElementById("bcSendBtn").onclick = async () => {
      const title = document.getElementById("bcTitle").value.trim();
      const body = document.getElementById("bcBody").value.trim();
      const urgent = document.getElementById("bcUrgent").checked;
      if (!title || !body) { notifyIsland("กรุณากรอกหัวข้อและรายละเอียด"); return; }

      const apiUrl = (state.newsBackendUrl || "").trim();

      if (existingItem) {
        state.announcements = state.announcements.map((a) =>
          a.id === existingItem.id ? { ...a, title, body, urgent, image: attachedImage } : a
        );
        try { localStorage.setItem(STORAGE_LOCAL_NEWS, JSON.stringify(state.announcements)); } catch (_) {}
        closeSheet();
        render();
        notifyIsland("บันทึกการแก้ไขข่าวแล้ว");
        if (apiUrl) {
          try {
            await fetch(apiUrl, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "text/plain" },
              body: JSON.stringify({ action: "edit", id: existingItem.id, title, body, urgent, image: attachedImage })
            });
          } catch (_) {}
        }
        return;
      }

      const nowStr = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
      const newId = "news-" + Date.now();
      const newItem = {
        id: newId,
        title,
        body,
        date: `วันนี้ ${nowStr} • ${u ? u.shortName : "ครู"}`,
        author: u ? u.name : "",
        authorId: u ? u.id : "",
        position: u ? u.position : "",
        urgent,
        image: attachedImage
      };

      state.announcements = [newItem, ...state.announcements];
      try { localStorage.setItem(STORAGE_LOCAL_NEWS, JSON.stringify(state.announcements)); } catch (_) {}
      closeSheet();
      render();

      if (apiUrl) {
        notifyIsland("กำลังส่งแจ้งเตือนไปทุกเครื่อง...");
        try {
          await fetch(apiUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
              action: "create",
              id: newId,
              title,
              body,
              author: u ? u.name : "บุคลากรโรงเรียนบ้านป่าไผ่",
              authorId: u ? u.id : "",
              position: u ? u.position : "",
              urgent,
              image: attachedImage
            })
          });
          notifyIsland("ส่งข่าวและแจ้งเตือนทุกเครื่องแล้ว!");
        } catch (_) {
          notifyIsland("บันทึกในเครื่องแล้ว (ส่งคลาวด์ไม่สำเร็จ)");
        }
      } else {
        notifyIsland("โพสต์ข่าวแล้ว");
      }
    };
  }

  // --- Main App Functions ---
  function openSheet(sys) {
    haptic();
    const isDemo = !sys.url || sys.url.includes("REPLACE_WITH_");
    const isFav = state.favorites.has(sys.id);
    els.sheetBody.innerHTML = `
      <div class="sheet-head">
        <div class="squircle squircle-sm c-${sys.color}">${iconSvg(sys.icon, 24)}</div>
        <div>
          <h3>${sys.name}</h3>
          <p>${sys.description}</p>
        </div>
      </div>
      <div class="sheet-note">
        ${
          isDemo
            ? "ตอนนี้เป็นลิงก์ตัวอย่าง — ครูธานครินทร์ (แอดมิน) สามารถใส่ลิงก์ GAS จริงได้จากหน้าตั้งค่า"
            : `พร้อมเปิดระบบ Google Apps Script ปลายทาง`
        }
      </div>
      <button class="btn-primary" id="sheetLaunchBtn">${isDemo ? "รอใส่ลิงก์ GAS จริง" : "เปิดระบบงานทันที"}</button>
      <button class="btn-secondary" id="sheetFavBtn">${isFav ? "นำออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}</button>
    `;
    els.sheetBackdrop.classList.add("open");

    document.getElementById("sheetLaunchBtn").onclick = () => {
      closeSheet();
      if (isDemo) {
        notifyIsland(`รอใส่ลิงก์ GAS ของ ${sys.shortName}`);
      } else {
        notifyIsland(`กำลังเปิด ${sys.shortName}`);
        window.open(sys.url, "_blank", "noopener,noreferrer");
      }
    };
    document.getElementById("sheetFavBtn").onclick = () => {
      toggleFavorite(sys.id);
      closeSheet();
    };
  }

  function closeSheet() {
    els.sheetBackdrop.classList.remove("open");
  }
  els.sheetBackdrop.addEventListener("click", (e) => {
    if (e.target === els.sheetBackdrop) closeSheet();
  });

  function saveFavorites() {
    try { localStorage.setItem(STORAGE_FAVS, JSON.stringify([...state.favorites])); } catch (_) {}
  }

  function toggleFavorite(id, ev) {
    if (ev) ev.stopPropagation();
    if (state.favorites.has(id)) {
      state.favorites.delete(id);
      notifyIsland("นำออกจากรายการโปรดแล้ว");
    } else {
      state.favorites.add(id);
      notifyIsland("ปักหมุดในรายการโปรดแล้ว");
    }
    saveFavorites();
    render();
  }

  let activeInAppUrl = "";
  let inAppFallbackTimer = null;
  function openInAppViewer(sys) {
    haptic();
    activeInAppUrl = sys.url;
    els.inAppTitle.textContent = sys.name;
    els.inAppLoading.innerHTML = `<div class="ios-spinner"></div><span>กำลังเชื่อมต่อระบบ...</span>`;
    els.inAppLoading.classList.remove("done");
    els.inAppFrame.src = sys.url;
    els.inAppOverlay.classList.remove("hidden");
    requestAnimationFrame(() => els.inAppOverlay.classList.add("open"));
    notifyIsland(`เปิด ${sys.shortName} ในแอป`);

    clearTimeout(inAppFallbackTimer);
    inAppFallbackTimer = setTimeout(() => {
      if (!els.inAppLoading.classList.contains("done") && activeInAppUrl) {
        els.inAppLoading.innerHTML = `
          <div style="text-align:center;padding:20px;max-width:280px">
            <div style="font-size:14px;font-weight:600;color:var(--ios-text);margin-bottom:6px">เว็บปลายทางไม่อนุญาตให้ฝังในแอป</div>
            <div style="font-size:12px;margin-bottom:12px">กดปุ่มด้านล่างเพื่อเปิดใช้งานเต็มจอทันที</div>
            <button type="button" class="btn-primary" id="inAppForceOpenBtn">เปิดในเบราว์เซอร์ ↗</button>
          </div>`;
        const b = document.getElementById("inAppForceOpenBtn");
        if (b) b.onclick = () => window.open(activeInAppUrl, "_blank", "noopener,noreferrer");
      }
    }, 4500);
  }

  function closeInAppViewer() {
    haptic();
    clearTimeout(inAppFallbackTimer);
    const wasAlbum = activeInAppUrl.includes("album.html");
    els.inAppOverlay.classList.remove("open");
    setTimeout(() => {
      els.inAppOverlay.classList.add("hidden");
      els.inAppFrame.src = "about:blank";
      activeInAppUrl = "";
      if (wasAlbum) loadLiveNews(true);
    }, 340);
  }

  // Listen for live album upload notifications from album.html iframe
  window.addEventListener("message", (e) => {
    if (e.origin !== location.origin) return;
    if (e.data && e.data.type === "BPP_ALBUM_UPLOADED") {
      playSound("success");
      notifyIsland(`อัปโหลดอัลบั้ม "${e.data.albumName}" (${e.data.count} รูป)`);
      loadLiveNews(true);
    }
  });

  els.inAppFrame.addEventListener("load", () => {
    clearTimeout(inAppFallbackTimer);
    if (activeInAppUrl) els.inAppLoading.classList.add("done");
  });
  els.inAppBackBtn.addEventListener("click", closeInAppViewer);
  els.inAppReloadBtn.addEventListener("click", () => {
    if (!activeInAppUrl) return;
    haptic();
    els.inAppLoading.innerHTML = `<div class="ios-spinner"></div><span>กำลังเชื่อมต่อระบบ...</span>`;
    els.inAppLoading.classList.remove("done");
    els.inAppFrame.src = activeInAppUrl;
  });
  els.inAppExternalBtn.addEventListener("click", () => {
    if (activeInAppUrl) window.open(activeInAppUrl, "_blank", "noopener,noreferrer");
  });

  function openSystem(sys) {
    const isDemo = !sys.url || sys.url.includes("REPLACE_WITH_");
    if (isDemo) {
      openSheet(sys);
      return;
    }
    if (sys.openExternal) {
      notifyIsland(`กำลังเปิด ${sys.shortName}`);
      window.open(sys.url, "_blank", "noopener,noreferrer");
      return;
    }
    openInAppViewer(sys);
  }

  function currentRole() {
    return state.currentUser ? state.currentUser.role : "teacher";
  }

  function renderHome() {
    const role = currentRole();
    const visible = filterSystems(state.systems, {
      division: state.division,
      query: state.query,
      role,
      favoritesOnly: false,
      favoritesSet: state.favorites
    });

    const pinnedList = filterSystems(state.systems, {
      division: "all",
      query: "",
      role,
      favoritesOnly: true,
      favoritesSet: state.favorites
    }).slice(0, 4);

    const showPinned = state.division === "all" && !state.query.trim() && pinnedList.length > 0;
    const isListMode = state.division !== "all" || Boolean(state.query.trim());

    const pinnedHtml = showPinned
      ? `
        <div class="section-header">
          <h2 class="section-title">ใช้บ่อย</h2>
          <span class="section-sub">แตะ 1 ครั้งเปิดทันที</span>
        </div>
        <div class="ios-widget-card">
          <div class="pinned-strip">
            ${pinnedList
              .map(
                (s) => `
                <button class="pinned-item" data-open="${s.id}">
                  <div class="squircle c-${s.color}">
                    ${iconSvg(s.icon, 25)}
                    <span class="star-badge">${starSvg(true, 10)}</span>
                  </div>
                  <span class="icon-label">${s.shortName}</span>
                </button>`
              )
              .join("")}
          </div>
        </div>`
      : "";

    const filtersHtml = `
      <div class="filter-bar" role="tablist" aria-label="ฝ่ายบริหาร">
        ${config.divisions
          .map(
            (d) => `
            <button class="filter-chip ${state.division === d.id ? "active" : ""}" data-div="${d.id}" role="tab">
              ${d.label}
            </button>`
          )
          .join("")}
      </div>`;

    const currentDivLabel = config.divisions.find((d) => d.id === state.division)?.label || "ทั้งหมด";
    const sectionHeading = state.division === "all" ? "ระบบงานทั้งหมด" : `ฝ่ายบริหารงาน${currentDivLabel}`;

    let bodyHtml = "";
    if (visible.length === 0) {
      bodyHtml = `<div class="empty-state">ไม่พบระบบงานที่ค้นหา</div>`;
    } else if (!isListMode) {
      bodyHtml = `
        <div class="section-header">
          <h2 class="section-title">${sectionHeading}</h2>
          <button type="button" class="admin-mini-btn" id="toggleJiggleBtn">${state.jiggleMode ? "เสร็จสิ้น ✓" : "จัดหมุด"}</button>
        </div>
        <div class="apps-grid ${state.jiggleMode ? "jiggle-active" : ""}">
          ${visible
            .map((s, i) => {
              const isFav = state.favorites.has(s.id);
              return `
                <div class="grid-card" style="animation-delay:${i * 24}ms" data-open="${s.id}" role="button" tabindex="0">
                  ${s.directorOnly ? '<span class="director-tag">ผู้บริหาร</span>' : ""}
                  ${state.jiggleMode ? `<span class="jiggle-pin-badge ${isFav ? "pinned" : ""}">${isFav ? "★" : "+"}</span>` : ""}
                  <div class="squircle squircle-lg c-${s.color}">
                    ${iconSvg(s.icon, 27)}
                  </div>
                  <span class="icon-label">${s.shortName}</span>
                </div>`;
            })
            .join("")}
        </div>`;
    } else {
      bodyHtml = `
        <div class="section-header">
          <h2 class="section-title">${sectionHeading}</h2>
          <span class="section-sub">${visible.length} ระบบ</span>
        </div>
        <div class="apps-list">
          ${visible
            .map((s, i) => {
              const isFav = state.favorites.has(s.id);
              return `
                <div class="list-card" style="animation-delay:${i * 26}ms" data-open="${s.id}" role="button" tabindex="0">
                  <div class="squircle squircle-sm c-${s.color}">
                    ${iconSvg(s.icon, 22)}
                  </div>
                  <div class="list-info">
                    <h3>${s.name}</h3>
                    <p>${s.description}</p>
                  </div>
                  <div class="list-actions">
                    <button class="fav-btn ${isFav ? "active" : ""}" data-fav="${s.id}" aria-label="ติดดาวรายการโปรด">
                      ${starSvg(isFav, 18)}
                    </button>
                    ${chevronSvg()}
                  </div>
                </div>`;
            })
            .join("")}
        </div>`;
    }

    const greetingHtml = state.division === "all" && !state.query.trim() ? renderGreetingAndStaff() : "";
    const calendarHtml = state.division === "all" && !state.query.trim() ? `<div id="calAnchor">${renderCalendarWidget()}</div>` : "";

    els.main.innerHTML = `
      ${greetingHtml}
      ${pinnedHtml}
      ${calendarHtml}
      ${filtersHtml}
      ${bodyHtml}
      <div class="gas-badge">
        <span>BPP Connect v${config.appVersion || "1.7.0"} • Google Workspace</span>
      </div>`;
  }

  function renderFavorites() {
    const favs = filterSystems(state.systems, {
      division: "all",
      query: state.query,
      role: currentRole(),
      favoritesOnly: true,
      favoritesSet: state.favorites
    });

    els.main.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">รายการโปรดของฉัน</h2>
        <span class="section-sub">${favs.length} ระบบ</span>
      </div>
      ${
        favs.length === 0
          ? '<div class="empty-state">ยังไม่มีรายการโปรด<br>เลือกฝ่ายบริหารแล้วแตะรูปดาวเพื่อปักหมุด</div>'
          : `<div class="apps-list">
              ${favs
                .map(
                  (s, i) => `
                  <div class="list-card" style="animation-delay:${i * 26}ms" data-open="${s.id}">
                    <div class="squircle squircle-sm c-${s.color}">${iconSvg(s.icon, 22)}</div>
                    <div class="list-info">
                      <h3>${s.name}</h3>
                      <p>${s.description}</p>
                    </div>
                    <div class="list-actions">
                      <button class="fav-btn active" data-fav="${s.id}">${starSvg(true, 18)}</button>
                      ${chevronSvg()}
                    </div>
                  </div>`
                )
                .join("")}
            </div>`
      }`;
  }

  function renderAnnouncements() {
    const isObec = state.newsSubTab === "obec";
    if (isObec && state.obecNews.length === 0 && !state.obecLoading) {
      loadLiveNews(false);
    }

    const segHtml = `
      <div class="ios-segmented" role="tablist">
        <button class="seg-btn ${!isObec ? "active" : ""}" data-newstab="school">ข่าวโรงเรียน</button>
        <button class="seg-btn ${isObec ? "active" : ""}" data-newstab="obec">ข่าว สพฐ. สด</button>
      </div>`;

    if (!isObec) {
      els.main.innerHTML = `
        <div class="section-header">
          <h2 class="section-title">ข่าวสารและประกาศ</h2>
          <button class="admin-mini-btn" id="refreshNewsBtn">รีเฟรช</button>
        </div>
        ${segHtml}
        <button class="btn-primary" id="openBroadcastBtn" style="margin:0 0 14px">+ แจ้งข่าวถึงครูและ ผอ. ทุกคน</button>
        ${state.announcements
          .map(
            (a, i) => `
            <div class="info-card ${a.urgent ? "urgent" : ""}" style="animation-delay:${i * 28}ms">
              <h3>${a.title}</h3>
              <div class="info-meta">${a.date}</div>
              <p>${a.body}</p>
              ${a.image ? `<img class="news-thumb" src="${a.image}" data-img-preview="${a.id}" alt="" />` : ""}
              ${
                canManageNews(state.currentUser, a)
                  ? `<div class="news-card-foot">
                      <button class="admin-mini-btn" data-news-edit="${a.id}">แก้ไข</button>
                      <button class="admin-mini-btn del" data-news-del="${a.id}">ลบข่าว</button>
                    </div>`
                  : ""
              }
            </div>`
          )
          .join("")}`;
    } else {
      els.main.innerHTML = `
        <div class="section-header">
          <h2 class="section-title">ข่าวการศึกษา สพฐ.</h2>
          <button class="admin-mini-btn" id="refreshNewsBtn">โหลดใหม่</button>
        </div>
        ${segHtml}
        ${
          state.obecLoading
            ? '<div class="empty-state">กำลังดึงข่าวล่าสุดจากเว็บไซต์ สพฐ. (obec.go.th)...</div>'
            : state.obecNews.length === 0
              ? '<div class="empty-state">ไม่สามารถดึงข่าว สพฐ. ได้ชั่วคราว กดปุ่มโหลดใหม่</div>'
              : state.obecNews
                  .map(
                    (n, i) => `
                    <div class="info-card obec-card" style="animation-delay:${i * 25}ms" data-obec-idx="${i}">
                      <div class="info-meta"><span class="obec-badge">สพฐ.</span>${n.pubDate || "ข่าวล่าสุด"}</div>
                      <h3>${n.title}</h3>
                      ${n.image ? `<img class="news-thumb" src="${n.image}" alt="" />` : ""}
                      ${n.summary ? `<p style="margin-top:6px">${n.summary}...</p>` : ""}
                    </div>`
                  )
                  .join("")
        }`;
    }
  }

  function renderSettings() {
    const u = state.currentUser;
    const isAdmin = isAdminUser(u);
    const isDark = state.theme === "dark";

    const adminHtml = isAdmin
      ? `
        <div class="info-card">
          <h3>จัดการผู้ใช้งาน <span class="admin-badge">เฉพาะแอดมิน</span></h3>
          <div class="info-meta">เพิ่มผู้ใช้ หรือรีเซ็ตรหัสผ่านให้ครูที่ลืมรหัสได้ทันที</div>
          <button class="btn-primary" id="adminAddUserBtn">+ เพิ่มผู้ใช้งานใหม่</button>
          <div style="margin-top:12px">
            ${state.users
              .map(
                (usr) => `
                <div class="admin-sys-row">
                  <div style="min-width:0;flex:1">
                    <strong style="font-size:13px">${usr.name}</strong>
                    <div class="info-meta" style="margin:0">${usr.position} • PIN: ${usr.pin}</div>
                  </div>
                  <button class="admin-mini-btn" data-adm-usr-edit="${usr.id}">แก้/รหัส</button>
                  ${usr.id !== "thanakarin" ? `<button class="admin-mini-btn del" data-adm-usr-del="${usr.id}">ลบ</button>` : ""}
                </div>`
              )
              .join("")}
          </div>
        </div>
        <div class="info-card">
          <h3>จัดการระบบงาน <span class="admin-badge">เฉพาะแอดมิน</span></h3>
          <div class="info-meta">สิทธิ์เฉพาะ นายธานครินทร์ สุเมธาลังการ</div>
          <button class="btn-primary" id="adminAddSysBtn">+ เพิ่มระบบงาน GAS ใหม่</button>
          <div style="margin-top:12px">
            ${state.systems
              .map(
                (s) => `
                <div class="admin-sys-row">
                  <div style="min-width:0;flex:1">
                    <strong style="font-size:13px">${s.shortName}</strong>
                    <div class="info-meta" style="margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.url.includes("REPLACE_WITH_") ? "ยังเป็นลิงก์ตัวอย่าง" : "เชื่อม GAS จริงแล้ว"}</div>
                  </div>
                  <button class="admin-mini-btn" data-adm-edit="${s.id}">แก้ไข</button>
                  <button class="admin-mini-btn del" data-adm-del="${s.id}">ลบ</button>
                </div>`
              )
              .join("")}
          </div>
          <div style="margin-top:12px;padding-top:10px;border-top:0.5px solid var(--ios-sep)">
            <strong style="font-size:13px">เชื่อมต่อแจ้งเตือน Push จริง & ข่าวคลาวด์</strong>
            <input class="admin-input" id="newsApiInput" placeholder="ลิงก์ GAS หลังบ้านข่าว (จาก gas-backend.gs)" value="${state.newsBackendUrl}" />
            <input class="admin-input" id="oneSignalInput" placeholder="OneSignal App ID (สำหรับแจ้งเตือนข้ามเครื่อง)" value="${state.oneSignalAppId}" />
            <input class="admin-input" id="remoteUrlInput" placeholder="ลิงก์ซิงก์รายการระบบ GAS JSON (ถ้ามี)" value="${state.remoteConfigUrl}" />
            <button class="btn-secondary" id="saveRemoteUrlBtn">บันทึกการเชื่อมต่อคลาวด์</button>
            <button class="btn-secondary" id="exportConfigBtn">คัดลอก apps-config.js (สำหรับอัปเดตผ่าน GitHub)</button>
          </div>
        </div>`
      : "";

    const notifStatus = state.pushSubId
      ? "✅ เชื่อมต่อ OneSignal Push สำเร็จแล้ว"
      : "Notification" in window
        ? Notification.permission === "granted"
          ? "อนุญาตในเครื่องแล้ว (กดปุ่มด้านล่างเพื่อซิงก์ OneSignal)"
          : Notification.permission === "denied"
            ? "ถูกปิดไว้ในการตั้งค่าเครื่อง"
            : "ยังไม่ได้เปิดรับแจ้งเตือน"
        : "บน iPhone ต้องเพิ่มลงหน้าจอโฮมก่อน";

    els.main.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">บัญชีและการตั้งค่า</h2>
      </div>
      ${
        u
          ? `<div class="info-card">
              <div class="profile-card">
                ${renderAvatarHtml(u)}
                <div style="flex:1;min-width:0">
                  <h3>${u.name}</h3>
                  <div class="info-meta" style="margin:0">${u.position}</div>
                </div>
              </div>
              <button class="btn-secondary" id="editSelfProfileBtn" style="margin-top:12px">แก้ไขชื่อ / รูปโปรไฟล์ / เปลี่ยนรหัส PIN</button>
            </div>`
          : ""
      }
      <div class="info-card">
        <div class="settings-row">
          <div>
            <strong>แจ้งเตือนข่าวบนมือถือ (Push)</strong>
            <div class="info-meta" style="margin:0">สถานะ: ${notifStatus}</div>
          </div>
        </div>
        <button class="btn-primary" id="enablePushBtn">เปิดรับการแจ้งเตือนจริง (iPhone / Android)</button>
      </div>
      <div class="info-card">
        <div class="settings-row">
          <div>
            <strong>โหมดมืด (Dark Mode)</strong>
            <div class="info-meta" style="margin:0">สลับธีมสว่าง / มืดแบบ iOS</div>
          </div>
          <button class="ios-switch ${isDark ? "on" : ""}" id="darkModeToggle" role="switch" aria-checked="${isDark}" aria-label="สลับโหมดมืด"></button>
        </div>
        <div class="settings-row">
          <div>
            <strong>เสียงเอฟเฟค iOS</strong>
            <div class="info-meta" style="margin:0">เสียงแตะปุ่มและเสียงปลดล็อกเบาๆ</div>
          </div>
          <button class="ios-switch ${state.soundEnabled ? "on" : ""}" id="soundToggle" role="switch" aria-checked="${state.soundEnabled}" aria-label="เปิดปิดเสียงเอฟเฟค"></button>
        </div>
        <div class="settings-row" style="display:block">
          <strong>สีหลักของแอป</strong>
          <div class="swatch-row">
            ${ACCENTS.map(
              (a) => `<button class="swatch-btn ${state.accent === a.hex ? "active" : ""}" data-accent="${a.hex}" style="background:${a.hex}" title="${a.label}" aria-label="${a.label}"></button>`
            ).join("")}
          </div>
        </div>
      </div>

      ${adminHtml}

      <div class="info-card">
        <div class="settings-row">
          <div>
            <strong>อัปเดตแอป (OTA)</strong>
            <div class="info-meta" style="margin:0">เวอร์ชันปัจจุบัน v${config.appVersion || "1.1.0"} • อัปเดตได้ทันทีโดยไม่ต้องลบลงใหม่</div>
          </div>
        </div>
        <button class="btn-primary" id="checkUpdateBtn">ตรวจหาอัปเดตล่าสุด</button>
        <button class="btn-secondary" id="replaySplashBtn">เล่นแอนิเมชันเปิดแอปอีกครั้ง</button>
        <button class="btn-danger" id="logoutBtn">ออกจากระบบ / เปลี่ยนผู้ใช้งาน</button>
      </div>`;
  }

  // --- Notification Balloon Popover & iPhone Home Screen Red Badge ---
  function getUnreadAnnouncements() {
    return state.announcements.filter((a) => !state.readNewsIds.has(a.id));
  }

  function syncNotificationBadges() {
    const unreadCount = getUnreadAnnouncements().length;
    if (els.bellBadge) {
      if (unreadCount > 0) {
        els.bellBadge.textContent = unreadCount > 9 ? "9+" : String(unreadCount);
        els.bellBadge.classList.remove("hidden");
      } else {
        els.bellBadge.classList.add("hidden");
      }
    }
    // Sync real red number badge on iPhone / Android Home Screen App Icon (iOS 16.4+)
    try {
      if (navigator.setAppBadge) {
        if (unreadCount > 0) navigator.setAppBadge(unreadCount).catch(() => {});
        else if (navigator.clearAppBadge) navigator.clearAppBadge().catch(() => {});
      }
    } catch (_) {}
  }

  function renderNotifBalloon() {
    if (!els.balloonList) return;
    if (state.announcements.length === 0) {
      els.balloonList.innerHTML = `<div style="text-align:center;padding:22px 10px;font-size:12.5px;color:var(--ios-secondary)">ไม่มีการแจ้งเตือนใหม่</div>`;
      return;
    }
    els.balloonList.innerHTML = state.announcements
      .slice(0, 8)
      .map((a) => {
        const isUnread = !state.readNewsIds.has(a.id);
        return `
          <button type="button" class="balloon-item ${isUnread ? "unread" : ""}" data-balloon-id="${a.id}">
            ${isUnread ? '<span class="balloon-unread-dot"></span>' : '<span style="width:8px;flex-shrink:0"></span>'}
            <div class="balloon-item-body">
              <strong>${a.urgent ? "🚨 " : ""}${a.title}</strong>
              <span>${a.date} • ${a.body}</span>
            </div>
          </button>`;
      })
      .join("");
  }

  function toggleNotifBalloon(forceClose = false) {
    state.balloonOpen = forceClose ? false : !state.balloonOpen;
    if (state.balloonOpen) {
      renderNotifBalloon();
      els.notifBalloon.classList.remove("hidden");
    } else {
      els.notifBalloon.classList.add("hidden");
    }
  }

  function markAllAnnouncementsRead() {
    haptic();
    playSound("success");
    state.announcements.forEach((a) => state.readNewsIds.add(a.id));
    try { localStorage.setItem(STORAGE_READ_NEWS, JSON.stringify([...state.readNewsIds])); } catch (_) {}
    syncNotificationBadges();
    renderNotifBalloon();
    notifyIsland("อ่านการแจ้งเตือนทั้งหมดแล้ว");
    setTimeout(() => toggleNotifBalloon(true), 220);
  }

  function render() {
    els.schoolName.textContent = config.schoolName;
    els.schoolSubtitle.textContent = config.schoolSubtitle;
    if (config.logoUrl && els.schoolLogo) els.schoolLogo.src = config.logoUrl;

    const u = state.currentUser;
    els.userChipLabel.textContent = u ? u.shortName : "เข้าสู่ระบบ";
    els.userChipBtn.classList.toggle("director", u && canAccessExecutive(u.role));
    els.searchClear.style.display = state.query ? "block" : "none";
    syncNotificationBadges();
    if (state.balloonOpen) renderNotifBalloon();

    els.tabItems.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === state.tab);
    });

    if (state.tab === "home") renderHome();
    else if (state.tab === "favorites") renderFavorites();
    else if (state.tab === "announcements") renderAnnouncements();
    else renderSettings();
  }

  els.main.addEventListener("click", (e) => {
    const favBtn = e.target.closest("[data-fav]");
    if (favBtn) { toggleFavorite(favBtn.dataset.fav, e); return; }

    const divBtn = e.target.closest("[data-div]");
    if (divBtn) { haptic(); state.division = divBtn.dataset.div; render(); return; }

    const openEl = e.target.closest("[data-open]");
    if (openEl) {
      if (state.jiggleMode) {
        toggleFavorite(openEl.dataset.open, e);
        playSound("tap");
        return;
      }
      const sys = state.systems.find((s) => s.id === openEl.dataset.open);
      if (sys) { playSound("tap"); openSystem(sys); }
      return;
    }

    if (e.target.id === "toggleJiggleBtn") {
      haptic();
      playSound("tap");
      state.jiggleMode = !state.jiggleMode;
      if (state.jiggleMode) notifyIsland("แตะไอคอนเพื่อปักหมุด / ถอดหมุดใช้บ่อย");
      render();
      return;
    }

    const staffBtn = e.target.closest("[data-staff-id]");
    if (staffBtn) { openStaffSheet(staffBtn.dataset.staffId); return; }

    if (e.target.id === "jumpCalBtn") {
      haptic();
      playSound("tap");
      const anchor = document.getElementById("calAnchor");
      if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (e.target.id === "jumpUrgentBtn") {
      haptic();
      playSound("tap");
      state.tab = "announcements";
      state.newsSubTab = "school";
      render();
      return;
    }

    if (e.target.id === "soundToggle") {
      haptic();
      state.soundEnabled = !state.soundEnabled;
      try { localStorage.setItem(STORAGE_SOUND, state.soundEnabled ? "on" : "off"); } catch (_) {}
      if (state.soundEnabled) playSound("success");
      notifyIsland(state.soundEnabled ? "เปิดเสียงเอฟเฟคแล้ว" : "ปิดเสียงเอฟเฟคแล้ว");
      render();
      return;
    }

    if (e.target.id === "darkModeToggle") {
      haptic();
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
      notifyIsland(state.theme === "dark" ? "เปิดโหมดมืดแล้ว" : "เปิดโหมดสว่างแล้ว");
      render();
      return;
    }

    const accentBtn = e.target.closest("[data-accent]");
    if (accentBtn) {
      haptic();
      state.accent = accentBtn.dataset.accent;
      applyTheme();
      notifyIsland("เปลี่ยนสีหลักของแอปแล้ว");
      render();
      return;
    }

    if (e.target.id === "calPrevBtn") {
      haptic();
      state.calMonth -= 1;
      if (state.calMonth < 0) { state.calMonth = 11; state.calYear -= 1; }
      render();
      return;
    }
    if (e.target.id === "calNextBtn") {
      haptic();
      state.calMonth += 1;
      if (state.calMonth > 11) { state.calMonth = 0; state.calYear += 1; }
      render();
      return;
    }
    if (e.target.id === "calAddBtn") { openCalendarEventSheet(null); return; }
    const calDayBtn = e.target.closest("[data-cal-day]");
    if (calDayBtn) {
      haptic();
      state.calSelectedDate = calDayBtn.dataset.calDay;
      render();
      return;
    }
    const calEvtBtn = e.target.closest("[data-cal-evt]");
    if (calEvtBtn) { openCalendarEventDetail(calEvtBtn.dataset.calEvt); return; }

    if (e.target.id === "editSelfProfileBtn") { openSelfProfileSheet(); return; }
    if (e.target.id === "adminAddUserBtn") { openAdminUserSheet(null); return; }

    const admUsrEdit = e.target.closest("[data-adm-usr-edit]");
    if (admUsrEdit && isAdminUser(state.currentUser)) {
      const target = state.users.find((x) => x.id === admUsrEdit.dataset.admUsrEdit);
      if (target) openAdminUserSheet(target);
      return;
    }
    const admUsrDel = e.target.closest("[data-adm-usr-del]");
    if (admUsrDel && isAdminUser(state.currentUser)) {
      const id = admUsrDel.dataset.admUsrDel;
      if (id === "thanakarin") return;
      state.users = state.users.filter((x) => x.id !== id);
      try { localStorage.setItem(STORAGE_USERS, JSON.stringify(state.users)); } catch (_) {}
      postToBackend({ action: "delete_user", id });
      notifyIsland("ลบผู้ใช้งานแล้ว");
      render();
      return;
    }

    if (e.target.id === "enablePushBtn") { enablePushNotifications(); return; }
    if (e.target.id === "openBroadcastBtn") { openBroadcastNewsSheet(); return; }
    if (e.target.id === "refreshNewsBtn") { loadLiveNews(true); notifyIsland("กำลังดึงข่าวล่าสุด..."); return; }

    const newsTabBtn = e.target.closest("[data-newstab]");
    if (newsTabBtn) {
      haptic();
      state.newsSubTab = newsTabBtn.dataset.newstab;
      render();
      return;
    }

    const newsEditBtn = e.target.closest("[data-news-edit]");
    if (newsEditBtn) {
      const target = state.announcements.find((a) => a.id === newsEditBtn.dataset.newsEdit);
      if (target && canManageNews(state.currentUser, target)) openBroadcastNewsSheet(target);
      return;
    }

    const newsDelBtn = e.target.closest("[data-news-del]");
    if (newsDelBtn) {
      deleteNewsItem(newsDelBtn.dataset.newsDel);
      return;
    }

    const imgPreview = e.target.closest("[data-img-preview]");
    if (imgPreview) {
      const target = state.announcements.find((a) => a.id === imgPreview.dataset.imgPreview);
      if (target && target.image) openImagePreviewSheet(target.image, target.title);
      return;
    }

    const obecCard = e.target.closest("[data-obec-idx]");
    if (obecCard) {
      openObecReaderSheet(Number(obecCard.dataset.obecIdx));
      return;
    }

    if (e.target.id === "checkUpdateBtn") { checkForAppUpdate(); return; }
    if (e.target.id === "adminAddSysBtn") { openAdminSystemSheet(null); return; }

    const editBtn = e.target.closest("[data-adm-edit]");
    if (editBtn && isAdminUser(state.currentUser)) {
      const target = state.systems.find((s) => s.id === editBtn.dataset.admEdit);
      if (target) openAdminSystemSheet(target);
      return;
    }

    const delBtn = e.target.closest("[data-adm-del]");
    if (delBtn && isAdminUser(state.currentUser)) {
      state.systems = state.systems.filter((s) => s.id !== delBtn.dataset.admDel);
      localStorage.setItem(STORAGE_OVERRIDE, JSON.stringify(state.systems));
      notifyIsland("ลบระบบงานแล้ว");
      render();
      return;
    }

    if (e.target.id === "saveRemoteUrlBtn" && isAdminUser(state.currentUser)) {
      const input = document.getElementById("remoteUrlInput");
      const newsIn = document.getElementById("newsApiInput");
      const osIn = document.getElementById("oneSignalInput");
      state.remoteConfigUrl = input ? input.value.trim() : "";
      state.newsBackendUrl = newsIn ? newsIn.value.trim() : "";
      state.oneSignalAppId = osIn ? osIn.value.trim() : "";
      localStorage.setItem(STORAGE_REMOTE, state.remoteConfigUrl);
      localStorage.setItem(STORAGE_NEWS_API, state.newsBackendUrl);
      localStorage.setItem(STORAGE_ONESIGNAL, state.oneSignalAppId);
      initOneSignal();
      if (state.newsBackendUrl) loadLiveNews(true);
      if (state.remoteConfigUrl) syncRemoteConfig(false);
      else notifyIsland("บันทึกการเชื่อมต่อคลาวด์แล้ว");
      return;
    }

    if (e.target.id === "exportConfigBtn" && isAdminUser(state.currentUser)) {
      exportConfigForGithub();
      return;
    }

    if (e.target.id === "logoutBtn") {
      haptic();
      state.currentUser = null;
      state.tab = "home";
      try { localStorage.removeItem(STORAGE_USER); } catch (_) {}
      notifyIsland("ออกจากระบบแล้ว");
      showLoginScreen();
      return;
    }
    if (e.target.id === "replaySplashBtn") {
      haptic();
      playSplashThenLogin();
      return;
    }
  });

  // Long-press any icon card for 450ms to enter iOS Jiggle Mode
  let longPressTimer = null;
  els.main.addEventListener("pointerdown", (e) => {
    const card = e.target.closest(".grid-card");
    if (!card || state.jiggleMode) return;
    clearTimeout(longPressTimer);
    longPressTimer = setTimeout(() => {
      haptic();
      playSound("tap");
      state.jiggleMode = true;
      notifyIsland("โหมดจัดหมุด: แตะไอคอนเพื่อปักหมุด/ถอดหมุด");
      render();
    }, 450);
  });
  ["pointerup", "pointercancel", "pointermove"].forEach((evt) => {
    els.main.addEventListener(evt, () => clearTimeout(longPressTimer));
  });

  els.userChipBtn.addEventListener("click", () => {
    haptic();
    state.tab = "settings";
    render();
  });

  els.bellBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    haptic();
    playSound("tap");
    toggleNotifBalloon();
  });

  if (els.markAllReadBtn) {
    els.markAllReadBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      markAllAnnouncementsRead();
    });
  }

  if (els.balloonList) {
    els.balloonList.addEventListener("click", (e) => {
      const item = e.target.closest("[data-balloon-id]");
      if (!item) return;
      haptic();
      playSound("tap");
      state.readNewsIds.add(item.dataset.balloonId);
      try { localStorage.setItem(STORAGE_READ_NEWS, JSON.stringify([...state.readNewsIds])); } catch (_) {}
      toggleNotifBalloon(true);
      state.tab = "announcements";
      state.newsSubTab = "school";
      render();
    });
  }

  document.addEventListener("click", (e) => {
    if (state.balloonOpen && !e.target.closest("#notifBalloon") && !e.target.closest("#bellBtn")) {
      toggleNotifBalloon(true);
    }
  });

  els.searchInput.addEventListener("input", (e) => {
    state.query = e.target.value;
    if (state.tab !== "home" && state.tab !== "favorites") state.tab = "home";
    render();
  });

  els.searchClear.addEventListener("click", () => {
    state.query = "";
    els.searchInput.value = "";
    render();
  });

  els.tabItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      haptic();
      state.tab = btn.dataset.tab;
      render();
    });
  });

  // Use unified OneSignalSDKWorker.js (registered by OneSignal.init) to avoid SW scope collision
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((reg) => { state.swReg = reg; }).catch(() => {});
  }

  initOneSignal();
  syncRemoteConfig(true);
  loadLiveNews(false);
  playSplashThenLogin();
})();
