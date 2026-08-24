/**
 * VALUE Store - Product Page Script
 * Handles product rendering, size/color selection, quantity, and add to cart
 */

let selectedProduct = null;
let selectedColor = null;
let selectedSize = null;
let selectedQty = 1;

document.addEventListener("DOMContentLoaded", () => {
  loadProduct();
});

function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || localStorage.getItem("selectedProductId");

  if (typeof getProductById === 'function') {
    selectedProduct = getProductById(productId);
  } else {
    // Fallback using old localStorage keys
    const img = JSON.parse(localStorage.getItem("Name") || "[]");
    const price = JSON.parse(localStorage.getItem("Price") || "[]");
    selectedProduct = {
      id: "fallback",
      name: "Luxury Item",
      brand: "VALUE",
      price: parseFloat(Array.isArray(price) ? price[0] : price) || 600,
      originalPrice: null,
      image: Array.isArray(img) ? img[0] : img,
      brandLogo: "../assets/images/logos/pngwing.com.png",
      description: "A premium luxury fashion item.",
      colors: ["Classic"],
      sizes: ["S", "M", "L", "XL"],
      rating: 4.9,
      reviewsCount: 28,
      badge: "Exclusive"
    };
  }

  if (!selectedProduct) return;

  selectedColor = selectedProduct.colors?.[0] || "Classic";
  selectedSize = selectedProduct.sizes?.[0] || "M";
  selectedQty = 1;

  renderProduct();
  renderSimilarProducts();
  updateBreadcrumb();
}

function renderProduct() {
  const p = selectedProduct;

  // Image
  const imgEl = document.getElementById("productMainImg");
  if (imgEl) {
    imgEl.src = p.image.startsWith("assets/") ? `../${p.image}` : p.image;
    imgEl.alt = p.name;
  }

  // Brand info
  const logoEl = document.getElementById("productBrandLogo");
  if (logoEl) {
    logoEl.src = p.brandLogo.startsWith("assets/") ? `../${p.brandLogo}` : p.brandLogo;
    logoEl.alt = p.brand;
  }
  setText("productBrandName", p.brand);

  // Title & Description
  setText("productTitle", p.name);
  setText("productDescription", p.description || "Premium luxury fashion piece.");

  // Price
  setText("productCurrentPrice", `$${p.price}`);
  const origEl = document.getElementById("productOriginalPrice");
  if (origEl) {
    if (p.originalPrice && p.originalPrice !== p.price) {
      origEl.textContent = `$${p.originalPrice}`;
      origEl.style.display = "";
      const tag = document.getElementById("discountTag");
      if (tag) {
        const pct = Math.round((1 - p.price / p.originalPrice) * 100);
        tag.textContent = `-${pct}%`;
        tag.style.display = "";
      }
    } else {
      origEl.style.display = "none";
      const tag = document.getElementById("discountTag");
      if (tag) tag.style.display = "none";
    }
  }

  // Rating
  const starsEl = document.getElementById("productStars");
  if (starsEl) {
    let starsHtml = "";
    const full = Math.floor(p.rating);
    for (let i = 0; i < full; i++) starsHtml += '<i class="fa-solid fa-star"></i>';
    if (p.rating % 1 >= 0.5) starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
    starsEl.innerHTML = starsHtml;
  }
  setText("productRatingScore", p.rating?.toFixed(1));
  setText("productReviewsCount", `(${p.reviewsCount || 0} reviews)`);

  // Colors
  renderColorOptions(p.colors || []);

  // Sizes
  renderSizeOptions(p.sizes || []);

  // Qty
  updateQtyDisplay();
}

function renderColorOptions(colors) {
  const container = document.getElementById("colorOptions");
  if (!container) return;
  container.innerHTML = colors.map((c, i) => `
    <button class="color-btn ${i === 0 ? 'active' : ''}" 
      onclick="selectColor('${c}', this)" data-color="${c}">
      ${c}
    </button>
  `).join("");
  setText("selectedColorVal", colors[0] || "");
}

function renderSizeOptions(sizes) {
  const container = document.getElementById("sizeOptions");
  if (!container) return;
  container.innerHTML = sizes.map((s, i) => `
    <button class="size-btn ${i === 0 ? 'active' : ''}" 
      onclick="selectSize('${s}', this)" data-size="${s}">
      ${s}
    </button>
  `).join("");
  setText("selectedSizeVal", sizes[0] || "");
}

function selectColor(color, btn) {
  selectedColor = color;
  document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  setText("selectedColorVal", color);
}

function selectSize(size, btn) {
  selectedSize = size;
  document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  setText("selectedSizeVal", size);
}

function changeQty(delta) {
  selectedQty = Math.max(1, selectedQty + delta);
  updateQtyDisplay();
}

function updateQtyDisplay() {
  const el = document.getElementById("qtyValue");
  if (el) el.textContent = selectedQty;
}

function handleAddToCart() {
  if (!selectedProduct) return;
  addToCart(selectedProduct, {
    color: selectedColor,
    size: selectedSize,
    quantity: selectedQty
  });
  // Animate button
  const btn = document.getElementById("addToCartBtn");
  if (btn) {
    btn.textContent = "✓ Added!";
    btn.style.background = "#2a9d8f";
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';
      btn.style.background = "";
    }, 2000);
  }
}

function handleViewCart() {
  window.location.href = "cart.html";
}

function renderSimilarProducts() {
  const grid = document.getElementById("similarGrid");
  if (!grid || !selectedProduct) return;

  let similar = [];
  if (typeof getProductsByBrand === 'function') {
    similar = getProductsByBrand(selectedProduct.brandSlug)
      .filter(p => p.id !== selectedProduct.id)
      .slice(0, 4);
  }

  if (similar.length === 0) {
    grid.closest(".similar-products")?.remove();
    return;
  }

  grid.innerHTML = similar.map(p => `
    <div class="product-card" onclick="viewProduct('${p.id}')">
      <div class="product-img-wrap">
        <img src="../${p.image}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        <div class="brand-logo-wrap"><img src="../${p.brandLogo}" alt="${p.brand}" /></div>
      </div>
      <div class="product-body">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-footer">
          <span class="product-price">$${p.price}</span>
          <button class="product-cta" onclick="event.stopPropagation(); viewProduct('${p.id}')">View</button>
        </div>
      </div>
    </div>
  `).join("");
}

function updateBreadcrumb() {
  if (!selectedProduct) return;
  const brandEl = document.getElementById("breadcrumbBrand");
  const productEl = document.getElementById("breadcrumbProduct");
  const brandLinkEl = document.getElementById("breadcrumbBrandLink");

  const slugMap = { zara: "store-zara.html", gucci: "store-gucci.html", ck: "store-ck.html", vogue: "store-vogue.html" };
  if (brandEl) brandEl.textContent = selectedProduct.brand;
  if (brandLinkEl) brandLinkEl.href = slugMap[selectedProduct.brandSlug] || "#";
  if (productEl) productEl.textContent = selectedProduct.name;
}

// Override viewProduct for /pages/ context
function viewProduct(productId) {
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  if (product) {
    localStorage.setItem("selectedProductId", productId);
    localStorage.setItem("Name", JSON.stringify([product.image]));
    localStorage.setItem("Price", JSON.stringify([product.price.toString()]));
  }
  window.location.href = `product.html?id=${productId}`;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
