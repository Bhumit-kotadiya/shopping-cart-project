// Product data
const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    image: "https://dummyimage.com/200x200/000/fff&text=Headphones",
    price: 59.99,
    brand: "Sony",
    category: "Electronics",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Smart Watch",
    image: "https://dummyimage.com/200x200/000/fff&text=Watch",
    price: 99.99,
    brand: "Apple",
    category: "Wearables",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Running Shoes",
    image: "https://dummyimage.com/200x200/000/fff&text=Shoes",
    price: 49.99,
    brand: "Nike",
    category: "Footwear",
    rating: 4.3,
  },
  {
    id: "4",
    name: "Gaming Mouse",
    image: "https://dummyimage.com/200x200/000/fff&text=Mouse",
    price: 29.99,
    brand: "Logitech",
    category: "Accessories",
    rating: 4.7,
  },
  {
    id: "5",
    name: "Bluetooth Speaker",
    image: "https://dummyimage.com/200x200/000/fff&text=Speaker",
    price: 39.99,
    brand: "JBL",
    category: "Audio",
    rating: 4.6,
  },
];

// Cart State
let cart = {};

function renderProducts() {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = '';
  products.forEach(p => {
    const prod = document.createElement('div');
    prod.className = 'product';
    prod.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="product-details">
        <span class="product-name">${p.name}</span> <br>
        <span class="brand">${p.brand}</span> | <span class="category">${p.category}</span> <br>
        <span class="price">$${p.price.toFixed(2)}</span>
      </div>
      <button onclick="addToCart('${p.id}')">Add to Cart</button>
    `;
    productsDiv.appendChild(prod);
  });
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = '';
  let total = 0, itemCount = 0;
  Object.values(cart).forEach(item => {
    total += item.price * item.qty;
    itemCount += item.qty;
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <span class="product-name">${item.name}</span><br>
        <span class="price">$${item.price.toFixed(2)}</span>
      </div>
      <button class="qty-btn" onclick="changeQty('${item.id}',1)">+</button>
      <span style="padding:0 8px;">${item.qty}</span>
      <button class="qty-btn" onclick="changeQty('${item.id}',-1)" ${item.qty === 1 ? "disabled" : ""}>-</button>
      <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
    `;
    cartItemsDiv.appendChild(cartItem);
  });
  document.getElementById('cart-total').textContent = 'Sub-Total: $' + total.toFixed(2);
  document.getElementById('item-count').textContent = itemCount + (itemCount === 1 ? ' item' : ' items');
}

function addToCart(pid) {
  const product = products.find(p => p.id === pid);
  if (cart[pid]) {
    cart[pid].qty += 1;
  } else {
    cart[pid] = {...product, qty: 1};
  }
  renderCart();
}

function removeFromCart(pid) {
  delete cart[pid];
  renderCart();
}

function changeQty(pid, delta) {
  if (cart[pid]) {
    cart[pid].qty += delta;
    if (cart[pid].qty < 1) cart[pid].qty = 1;
  }
  renderCart();
}

// Initial rendering
renderProducts();
renderCart();

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQty = changeQty;
