// ตั้งค่า URL ของ Google Apps Script Web App หลัง Deploy แล้ว
const GOOGLE_SCRIPT_URL = ""; // ตัวอย่าง: https://script.google.com/macros/s/...../exec

const products = [
  {sku:"HB001",name:"ยาหม่องสมุนไพร",description:"ผลิตภัณฑ์สมุนไพรสำหรับใช้ภายนอก ขนาด 30 กรัม",price:89,image:"images/herbal-balm.svg"},
  {sku:"HB002",name:"สบู่สมุนไพรตะไคร้",description:"สบู่สมุนไพรสำหรับทำความสะอาดผิว ขนาด 100 กรัม",price:69,image:"images/lemongrass-soap.svg"}
];
let cart = JSON.parse(localStorage.getItem("herbalCart") || "[]");
const money = n => "฿" + Number(n).toLocaleString("th-TH");
const grid = document.getElementById("productGrid");

function renderProducts(){
  grid.innerHTML = products.map(p => `<article class="product-card"><div class="product-art"><img src="${p.image}" alt="${p.name}"></div><div class="product-info"><div class="product-meta">SKU: ${p.sku}</div><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.sku}">เพิ่มลงตะกร้า +</button></div></div></article>`).join("");
}
function saveCart(){localStorage.setItem("herbalCart",JSON.stringify(cart));renderCart();}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(i=>`<div class="cart-row"><span>${i.name}<br><small>${money(i.price)} × ${i.qty}</small></span><span>${money(i.price*i.qty)} <button data-remove="${i.sku}">ลบ</button></span></div>`).join(""):'<p class="empty">ยังไม่มีสินค้าในตะกร้า</p>';
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0));
}
grid.addEventListener("click",e=>{const sku=e.target.dataset.add;if(!sku)return;const p=products.find(x=>x.sku===sku);const found=cart.find(x=>x.sku===sku);if(found)found.qty++;else cart.push({...p,qty:1});saveCart();openCart();});
document.getElementById("cartItems").addEventListener("click",e=>{const sku=e.target.dataset.remove;if(sku){cart=cart.filter(x=>x.sku!==sku);saveCart();}});
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("backdrop").classList.add("show");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("backdrop").classList.remove("show");}
document.getElementById("cartToggle").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("backdrop").onclick=closeCart;

document.getElementById("checkoutForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const message=document.getElementById("checkoutMessage");
  if(!cart.length){message.textContent="กรุณาเลือกสินค้าก่อนสั่งซื้อ";return;}
  const data=new FormData(e.target);
  const order={customer:data.get("customer"),phone:data.get("phone"),address:data.get("address"),items:cart.map(i=>({sku:i.sku,name:i.name,qty:i.qty,price:i.price})),total:cart.reduce((s,i)=>s+i.price*i.qty,0)};
  const button=e.target.querySelector("button[type=submit]");button.disabled=true;button.textContent="กำลังบันทึก...";
  try{
    if(GOOGLE_SCRIPT_URL){
      await fetch(GOOGLE_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(order)});
      message.textContent="ส่งคำสั่งซื้อแล้ว กรุณาตรวจสอบรายการในระบบหลังบ้าน";
    }else{
      const demo=JSON.parse(localStorage.getItem("herbalOrders")||"[]");
      demo.push({...order,orderId:"DEMO-"+Date.now(),createdAt:new Date().toISOString(),status:"รอตรวจสอบ"});
      localStorage.setItem("herbalOrders",JSON.stringify(demo));
      message.textContent="บันทึกคำสั่งซื้อในโหมดทดลองบนอุปกรณ์นี้แล้ว (ยังไม่ได้เชื่อม Google Sheets)";
    }
    cart=[];saveCart();e.target.reset();
  }catch(err){message.textContent="บันทึกไม่สำเร็จ กรุณาลองใหม่";}
  finally{button.disabled=false;button.textContent="ยืนยันคำสั่งซื้อ";}
});
renderProducts();renderCart();