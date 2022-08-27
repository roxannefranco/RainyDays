const cartItems = JSON.parse(localStorage.getItem("cartList"));
const cartContainer = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total-value");
const cartTotal = document.querySelector("#total-items");

// adding item and cart total
function createCart() {
  let total = 0;
  updateCartTotal();
  cartContainer.innerHTML = "";
  cartItems.forEach(function (cartElement, index) {
    // multiplying the price of each item according to its quantity
    total += cartElement.price * cartElement.quantity;
    cartContainer.innerHTML += `
  <div data-index="${index}" class="product-row">
  <div class="image-box">
    <img src="${cartElement.images[0].src}" alt="${cartElement.images[0].alt}" />
    <span>${cartElement.quantity}</span>
  </div>
  <h2 class="title">${cartElement.name}</h2>
  <div class="container-size-color-price">
    <h3 class="price">${cartElement.price}kr</h3>
    <button data-index="${index}" class="trash-icon"><i class="far fa-trash-alt"></i></button>
  </div>
</div>`;
  });
  totalContainer.innerHTML = `${total}kr`;

  const trashButtons = document.querySelectorAll(".trash-icon");

  trashButtons.forEach(function (trash) {
    trash.onclick = function (event) {
      const dataIndex = event.target.dataset.index;
      // remove item on clicked index
      cartItems.splice(dataIndex, 1);
      localStorage.setItem("cartList", JSON.stringify(cartItems));
      createCart();
    };
  });
}
// initial call
createCart();

// Method used to update the cart total span with number of items
function updateCartTotal() {
  let total = 0;
  cartItems.forEach(function (product) {
    total += product.quantity;
  });
  // adding to the span the number of items in the cart
  cartTotal.innerHTML = total;
}
