const productsContainer = document.querySelector(".shop-items");
const cartLateral = document.querySelector("#cart-lateral");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");

// targetting the total span
const cartTotal = document.querySelector("#total-items");

// adding product to cart by selecting its id
const buttons = document.querySelectorAll(".cart-button");
let cart = [];

// check if local storage has any products
const cartStorage = JSON.parse(localStorage.getItem("cartList"));
if (cartStorage != null) {
  cart = cartStorage;
  updateCartTotal();
}

// Loops through all buttons and adds event listener to each
buttons.forEach(function (button) {
  // Add an event listener to each button (for click event)
  button.onclick = function (event) {
    // Get the id of the product that was clicked
    const dataId = event.target.dataset.product;
    const addItem = products.find((item) => item.id === dataId);
    const itemInCart = cart.find((item) => item.id === dataId);
    if (itemInCart == null) {
      // Add the product to the cart
      addItem.quantity = 1;
      cart.push(addItem);
    } else {
      // count +1
      const index = cart.indexOf(itemInCart);
      cart[index].quantity += 1;
    }
    console.log(cart);
    // Call a method to show the cart
    showCart(cart);
    localStorage.setItem("cartList", JSON.stringify(cart));
    // Invokes updateCartTotal
    updateCartTotal();
  };
});

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
    <img class="cart-image image-size" src="${cartElement.image}" alt="yellow and grey jacket" />
    </div>`;
  });

  totalContainer.innerHTML = `Total: ${total}kr`;
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

// adding a closing button for lateral cart
const closeButton = document.querySelector("#close-button");
closeButton.onclick = function () {
  cartLateral.style.display = "none";
};

// Fetch products from Wordpress Headless
async function getProducts() {
  // Basic Authentication credentials
  const key = "ck_f96e886056108b327e097e754ad258de85144cf1";
  const secret = "cs_661995643e5ad647839804fe5c1b5045873c36ab";
  const credentials = btoa(`${key}:${secret}`);

  // fetch products
  let response = await fetch(
    "https://rainydays-wp.rafa.a2hosted.com/wp-json/wc/v1/products?per_page=15&orderby=id&order=asc",
    { headers: { Authorization: `Basic ${credentials}` } }
  );
  const products = await response.json();

  // add products to view
  addProductsToHTML(products);
}

getProducts();

// adding imported products into the shop page
function addProductsToHTML(p) {
  p.forEach(function (product) {
    productsContainer.innerHTML += `
  <div class="shop-item-container">
    <a href="product.html?id=${product.id}" class="shop-item">
        <img class="image-size" src="${product.images[0].src}" alt="yellow and grey jacket" />
        <h2 class="item-title">${product.name}</h2>
        <h3 class="item-price">${product.price}kr</h3>  
    </a>
    <button class="cart-button cart-all" data-product="${product.id}">Add to cart</button>
    </div>
    `;
  });
}
