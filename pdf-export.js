// BPP Connect — Shared A4 PDF Export & Share to Admin/LINE Helper
window.BPP_PDF = {
  _loading: null,

  ensureLib() {
    if (window.html2pdf) return Promise.resolve(window.html2pdf);
    if (this._loading) return this._loading;
    this._loading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      s.onload = () => resolve(window.html2pdf);
      s.onerror = () => reject(new Error("โหลดตัวสร้าง PDF ไม่สำเร็จ"));
      document.head.appendChild(s);
    });
    return this._loading;
  },

  async waitImages(rootEl) {
    const imgs = [...rootEl.querySelectorAll("img")];
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((res) => {
          img.onload = res;
          img.onerror = res;
          setTimeout(res, 1500);
        });
      })
    );
  },

  async exportOrShare(htmlContent, fileName, { shareToAdmin = false, onStatus } = {}) {
    const notify = (m) => { if (typeof onStatus === "function") onStatus(m); };
    notify("กำลังสร้างไฟล์ PDF (A4)...");

    // Exact 718px = 190mm at 96dpi -> maps 1:1 onto A4 (210mm) with 10mm margins, zero right-edge clipping
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;z-index:9999;background:rgba(15,23,42,0.72);overflow:auto;display:flex;flex-direction:column;align-items:center;padding:12px;";

    const statusBar = document.createElement("div");
    statusBar.style.cssText = "position:sticky;top:0;background:#1C1C1E;color:#fff;font-size:13px;font-weight:600;padding:8px 16px;border-radius:999px;margin-bottom:10px;z-index:2;";
    statusBar.textContent = "⏳ กำลังสร้างไฟล์ PDF ขนาด A4...";

    const pageEl = document.createElement("div");
    pageEl.style.cssText = "width:718px;background:#ffffff;color:#000000;padding:12px 18px;box-sizing:border-box;font-family:'Sarabun','Noto Sans Thai',sans-serif;font-size:14px;line-height:1.5;box-shadow:0 8px 30px rgba(0,0,0,0.3);text-align:left;";
    pageEl.innerHTML = htmlContent;

    overlay.appendChild(statusBar);
    overlay.appendChild(pageEl);
    document.body.appendChild(overlay);

    try {
      const html2pdf = await this.ensureLib();
      if (document.fonts && document.fonts.ready) {
        try { await document.fonts.ready; } catch (_) {}
      }
      await this.waitImages(pageEl);
      await new Promise((r) => setTimeout(r, 250));

      const worker = html2pdf().set({
        margin: [10, 10, 10, 10],
        filename: fileName,
        image: { type: "jpeg", quality: 0.96 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          width: 718,
          windowWidth: 718,
          scrollX: 0,
          scrollY: 0
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      }).from(pageEl);

      const blob = await worker.outputPdf("blob");
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
