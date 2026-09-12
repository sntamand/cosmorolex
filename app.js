const { createClient } = supabase;
const db = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
let products = [];
let cart = JSON.parse(localStorage.getItem("cosmoCart") || "[]");

async function loadProducts() {
  const { data, error } = await db.from("products")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    document.getElementById("products").innerHTML =
      "<p>Store connection is not configured yet.</p>";
    return;
  }
  products = data || [];
  renderProducts();
}

function renderProducts() {
  const brand = document.getElementById("brandFilter")?.value || "";
  const q = (document.getElementById("search")?.value || "").toLowerCase();
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
  const select = document.getElementById("brandFilter");
  if (select && select.options.length <= 1) {
    brands.forEach(b => select.add(new Option(b, b)));
  }
  const list = products.filter(p =>
    (!brand || p.brand === brand) &&
    (`${p.name} ${p.brand} ${p.reference || ""}`).toLowerCase().includes(q)
  );
  const el = document.getElementById("products");
  if (!el) return;
  el.innerHTML = list.map(p => `
    <article class="product-card">
      <img src="${p.image_url || 'cosmorolex-logo-icon.png'}" alt="${escapeHtml(p.name)}">
      <div class="product-info">
        <small>${escapeHtml(p.brand || "")}</small>
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.description || "")}</p>
        <strong>$${Number(p.price || 0).toLocaleString()}</strong>
        <button onclick="addToCart('${p.id}')">Add to cart</button>
      </div>
    </article>`).join("") || "<p>No products found.</p>";
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (p) cart.push(p);
  localStorage.setItem("cosmoCart", JSON.stringify(cart));
  if (typeof openCart === "function") openCart();
}
document.getElementById("search")?.addEventListener("input", renderProducts);
document.getElementById("brandFilter")?.addEventListener("change", renderProducts);
loadProducts();
