// start selectorF
let list = document.getElementById("list");
let sidebar = document.getElementById("sidebar");
let mark = document.getElementById("divMark");
let project = document.getElementById("project");
let amount = document.getElementById("amount");
let newArrivals = document.getElementById("newArrivals");
let btn = document.getElementById("btnToUp");
// =====================STOP USEING THE FUCKING DOM OBJECT BECAUSE IS FUCKING USELESS=========================

// end selector
// start side bar
list.onclick = () => {
  sidebar.classList.toggle("active");
  project.style.filter = "blur(10px)";
  project.style.transition = "1s";
};
mark.onclick = () => {
  sidebar.classList.toggle("active");
  project.style.filter = "blur(0px)";
};
// end side bar
amount.innerHTML = localStorage.cart || 0;

// start newArrivals
let ContentNewArrivals = [
  {
    imgSrc: "../../3materyal/ck/22891107_022_main.webp",
    logoSrc: "../../3materyal/logo/ck.png",
    title: "new cotton coat",
    price: "2000",
  },
  {
    imgSrc: "../../3materyal/ck/24901193_200_main2.webp",
    logoSrc: "../../3materyal/logo/ck.png",
    title: "new cotton coat",
    price: "2000",
  },
  {
    imgSrc: "../../3materyal/zara/09698633800-p.jpg",
    logoSrc: "../../3materyal/logo/zara.png",
    title: "cotton suit",
    price: "600",
  },
  {
    imgSrc: "../../3materyal/zara/01255771051-015-p.jpg",
    logoSrc: "../../3materyal/logo/zara.png",
    title: "new cotton coat",
    price: "2090",
  },
  {
    imgSrc: "../../3materyal/zara/08073270051-p.jpg",
    logoSrc: "../../3materyal/logo/zara.png",
    title: "cotton coat",
    price: "600",
  },
  {
    imgSrc: "../../3materyal/vogue/w2000_a3-4_q60 (1).jpg",
    logoSrc: "../../3materyal/logo/vogue.png",
    title: "new cotton coat",
    price: "2090",
  },
  {
    imgSrc: "../../3materyal/zara/06164162407-p2.jpg",
    logoSrc: "../../3materyal/logo/zara.png",
    title: "new cotton coat",
    price: "500",
  },
  {
    imgSrc:
      "../../3materyal/gucci/784413-XJGQP-6317-sweatshirt-gucci_OTTODISANPIETRO-2.webp",
    logoSrc: "../../3materyal/logo/gucci.png",
    title: "new cotton coat",
    price: "500",
  },
  {
    imgSrc:
      "../../3materyal/gucci/RS25-317M-G-dress-self-portrait_OTTODISNAPIETRO-modelo-1.webp",
    logoSrc: "../../3materyal/logo/gucci.png",
    title: "new cotton coat",
    price: "500",
  },
];
for (let i = 0; i < ContentNewArrivals.length; i++) {
  newArrivals.innerHTML += `
    <div id="content">
      <div id="card">
        <div class="section1">
          
            <img class="product" src="${ContentNewArrivals[i].imgSrc}" alt="Product photo" />
            <img class="logo" src="${ContentNewArrivals[i].logoSrc}" alt="Brand logo" />
          
        </div>
        <div class="section2">
          <h3>${ContentNewArrivals[i].title}</h3>
          <p>${ContentNewArrivals[i].price}$</p>
          <a href="../7ProductPage/index.html"><button id="submit" href="../7ProductPage/index.html" value="${ContentNewArrivals[i].imgSrc}" title="${ContentNewArrivals[i].price}" >Show More</button></a>
        </div>
      </div>
    </div>`;
}
let submit = document.querySelectorAll("#submit");

submit.forEach((item) => {
  item.onclick = () => {
    let Price = [];
    let Name = [];

    Price.unshift(item.title);
    localStorage.Price = JSON.stringify(Price);

    Name.unshift(item.value);
    localStorage.Name = JSON.stringify(Name);
  };
});

// localStorage.clear()

// Name = JSON.parse(localStorage.Name)
// Price = JSON.parse(localStorage.Price);

// end newArrivals
// start btn to up
window.onscroll = () => {
  if (window.scrollY <= 700) {
    btn.style.display = "none";
  } else {
    btn.style.display = "block";
  }
};
btn.onclick = () => {
  window.scroll({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
//end btn to up
