// =============================
// Lodhana Farm Script - Part 1
// =============================

const products = [
  {
    id: 1,
    name: "Tomato",
    price: 40,
    image: "🍅"
  },
  {
    id: 2,
    name: "Onion",
    price: 30,
    image: "🧅"
  },
  {
    id: 3,
    name: "Green Chilli",
    price: 80,
    image: "🌶️"
  },
  {
    id: 4,
    name: "Brinjal",
    price: 35,
    image: "🍆"
  },
  {
    id: 5,
    name: "Bitter Gourd",
    price: 50,
    image: "🥒"
  },
  {
    id: 6,
    name: "Potato",
    price: 25,
    image: "🥔"
  }
];

let cart = [];

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");

function displayProducts(list = products) {

    productsContainer.innerHTML = "";

    list.forEach(product => {

        productsContainer.innerHTML += `

        <div class="product-card">

            <div class="product-image">

                ${product.image}

            </div>

            <h3>${product.name}</h3>

            <p>₹${product.price}/kg</p>

            <button onclick="addToCart(${product.id})">

            Add To Cart

            </button>

        </div>

        `;

    });

}

displayProducts();// =============================
// Lodhana Farm Script - Part 2
// Shopping Cart
// =============================

function addToCart(id){

    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if(existing){

        existing.qty++;

    }else{

        cart.push({

            ...product,

            qty:1

        });

    }

    updateCart();

}

function increaseQty(id){

    const item = cart.find(product => product.id === id);

    item.qty++;

    updateCart();

}

function decreaseQty(id){

    const item = cart.find(product => product.id === id);

    item.qty--;

    if(item.qty<=0){

        cart = cart.filter(product => product.id !== id);

    }

    updateCart();

}

function updateCart(){

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const subtotal = document.getElementById("subtotal");

    const delivery = document.getElementById("delivery");

    const grandtotal = document.getElementById("grandtotal");

    cartItems.innerHTML="";

    let total = 0;

    let count = 0;

    cart.forEach(item=>{

        total += item.price * item.qty;

        count += item.qty;

        cartItems.innerHTML += `

        <div class="cart-card">

            <h4>${item.image} ${item.name}</h4>

            <p>₹${item.price}/kg</p>

            <button onclick="decreaseQty(${item.id})">-</button>

            <span>${item.qty}</span>

            <button onclick="increaseQty(${item.id})">+</button>

            <strong>

            ₹${item.price * item.qty}

            </strong>

        </div>

        `;

    });

    cartCount.innerHTML = count;

    subtotal.innerHTML = total;

    let deliveryCharge = 40;

    if(total>=299){

        deliveryCharge = 0;

    }

    delivery.innerHTML = deliveryCharge;

    grandtotal.innerHTML = total// =============================
// Lodhana Farm Script - Part 3
// Search + WhatsApp Checkout
// =============================

// Live Search
searchInput.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(keyword)
    );

    displayProducts(filtered);

});

// WhatsApp Order

document.getElementById("orderBtn").addEventListener("click", () => {

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    const customer =
    document.getElementById("customer").value;

    const phone =
    document.getElementById("phone").value;

    const address =
    document.getElementById("address").value;

    let message =
`🌾 *Lodhana Farm Order*

`;

cart.forEach(item=>{

message +=
`${item.image} ${item.name}
${item.qty} Kg
₹${item.price * item.qty}

`;

});

const subtotalValue =
Number(document.getElementById("subtotal").innerHTML);

const deliveryValue =
Number(document.getElementById("delivery").innerHTML);

const grandValue =
Number(document.getElementById("grandtotal").innerHTML);

message +=
`-----------------------

Subtotal : ₹${subtotalValue}

Delivery : ₹${deliveryValue}

Grand Total : ₹${grandValue}

-----------------------

Customer : ${customer}

Phone : ${phone}

Address :

${address}