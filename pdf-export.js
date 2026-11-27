// BPP Connect — Compact A4 PDF Export with Interactive Pre-Send Preview Modal
window.BPP_PDF = {
  _libsPromise: null,

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("โหลดไลบรารีสร้าง PDF ไม่สำเร็จ"));
      document.head.appendChild(s);
    });
  },

  ensureLibs() {
    if (window.modernScreenshot && window.jspdf) return Promise.resolve();
    if (this._libsPromise) return this._libsPromise;
    this._libsPromise = Promise.all([
      window.modernScreenshot ? Promise.resolve() : this.loadScript("https://cdn.jsdelivr.net/npm/modern-screenshot@4.6.0/dist/index.js"),
      window.jspdf ? Promise.resolve() : this.loadScript("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js")
    ]);
    return this._libsPromise;
  },

  async waitImages(rootEl) {
    const imgs = [...rootEl.querySelectorAll("img")];
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((res) => { img.onload = res; img.onerror = res; setTimeout(res, 1500); });
      })
    );
  },

  showPreviewModal({ previewDataUrl, previewPages, pdfBlob, fileName, shareToAdmin, onStatus }) {
    const notify = (m) => { if (typeof onStatus === "function") onStatus(m); };
    const kb = Math.max(1, Math.round(pdfBlob.size / 1024));
    const sizeLabel = kb >= 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb} KB`;
    const pages = Array.isArray(previewPages) && previewPages.length ? previewPages : [previewDataUrl];
    const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });
    const canNativeShare = Boolean(navigator.canShare && navigator.canShare({ files: [pdfFile] }));

    const modal = document.createElement("div");
    modal.style.cssText = "position:fixed;inset:0;z-index:9999;background:rgba(15,23,42,0.82);backdrop-filter:blur(6px);display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,'Noto Sans Thai',sans-serif;";

    modal.innerHTML = `
      <div style="flex-shrink:0;background:#111827;color:#fff;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;border-bottom:1px solid rgba(255,255,255,0.12)">
        <div style="min-width:0">
          <div style="font-size:14.5px;font-weight:700">ตรวจสอบตัวอย่างเอกสาร PDF (${pages.length} หน้า)</div>
          <div style="font-size:11.5px;color:#9CA3AF;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${fileName} • ขนาด ${sizeLabel}</div>
        </div>
        <button type="button" id="bppPdfCloseTop" style="border:none;background:rgba(255,255,255,0.14);color:#fff;width:32px;height:32px;border-radius:50%;font-size:16px;cursor:pointer;flex-shrink:0">✕</button>
      </div>
      <div style="flex:1;overflow-y:auto;overflow-x:hidden;padding:14px 12px;display:flex;flex-direction:column;align-items:center;gap:14px;-webkit-overflow-scrolling:touch">
        ${pages.map((src, idx) => `
          <div style="width:100%;max-width:680px;text-align:center">
            ${pages.length > 1 ? `<div style="font-size:11px;color:#CBD5E1;margin-bottom:4px">หน้า ${idx + 1} / ${pages.length}</div>` : ""}
            <img src="${src}" alt="หน้า ${idx + 1}" style="width:100%;height:auto;background:#fff;border-radius:6px;box-shadow:0 10px 30px rgba(0,0,0,0.42)" />
          </div>`).join("")}
      </div>
      <div style="flex-shrink:0;background:#111827;padding:12px 14px calc(14px + env(safe-area-inset-bottom));display:flex;gap:8px;flex-wrap:wrap;justify-content:center;border-top:1px solid rgba(255,255,255,0.12)">
        ${shareToAdmin && canNativeShare ? `<button type="button" id="bppPdfShareBtn" style="flex:1;min-width:150px;border:none;background:#007AFF;color:#fff;font:inherit;font-size:13.5px;font-weight:700;padding:11px 14px;border-radius:12px;cursor:pointer">📤 ส่งให้ธุรการ (LINE / แชร์)</button>` : ""}
        <button type="button" id="bppPdfDownloadBtn" style="flex:1;min-width:140px;border:none;background:${shareToAdmin && canNativeShare ? "#16A34A" : "#007AFF"};color:#fff;font:inherit;font-size:13.5px;font-weight:700;padding:11px 14px;border-radius:12px;cursor:pointer">💾 บันทึกไฟล์ PDF (${sizeLabel})</button>
        <button type="button" id="bppPdfCancelBtn" style="border:none;background:rgba(255,255,255,0.14);color:#fff;font:inherit;font-size:13px;font-weight:600;padding:11px 16px;border-radius:12px;cursor:pointer">กลับไปแก้ไข</button>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelector("#bppPdfCloseTop").onclick = closeModal;
    modal.querySelector("#bppPdfCancelBtn").onclick = closeModal;

    const dlBtn = modal.querySelector("#bppPdfDownloadBtn");
    dlBtn.onclick = () => {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      notify(`บันทึก ${fileName} (${sizeLabel}) เรียบร้อย!`);
      closeModal();
    };

    const shBtn = modal.querySelector("#bppPdfShareBtn");
    if (shBtn) {
      shBtn.onclick = async () => {
        try {
          await navigator.share({
            title: fileName.replace(/\.pdf$/i, ""),
            text: "ส่งเอกสารแบบฟอร์มโรงเรียนบ้านป่าไผ่ เพื่อดำเนินการปริ้น",
            files: [pdfFile]
          });
          notify("ส่งเอกสารเรียบร้อย!");
          closeModal();
        } catch (_) {}
      };
    }
  },

  async exportA4({ html, fileName, onStatus } = {}) {
    return this.exportOrShare(html || "", fileName || "document.pdf", { shareToAdmin: true, onStatus });
  },

  async exportMultiPageA4(pagesHtml, fileName, { shareToAdmin = true, onStatus } = {}) {
    const notify = (m) => { if (typeof onStatus === "function") onStatus(m); };
    const list = (Array.isArray(pagesHtml) ? pagesHtml : [pagesHtml]).filter(Boolean);
    if (!list.length) return;

    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;z-index:9998;background:rgba(15,23,42,0.78);overflow:auto;display:flex;flex-direction:column;align-items:center;padding:12px;";
    const statusBar = document.createElement("div");
    statusBar.style.cssText = "position:sticky;top:0;background:#1C1C1E;color:#fff;font-size:13px;font-weight:600;padding:8px 16px;border-radius:999px;margin-bottom:10px;z-index:2;";
    statusBar.textContent = `⏳ กำลังจัดหน้าเอกสาร A4 (0/${list.length} หน้า)...`;
    const hostEl = document.createElement("div");
    hostEl.style.cssText = "width:794px;background:#ffffff;color:#000000;box-sizing:border-box;";
    overlay.appendChild(statusBar);
    overlay.appendChild(hostEl);
    document.body.appendChild(overlay);

    try {
      await this.ensureLibs();
      if (document.fonts) {
        try {
          await Promise.all([
            document.fonts.load('400 16pt "TH SarabunIT9"'),
            document.fonts.load('700 16pt "TH SarabunIT9"')
          ]);
          await document.fonts.ready;
        } catch (_) {}
      }

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
      const previewPages = [];

      for (let i = 0; i < list.length; i++) {
        statusBar.textContent = `⏳ กำลังสร้างเอกสาร A4 หน้า ${i + 1}/${list.length}...`;
        hostEl.innerHTML = `<div style="width:794px;min-height:1123px;background:#ffffff;color:#000000;padding:34px 48px 34px 62px;box-sizing:border-box;font-family:'TH SarabunIT9','TH Sarabun New',serif;font-size:16pt;line-height:1.28;text-align:left;-webkit-text-size-adjust:100%;text-size-adjust:100%;">${list[i]}</div>`;
        await this.waitImages(hostEl);
        await new Promise((r) => setTimeout(r, 80));

        const targetEl = hostEl.firstElementChild;
        const jpegDataUrl = await window.modernScreenshot.domToJpeg(targetEl, {
          scale: 1.4,
          quality: 0.78,
          backgroundColor: "#ffffff",
          fetch: { requestInit: { mode: "cors" } }
        });
        previewPages.push(jpegDataUrl);

        const img = new Image();
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = jpegDataUrl; });
        if (i > 0) pdf.addPage();
        const pageW = 210, pageH = 297;
        let drawW = pageW;
        let drawH = (img.naturalHeight / img.naturalWidth) * drawW;
        if (drawH > pageH) {
          const ratio = pageH / drawH;
          drawW = drawW * ratio;
          drawH = pageH;
        }
        pdf.addImage(jpegDataUrl, "JPEG", (pageW - drawW) / 2, 0, drawW, drawH, undefined, "FAST");
      }

      const pdfBlob = pdf.output("blob");
      overlay.remove();
      this.showPreviewModal({ previewPages, pdfBlob, fileName, shareToAdmin, onStatus });
    } catch (err) {
      overlay.remove();
      notify("สร้าง PDF ไม่สำเร็จ: " + (err && err.message ? err.message : String(err)));
    }
  },

  async exportOrShare(htmlContent, fileName, { shareToAdmin = false, onStatus } = {}) {
    const notify = (m) => { if (typeof onStatus === "function") onStatus(m); };
    notify("กำลังเตรียมตัวอย่าง PDF (A4)...");

    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;z-index:9998;background:rgba(15,23,42,0.72);overflow:auto;display:flex;flex-direction:column;align-items:center;padding:12px;";

    const statusBar = document.createElement("div");
    statusBar.style.cssText = "position:sticky;top:0;background:#1C1C1E;color:#fff;font-size:13px;font-weight:600;padding:8px 16px;border-radius:999px;margin-bottom:10px;z-index:2;";
    statusBar.textContent = "⏳ กำลังสร้างตัวอย่าง PDF ขนาดกะทัดรัด...";

    const pageEl = document.createElement("div");
    pageEl.style.cssText = "width:794px;background:#ffffff;color:#000000;padding:24px 42px 24px 56px;box-sizing:border-box;font-family:'TH SarabunIT9','TH Sarabun New',serif;font-size:16pt;line-height:1.24;text-align:left;-webkit-text-size-adjust:100%;text-size-adjust:100%;";
    pageEl.innerHTML = htmlContent;

    overlay.appendChild(statusBar);
    overlay.appendChild(pageEl);
    document.body.appendChild(overlay);

    try {
      await this.ensureLibs();
      if (document.fonts) {
        try {
          await Promise.all([
            document.fonts.load('400 16pt "TH SarabunIT9"'),
            document.fonts.load('700 16pt "TH SarabunIT9"'),
            document.fonts.load('italic 16pt "TH SarabunIT9"')
          ]);
          await document.fonts.ready;
        } catch (_) {}
      }
      await this.waitImages(pageEl);
      await new Promise((r) => setTimeout(r, 180));

      // Compact JPEG at 1.5x scale (quality 0.80) -> ~85% smaller file size (~150-250 KB) while crisp for laser printing!
      const jpegDataUrl = await window.modernScreenshot.domToJpeg(pageEl, {
        scale: 1.5,
        quality: 0.80,
        backgroundColor: "#ffffff",
        fetch: { requestInit: { mode: "cors" } }
      });

      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = jpegDataUrl; });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
      const pageW = 210;
      const pageH = 297;
      let drawW = pageW;
      let drawH = (img.naturalHeight / img.naturalWidth) * drawW;

      if (drawH > pageH && drawH <= pageH * 1.18) {
        const ratio = pageH / drawH;
        drawW = drawW * ratio;
        drawH = pageH;
        pdf.addImage(jpegDataUrl, "JPEG", (pageW - drawW) / 2, 0, drawW, drawH, undefined, "FAST");
      } else if (drawH <= pageH) {
        pdf.addImage(jpegDataUrl, "JPEG", 0, 0, drawW, drawH, undefined, "FAST");
      } else {
        let yOffset = 0;
        while (yOffset < drawH) {
          if (yOffset > 0) pdf.addPage();
          pdf.addImage(jpegDataUrl, "JPEG", 0, -yOffset, drawW, drawH, undefined, "FAST");
          yOffset += pageH;
        }
      }

      const pdfBlob = pdf.output("blob");
      overlay.remove();

      this.showPreviewModal({ previewDataUrl: jpegDataUrl, pdfBlob, fileName, shareToAdmin, onStatus });
    } catch (err) {
      overlay.remove();
      notify("ไม่สามารถสร้าง PDF อัตโนมัติได้ กำลังเปิดหน้าต่างปริ้น/บันทึก PDF แทน...");
      window.print();
    }
  }
};
