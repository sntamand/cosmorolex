const watches=[
{name:"Aster Chronograph",cat:"sport",price:485,style:"blue",desc:"Steel case · Sapphire glass"},
{name:"Élan Automatic",cat:"classic",price:620,style:"gold",desc:"Automatic movement · Leather"},
{name:"Noir Date",cat:"minimal",price:395,style:"",desc:"Black steel · Date display"},
{name:"Meridian Classic",cat:"classic",price:540,style:"light",desc:"Polished steel · Leather"},
{name:"Atlas Sport",cat:"sport",price:455,style:"blue",desc:"Steel bracelet · 100m water resistant"},
{name:"Luna Minimal",cat:"minimal",price:345,style:"light",desc:"Slim case · Italian leather"},
{name:"Regent Automatic",cat:"classic",price:790,style:"gold",desc:"Automatic movement · Exhibition back"},
{name:"Apex GMT",cat:"sport",price:675,style:"",desc:"GMT function · Steel bracelet"}
];
const accessories=[
{name:"Signature Leather Strap",price:85,style:"gold",desc:"Italian leather · Quick release"},
{name:"Watch Travel Case",price:110,style:"",desc:"Vegan leather · Two-watch capacity"},
{name:"Steel Bracelet",price:125,style:"light",desc:"316L steel · Adjustable links"},
{name:"Care Kit",price:45,style:"blue",desc:"Microfiber · Brush · Polishing cloth"}
];
let cart=JSON.parse(localStorage.getItem("cosmorolex-cart")||"[]");

function card(p,i){return `<article class="product"><div class="product-image ${p.style}"></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="price">$${p.price.toLocaleString()}</div></div><button class="add" onclick='addToCart(${JSON.stringify(p)})' aria-label="Add ${p.name}">+</button></article>`}
function renderWatches(filter="all"){watchGrid.innerHTML=watches.filter(p=>filter==="all"||p.cat===filter).map(card).join("")}
function renderAccessories(){accessoryGrid.innerHTML=accessories.map(card).join("")}
function addToCart(p){cart.push(p);saveCart();openCart()}
function removeFromCart(i){cart.splice(i,1);saveCart()}
function saveCart(){localStorage.setItem("cosmorolex-cart",JSON.stringify(cart));renderCart()}
function renderCart(){cartCount.textContent=cart.length;cartItems.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><div><strong>${p.name}</strong><small>$${p.price.toLocaleString()}</small></div><button class="remove" onclick="removeFromCart(${i})">Remove</button></div>`).join(""):`<p style="color:#777;font-size:13px">Your bag is empty.</p>`;cartTotal.textContent="$"+cart.reduce((s,p)=>s+p.price,0).toLocaleString()}
function openCart(){cartEl.classList.add("open");overlay.classList.add("show")}
function closeCart(){cartEl.classList.remove("open");overlay.classList.remove("show")}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderWatches(b.dataset.filter)});
cartBtn.onclick=openCart;closeCartBtn=()=>closeCart();document.getElementById("closeCart").onclick=closeCart;overlay.onclick=closeCart;
menuBtn.onclick=()=>nav.classList.toggle("open");
document.getElementById("checkout").onclick=()=>alert("Connect this button to Stripe Checkout or PayPal to accept live payments.");
newsletterForm.onsubmit=e=>{e.preventDefault();newsletterMsg.textContent="Thanks — you're on the list.";newsletterForm.reset()};
renderWatches();renderAccessories();renderCart();
