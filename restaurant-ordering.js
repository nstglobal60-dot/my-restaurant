// app.js
document.addEventListener('DOMContentLoaded', () => {
  const menu = [
    {id:1, name:"Margherita Pizza", desc:"Classic cheese & tomato", price:8.99, img:"images/Margherita Pizza.jpeg"},
    {id:2, name:"Cheeseburger", desc:"Beef patty, cheese, lettuce", price:7.49, img:"images/Cheeseburger.jpeg"},
    {id:3, name:"Caesar Salad", desc:"Romaine, croutons, dressing", price:6.50, img:"images/Caesar Salad.jpeg"},
    {id:4, name:"Spaghetti Bolognese", desc:"Pasta with rich meat sauce", price:9.25, img:"images/Spaghetti Bolognese.jpeg"},
    {id:5, name:"Sushi Platter", desc:"Variety of fresh sushi", price:12.50, img:"images/Sushi Platter.jpeg"},
    {id:6, name:"Chocolate Cake", desc:"Rich chocolate dessert", price:4.99, img:"images/Chocolate Cake.jpeg"},
    {id:6, name:"Chocolate Cake", desc:"Flavourful Row Shawama", price:4.99, img:"images/flavouful row shawama.jpeg"},
    {id:6, name:"Chocolate Cake", desc:"Nigeria Chicken Shawama", price:4.99, img:"images/Nigeria Chicken Shawama.jpeg"},
  ];

  const menuContainer = document.getElementById('menu');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const toggleCartBtn = document.getElementById('toggleCart');
  const closeCartBtn = document.getElementById('closeCart');
  const checkoutBtn = document.getElementById('checkoutBtn');

  let cart = [];

  // render menu
  function renderMenu(){
    menuContainer.innerHTML = '';
    menu.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="body">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <p><strong>$${item.price.toFixed(2)}</strong></p>
          <button data-id="${item.id}">Add to Order</button>
        </div>
      `;
      menuContainer.appendChild(card);
    });
  }

  // render cart
  function renderCart(){
    cartItemsEl.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      const li = document.createElement('li');
      li.innerHTML = `${item.name} x${item.qty} - $${(item.price*item.qty).toFixed(2)}
        <button data-id="${item.id}">Remove</button>`;
      cartItemsEl.appendChild(li);
    });
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
  }

  // add to cart
  menuContainer.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
      const id = parseInt(e.target.dataset.id);
      const item = menu.find(x => x.id === id);
      const cartItem = cart.find(x => x.id === id);
      if(cartItem){
        cartItem.qty +=1;
      } else {
        cart.push({...item, qty:1});
      }
      renderCart();
      openCart();
    }
  });

  // remove from cart
  cartItemsEl.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
      const id = parseInt(e.target.dataset.id);
      cart = cart.filter(x => x.id !== id);
      renderCart();
    }
  });

  // toggle cart sidebar
  function openCart(){cartSidebar.classList.add('active')}
  function closeCart(){cartSidebar.classList.remove('active')}
  toggleCartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);

  // checkout
  checkoutBtn.addEventListener('click', () => {
    if(cart.length ===0) {alert("Cart is empty"); return;}
    alert(`Thank you for your order!\nTotal: $${cart.reduce((sum,i)=>sum+i.price*i.qty,0).toFixed(2)}`);
    cart = [];
    renderCart();
    closeCart();
  });

  // initial render
  renderMenu();
  renderCart();
});
