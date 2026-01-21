let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderMenu(menuData) {
  const menu = document.getElementById('menu');
  if (!menu) return;
  menu.innerHTML = '';

  menuData.forEach(item => {
    const foodDiv = document.createElement('div');
    foodDiv.className = 'food-item';

    foodDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>${item.name}</div>
      <div>₹${item.price.toFixed(2)}</div>
      <button onclick='addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})'>Add to Cart</button>
    `;

    menu.appendChild(foodDiv);
  });
}

function addToCart(item) {
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  renderOverlayCart();
  showToast(`${item.name} added to cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  renderOverlayCart();
}

function renderCart() {
  const list = document.getElementById('cart-list');
  const total = document.getElementById('total');
  if (!list || !total) return;

  list.innerHTML = '';
  let sum = 0;

  cart.forEach((item, i) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';

    li.innerHTML = `
      <span>${item.name} - ₹${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${i})" class="delete-btn">
        <img src="assets/bin.png" alt="Delete" style="width: 18px; height: 18px;">
      </button>
    `;

    list.appendChild(li);
    sum += item.price;
  });

  total.textContent = sum.toFixed(2);
}

function renderOverlayCart() {
  const list = document.getElementById('cart-overlay-list');
  const total = document.getElementById('cart-overlay-total');
  const msg = document.getElementById('empty-cart-msg');
  if (!list || !total || !msg) return;

  list.innerHTML = '';
  let sum = 0;

  if (cart.length === 0) {
    msg.style.display = 'block';
    total.textContent = '0.00';
  } else {
    msg.style.display = 'none';

    cart.forEach((item, i) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';
      li.style.marginBottom = '10px';

      li.innerHTML = `
        <span>${item.name} - ₹${item.price.toFixed(2)}</span>
        <button onclick="removeFromCart(${i})" class="delete-btn">
          <img src="assets/bin.png" alt="Delete" style="width: 18px; height: 18px;">
        </button>
      `;
      list.appendChild(li);
      sum += item.price;
    });

    total.textContent = sum.toFixed(2);
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerText = message;
  toast.className = 'toast show';
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 3000);
}

function toggleCartOverlay() {
  const overlay = document.getElementById('cart-overlay');
  if (!overlay) return;

  overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
  renderOverlayCart();
}

function submitOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  document.getElementById('order-popup').style.display = 'flex';

  setTimeout(() => {
    document.getElementById('order-popup').style.display = 'none';
    cart = [];
    localStorage.removeItem('cart');
    renderCart();
    renderOverlayCart();
  }, 3000);
}

// Initial render
renderCart();
renderOverlayCart();
