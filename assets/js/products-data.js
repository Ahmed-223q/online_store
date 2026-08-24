/**
 * VALUE Store - Central Products Catalog
 * Single source of truth for all products across brands
 */

const PRODUCTS_DATA = [
  // ===================== ZARA =====================
  {
    id: "zara-1",
    name: "Tailored Italian Cotton Suit",
    brand: "Zara",
    brandSlug: "zara",
    price: 600,
    originalPrice: 750,
    category: "Suits",
    image: "assets/images/products/zara/09698633800-p.jpg",
    brandLogo: "assets/images/logos/zara.png",
    description: "Refined Italian cut tailored suit crafted with premium breathable cotton blend. Features notch lapels, interior pockets, and a modern slim silhouette perfect for executive and evening events.",
    rating: 4.9,
    reviewsCount: 34,
    badge: "Best Seller",
    colors: ["Black", "Navy Blue", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isTrending: true
  },
  {
    id: "zara-2",
    name: "Classic Heavy Cotton Overcoat",
    brand: "Zara",
    brandSlug: "zara",
    price: 2090,
    originalPrice: 2300,
    category: "Coats",
    image: "assets/images/products/zara/01255771051-015-p.jpg",
    brandLogo: "assets/images/logos/zara.png",
    description: "Timeless luxury winter coat with a sophisticated longline cut, structured shoulders, and warm, plush interior lining for supreme comfort in cold weather.",
    rating: 4.8,
    reviewsCount: 29,
    badge: "Exclusive",
    colors: ["Camel Beige", "Jet Black", "Dark Gray"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isTrending: false
  },
  {
    id: "zara-3",
    name: "Minimalist Trench Coat",
    brand: "Zara",
    brandSlug: "zara",
    price: 600,
    originalPrice: 720,
    category: "Coats",
    image: "assets/images/products/zara/08073270051-p.jpg",
    brandLogo: "assets/images/logos/zara.png",
    description: "Double-breasted trench coat with storm flaps, adjustable waist belt, and water-repellent finish for an effortless sleek look in any season.",
    rating: 4.7,
    reviewsCount: 19,
    badge: "New Arrival",
    colors: ["Beige", "Olive Green", "Black"],
    sizes: ["S", "M", "L"],
    isNew: true,
    isTrending: false
  },
  {
    id: "zara-4",
    name: "Relaxed Fit Designer Jeans",
    brand: "Zara",
    brandSlug: "zara",
    price: 500,
    originalPrice: 600,
    category: "Jeans",
    image: "assets/images/products/zara/06164162407-p2.jpg",
    brandLogo: "assets/images/logos/zara.png",
    description: "Premium washed denim jeans with a relaxed straight cut, reinforced stitching, and custom vintage-inspired matte hardware.",
    rating: 4.9,
    reviewsCount: 45,
    badge: "Popular",
    colors: ["Light Wash", "Mid Blue", "Raw Denim"],
    sizes: ["30", "32", "34", "36"],
    isNew: false,
    isTrending: true
  },

  // ===================== GUCCI =====================
  {
    id: "gucci-1",
    name: "Embroidered Heritage Sweatshirt",
    brand: "Gucci",
    brandSlug: "gucci",
    price: 2090,
    originalPrice: 2400,
    category: "Sweatshirts",
    image: "assets/images/products/gucci/784413-XJGQP-6317-sweatshirt-gucci_OTTODISANPIETRO-2.webp",
    brandLogo: "assets/images/logos/gucci.png",
    description: "Iconic Gucci crewneck sweatshirt featuring signature Italian heritage embroidery, loopback organic cotton fleece, and ribbed hems.",
    rating: 5.0,
    reviewsCount: 52,
    badge: "Luxury Iconic",
    colors: ["Cherry Red", "Obsidian Black", "Emerald Green"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isTrending: true
  },
  {
    id: "gucci-2",
    name: "Tweed Tailored Couture Blazer",
    brand: "Gucci",
    brandSlug: "gucci",
    price: 600,
    originalPrice: 850,
    category: "Blazers",
    image: "assets/images/products/gucci/RS25-317M-G-dress-self-portrait_OTTODISNAPIETRO-modelo-1.webp",
    brandLogo: "assets/images/logos/gucci.png",
    description: "Exquisite Italian tweed tailored blazer featuring subtle metallic threads, peaked lapels, custom gold-toned crest buttons, and silk lining.",
    rating: 4.9,
    reviewsCount: 38,
    badge: "Runway Pick",
    colors: ["Classic Tweed", "Ivory White", "Noir Black"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isTrending: true
  },
  {
    id: "gucci-3",
    name: "Monogram Sport Heritage Jacket",
    brand: "Gucci",
    brandSlug: "gucci",
    price: 600,
    originalPrice: 750,
    category: "Jackets",
    image: "assets/images/products/gucci/792383-XJGSE-2603-jacket-gucci-ottodisanpietro.webp",
    brandLogo: "assets/images/logos/gucci.png",
    description: "Where modern luxury athleisure meets timeless Italian craftsmanship. Features contrasting side taping, branded zip pulls, and waterproof technical shell.",
    rating: 4.8,
    reviewsCount: 26,
    badge: "Limited Edition",
    colors: ["Beige & Ebony", "Navy Blue", "Dark Brown"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isTrending: true
  },
  {
    id: "gucci-4",
    name: "Signature Calfskin Leather Jacket",
    brand: "Gucci",
    brandSlug: "gucci",
    price: 600,
    originalPrice: 800,
    category: "Jackets",
    image: "assets/images/products/gucci/H019297-Gucci-leather-jacket-Ottodisanpietro-1 (1).webp",
    brandLogo: "assets/images/logos/gucci.png",
    description: "Supple Italian calfskin leather jacket with silver-toned asymmetric zippers, snap-down collar, and quilted inner lining for unmatched style.",
    rating: 5.0,
    reviewsCount: 61,
    badge: "Must Have",
    colors: ["Obsidian Black", "Cognac Brown"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isTrending: true
  },

  // ===================== CALVIN KLEIN =====================
  {
    id: "ck-1",
    name: "Iconic Minimalist Wool Coat",
    brand: "Calvin Klein",
    brandSlug: "ck",
    price: 2090,
    originalPrice: 2350,
    category: "Coats",
    image: "assets/images/products/ck/22891107_022_main.webp",
    brandLogo: "assets/images/logos/ck.png",
    description: "Architectural clean lines in a premium wool blend coat. Features minimalist single-breasted fastening, smooth viscose lining, and clean hem styling.",
    rating: 4.8,
    reviewsCount: 41,
    badge: "Top Rated",
    colors: ["Heather Charcoal", "Jet Black", "Camel"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isTrending: false
  },
  {
    id: "ck-2",
    name: "Monogram Thermal Down Jacket",
    brand: "Calvin Klein",
    brandSlug: "ck",
    price: 2000,
    originalPrice: 2200,
    category: "Jackets",
    image: "assets/images/products/ck/24901193_200_main2.webp",
    brandLogo: "assets/images/logos/ck.png",
    description: "High-density thermal down fill coat engineered for cold climates with water-repellent shell and iconic subtle CK chest monogram badge.",
    rating: 4.9,
    reviewsCount: 35,
    badge: "Winter Essential",
    colors: ["Matte Black", "Olive Khaki", "Arctic White"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isTrending: true
  },
  {
    id: "ck-3",
    name: "90s Straight Fit Denim",
    brand: "Calvin Klein",
    brandSlug: "ck",
    price: 600,
    originalPrice: 700,
    category: "Jeans",
    image: "assets/images/products/ck/24901193_720_alternate1.webp",
    brandLogo: "assets/images/logos/ck.png",
    description: "The original 90s CK denim fit reconstructed in heavyweight rigid cotton denim with branded leather waistband patch and classic 5-pocket design.",
    rating: 4.7,
    reviewsCount: 28,
    badge: "Classic",
    colors: ["Vintage Blue", "Faded Black", "Stonewash"],
    sizes: ["30", "32", "34", "36"],
    isNew: false,
    isTrending: false
  },
  {
    id: "ck-4",
    name: "Modern Stretch Business Suit",
    brand: "Calvin Klein",
    brandSlug: "ck",
    price: 600,
    originalPrice: 780,
    category: "Suits",
    image: "assets/images/products/ck/21801281_070_main.webp",
    brandLogo: "assets/images/logos/ck.png",
    description: "Sleek tailored two-piece suit with 4-way stretch fabric designed for the modern cosmopolitan lifestyle. Wrinkle-resistant and breathable.",
    rating: 4.9,
    reviewsCount: 49,
    badge: "Best Seller",
    colors: ["Midnight Black", "Slate Gray", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isTrending: true
  },

  // ===================== VOGUE =====================
  {
    id: "vogue-1",
    name: "Editorial Statement Runway Coat",
    brand: "Vogue",
    brandSlug: "vogue",
    price: 2090,
    originalPrice: 2500,
    category: "Coats",
    image: "assets/images/products/vogue/w920_a3-4_q600.jpg",
    brandLogo: "assets/images/logos/vogue.png",
    description: "Editorial statement wool coat with exaggerated notch lapels and sumptuous soft texture straight from international fashion runways.",
    rating: 5.0,
    reviewsCount: 58,
    badge: "Runway Pick",
    colors: ["Editorial Cream", "Crimson Red", "Onyx Black"],
    sizes: ["S", "M", "L"],
    isNew: true,
    isTrending: true
  },
  {
    id: "vogue-2",
    name: "Luxury Ribbed Cashmere Cardigan",
    brand: "Vogue",
    brandSlug: "vogue",
    price: 600,
    originalPrice: 750,
    category: "Knitwear",
    image: "assets/images/products/vogue/NS900_DM8475_m.webp",
    brandLogo: "assets/images/logos/vogue.png",
    description: "Ultra-soft cashmere-cotton blend knit cardigan with natural horn buttons and relaxed drape for effortless luxury everyday styling.",
    rating: 4.8,
    reviewsCount: 31,
    badge: "Soft Touch",
    colors: ["Oatmeal Beige", "Sage Green", "Midnight Black"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    isTrending: false
  },
  {
    id: "vogue-3",
    name: "High-Rise Pleated Trouser",
    brand: "Vogue",
    brandSlug: "vogue",
    price: 600,
    originalPrice: 700,
    category: "Trousers",
    image: "assets/images/products/vogue/NT118_WT0149_m.webp",
    brandLogo: "assets/images/logos/vogue.png",
    description: "Wide-leg high-waisted pleated trousers crafted from fluid drape crepe fabric with concealed side closure for an elongated silhouette.",
    rating: 4.9,
    reviewsCount: 39,
    badge: "Trending",
    colors: ["Ivory White", "Espresso Brown", "Black"],
    sizes: ["XS", "S", "M", "L"],
    isNew: false,
    isTrending: true
  },
  {
    id: "vogue-4",
    name: "Couture Structured Studio Suit",
    brand: "Vogue",
    brandSlug: "vogue",
    price: 600,
    originalPrice: 850,
    category: "Suits",
    image: "assets/images/products/vogue/w2000_a3-4_q60 (1).jpg",
    brandLogo: "assets/images/logos/vogue.png",
    description: "Striking runway statement piece featuring sharp structured shoulders, cinched waistline, and contemporary couture drape silhouette.",
    rating: 5.0,
    reviewsCount: 44,
    badge: "Editor's Choice",
    colors: ["Classic Black", "Pure White", "Royal Sapphire"],
    sizes: ["S", "M", "L"],
    isNew: true,
    isTrending: true
  }
];

// Helper functions for data access
function getAllProducts() {
  return PRODUCTS_DATA;
}

function getProductById(id) {
  return PRODUCTS_DATA.find(p => p.id === id) || PRODUCTS_DATA[0];
}

function getProductsByBrand(brandSlug) {
  return PRODUCTS_DATA.filter(p => p.brandSlug.toLowerCase() === brandSlug.toLowerCase());
}

function getNewArrivals() {
  return PRODUCTS_DATA.filter(p => p.isNew || p.isTrending);
}

// Adjust path prefix helper (handles running from root vs /pages/)
function getRelativePath(path, isSubpage = false) {
  if (!path) return '';
  if (isSubpage) {
    return path.startsWith('assets/') ? '../' + path : path;
  }
  return path;
}
