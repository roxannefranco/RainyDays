// importing array of products
import { products } from "./productList.js";
console.log(products);

const productsContainer = document.querySelector(".shop-items");

// adding imported products into the shop page
products.forEach(function (product) {
  productsContainer.innerHTML += `
  <div class="shop-item-container">
    <a href="product.html" class="shop-item">
        <img class="image-size" src="${product.image}" alt="yellow and grey jacket" />
        <h2 class="item-title">${product.name}</h2>
        <h3 class="item-price">${product.price}</h3>
        
    </a>
    <button class="cart-button cart-all" data-product="${product.id}">Add to cart</button>
    </div>
    `;
});

// adding product to cart by selecting its id
const buttons = document.querySelectorAll(".cart-button");
let cart = [];

buttons.forEach(function (button) {
  button.onclick = function (event) {
    const addItem = products.find((item) => item.id === event.target.dataset.product);
    cart.push(addItem);
    showCart(cart);
  };
});

function showCart(cartItems) {}
