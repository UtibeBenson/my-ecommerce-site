// Products data with images
const products = [
    { id: 1, name: "Smartphone", price: 199, img: "https://via.placeholder.com/280x180?text=Smartphone" },
    { id: 2, name: "Laptop", price: 799, img: "https://via.placeholder.com/280x180?text=Laptop" },
    { id: 3, name: "Headphones", price: 99, img: "https://via.placeholder.com/280x180?text=Headphones" },
    { id: 4, name: "Smartwatch", price: 149, img: "https://via.placeholder.com/280x180?text=Smartwatch" }
  ];
  
  const productsDiv = document.getElementById("products");
  const cartItemsUl = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");
  
  let cart = [];
  
  // Display products dynamically
  function displayProducts() {
    productsDiv.innerHTML = ''; // clear before adding
    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.img}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productsDiv.appendChild(div);
    });
  }
  
  // Add item to cart
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
  
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      existingItem.qty++;
    } else {
      cart.push({...product, qty: 1});
    }
    updateCart();
  }
  
  // Remove item from cart
  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
  }
  
  // Update cart UI and total
  function updateCart() {
    cartItemsUl.innerHTML = '';
    let total = 0;
  
    cart.forEach(item => {
      total += item.price * item.qty;
  
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}
        <button onclick="removeFromCart(${item.id})">X</button>
      `;
      cartItemsUl.appendChild(li);
    });
  
    totalSpan.textContent = total.toFixed(2);
  }
  
  // Initialize page
  displayProducts();
  