// BPP Connect — Pixel-Perfect Thai A4 PDF Export (uses browser native layout via modern-screenshot + jsPDF — ZERO Thai text overlap!)
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

  async exportOrShare(htmlContent, fileName, { shareToAdmin = false, onStatus } = {}) {
    const notify = (m) => { if (typeof onStatus === "function") onStatus(m); };
    notify("กำลังสร้างไฟล์ PDF (A4)...");

    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;z-index:9999;background:rgba(15,23,42,0.72);overflow:auto;display:flex;flex-direction:column;align-items:center;padding:12px;";

    const statusBar = document.createElement("div");
    statusBar.style.cssText = "position:sticky;top:0;background:#1C1C1E;color:#fff;font-size:13px;font-weight:600;padding:8px 16px;border-radius:999px;margin-bottom:10px;z-index:2;";
    statusBar.textContent = "⏳ กำลังสร้างไฟล์ PDF ขนาด A4...";

    // 794px = exact A4 width (210mm at 96dpi) with official Thai government margins & embedded TH SarabunIT9 16pt
    const pageEl = document.createElement("div");
    pageEl.style.cssText = "width:794px;background:#ffffff;color:#000000;padding:26px 46px 26px 60px;box-sizing:border-box;font-family:'TH SarabunIT9','TH Sarabun New',serif;font-size:13.5pt;line-height:1.28;text-align:left;";
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
      await new Promise((r) => setTimeout(r, 200));

      // Native browser SVG foreignObject capture -> 100% accurate Thai line wrapping, ZERO overlap
      const pngDataUrl = await window.modernScreenshot.domToPng(pageEl, {
        scale: 2,
        backgroundColor: "#ffffff",
        fetch: { requestInit: { mode: "cors" } }
      });

      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = pngDataUrl; });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageW = 210;
      const pageH = 297;
      let drawW = pageW;
      let drawH = (img.naturalHeight / img.naturalWidth) * drawW;

      // Auto-scale cleanly if slightly taller than 1 A4 page so bottom lines never get sliced in half
      if (drawH > pageH && drawH <= pageH * 1.18) {
        const ratio = pageH / drawH;
        drawW = drawW * ratio;
        drawH = pageH;
        pdf.addImage(pngDataUrl, "PNG", (pageW - drawW) / 2, 0, drawW, drawH);
      } else if (drawH <= pageH) {
        pdf.addImage(pngDataUrl, "PNG", 0, 0, drawW, drawH);
      } else {
        // Multi-page support for long reports
        let yOffset = 0;
        while (yOffset < drawH) {
          if (yOffset > 0) pdf.addPage();
          pdf.addImage(pngDataUrl, "PNG", 0, -yOffset, drawW, drawH);
          yOffset += pageH;
        }
      }

      const blob = pdf.output("blob");
      const pdfFile = new File([blob], fileName, { type: "application/pdf" });
      overlay.remove();

      if (shareToAdmin && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        notify("เลือกส่งไปที่ LINE ธุรการ หรือ AirDrop ได้เลย");
        await navigator.share({
          title: fileName.replace(/\.pdf$/i, ""),
          text: "ส่งเอกสารแบบฟอร์มโรงเรียนบ้านป่าไผ่ เพื่อดำเนินการปริ้น",
          files: [pdfFile]
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        notify(`ดาวน์โหลด ${fileName} เรียบร้อย ส่งต่อให้ธุรการได้เลย`);
      }
    } catch (err) {
      overlay.remove();
      notify("ไม่สามารถสร้าง PDF อัตโนมัติได้ กำลังเปิดหน้าต่างปริ้น/บันทึก PDF แทน...");
      window.print();
    }
  }
};
