/**
 * VALUE Store - Store Pages Script
 * Handles brand collection rendering, search, and sort
 */

let currentProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  // Get the brand from the page's data attribute
  const brandSlug = document.body.getAttribute("data-brand") || "zara";
  loadBrandProducts(brandSlug);
  initSearchAndSort();
  initHeroSlider();
});

function loadBrandProducts(brandSlug) {
  if (typeof getProductsByBrand === 'function') {
    currentProducts = getProductsByBrand(brandSlug);
  } else {
    currentProducts = [];
  }
  renderProducts(currentProducts);
}

function renderProducts(products) {
  const grid = document.getElementById("collection");
  const countEl = document.getElementById("resultsCount");

  if (countEl) {
    countEl.textContent = `${products.length} item${products.length !== 1 ? 's' : ''}`;
  }

  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-magnifying-glass"></i>
        <h3>No products found</h3>
        <p>Try a different search term or filter.</p>
      </div>`;
    return;
  }

  grid.innerHTML = products.map(product => {
    return `
      <div class="product-card" onclick="viewProduct('${product.id}')">
        <div class="product-img-wrap">
          <img src="../${product.image}" alt="${product.name}" loading="lazy" />
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <div class="brand-logo-wrap">
            <img src="../${product.brandLogo}" alt="${product.brand} logo" />
          </div>
        </div>
        <div class="product-body">
          <div class="product-brand">${product.brand}</div>
          <div class="product-name" title="${product.name}">${product.name}</div>
          <div class="product-footer">
            <div class="product-price-wrap">
              <span class="product-price">$${product.price}</span>
              ${product.originalPrice && product.originalPrice !== product.price
                ? `<span class="product-original-price">$${product.originalPrice}</span>`
                : ""}
            </div>
            <button class="product-cta" onclick="event.stopPropagation(); viewProduct('${product.id}')">
              View Details
            </button>
          </div>
        </div>
      </div>`;
  }).join("");
}

function initSearchAndSort() {
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");

  if (searchInput) {
    searchInput.addEventListener("input", () => applyFilters());
  }
  if (sortSelect) {
    sortSelect.addEventListener("change", () => applyFilters());
  }
}

function applyFilters() {
  const query = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();
  const sort = document.getElementById("sortSelect")?.value || "default";

  let filtered = currentProducts.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sort === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  renderProducts(filtered);
}

function initHeroSlider() {
  const slider = document.querySelector(".store-hero-slider");
  if (!slider) return;
  const slides = slider.querySelectorAll(".store-hero-slide");
  if (slides.length <= 1) return;

  let current = 0;
  const prevBtn = document.querySelector(".hero-prev-btn");
  const nextBtn = document.querySelector(".hero-next-btn");

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slider.style.transform = `translateX(-${current * 100}%)`;
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

  // Auto slide every 5s
  setInterval(() => goTo(current + 1), 5000);
}

// Override viewProduct to use correct path from /pages/
function viewProduct(productId) {
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  if (product) {
    localStorage.setItem("selectedProductId", productId);
    localStorage.setItem("Name", JSON.stringify([product.image]));
    localStorage.setItem("Price", JSON.stringify([product.price.toString()]));
  }
  window.location.href = `product.html?id=${productId}`;
}
