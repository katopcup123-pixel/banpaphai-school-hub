(() => {
  const STORAGE_FAVS = "school_nav_favorites_v1";
  const STORAGE_USER = "school_nav_user_v1";

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
    module.exports = { filterSystems, authenticateUser, canAccessExecutive };
    return;
  }

  const config = window.SCHOOL_CONFIG;
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
    systems: [...config.systems],
    deferredInstallPrompt: null
  };

  const els = {
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
    quickDemoPin: document.getElementById("quickDemoPin"),
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
    sheetBody: document.getElementById("sheetBody")
  };

  function haptic() {
    if (navigator.vibrate) navigator.vibrate(10);
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

  // Prevent iOS Safari pinch-zoom and double-tap zoom for native app feel
  document.addEventListener("gesturestart", (e) => e.preventDefault(), { passive: false });
  let lastTouchEnd = 0;
  document.addEventListener("touchend", (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  }, { passive: false });

  // --- Splash & Auth Flow ---
  function renderUserList() {
    els.userList.innerHTML = config.users
      .map(
        (u, i) => `
        <button type="button" class="user-row" style="animation-delay:${i * 45}ms" data-user="${u.id}">
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
      }, 460);
      return;
    }

    // Success: Play iOS Face ID / Unlock Checkmark Animation
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
    }, 1150);
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
      setTimeout(() => els.splash.classList.add("hidden"), 560);
    }, 1900);
  }

  els.userList.addEventListener("click", (e) => {
    const row = e.target.closest("[data-user]");
    if (!row) return;
    const user = config.users.find((u) => u.id === row.dataset.user);
    if (user) openPinPad(user);
  });

  els.pinBackBtn.addEventListener("click", backToUserList);

  els.iosKeypad.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-key]");
    if (!btn) return;
    haptic();
    const key = btn.dataset.key;
    if (key === "del") {
      state.pinBuffer = state.pinBuffer.slice(0, -1);
      updatePinDots(false);
      return;
    }
    if (state.pinBuffer.length >= 4) return;
    state.pinBuffer += key;
    updatePinDots(false);
    if (state.pinBuffer.length === 4) {
      setTimeout(submitPin, 140);
    }
  });

  els.quickDemoPin.addEventListener("click", () => {
    if (!state.selectedUser) return;
    haptic();
    state.pinBuffer = String(state.selectedUser.pin || "1234");
    updatePinDots(false);
    setTimeout(submitPin, 160);
  });

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
            ? "ตอนนี้เป็นลิงก์ตัวอย่าง — นำลิงก์ Google Apps Script จริงของโรงเรียนไปวางในไฟล์ <strong>apps-config.js</strong> เพื่อเปิดใช้งานทันที"
            : `พร้อมเปิดระบบ Google Apps Script ปลายทาง:<br>${sys.url}`
        }
      </div>
      <button class="btn-primary" id="sheetLaunchBtn">${isDemo ? "ทดลองเปิด (รอใส่ลิงก์ GAS จริง)" : "เปิดระบบงานทันที"}</button>
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

  function openSystem(sys) {
    const isDemo = !sys.url || sys.url.includes("REPLACE_WITH_");
    if (isDemo) {
      openSheet(sys);
      return;
    }
    notifyIsland(`กำลังเปิด ${sys.shortName}`);
    window.open(sys.url, "_blank", "noopener,noreferrer");
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
              <div class="grid-card" style="animation-delay:${i * 28}ms" data-open="${s.id}" role="button" tabindex="0">
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
                <div class="list-card" style="animation-delay:${i * 30}ms" data-open="${s.id}" role="button" tabindex="0">
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
        <span>เชื่อมต่อ Google Workspace / Apps Script</span>
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
                  <div class="list-card" style="animation-delay:${i * 30}ms" data-open="${s.id}">
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
    els.main.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">ประกาศจากโรงเรียน</h2>
        <span class="section-sub">${config.announcements.length} รายการ</span>
      </div>
      ${config.announcements
        .map(
          (a, i) => `
          <div class="info-card ${a.urgent ? "urgent" : ""}" style="animation-delay:${i * 35}ms">
            <h3>${a.title}</h3>
            <div class="info-meta">${a.date}</div>
            <p>${a.body}</p>
          </div>`
        )
        .join("")}`;
  }

  function renderSettings() {
    const u = state.currentUser;
    els.main.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">บัญชีผู้ใช้งานและการตั้งค่า</h2>
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
            <strong>ติดตั้งบน iPhone (iOS)</strong>
            <div class="info-meta">เปิดใน Safari → แตะแชร์ → "เพิ่มไปยังหน้าจอโฮม" หรือใช้ไฟล์ .mobileconfig</div>
          </div>
        </div>
        <div class="settings-row">
          <div>
            <strong>ติดตั้งบน Android (.apk)</strong>
            <div class="info-meta">กดติดตั้งจาก Chrome หรือแพ็กเป็นไฟล์ .apk ผ่าน PWABuilder</div>
          </div>
        </div>
        ${
          state.deferredInstallPrompt
            ? '<button class="btn-primary" id="installPwaBtn">ติดตั้งแอปลงเครื่องนี้</button>'
            : ""
        }
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
    if (e.target.id === "installPwaBtn" && state.deferredInstallPrompt) {
      state.deferredInstallPrompt.prompt();
      state.deferredInstallPrompt = null;
      render();
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

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    state.deferredInstallPrompt = e;
    if (state.tab === "settings") render();
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  // Always start with the animated Splash -> iOS Login flow
  playSplashThenLogin();
})();
