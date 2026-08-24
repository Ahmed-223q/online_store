// start selector
let list = document.getElementById("list");
let sidebar = document.getElementById("sidebar");
let mark = document.getElementById("divMark");
let project = document.getElementById("project");
let btn = document.getElementById("btnToUp");
let CartContent = document.getElementById("cartContent");
let Divtotal = document.getElementById("total");

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

// start cart
let nameCart = JSON.parse(localStorage.getItem("nameTotal")) || [];
let priceCart = JSON.parse(localStorage.getItem("priceTotal")) || [];

let total = 0;
if (nameCart.length == 0) {
  CartContent.innerHTML = `
    <h2>(Your cart is Empty)<h2/>
`;
} else {
  for (let i = 0; i < nameCart.length; i++) {
    CartContent.innerHTML += `
      <div id="product">
          <img
            src="${nameCart[i]}"
            alt="product photo"
          />
          <div class="inbox">
              <p>
                <span class="titles">Title:</span>
                <span class="item">new cotton coat</span>
              </p>
              <p>
                <span class="titles">Price:</span> <span class="item">${priceCart[i]}$</span>
              </p>
              <p>
                <span class="titles">Color:</span> <span class="item">Red</span>
              </p>
          </div>
            <div onclick="deletData(${i})" id="exitMark">
              <i class="fa-solid fa-trash"></i>
            </div>
      </div>
      `;
    total += +priceCart[i];
  }
}
Divtotal.innerHTML = `<p>Total: <span>${total}$</span></p>`;
function deletData(i) {
  nameCart.splice(i, 1);
  priceCart.splice(i, 1);
  localStorage.nameTotal = JSON.stringify(nameCart);
  localStorage.priceTotal = JSON.stringify(priceCart);
  localStorage.cart -= 1;

  //
  window.location.reload();
}

// end cart
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
