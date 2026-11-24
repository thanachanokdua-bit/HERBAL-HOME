HERBAL HOME — คู่มือเริ่มต้น (สำหรับทำงานบนคอมพิวเตอร์)

ไฟล์นี้เป็นเว็บไซต์ตัวอย่างสำหรับงานเรียน ไม่ใช่ระบบร้านค้าจริงที่ผ่านการตรวจสอบความปลอดภัย

A) ทดลองเปิดเว็บไซต์
1. แตกไฟล์ ZIP ลงในคอมพิวเตอร์
2. เปิดโฟลเดอร์ herbal-home
3. ดับเบิลคลิก index.html เพื่อเปิดใน Chrome
4. กด “เพิ่มลงตะกร้า” กรอกข้อมูลทดสอบ และยืนยันคำสั่งซื้อ
5. เปิด admin.html เพื่อดู Picking List และ Shipping Label
หมายเหตุ: ก่อนเชื่อม Google Sheets ระบบจะเก็บออเดอร์ทดลองไว้ใน Local Storage ของเบราว์เซอร์เครื่องนั้นเท่านั้น

B) สร้าง Google Sheets
1. เข้า https://sheets.google.com แล้วสร้าง Spreadsheet ชื่อ HERBAL_HOME
2. เปลี่ยนชื่อแท็บแรกเป็น Products และใส่หัวตาราง:
SKU | Product Name | Description | Price | Stock | Image
3. เพิ่มข้อมูล:
HB001 | ยาหม่องสมุนไพร | ผลิตภัณฑ์สมุนไพรสำหรับใช้ภายนอก ขนาด 30 กรัม | 89 | 50 | images/herbal-balm.svg
HB002 | สบู่สมุนไพรตะไคร้ | สบู่สมุนไพรสำหรับทำความสะอาดผิว ขนาด 100 กรัม | 69 | 40 | images/lemongrass-soap.svg
4. สร้างแท็บที่สองชื่อ Orders และใส่หัวตาราง:
Order ID | Created At | Customer | Phone | Address | SKU | Product Name | Qty | Unit Price | Line Total | Order Total | Status

C) เชื่อม Google Sheets
1. เปิด Google Sheets > Extensions > Apps Script
2. เปิดไฟล์ google-apps-script/Code.gs ในชุดงานนี้ แล้วคัดลอกโค้ดไปวางใน Apps Script
3. กด Save
4. เลือก Deploy > New deployment > Select type: Web app
5. Execute as: Me; Who has access: Anyone (สำหรับงานสาธิตเท่านั้น) แล้ว Deploy
6. อนุญาตสิทธิ์ตามขั้นตอนของ Google และคัดลอก Web app URL ที่ลงท้าย /exec
7. เปิดไฟล์ script.js แล้วใส่ URL ในบรรทัด GOOGLE_SCRIPT_URL = "วาง URL ที่นี่";
8. บันทึกไฟล์ แล้วอัปโหลดไฟล์ที่แก้ไขขึ้น GitHub อีกครั้ง
ข้อควรระวัง: การตั้ง Anyone ทำให้ผู้ที่มี URL ส่งข้อมูลเข้าชีตได้ อย่าใช้ข้อมูลลูกค้าจริงหรือเผยแพร่ชีตที่มีข้อมูลส่วนตัว

D) อัปโหลด GitHub
1. เข้า https://github.com และสมัคร/เข้าสู่ระบบ
2. กด New repository ตั้งชื่อ herbal-home เลือก Public แล้ว Create repository
3. กด Add file > Upload files
4. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมดภายในโฟลเดอร์ herbal-home (index.html, style.css, script.js, admin.html, images และ google-apps-script)
5. กด Commit changes

E) Deploy Vercel
1. เข้า https://vercel.com แล้ว Sign up / Log in ด้วย GitHub
2. กด Add New > Project แล้ว Import repository herbal-home
3. Framework Preset เลือก Other; Build Command และ Output Directory เว้นว่างได้
4. กด Deploy
5. เมื่อสำเร็จ กด Visit เพื่อเปิดเว็บไซต์ และคัดลอก URL ส่งอาจารย์
6. ทดสอบทั้งหน้าร้านและ /admin.html

F) หลักฐานที่ควรส่งอาจารย์
- ภาพหน้าร้านที่เห็นสินค้า 2 SKU
- ภาพ Google Sheets แท็บ Products และ Orders
- ภาพคำสั่งซื้อที่บันทึกแล้ว
- ภาพหน้า admin ที่มี Picking List และ Shipping Label
- ลิงก์ GitHub repository
- ลิงก์เว็บไซต์ Vercel

G) ขอบเขตระบบ
- สินค้าและราคาในหน้าเว็บเป็นข้อมูลตัวอย่าง ต้องแก้ไขให้ตรงตามที่อาจารย์กำหนด
- ระบบสาธิตตะกร้าและหน้าจัดการออเดอร์ทำงานในเบราว์เซอร์
- เมื่อใส่ Apps Script URL แล้ว คำสั่งซื้อจะถูกส่งเข้า Google Sheets
- หน้า admin.html เป็นหน้าสาธิต ไม่ใช่ระบบหลังบ้านที่มีการล็อกอิน
- ใบจ่าหน้าพัสดุเป็นแบบฟอร์มสำหรับจัดเตรียมข้อมูล ไม่ใช่ใบปะหน้าจากบริษัทขนส่ง
- อย่าใช้คำกล่าวอ้างรักษาโรคหรือสรรพคุณทางการแพทย์โดยไม่มีหลักฐาน/การอนุญาตที่ถูกต้อง
