# VALUE — Luxury Fashion Online Store

An ultra-modern, fully responsive e-commerce web application for luxury fashion brands, featuring **Zara**, **Gucci**, **Calvin Klein**, and **Vogue**.

---

## 🌟 Overview & Features

- **Luxury Design & Typography**: Built with modern CSS variables, Google Fonts (`Cinzel`, `Plus Jakarta Sans`, `Noto Serif`), smooth micro-animations, glassmorphism, and responsive layouts.
- **Dynamic Product Catalog**: Centralized data management (`products-data.js`) powering all stores, new arrivals, ratings, badges, and pricing.
- **Brand Storefronts**:
  - [Zara Store](pages/store-zara.html)
  - [Gucci Store](pages/store-gucci.html)
  - [Calvin Klein Store](pages/store-ck.html)
  - [Vogue Store](pages/store-vogue.html)
- **Live Search & Sorting**: Instant client-side search by name/category and sorting by price (asc/desc), ratings, and alphabet.
- **Interactive Product Page**: Full product details, size selector, color selector, interactive quantity controls, ratings, dynamic reviews count, and "You May Also Like" recommendations.
- **Universal Cart System (`localStorage`)**:
  - Real-time cart counter badge synced across all pages with animated "bump" effect.
  - Multi-item management with variant selection (size + color).
  - Quantity increment/decrement and individual item deletion.
  - Promo code discounts (`VALUE10`, `LUXURY20`, `SAVE50`).
  - Dynamic shipping calculation and total computation.
  - Complete checkout modal with order confirmation workflow.
- **Interactive Toast Notifications**: Non-blocking modern feedback toasts for user actions (cart additions, removals, promo application, newsletter signup).
- **Mobile Responsive & Accessible**: Off-canvas sliding sidebar with animated backdrop overlay, back-to-top button, keyboard escape support, and touch-friendly UI.
- **Contact & FAQ Page**: Interactive accordion FAQ and contact form with instant validation.

---

## 📁 Project Structure

```text
online_store/
├── index.html                  # Main landing / home page
├── README.md                   # Project documentation
├── assets/
│   ├── css/
│   │   ├── main.css            # Global theme variables, reset, navbar, footer, sidebar, toasts
│   │   ├── home.css            # Hero, stats counter, brand grid, new arrivals
│   │   ├── store.css           # Store hero slider, toolbar, product grid
│   │   ├── product.css         # Product detail gallery, options selector, meta info
│   │   └── cart.css            # Cart items list, summary, promo, checkout modal
│   ├── js/
│   │   ├── products-data.js    # Single source of truth product catalog
│   │   ├── main.js             # Global cart manager, toasts, sidebar, utilities
│   │   ├── home.js             # New arrivals renderer, stats counter animator
│   │   ├── store.js            # Brand store filter, search, sort, hero slider
│   │   ├── product.js          # Dynamic product detail page logic
│   │   └── cart.js             # Cart rendering, promo engine, checkout modal
│   └── images/
│       ├── hero/               # Homepage hero & brand background images
│       ├── logos/              # Brand logos & icons
│       ├── products/           # Categorized product photography (zara, gucci, ck, vogue)
│       └── stores/             # Brand boutique & editorial imagery for sliders
└── pages/
    ├── store-zara.html         # Zara collection storefront
    ├── store-gucci.html        # Gucci collection storefront
    ├── store-ck.html           # Calvin Klein collection storefront
    ├── store-vogue.html        # Vogue collection storefront
    ├── product.html            # Dynamic product detail page
    ├── cart.html               # Shopping cart & checkout
    └── contact.html            # Contact us & FAQ accordion
```

---

## 🎟️ Available Promo Codes

| Code | Discount |
| :--- | :--- |
| `VALUE10` | 10% Off Entire Order |
| `LUXURY20` | 20% Off Entire Order |
| `SAVE50` | $50 Flat Discount |

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser or serve via a local server (such as VS Code Live Server or `python -m http.server`). No build tools or backend servers required.

---

## 👨‍💻 Authors & Credits

- **Ahmed Ibrahim**
- **Adham Alaa**
