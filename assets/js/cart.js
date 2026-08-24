/**
 * VALUE Store - Cart Page Script
 * Full cart management with promo codes and checkout modal
 */

const PROMO_CODES = {
  "VALUE10": { type: "percent", value: 10, label: "10% Off" },
  "LUXURY20": { type: "percent", value: 20, label: "20% Off" },
  "SAVE50": { type: "fixed", value: 50, label: "$50 Off" }
};

let appliedPromo = null;

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  initPromoCode();
  initCheckoutModal();
});

function renderCart() {
  const cart = getCart();
  const itemsContainer = document.getElementById("cartItems");
  const countEl = document.getElementById("cartItemCount");
  const emptyState = document.getElementById("emptyCart");
  const summarySection = document.getElementById("orderSummary");

  const totalCount = cart.reduce((s, i) => s + (i.quantity || 1), 0);
  if (countEl) countEl.textContent = `${totalCount} item${totalCount !== 1 ? 's' : ''}`;

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = '';
    if (emptyState) emptyState.style.display = "block";
    if (summarySection) summarySection.style.display = "none";
    updateSummary();
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (summarySection) summarySection.style.display = "";

  itemsContainer.innerHTML = cart.map((item, index) => {
    const imgSrc = item.image?.startsWith("assets/") ? `../${item.image}` : (item.image || "../assets/images/products/zara/09698633800-p.jpg");
    const lineTotal = (item.price * (item.quantity || 1)).toFixed(0);

    return `
      <div class="cart-item-card" id="cart-item-${index}">
        <div class="cart-item-img">
          <img src="${imgSrc}" alt="${item.name}" loading="lazy" />
        </div>
        <div class="cart-item-body">
          <div>
            <div class="cart-item-brand">${item.brand || 'VALUE'}</div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-attrs">
              ${item.color ? `<span class="cart-attr-tag"><i class="fa-solid fa-circle" style="color:#9f835b;font-size:0.6rem;"></i> ${item.color}</span>` : ""}
              ${item.size ? `<span class="cart-attr-tag">Size: ${item.size}</span>` : ""}
            </div>
          </div>
          <div class="cart-item-footer">
            <span class="cart-item-price">$${lineTotal}</span>
            <div class="cart-qty-control">
              <button class="cart-qty-btn" onclick="changeItemQty(${index}, -1)"><i class="fa-solid fa-minus"></i></button>
              <span class="cart-qty-val">${item.quantity || 1}</span>
              <button class="cart-qty-btn" onclick="changeItemQty(${index}, 1)"><i class="fa-solid fa-plus"></i></button>
            </div>
            <button class="cart-remove-btn" onclick="deleteItem(${index})" title="Remove item">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>`;
  }).join("");

  updateSummary();
}

function changeItemQty(index, delta) {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return;
  const newQty = (cart[index].quantity || 1) + delta;
  if (newQty <= 0) {
    deleteItem(index);
    return;
  }
  cart[index].quantity = newQty;
  saveCart(cart);
  renderCart();
}

function deleteItem(index) {
  removeFromCart(index);
  renderCart();
}

function updateSummary() {
  const subtotal = getCartSubtotal();
  const shipping = subtotal > 0 ? (subtotal >= 1000 ? 0 : 30) : 0;
  let discount = 0;

  if (appliedPromo) {
    const promo = PROMO_CODES[appliedPromo];
    if (promo.type === "percent") discount = Math.round(subtotal * promo.value / 100);
    else discount = Math.min(promo.value, subtotal);
  }

  const total = Math.max(0, subtotal - discount + shipping);

  setText("summarySubtotal", subtotal > 0 ? `$${subtotal}` : "$0");
  setText("summaryShipping", shipping === 0 && subtotal > 0 ? "Free" : (shipping > 0 ? `$${shipping}` : "$0"));
  setText("summaryDiscount", discount > 0 ? `-$${discount}` : "$0");
  setText("summaryTotal", `$${total}`);
  setText("summaryTotalModal", `$${total}`);

  // Show/hide discount row
  const discountRow = document.getElementById("discountRow");
  if (discountRow) discountRow.style.display = discount > 0 ? "" : "none";
}

function initPromoCode() {
  const applyBtn = document.getElementById("applyPromoBtn");
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const input = document.getElementById("promoInput");
      const code = (input?.value || "").trim().toUpperCase();
      const feedback = document.getElementById("promoFeedback");

      if (PROMO_CODES[code]) {
        appliedPromo = code;
        const promo = PROMO_CODES[code];
        if (feedback) {
          feedback.className = "promo-feedback success";
          feedback.textContent = `✓ Code "${code}" applied! ${promo.label}`;
        }
        updateSummary();
        showToast("Promo Applied!", `${promo.label} discount applied to your order.`, "success");
      } else {
        appliedPromo = null;
        if (feedback) {
          feedback.className = "promo-feedback error";
          feedback.textContent = "Invalid promo code. Try: VALUE10, LUXURY20, SAVE50";
        }
        updateSummary();
      }
    });
  }
}

function initCheckoutModal() {
  const checkoutBtn = document.getElementById("checkoutBtn");
  const modal = document.getElementById("checkoutModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const form = document.getElementById("checkoutForm");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = getCart();
      if (cart.length === 0) {
        showToast("Empty Cart", "Please add items before checkout.", "warning");
        return;
      }
      if (modal) modal.classList.add("active");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (modal) modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handlePlaceOrder();
    });
  }
}

function handlePlaceOrder() {
  const form = document.getElementById("checkoutForm");
  const success = document.getElementById("orderSuccess");

  // Simulate order processing
  const placeBtn = document.querySelector(".btn-place-order");
  if (placeBtn) {
    placeBtn.textContent = "Processing...";
    placeBtn.disabled = true;
  }

  setTimeout(() => {
    // Clear cart
    saveCart([]);
    appliedPromo = null;

    // Show success
    if (form) form.style.display = "none";
    if (success) success.style.display = "block";

    const orderNum = Math.random().toString(36).substr(2, 9).toUpperCase();
    setText("orderNumber", `#${orderNum}`);
  }, 1800);
}

function continueShopping() {
  window.location.href = "../index.html";
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
