/**
 * VALUE Store - Home Page Script
 * Renders New Arrivals and Brand Grid
 */

document.addEventListener("DOMContentLoaded", () => {
  renderNewArrivals();
  animateStats();
});

function renderNewArrivals() {
  const grid = document.getElementById("newArrivals");
  if (!grid) return;

  const products = typeof getNewArrivals === 'function' ? getNewArrivals() : [];

  if (products.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:#8b95a1;padding:40px">No products available.</p>';
    return;
  }

  grid.innerHTML = products.map(product => {
    const discount = product.originalPrice
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;
    const stars = renderStars(product.rating);

    return `
      <div class="product-card" onclick="viewProduct('${product.id}')">
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <div class="brand-logo-wrap">
            <img src="${product.brandLogo}" alt="${product.brand} logo" />
          </div>
        </div>
        <div class="product-body">
          <div class="product-brand">${product.brand}</div>
          <div class="product-name" title="${product.name}">${product.name}</div>
          <div class="product-footer">
            <div class="product-price-wrap">
              <span class="product-price">\$${product.price}</span>
              ${product.originalPrice && product.originalPrice !== product.price
                ? `<span class="product-original-price">\$${product.originalPrice}</span>`
                : ""}
            </div>
            <button class="product-cta" onclick="event.stopPropagation(); viewProduct('${product.id}')">
              View Details
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
  if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  return html;
}

function animateStats() {
  const stats = document.querySelectorAll(".stat-number[data-target]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute("data-target"));
        const suffix = entry.target.getAttribute("data-suffix") || "";
        animateCounter(entry.target, 0, target, 1800, suffix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(s => observer.observe(s));
}

function animateCounter(el, start, end, duration, suffix) {
  const range = end - start;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + range * eased).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
