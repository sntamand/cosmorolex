const products = [
  {id:1,brand:"ROLEX",name:"Submariner Date",ref:"126610LN",price:12500},
  {id:2,brand:"OMEGA",name:"Seamaster Diver 300M",ref:"210.30.42.20.03.001",price:6800},
  {id:3,brand:"TAG HEUER",name:"Carrera Chronograph",ref:"CBN2A1AA.FT6237",price:5200},
  {id:4,brand:"CARTIER",name:"Tank Must",ref:"WSTA0041",price:2950},
  {id:5,brand:"TUDOR",name:"Black Bay 58",ref:"79030R",price:4800},
  {id:6,brand:"BREITLING",name:"Navitimer B01",ref:"AB0138",price:9200},
  {id:7,brand:"IWC",name:"Portugieser Chronograph",ref:"IW371605",price:7800},
  {id:8,brand:"SEIKO",name:"Prospex Diver",ref:"SPB143",price:1400}
];
let cart = JSON.parse(localStorage.getItem("cosorolex-cart") || "[]");
let selectedCrypto = "BTC";

const money = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n);

function init(){
  const brands=[...new Set(products.map(p=>p.brand))];
  brandFilter.innerHTML='<option value="">All Brands</option>'+brands.map(b=>`<option>${b}</option>`).join("");
  renderProducts(); updateCartCount();
}
function renderProducts(){
  const q=(search.value||"").toLowerCase(), brand=brandFilter.value;
  const list=products.filter(p=>(!brand||p.brand===brand)&&(p.name+" "+p.brand).toLowerCase().includes(q));
  document.getElementById("products").innerHTML=list.map(p=>`
    <article class="product">
      <div class="product-image"><button class="heart" onclick="this.textContent=this.textContent==='♡'?'♥':'♡'">♡</button><div class="mini-watch"></div></div>
      <div class="product-info"><small>${p.brand}</small><h3>${p.name}</h3><span class="ref">Ref. ${p.ref}</span><span class="price">${money(p.price)}</span><button class="add" onclick="addToCart(${p.id})">ADD TO CART</button></div>
    </article>`).join("") || `<p>No watches found.</p>`;
}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);saveCart();openCart()}
function saveCart(){localStorage.setItem("cosorolex-cart",JSON.stringify(cart));updateCartCount()}
function updateCartCount(){cartCount.textContent=cart.length}
function openCart(){renderCart();cartModal.classList.add("open")}
function closeCart(){cartModal.classList.remove("open")}
function renderCart(){
  cartItems.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-line"><span>${p.brand} — ${p.name}</span><strong>${money(p.price)}</strong><button class="remove" onclick="removeFromCart(${i})">Remove</button></div>`).join(""):`<p>Your cart is empty.</p>`;
  cartTotal.textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
function removeFromCart(i){cart.splice(i,1);saveCart();renderCart()}
function openCheckout(){if(!cart.length)return;closeCart();checkoutModal.classList.add("open")}
function closeCheckout(){checkoutModal.classList.remove("open")}
function selectCrypto(btn,coin){document.querySelectorAll(".payment-options button").forEach(b=>b.classList.remove("selected"));btn.classList.add("selected");selectedCrypto=coin}
function payNow(){paymentMessage.textContent=`Demo checkout selected: ${selectedCrypto}. Connect your crypto payment processor/API here to create a real payment session.`}
function focusSearch(){document.querySelector("#search").focus();document.querySelector("#shop").scrollIntoView({behavior:"smooth"})}
function subscribe(e){e.preventDefault();alert("Thanks for subscribing to Cosorolex.");e.target.reset()}
init();
