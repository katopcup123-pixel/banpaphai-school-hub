// ตั้งค่าแอป BPP Connect — โรงเรียนบ้านป่าไผ่ (สพป.นครราชสีมา เขต 4)
window.SCHOOL_CONFIG = {
  appVersion: "1.5.1",
  schoolName: "BPP Connect",
  schoolSubtitle: "โรงเรียนบ้านป่าไผ่ • สพป.นครราชสีมา เขต 4",
  logoUrl: "./icons/school-logo.png",
  // วางลิงก์ GAS หลังบ้านข่าว & แจ้งเตือน (จาก gas-backend.gs) และ OneSignal App ID ที่นี่
  newsBackendUrl: "https://script.google.com/macros/s/AKfycbz_i-RsRN_E04l7D2srMHAD2WVQhTGBEVFeh4xoYK0mwQEe8AaypEutTGiAaDwaTec-Ag/exec",
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
      color: "amber"
    },
    {
      id: "pacharasaran",
      name: "นายพชรศรัณย์ ทับชม",
      shortName: "ครูพชรศรัณย์",
      position: "หัวหน้ากลุ่มงานวิชาการ",
      role: "head",
      pin: "1234",
      color: "blue"
    },
    {
      id: "thanakarin",
      name: "นายธานครินทร์ สุเมธาลังการ",
      shortName: "ครูธานครินทร์",
      position: "ครู/แอดมิน",
      role: "admin",
      pin: "8301",
      color: "indigo"
    },
    {
      id: "namphet",
      name: "นางสาวน้ำเพชร ชมประเสริฐ",
      shortName: "ครูน้ำเพชร",
      position: "ครู",
      role: "teacher",
      pin: "1234",
      color: "emerald"
    },
    {
      id: "narisara",
      name: "นางสาวนริศรา พืชผักหวาน",
      shortName: "ครูนริศรา",
      position: "ครูผู้ช่วย",
      role: "teacher",
      pin: "1234",
      color: "teal"
    },
    {
      id: "nantaphat",
      name: "ว่าที่ร้อยตรี นันทพัทธ์ พรมสร้อย",
      shortName: "ครูนันทพัทธ์",
      position: "ครูอัตราจ้าง",
      role: "teacher",
      pin: "1234",
      color: "sky"
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
      id: "e-budget",
      name: "e-Budget",
      shortName: "e-Budget",
      description: "ระบบบริหารงบประมาณและเบิกจ่ายโรงเรียนบ้านป่าไผ่",
      division: "budget",
      url: "https://script.google.com/macros/s/AKfycbwAhQYrjj4eM61SDwX4rUY0XByIYDlFmlKz0RDpu0KGjtMgISSYoxgv91r7tHcWraYeBw/exec",
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
      url: "https://script.google.com/macros/s/AKfycbzgvl8UDp89H8V1npxXe7EvpuEiNRTe1FWyDyMTz7p_dsg4XuE-w1qZUL0jZHRwTyi1/exec",
      icon: "clipboardCheck",
      color: "blue",
      pinned: true,
      directorOnly: false
    },
    {
      id: "off-campus",
      name: "ขออนุญาตออกนอกสถานที่",
      shortName: "ออกนอกสถานที่",
      description: "ยื่นขออนุญาตไปราชการและออกนอกบริเวณโรงเรียน",
      division: "personnel",
      url: "https://script.google.com/macros/s/REPLACE_WITH_OFFCAMPUS_ID/exec",
      icon: "mapPin",
      color: "amber",
      pinned: true,
      directorOnly: false
    },
    {
      id: "saraban",
      name: "งานสารบรรณอิเล็กทรอนิกส์",
      shortName: "สารบรรณ",
      description: "รับ-ส่งหนังสือราชการและเกษียณหนังสือ",
      division: "general",
      url: "https://script.google.com/macros/s/REPLACE_WITH_SARABAN_ID/exec",
      icon: "folder",
      color: "purple",
      pinned: true,
      directorOnly: false
    },
    {
      id: "leave",
      name: "ระบบลาราชการ",
      shortName: "ลาราชการ",
      description: "ยื่นใบลาป่วย ลากิจ และตรวจสอบวันลาสะสม",
      division: "personnel",
      url: "https://script.google.com/macros/s/REPLACE_WITH_LEAVE_ID/exec",
      icon: "calendar",
      color: "rose",
      pinned: false,
      directorOnly: false
    },
    {
      id: "project-approval",
      name: "ขออนุมัติโครงการ",
      shortName: "อนุมัติโครงการ",
      description: "เสนอขออนุมัติและติดตามสถานะโครงการ",
      division: "budget",
      url: "https://script.google.com/macros/s/REPLACE_WITH_PROJECT_ID/exec",
      icon: "fileCheck",
      color: "indigo",
      pinned: false,
      directorOnly: false
    },
    {
      id: "procurement",
      name: "จัดซื้อจัดจ้าง",
      shortName: "จัดซื้อจัดจ้าง",
      description: "ระบบพัสดุ ใบเบิก และจัดซื้อจัดจ้าง",
      division: "budget",
      url: "https://script.google.com/macros/s/REPLACE_WITH_PROCUREMENT_ID/exec",
      icon: "shoppingBag",
      color: "amber",
      pinned: false,
      directorOnly: false
    },
    {
      id: "finance-report",
      name: "รายงานการเงิน",
      shortName: "รายงานการเงิน",
      description: "สรุปสถานะงบประมาณประจำเดือนสำหรับผู้บริหาร",
      division: "budget",
      url: "https://script.google.com/macros/s/REPLACE_WITH_FINANCE_ID/exec",
      icon: "barChart",
      color: "sky",
      pinned: false,
      directorOnly: true
    },
    {
      id: "meeting-room",
      name: "จองห้องประชุม",
      shortName: "จองห้องประชุม",
      description: "จองห้องประชุมและอุปกรณ์โสตทัศนูปกรณ์",
      division: "general",
      url: "https://script.google.com/macros/s/REPLACE_WITH_MEETING_ID/exec",
      icon: "users",
      color: "teal",
      pinned: false,
      directorOnly: false
    },
    {
      id: "repair",
      name: "แจ้งซ่อมบำรุง",
      shortName: "แจ้งซ่อม",
      description: "แจ้งซ่อมอาคารสถานที่ ครุภัณฑ์ และระบบไอที",
      division: "general",
      url: "https://script.google.com/macros/s/REPLACE_WITH_REPAIR_ID/exec",
      icon: "wrench",
      color: "slate",
      pinned: false,
      directorOnly: false
    },
    {
      id: "academic-report",
      name: "รายงานผลสัมฤทธิ์",
      shortName: "รายงานผล",
      description: "สรุปผลการเรียนและสถิติการมาเรียนรายภาค",
      division: "academic",
      url: "https://script.google.com/macros/s/REPLACE_WITH_ACADEMIC_ID/exec",
      icon: "graduationCap",
      color: "sky",
      pinned: false,
      directorOnly: false
    }
  ]
};
