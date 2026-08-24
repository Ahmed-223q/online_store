// start selector
let list = document.getElementById("list");
let sidebar = document.getElementById("sidebar");
let mark = document.getElementById("divMark");
let project = document.getElementById("project");
let btnToUp = document.getElementById("btnToUp");
let bg = document.getElementById("bg");
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

// start cart

function addToCart() {
  let cart = localStorage.cart || 0;
  cart = parseInt(cart) + 1;
  localStorage.cart = cart;
  amount.innerHTML = cart;
  //
  let priceTotal = JSON.parse(localStorage.getItem("priceTotal") || "[]");
  let nameTotal = JSON.parse(localStorage.getItem("nameTotal") || "[]");

  let newPrice = JSON.parse(localStorage.Price || "[]");
  let newName = JSON.parse(localStorage.Name || "[]");

  priceTotal.push(newPrice);
  nameTotal.push(newName);

  localStorage.setItem("priceTotal", JSON.stringify(priceTotal));
  localStorage.setItem("nameTotal", JSON.stringify(nameTotal));
}

amount.innerHTML = localStorage.cart || 0;
// end cart

// localStorage.clear()

// start product
let name = JSON.parse(localStorage.Name);
let price = JSON.parse(localStorage.Price);
bg.innerHTML = `
<img class="img" src="${name}"/>
        <div class="details">
          <div>
            <span>Title: </span>
            <samp>Cotton hoode</samp>
          </div>
          <div>
            <span>Price: </span>
            <samp>${price}$</samp>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque,
              maiores Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Itaque, maiores
            </p>
          </div>
          <button id="btn" onclick="addToCart()">add to Cart</button>
        </div>`;
// end product

// start btn to up
window.onscroll = () => {
  if (window.scrollY <= 300) {
    btnToUp.style.display = "none";
  } else {
    btnToUp.style.display = "block";
  }
};
btnToUp.onclick = () => {
  window.scroll({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
//end btn to up
