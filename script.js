const products = [
  { name: "🍅 Tomato", price: 40 },
  { name: "🧅 Onion", price: 30 },
  { name: "🌶️ Green Chilli", price: 80 },
  { name: "🍆 Brinjal", price: 35 },
  { name: "🥒 Bitter Gourd", price: 50 },
  { name: "🥔 Potato", price: 25 },
  { name: "🥕 Carrot", price: 45 },
  { name: "🥬 Cabbage", price: 30 }
];

let cart = [];

function render(list = products) {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";

  list.forEach((item) => {
    productsDiv.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>₹${item.price}/kg</p>
        <button onclick="addToCart('${item.name}', ${item.price})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  document.getElementById("count").innerText = cart.length;

  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price;
    cartDiv.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
  });

  document.getElementById("total").innerText = total;
}

document.getElementById("search").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  render(filtered);
});

render();