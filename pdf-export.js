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

  async exportOrShare(htmlContent, fileName, { shareToAdmin = false, onStatus } = {}) {
    const notify = (m) => { if (typeof onStatus === "function") onStatus(m); };
    notify("กำลังสร้างไฟล์ PDF (A4)...");

    // Create hidden off-screen A4 render container with exact print styling
    const host = document.createElement("div");
    host.style.cssText = "position:fixed;left:-9999px;top:0;width:794px;background:#fff;color:#000;padding:34px 44px;font-family:'TH Sarabun New','Sarabun','Noto Sans Thai',sans-serif;font-size:15pt;line-height:1.42;z-index:-1;";
    host.innerHTML = htmlContent;
    document.body.appendChild(host);

    try {
      const html2pdf = await this.ensureLib();
      // Wait briefly for fonts & images (e.g. garuda.svg / school-logo.png)
      await new Promise((r) => setTimeout(r, 260));

      const worker = html2pdf().set({
        margin: [8, 8, 8, 8],
        filename: fileName,
        image: { type: "jpeg", quality: 0.96 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      }).from(host);

      const blob = await worker.outputPdf("blob");
      const pdfFile = new File([blob], fileName, { type: "application/pdf" });

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
      notify("ไม่สามารถสร้าง PDF อัตโนมัติได้ กำลังเปิดหน้าต่างปริ้น/บันทึก PDF แทน...");
      window.print();
    } finally {
      host.remove();
    }
  }
};
