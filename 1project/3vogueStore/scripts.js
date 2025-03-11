// start selector
let list = document.getElementById("list");
let sidebar = document.getElementById("sidebar");
let mark = document.getElementById("divMark");
let project = document.getElementById("project");
let btn = document.getElementById("btnToUp");

//

//

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

// start collection
let ContentNewArrivals = [{
  "imgSrc": "../../3materyal/vogue/w920_a3-4_q600.jpg",
  "logoSrc": "../../3materyal/logo/vogue.png",
  "title": "new cotton coat",
  "price": "2090"
},
{
  "imgSrc": "../../3materyal/vogue/NS900_DM8475_m.webp",
  "logoSrc": "../../3materyal/logo/vogue.png",
  "title": "cotton coat",
  "price": "600"
},
{
  "imgSrc": "../../3materyal/vogue/NT118_WT0149_m.webp",
  "logoSrc": "../../3materyal/logo/vogue.png",
  "title": "New Jeans",
  "price": "600"
},

{
  "imgSrc": "../../3materyal/vogue/w2000_a3-4_q60 (1).jpg",
  "logoSrc": "../../3materyal/logo/vogue.png",
  "title": "cotton suit",
  "price": "600"
}]
for (let i = 0; i < ContentNewArrivals.length; i++) {
  collection.innerHTML += `
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
//end collection

// start btn to up
window.onscroll = () => {
  if (window.scrollY <= 300) {
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
