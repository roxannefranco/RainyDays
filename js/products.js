// importing array of products
import { products } from "./productList.js";
console.log(products);

const productsContainer = document.querySelector(".shop-items");
const cartLateral = document.querySelector("#cart-lateral");
const cartList = document.querySelector(".cart-list");

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

// Loops through all buttons and adds event listener to each
buttons.forEach(function (button) {
  // Add an event listener to each button (for click event)
  button.onclick = function (event) {
    // Get the id of the product that was clicked
    const addItem = products.find((item) => item.id === event.target.dataset.product);
    // Add the product to the cart
    cart.push(addItem);
    // Call a method to show the cart
    showCart(cart);
    // Invokes updateCartTotal method (without any arguments)
    updateCartTotal();
  };
});

// Show lateral cart on the side when adding items
function showCart(cartItems) {
  cartLateral.style.display = "block";
  cartList.innerHTML = "";
  cartItems.forEach(function (cartElement) {
    cartList.innerHTML += `
    <div class="cart-item">
    <h4>${cartElement.name}</h4>
    <img class="cart-image image-size" src="${cartElement.image}" alt="yellow and grey jacket" />
    </div>`;
    // missing price for each item and total price of items
  });
}
// targetting the span
let cartTotal = document.querySelector("#total-items");
// Method used to update the cart total span with number of items
function updateCartTotal() {
  // adding to the span the number of items in the cart
  cartTotal.innerHTML = cart.length;
}
