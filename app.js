const fallbackProducts = [
  {id:"demo-1",brand:"ROLEX",name:"Submariner Date",ref:"126610LN",price:12500,description:"Iconic luxury dive watch.",stock:1,images:[]},
  {id:"demo-2",brand:"OMEGA",name:"Seamaster Diver 300M",ref:"210.30.42.20.03.001",price:6800,description:"Precision and performance.",stock:1,images:[]},
  {id:"demo-3",brand:"TAG HEUER",name:"Carrera Chronograph",ref:"CBN2A1AA.FT6237",price:5200,description:"Sporting chronograph design.",stock:1,images:[]},
  {id:"demo-4",brand:"CARTIER",name:"Tank Must",ref:"WSTA0041",price:2950,description:"Timeless rectangular elegance.",stock:1,images:[]}
];
let products = [];
let cart = JSON.parse(localStorage.getItem("cosmorolex-cart") || "[]");
let selectedCrypto = "BTC";

const money = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(Number(n)||0);
const $ = id => document.getElementById(id);

async function loadProducts(){
  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("API unavailable");
    const remote = await response.json();
    products = remote.length ? remote : fallbackProducts;
  } catch {
    products = fallbackProducts;
  }
  init();
}
function init(){
  const brands=[...new Set(products.map(p=>p.brand).filter(Boolean))];
  $("brandFilter").innerHTML='<option value="">All Brands</option>'+brands.map(b=>`<option>${b}</option>`).join("");
  renderProducts(); updateCartCount();
}
function renderProducts(){
  const q=($("search").value||"").toLowerCase(), brand=$("brandFilter").value;
  const list=products.filter(p=>(!brand||p.brand===brand)&&(p.name+" "+(p.brand||"")).toLowerCase().includes(q));
  $("products").innerHTML=list.map(p=>{
    const image = p.images && p.images[0] ? `<img src="${p.images[0]}" alt="${p.name}">` : `<div class="mini-watch"></div>`;
    return `<article class="product">
      <div class="product-image"><button class="heart" onclick="this.textContent=this.textContent==='♡'?'♥':'♡'">♡</button>${image}</div>
      <div class="product-info"><small>${p.brand||"COSMOROLEX"}</small><h3>${p.name}</h3><span class="ref">${p.ref?`Ref. ${p.ref}`:""}</span><span class="price">${money(p.price)}</span><button class="add" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}')">ADD TO CART</button></div>
    </article>`;
  }).join("") || `<p>No watches found.</p>`;
}
function addToCart(id){const p=products.find(x=>String(x.id)===String(id));if(!p)return;cart.push(p);saveCart();openCart()}
function saveCart(){localStorage.setItem("cosmorolex-cart",JSON.stringify(cart));updateCartCount()}
function updateCartCount(){$("cartCount").textContent=cart.length}
function openCart(){renderCart();$("cartModal").classList.add("open")}
function closeCart(){$("cartModal").classList.remove("open")}
function renderCart(){
  $("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-line"><span>${p.brand||""} — ${p.name}</span><strong>${money(p.price)}</strong><button class="remove" onclick="removeFromCart(${i})">Remove</button></div>`).join(""):`<p>Your cart is empty.</p>`;
  $("cartTotal").textContent=money(cart.reduce((s,p)=>s+Number(p.price||0),0));
}
function removeFromCart(i){cart.splice(i,1);saveCart();renderCart()}
function openCheckout(){if(!cart.length)return;closeCart();$("checkoutModal").classList.add("open")}
function closeCheckout(){$("checkoutModal").classList.remove("open")}
function selectCrypto(btn,coin){document.querySelectorAll(".payment-options button").forEach(b=>b.classList.remove("selected"));btn.classList.add("selected");selectedCrypto=coin}
function payNow(){$("paymentMessage").textContent=`Demo checkout selected: ${selectedCrypto}. Connect your crypto payment processor/API here to create a real payment session.`}
function focusSearch(){$("search").focus();$("shop").scrollIntoView({behavior:"smooth"})}
function subscribe(e){e.preventDefault();alert("Thanks for subscribing to Cosmorolex Watches.");e.target.reset()}
loadProducts();
