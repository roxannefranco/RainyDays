const cartItems = JSON.parse(localStorage.getItem("cartList"));
const cartContainer = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total-value");

let total = 0;
cartItems.forEach(function (cartElement) {
  total += cartElement.price;
  cartContainer.innerHTML += `
  <div class="product-row">
  <div class="image-box">
    <img src="${cartElement.image}" alt="white jacket" />
    <span>1</span>
  </div>
  <h2 class="title">${cartElement.name}</h2>
  <div class="container-size-color-price">
    <h3 class="price">${cartElement.price}kr</h3>
    <a class="trash-icon" href="#"><i class="far fa-trash-alt"></i></a>
  </div>
</div>`;
});

totalContainer.innerHTML = `${total}kr`;
