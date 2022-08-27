import { products } from "./productsList.js";
import { key, secret } from "./credentials.js";

const cartLateral = document.querySelector("#cart-lateral");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");

// create cart empty array
let cart = [];

// targetting the total span
const cartTotal = document.querySelector("#total-items");

const urlParams = new URLSearchParams(window.location.search);
let id = null;

if (urlParams.has("id")) {
  id = urlParams.get("id");
}

const productContainer = document.querySelector("#single-item");

// adding a closing button for lateral cart
const closeButton = document.querySelector("#close-button");
closeButton.onclick = function () {
  cartLateral.style.display = "none";
};

// fetch single product from API
async function getSingleProduct() {
  // authentication
  const credentials = btoa(`${key}:${secret}`);

  // fetch single product
  let response = await fetch(
    `https://rainydays-wp.rafa.a2hosted.com/wp-json/wc/v1/products/${id}`,
    { headers: { Authorization: `Basic ${credentials}` } }
  );
  const singleProduct = await response.json();
  addSingleProduct(singleProduct);
}

getSingleProduct();

// insert into HTML
function addSingleProduct(product) {
  // add to HTML
  productContainer.innerHTML = `<div class="product-boxes">
          <div class="bg-grey box-product">
            <img src="${product.images[0].src}" alt="${product.images[0].alt}" />
          </div>
          <div>
            <div class="title-price">
              <h1 class="product-title">${product.name}</h1>
              <div class="price-tag">${product.price}kr</div>
            </div>
            <div class="bg-grey item-details">
              <h3 class="second-title">Select size</h3>
              <ul class="size-options">
                <li class="unique-size">XS</li>
                <li class="unique-size">S</li>
                <li class="unique-size">M</li>
                <li class="unique-size">L</li>
                <li class="unique-size">XL</li>
              </ul>
              <ul class="color-balls">
                <li class="unique-color" style="background-color: #e11b20"></li>
                <li class="unique-color" style="background-color: #e4bf30"></li>
                <li class="unique-color" style="background-color: black"></li>
              </ul>
              <p class="product-details">${product.description}</p>
            </div>
            <p class="delivery-note">
              Order with Express Shipping and get it by <span style="font-weight: bold">26th November!</span>
            </p>
            <a href="#" class="cart-button" data-product="${product.id}">Add to cart</a>
          </div>
        </div>`;

  // check if local storage has any products
  const cartStorage = JSON.parse(localStorage.getItem("cartList"));
  if (cartStorage != null) {
    cart = cartStorage;
    updateCartTotal();
  }

  // Add an event listener to each button (for click event)
  const buttonCart = document.querySelector(".cart-button");
  buttonCart.onclick = function (event) {
    // Get the id of the product that was clicked
    const dataId = event.target.dataset.product;
    const addItem = product;
    const itemInCart = cart.find((item) => item.id == dataId);

    // if item is NOT on the cart
    if (itemInCart == null) {
      // Adds the product to the cart for first time
      addItem.quantity = 1;
      cart.push(addItem);
    } else {
      // if IT is then count +1
      const index = cart.indexOf(itemInCart);
      cart[index].quantity += 1;
    }
    console.log(cart);
    // Call a method to show the cart
    showCart(cart);
    localStorage.setItem("cartList", JSON.stringify(cart));
    // Invokes updateCartTotal method (without any arguments)
    updateCartTotal();
  };
}

// Method used to update the cart total span with number of items
function updateCartTotal() {
  let total = 0;
  cart.forEach(function (product) {
    total += product.quantity;
  });
  // adding to the span the number of items in the cart
  cartTotal.innerHTML = total;
}

// Show lateral cart on the side when adding items
function showCart(cartItems) {
  cartLateral.style.display = "flex";
  cartList.innerHTML = "";
  let total = 0;
  cartItems.forEach(function (cartElement) {
    total += cartElement.price * cartElement.quantity;
    cartList.innerHTML += `
      <div class="cart-item">
      <h4>${cartElement.name}<span> X ${cartElement.quantity}</span></h4>
      <img class="cart-image image-size" src="${cartElement.images[0].src}" alt="${cartElement.images[0].alt}" />
      </div>`;
  });

  totalContainer.innerHTML = `Total: ${total}kr`;
}
