(() => {
  const STORAGE_FAVS = "bpp_connect_favorites_v1";
  const STORAGE_USER = "bpp_connect_user_v1";
  const STORAGE_THEME = "bpp_connect_theme_v1";
  const STORAGE_ACCENT = "bpp_connect_accent_v1";
  const STORAGE_OVERRIDE = "bpp_connect_systems_override_v1";
  const STORAGE_REMOTE = "bpp_connect_remote_url_v1";
  const STORAGE_NEWS_API = "bpp_connect_news_api_v1";
  const STORAGE_ONESIGNAL = "bpp_connect_onesignal_id_v1";
  const STORAGE_LOCAL_NEWS = "bpp_connect_local_news_v1";

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
    graduationCap: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'
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

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { filterSystems, authenticateUser, canAccessExecutive, isAdminUser };
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

  const state = {
    tab: "home",
    division: "all",
    query: "",
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
    appScroll: document.getElementById("appScroll"),
    iosTabBar: document.getElementById("iosTabBar"),
    schoolLogo: document.getElementById("schoolLogo"),
    schoolName: document.getElementById("schoolName"),
    schoolSubtitle: document.getElementById("schoolSubtitle"),
    userChipBtn: document.getElementById("userChipBtn"),
    userChipLabel: document.getElementById("userChipLabel"),
    bellBtn: document.getElementById("bellBtn"),
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
    els.userList.innerHTML = config.users
      .map(
        (u, i) => `
        <button type="button" class="user-row" style="animation-delay:${i * 40}ms" data-user="${u.id}">
          <div class="user-avatar c-${u.color}">${getInitial(u)}</div>
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
      <div class="user-avatar c-${user.color}">${getInitial(user)}</div>
      <h3>${user.name}</h3>
      <p>${user.position}</p>
    `;
    els.pinHint.textContent = "กรอกรหัส PIN 4 หลัก (เริ่มต้น: 1234)";
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
    const res = authenticateUser(config.users, state.selectedUser.id, state.pinBuffer);
    if (!res.ok) {
      updatePinDots(true);
      els.pinHint.textContent = "รหัส PIN ไม่ถูกต้อง ลองอีกครั้ง (เริ่มต้น: 1234)";
      notifyIsland("รหัสผ่านไม่ถูกต้อง");
      setTimeout(() => {
        state.pinBuffer = "";
        updatePinDots(false);
      }, 420);
      return;
    }

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
      els.appScroll.classList.remove("hidden");
      els.iosTabBar.classList.remove("hidden");
      els.appScroll.classList.remove("app-reveal");
      void els.appScroll.offsetWidth;
      els.appScroll.classList.add("app-reveal");
    }, 1050);
  }

  function showLoginScreen() {
    renderUserList();
    state.selectedUser = null;
    state.pinBuffer = "";
    els.loginViewPin.classList.add("hidden");
    els.loginViewList.classList.remove("hidden");
    els.appScroll.classList.add("hidden");
    els.iosTabBar.classList.add("hidden");
    els.login.classList.remove("hidden");
  }

  function playSplashThenLogin() {
    els.appScroll.classList.add("hidden");
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
    const user = config.users.find((u) => u.id === row.dataset.user);
    if (user) openPinPad(user);
  });

  els.pinBackBtn.addEventListener("click", backToUserList);

  // Instant 0ms keypad response on pointerdown (no 300ms iOS click lag or missed taps)
  els.iosKeypad.addEventListener("pointerdown", (e) => {
    const btn = e.target.closest("[data-key]");
    if (!btn) return;
    e.preventDefault();
    haptic();
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

  // --- Real Push Notifications (OneSignal Web SDK v16 + Browser Notification API) ---
  function initOneSignal() {
    const appId = (state.oneSignalAppId || "").trim();
    if (!appId) return;
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function (OneSignal) {
      try {
        await OneSignal.init({
          appId,
          allowLocalhostAsSecureOrigin: true,
          serviceWorkerPath: "./OneSignalSDKWorker.js"
        });
      } catch (_) {}
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
      window.OneSignalDeferred.push(async function (OneSignal) {
        try {
          await OneSignal.Notifications.requestPermission();
          notifyIsland("เปิดรับแจ้งเตือน Push เรียบร้อยแล้ว");
          render();
        } catch (_) {
          notifyIsland("ไม่สามารถเปิดแจ้งเตือนได้");
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
          if (Array.isArray(data.obecNews)) state.obecNews = data.obecNews;
          state.obecLoading = false;
          if (state.tab === "announcements") render();
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
        state.obecNews = data.items.slice(0, 12).map((it) => ({
          title: it.title || "",
          link: it.link || "https://www.obec.go.th",
          pubDate: (it.pubDate || "").split(" ")[0],
          summary: String(it.description || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 140)
        }));
      }
    } catch (_) {}

    state.obecLoading = false;
    if (state.tab === "announcements") render();
  }

  function openBroadcastNewsSheet() {
    haptic();
    const u = state.currentUser;
    els.sheetBody.innerHTML = `
      <h3 style="margin:0 0 6px">แจ้งข่าวถึงครูและ ผอ. ทุกคน</h3>
      <div class="info-meta">ผู้แจ้ง: ${u ? `${u.name} (${u.position})` : "บุคลากรโรงเรียน"}</div>
      <input class="admin-input" id="bcTitle" placeholder="หัวข้อข่าว / ประกาศด่วน" />
      <textarea class="admin-input" id="bcBody" rows="3" placeholder="รายละเอียดข่าวที่ต้องการแจ้งทุกคน..."></textarea>
      <label style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13px">
        <input type="checkbox" id="bcUrgent" /> ระบุเป็นข่าวด่วน (แถบสีแดง)
      </label>
      <button class="btn-primary" id="bcSendBtn">ส่งข่าวและแจ้งเตือนทุกเครื่อง</button>
      <button class="btn-secondary" id="bcCancelBtn">ยกเลิก</button>
    `;
    els.sheetBackdrop.classList.add("open");

    document.getElementById("bcCancelBtn").onclick = closeSheet;
    document.getElementById("bcSendBtn").onclick = async () => {
      const title = document.getElementById("bcTitle").value.trim();
      const body = document.getElementById("bcBody").value.trim();
      const urgent = document.getElementById("bcUrgent").checked;
      if (!title || !body) { notifyIsland("กรุณากรอกหัวข้อและรายละเอียด"); return; }

      const nowStr = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
      const newItem = {
        id: "news-" + Date.now(),
        title,
        body,
        date: `วันนี้ ${nowStr} • ${u ? u.shortName : "ครู"}`,
        author: u ? u.name : "",
        position: u ? u.position : "",
        urgent
      };

      state.announcements = [newItem, ...state.announcements];
      try { localStorage.setItem(STORAGE_LOCAL_NEWS, JSON.stringify(state.announcements)); } catch (_) {}
      closeSheet();
      render();

      const apiUrl = (state.newsBackendUrl || "").trim();
      if (apiUrl) {
        notifyIsland("กำลังส่งแจ้งเตือนไปทุกเครื่อง...");
        try {
          await fetch(apiUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
              title,
              body,
              author: u ? u.name : "บุคลากรโรงเรียนบ้านป่าไผ่",
              position: u ? u.position : "",
              urgent
            })
          });
          notifyIsland("ส่งข่าวและแจ้งเตือนทุกเครื่องแล้ว!");
        } catch (_) {
          notifyIsland("บันทึกในเครื่องแล้ว (ส่งคลาวด์ไม่สำเร็จ)");
        }
      } else {
        notifyIsland("โพสต์ข่าวแล้ว (เชื่อม GAS+OneSignal เพื่อเด้งทุกเครื่อง)");
        if ("Notification" in window && Notification.permission === "granted" && state.swReg && state.swReg.showNotification) {
          state.swReg.showNotification((urgent ? "🚨 " : "📢 ") + title, {
            body: `${body} — โดย ${u ? u.shortName : "ครู"}`,
            icon: "./icons/school-logo.png"
          });
        }
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
  function openInAppViewer(sys) {
    haptic();
    activeInAppUrl = sys.url;
    els.inAppTitle.textContent = sys.name;
    els.inAppLoading.classList.remove("done");
    els.inAppFrame.src = sys.url;
    els.inAppOverlay.classList.remove("hidden");
    requestAnimationFrame(() => els.inAppOverlay.classList.add("open"));
    notifyIsland(`เปิด ${sys.shortName} ในแอป`);
  }

  function closeInAppViewer() {
    haptic();
    els.inAppOverlay.classList.remove("open");
    setTimeout(() => {
      els.inAppOverlay.classList.add("hidden");
      els.inAppFrame.src = "about:blank";
      activeInAppUrl = "";
    }, 340);
  }

  els.inAppFrame.addEventListener("load", () => {
    if (activeInAppUrl) els.inAppLoading.classList.add("done");
  });
  els.inAppBackBtn.addEventListener("click", closeInAppViewer);
  els.inAppReloadBtn.addEventListener("click", () => {
    if (!activeInAppUrl) return;
    haptic();
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
          <span class="section-sub">${visible.length} ระบบ</span>
        </div>
        <div class="apps-grid">
          ${visible
            .map(
              (s, i) => `
              <div class="grid-card" style="animation-delay:${i * 24}ms" data-open="${s.id}" role="button" tabindex="0">
                ${s.directorOnly ? '<span class="director-tag">ผู้บริหาร</span>' : ""}
                <div class="squircle squircle-lg c-${s.color}">
                  ${iconSvg(s.icon, 27)}
                </div>
                <span class="icon-label">${s.shortName}</span>
              </div>`
            )
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

    els.main.innerHTML = `
      ${pinnedHtml}
      ${filtersHtml}
      ${bodyHtml}
      <div class="gas-badge">
        <span>BPP Connect v${config.appVersion || "1.1.0"} • Google Workspace</span>
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
              ? '<div class="empty-state">ไม่สามารถดึงข่าว สพฐ. ได้ชั่วคราว กดปุ่มโหลดใหม่หรือเปิดเว็บ สพฐ. โดยตรง</div>'
              : state.obecNews
                  .map(
                    (n, i) => `
                    <div class="info-card obec-card" style="animation-delay:${i * 25}ms" data-obec-url="${n.link}" data-obec-title="${n.title.replace(/"/g, "&quot;")}">
                      <div class="info-meta"><span class="obec-badge">สพฐ.</span>${n.pubDate || "ข่าวล่าสุด"}</div>
                      <h3>${n.title}</h3>
                      ${n.summary ? `<p>${n.summary}...</p>` : ""}
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

    const notifStatus =
      "Notification" in window
        ? Notification.permission === "granted"
          ? "เปิดรับแจ้งเตือนแล้ว"
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
          ? `<div class="info-card profile-card">
              <div class="user-avatar c-${u.color}">${getInitial(u)}</div>
              <div>
                <h3>${u.name}</h3>
                <div class="info-meta" style="margin:0">${u.position}</div>
              </div>
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

  function render() {
    els.schoolName.textContent = config.schoolName;
    els.schoolSubtitle.textContent = config.schoolSubtitle;
    if (config.logoUrl && els.schoolLogo) els.schoolLogo.src = config.logoUrl;

    const u = state.currentUser;
    els.userChipLabel.textContent = u ? u.shortName : "เข้าสู่ระบบ";
    els.userChipBtn.classList.toggle("director", u && canAccessExecutive(u.role));
    els.searchClear.style.display = state.query ? "block" : "none";

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
      const sys = state.systems.find((s) => s.id === openEl.dataset.open);
      if (sys) openSystem(sys);
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

    const obecCard = e.target.closest("[data-obec-url]");
    if (obecCard) {
      openInAppViewer({
        name: obecCard.dataset.obecTitle || "ข่าวการศึกษา สพฐ.",
        shortName: "ข่าว สพฐ.",
        url: obecCard.dataset.obecUrl
      });
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

  els.userChipBtn.addEventListener("click", () => {
    haptic();
    state.tab = "settings";
    render();
  });

  els.bellBtn.addEventListener("click", () => {
    haptic();
    state.tab = "announcements";
    render();
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

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").then((reg) => {
      state.swReg = reg;
    }).catch(() => {});
  }

  initOneSignal();
  syncRemoteConfig(true);
  loadLiveNews(false);
  playSplashThenLogin();
})();
