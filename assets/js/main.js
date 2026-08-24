/**
 * VALUE Store - Global JavaScript (main.js)
 * Manages Navigation, Sidebar, Universal Cart, Toast Notifications, and Utilities
 */

// ===================== CART MANAGEMENT =====================
const CART_STORAGE_KEY = "value_store_cart_v2";

/**
 * Get current cart items
 * Handles backward compatibility with old localStorage format if any
 */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    
    // Backward compatibility migration if old keys exist
    if (localStorage.getItem("nameTotal") && localStorage.getItem("priceTotal")) {
      const oldNames = JSON.parse(localStorage.getItem("nameTotal") || "[]");
      const oldPrices = JSON.parse(localStorage.getItem("priceTotal") || "[]");
      const migrated = [];
      
      for (let i = 0; i < oldNames.length; i++) {
        const rawName = Array.isArray(oldNames[i]) ? oldNames[i][0] : oldNames[i];
        const rawPrice = Array.isArray(oldPrices[i]) ? oldPrices[i][0] : oldPrices[i];
        
        migrated.push({
          id: `migrated-${i}`,
          name: "Luxury Item",
          brand: "VALUE",
          price: parseFloat(rawPrice) || 600,
          image: rawName || "assets/images/products/zara/09698633800-p.jpg",
          color: "Classic",
          size: "M",
          quantity: 1
        });
      }
      
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch (e) {
    console.error("Error reading cart:", e);
  }
  return [];
}

/**
 * Save cart to localStorage and update badges
 */
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Keep old cart count synced just in case
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    localStorage.setItem("cart", totalCount);
  } catch (e) {
    console.error("Error saving cart:", e);
  }
  updateCartBadge();
}

/**
 * Add product to cart
 */
function addToCart(product, options = {}) {
  const cart = getCart();
  const color = options.color || (product.colors && product.colors[0]) || "Classic";
  const size = options.size || (product.sizes && product.sizes[0]) || "M";
  const quantity = parseInt(options.quantity, 10) || 1;

  // Check if same item with same color and size already exists
  const existingIndex = cart.findIndex(
    item => item.id === product.id && item.color === color && item.size === size
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand || "VALUE",
      price: product.price,
      image: product.image,
      color: color,
      size: size,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast("Added to Cart!", `${product.name} (${color}, ${size}) added.`, "success");
}

/**
 * Update quantity of a cart item
 */
function updateCartQuantity(index, newQty) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    if (newQty <= 0) {
      cart.splice(index, 1);
      showToast("Item Removed", "Product removed from your cart.", "info");
    } else {
      cart[index].quantity = newQty;
    }
    saveCart(cart);
  }
}

/**
 * Remove specific item from cart
 */
function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removed = cart.splice(index, 1);
    saveCart(cart);
    showToast("Item Removed", `${removed[0]?.name || 'Item'} removed from cart.`, "info");
  }
}

/**
 * Clear entire cart
 */
function clearCart() {
  saveCart([]);
  showToast("Cart Cleared", "All items have been removed.", "info");
}

/**
 * Get total quantity count
 */
function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

/**
 * Get subtotal price
 */
function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
}

/**
 * Update cart badges in the UI
 */
function updateCartBadge() {
  const count = getCartCount();
  const badges = document.querySelectorAll("#amount, .cart-badge, .cart-count");
  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.remove("bump");
    void badge.offsetWidth; // Trigger reflow
    badge.classList.add("bump");
  });
}

// ===================== TOAST NOTIFICATIONS =====================
function initToastContainer() {
  if (!document.getElementById("toast-container")) {
    const container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
}

function showToast(title, message, type = "success") {
  initToastContainer();
  const container = document.getElementById("toast-container");
  
  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type}`;
  
  let iconHtml = '<i class="fa-solid fa-check-circle"></i>';
  if (type === "info") iconHtml = '<i class="fa-solid fa-circle-info"></i>';
  if (type === "warning") iconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
  if (type === "error") iconHtml = '<i class="fa-solid fa-circle-xmark"></i>';

  toast.innerHTML = `
    <div class="toast-icon">${iconHtml}</div>
    <div class="toast-body">
      <h4 class="toast-title">${title}</h4>
      <p class="toast-msg">${message}</p>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.add("toast-fadeout");
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

// ===================== NAVIGATION & PRODUCT REDIRECTION =====================
function viewProduct(productId) {
  // Determine relative path based on current location
  const isInsidePages = window.location.pathname.includes("/pages/");
  const targetUrl = isInsidePages ? `product.html?id=${productId}` : `pages/product.html?id=${productId}`;
  
  // Set in localStorage as fallback
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  if (product) {
    localStorage.setItem("selectedProductId", productId);
    localStorage.setItem("Name", JSON.stringify([product.image]));
    localStorage.setItem("Price", JSON.stringify([product.price.toString()]));
  }
  
  window.location.href = targetUrl;
}

// ===================== DOM INITIALIZATION =====================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Toast Container
  initToastContainer();

  // Update Cart Badge on Load
  updateCartBadge();

  // Sidebar Toggle & Overlay Logic
  const listBtn = document.getElementById("list");
  const sidebar = document.getElementById("sidebar");
  const markBtn = document.getElementById("divMark");
  
  // Create or retrieve backdrop overlay
  let backdrop = document.querySelector(".sidebar-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "sidebar-backdrop";
    document.body.appendChild(backdrop);
  }

  function openSidebar() {
    if (sidebar) sidebar.classList.add("active");
    if (backdrop) backdrop.classList.add("active");
    document.body.classList.add("sidebar-open");
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
    document.body.classList.remove("sidebar-open");
  }

  if (listBtn) {
    listBtn.addEventListener("click", openSidebar);
  }
  if (markBtn) {
    markBtn.addEventListener("click", closeSidebar);
  }
  if (backdrop) {
    backdrop.addEventListener("click", closeSidebar);
  }

  // Escape key closes sidebar
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  // Scroll to Top Button
  const btnToUp = document.getElementById("btnToUp");
  if (btnToUp) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        btnToUp.classList.add("visible");
        btnToUp.style.display = "flex";
      } else {
        btnToUp.classList.remove("visible");
        btnToUp.style.display = "none";
      }
    });

    btnToUp.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          closeSidebar();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
