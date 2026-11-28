// ตั้งค่าแอป BPP Connect — โรงเรียนบ้านป่าไผ่ (สพป.นครราชสีมา เขต 4)
window.SCHOOL_CONFIG = {
  appVersion: "3.3.0",
  schoolName: "BPP Connect",
  schoolSubtitle: "โรงเรียนบ้านป่าไผ่ • สพป.นครราชสีมา เขต 4",
  logoUrl: "./icons/school-logo.png",
  // วางลิงก์ GAS หลังบ้านข่าว & แจ้งเตือน (จาก gas-backend.gs) และ OneSignal App ID ที่นี่
  newsBackendUrl: "https://script.google.com/macros/s/AKfycbyY5tXe6nNyZpdb1EWE8taHLgEJU63sYvZ_vmu8MoiNVOgQc26McD-kNoatNLeeGsYbRw/exec",
  albumApiUrl: "https://script.google.com/macros/s/AKfycbxEl6j7WfPhcyO9zoCFSPB4wgTz69PmBT-L02w-XznZOkeQiz6ZfnHfYOnQB8gdXQVo/exec",
  docsApiUrl: "https://script.google.com/macros/s/AKfycbw6uU7AzYqR1TfBkk0TAx41gdXygQy-jxTWw6T9FrbXBGbsD8fsJVt5B_rflh54ObqP/exec",
  oneSignalAppId: "9fa72faa-3c98-4cd9-a1c6-0a39be405861",
  // วางลิงก์ GAS Web App (JSON) หรือลิงก์ JSON สาธารณะ เพื่อให้ทุกเครื่องซิงก์รายการระบบล่าสุดอัตโนมัติ
  remoteConfigUrl: "",

  // รายชื่อผู้ใช้งาน (รหัสผ่านเริ่มต้น 1234 — แก้ pin ของแต่ละคนได้ที่นี่)
  // shortcut: client-side PIN check for school portal demo, move auth to Google OAuth/GAS backend when protecting sensitive data
  users: [
    {
      id: "napaporn",
      name: "นางสาวนภาพร คงแสนคำ",
      shortName: "ผอ.นภาพร",
      position: "ผู้อำนวยการโรงเรียนบ้านป่าไผ่",
      role: "director",
      pin: "1234",
      color: "amber",
      avatar: "./icons/avatar-napaporn.png"
    },
    {
      id: "pacharasaran",
      name: "นายพชรศรัณย์ ทับชม",
      shortName: "ครูพชรศรัณย์",
      position: "หัวหน้ากลุ่มงานวิชาการ",
      role: "head",
      pin: "1234",
      color: "blue",
      avatar: "./icons/avatar-pacharasaran.png"
    },
    {
      id: "thanakarin",
      name: "นายธานครินทร์ สุเมธาลังการ",
      shortName: "ครูธานครินทร์",
      position: "ครู",
      role: "admin",
      pin: "8301",
      color: "indigo",
      avatar: "./icons/avatar-thanakarin.png"
    },
    {
      id: "namphet",
      name: "นางสาวน้ำเพชร ชมประเสริฐ",
      shortName: "ครูน้ำเพชร",
      position: "ครู",
      role: "teacher",
      pin: "1234",
      color: "emerald",
      avatar: "./icons/avatar-namphet.png"
    },
    {
      id: "narisara",
      name: "นางสาวนริศรา พืชผักหวาน",
      shortName: "ครูนริศรา",
      position: "ครูผู้ช่วย",
      role: "teacher",
      pin: "1234",
      color: "teal",
      avatar: "./icons/avatar-narisara.png"
    },
    {
      id: "nantaphat",
      name: "ว่าที่ร้อยตรี นันทพัทธ์ พรมสร้อย",
      shortName: "ครูนันทพัทธ์",
      position: "ครูอัตราจ้าง",
      role: "teacher",
      pin: "1234",
      color: "sky",
      avatar: "./icons/avatar-nantaphat.png"
    },
    {
      id: "pattaraya",
      name: "นางสาวภัทรญา ยอดปทุมมานนท์",
      shortName: "คุณภัทรญา",
      position: "เจ้าหน้าที่ธุรการ",
      role: "teacher",
      pin: "1234",
      color: "rose",
      avatar: "./icons/avatar-pattaraya.png"
    },
    {
      id: "kun",
      name: "นายกุล ดีสันเทียะ",
      shortName: "คุณกุล",
      position: "นักการภารโรง",
      role: "teacher",
      pin: "1234",
      color: "slate",
      avatar: "./icons/avatar-kun.png"
    }
  ],

  divisions: [
    { id: "all", label: "ทั้งหมด" },
    { id: "academic", label: "วิชาการ" },
    { id: "budget", label: "งบประมาณ" },
    { id: "personnel", label: "บุคคล" },
    { id: "general", label: "ทั่วไป" }
  ],

  announcements: [
    {
      id: "ann-1",
      title: "เปิดใช้งานระบบ e-Budget และระบบนิเทศภายในแล้ว",
      date: "วันนี้ • แอดมินระบบ",
      body: "คุณครูและผู้บริหารสามารถกดเข้าใช้งานระบบ e-Budget และระบบนิเทศภายในโรงเรียนได้โดยตรงจากหน้าหลัก BPP Connect",
      urgent: true
    },
    {
      id: "ann-2",
      title: "อัปเดตแอปอัตโนมัติโดยไม่ต้องติดตั้งใหม่",
      date: "วันนี้ • BPP Connect v1.5",
      body: "เพิ่มปฏิทินวิชาการบนหน้าหลัก ระบบแก้ไขโปรไฟล์/รหัสผ่าน และแผงจัดการผู้ใช้งานสำหรับแอดมิน",
      urgent: false
    }
  ],

  calendarEvents: [
    {
      id: "evt-1",
      title: "ประชุมประจำเดือนคณะครูและบุคลากร",
      date: "2026-11-27",
      time: "15:30",
      location: "ห้องประชุมโรงเรียนบ้านป่าไผ่",
      notes: "ติดตามแผนการนิเทศภายในและสรุปงบประมาณประจำเดือน",
      color: "blue",
      authorId: "napaporn",
      author: "นางสาวนภาพร คงแสนคำ"
    },
    {
      id: "evt-2",
      title: "ส่งแผนการจัดการเรียนรู้ ภาคเรียนที่ 2",
      date: "2026-11-30",
      time: "16:00",
      location: "กลุ่มงานวิชาการ",
      notes: "ส่งผ่านระบบนิเทศภายในโรงเรียนในแอป BPP Connect",
      color: "emerald",
      authorId: "pacharasaran",
      author: "นายพชรศรัณย์ ทับชม"
    }
  ],

  systems: [
    {
      id: "executive-brief",
      name: "รายงานผู้บริหารวันต่อวัน",
      shortName: "สรุปผู้บริหาร",
      description: "สรุปสถิติเด็กมาเรียน ครูลา เอกสาร งบประมาณ และนิเทศในหน้าเดียว + ปริ้น PDF A4",
      division: "general",
      url: "./executive.html",
      icon: "barChart",
      color: "amber",
      pinned: true,
      directorOnly: true
    },
    {
      id: "academic-hub",
      name: "ตารางสอน • วPA/SAR • เฝ้าระวัง",
      shortName: "ตารางสอน/วPA",
      description: "ตารางสอน จัดครูสอนแทนอัตโนมัติ คลังผลงาน วPA/PLC/SAR และติดตามเด็กขาดเรียนบ่อย",
      division: "academic",
      url: "./academic-hub.html",
      icon: "graduationCap",
      color: "sky",
      pinned: true,
      directorOnly: false
    },
    {
      id: "doc-vault",
      name: "คลังเอกสารย้อนหลัง (PDF)",
      shortName: "คลังเอกสาร",
      description: "ดูย้อนหลังและพิมพ์ซ้ำทุกเอกสารที่ออก PDF จากแอป แยกหมวดใบขอออกนอก ใบลา เยี่ยมบ้าน ฯลฯ",
      division: "general",
      url: "./doc-vault.html",
      icon: "fileCheck",
      color: "purple",
      pinned: true,
      directorOnly: false
    },
    {
      id: "student-care",
      name: "ระบบดูแลช่วยเหลือนักเรียน",
      shortName: "ดูแลช่วยเหลือ",
      description: "ระบบการเยี่ยมบ้านนักเรียน (ออกเล่มรายงาน PDF ครบชุด) และคัดกรองนักเรียนยากจน กสศ.",
      division: "general",
      url: "./student-care.html",
      icon: "users",
      color: "purple",
      pinned: true,
      directorOnly: false
    },
    {
      id: "e-budget",
      name: "e-Budget",
      shortName: "e-Budget",
      description: "ระบบบริหารงบประมาณและเบิกจ่ายโรงเรียนบ้านป่าไผ่",
      division: "budget",
      url: "./ebudget.html",
      icon: "wallet",
      color: "emerald",
      pinned: true,
      directorOnly: false
    },
    {
      id: "supervision",
      name: "นิเทศภายในโรงเรียน",
      shortName: "นิเทศภายใน",
      description: "บันทึกผลและติดตามการนิเทศการจัดการเรียนรู้",
      division: "academic",
      url: "./supervision.html",
      icon: "clipboardCheck",
      color: "blue",
      pinned: true,
      directorOnly: false
    },
    {
      id: "bdms",
      name: "ระบบเอกสารธุรการโรงเรียน",
      shortName: "เอกสารธุรการ",
      description: "จัดเก็บ ค้นหา และอัปโหลดเอกสารธุรการจากมือถือลง Google Drive",
      division: "general",
      url: "./docs.html",
      icon: "folder",
      color: "purple",
      pinned: true,
      directorOnly: false
    },
    {
      id: "certificate",
      name: "ระบบจัดการเกียรติบัตร",
      shortName: "เกียรติบัตร",
      description: "ออกเลขทะเบียนและดาวน์โหลดเกียรติบัตรออนไลน์",
      division: "academic",
      url: "https://script.google.com/macros/s/AKfycbw6zyCd02fw_bubPn_gJcqk2u9u7xLTc3qjPRniX6_3gYDez9RTO0cvNfwZ7HuUC1R6/exec",
      icon: "award",
      color: "sky",
      pinned: true,
      directorOnly: false
    },
    {
      id: "classroom-admin",
      name: "ระบบธุรการชั้นเรียน",
      shortName: "ธุรการชั้นเรียน",
      description: "เยี่ยมบ้าน คัดกรอง กสศ. สุขภาพ เงินเรียนฟรี 15 ปี พฤติกรรม ออมทรัพย์ & เวร",
      division: "academic",
      url: "./classroom.html",
      icon: "graduationCap",
      color: "blue",
      pinned: true,
      directorOnly: false
    },
    {
      id: "school-admin-office",
      name: "ระบบธุรการโรงเรียน",
      shortName: "ธุรการโรงเรียน",
      description: "ออกเลขคำสั่ง ตารางเวรยาม หนังสือรับรอง ปพ.7 ครุภัณฑ์ ย้ายนักเรียน & สมุดผู้มาติดต่อ",
      division: "general",
      url: "./admin-office.html",
      icon: "fileCheck",
      color: "indigo",
      pinned: true,
      directorOnly: false
    },
    {
      id: "attendance",
      name: "ระบบเช็คสถิตินักเรียน",
      shortName: "สถิตินักเรียน",
      description: "เช็คชื่อนักเรียนรายวัน สรุปสถิติรายชั้น และปริ้นแบบรายงาน A4",
      division: "academic",
      url: "./attendance.html",
      icon: "users",
      color: "blue",
      pinned: true,
      directorOnly: false
    },
    {
      id: "bpp-album",
      name: "คลังภาพกิจกรรม (BPP Album)",
      shortName: "คลังภาพ",
      description: "สร้างอัลบั้มและอัปโหลดรูปภาพลง Google Drive เหมือนอัลบั้ม LINE",
      division: "general",
      url: "./album.html",
      icon: "image",
      color: "purple",
      pinned: true,
      directorOnly: false
    },
    {
      id: "school-lunch",
      name: "ระบบอาหารกลางวัน",
      shortName: "อาหารกลางวัน",
      description: "บันทึกเมนู รายงาน และบริหารจัดการโครงการอาหารกลางวัน",
      division: "general",
      url: "https://script.google.com/macros/s/AKfycbzien_zQXulkWhOmpULBzZ-a4bQcTaGcYTnkcpDbPP-gqsdIVpVvxc9y3577WfWDY-rMg/exec",
      icon: "utensils",
      color: "indigo",
      pinned: false,
      directorOnly: false,
      openExternal: true
    },
    {
      id: "e-leave",
      name: "ระบบการลา & ขอออกนอกโรงเรียน",
      shortName: "ลา/ออกนอก",
      description: "ยื่นใบลา ขออนุญาตออกนอกโรงเรียน ตรวจจับ GPS 100 ม. และปริ้นใบลา A4",
      division: "personnel",
      url: "./leave.html",
      icon: "calendar",
      color: "teal",
      pinned: true,
      directorOnly: false
    },
    {
      id: "academic-report",
      name: "บันทึกคะแนนนักเรียน (50+50)",
      shortName: "บันทึกคะแนน",
      description: "กรอกคะแนนเก็บ-สอบ เทอม 1 และ 2 (50+50) คำนวณเกรดและปริ้นใบรายงานผล A4",
      division: "academic",
      url: "./scores.html",
      icon: "barChart",
      color: "sky",
      pinned: true,
      directorOnly: false
    }
  ]
};
