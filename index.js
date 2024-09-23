const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

// Function to render all the items in the store
function renderStoreItems() {
  const store = document.querySelector('.store--item-list');
  store.innerHTML = '';

  // Loop through all items
  state.items.forEach(item => {
    // Create the list element
    const li = document.createElement('li');

    // Create the div element
    const div = document.createElement('div');
    div.className = 'store--item-icon';

    // Create the image element
    const img = document.createElement('img');
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = item.name;

    // Append image to div
    div.appendChild(img);

    // Create the button element
    const button = document.createElement('button');
    button.textContent = 'Add to cart';
    button.onclick = () => addToCart(item.id);

    // Append div and button to the list
    li.appendChild(div);
    li.appendChild(button);

    // Add the list to the store
    store.appendChild(li);
  });
}

// Function to render all items currently in the cart
function renderCartItems() {
  const cart = document.querySelector('.cart--item-list');
  cart.innerHTML = '';

  // Loop through all items in the cart
  state.cart.forEach(item => {
    // Create the list element
    const li = document.createElement('li');

    // Create the image element
    const img = document.createElement('img');
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = item.name;

    // Create the paragraph element
    const p = document.createElement('p');
    p.textContent = item.name;

    // Create the remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'quantity-btn remove-btn center';
    removeButton.textContent = '-';
    removeButton.onclick = () => decreaseItem(item.id);

    // Create the span element
    const span = document.createElement('span');
    span.className = 'quantity-text center';
    span.textContent = item.quantity;

    // Create the add button
    const addButton = document.createElement('button');
    addButton.className = 'quantity-btn add-btn center';
    addButton.textContent = '+';
    addButton.onclick = () => increaseItem(item.id);

    // Append every element to the list
    li.appendChild(img);
    li.appendChild(p);
    li.appendChild(removeButton);
    li.appendChild(span);
    li.appendChild(addButton);

    // Add the list to the store
    cart.appendChild(li);
  });
  updateTotal();
}

// -- Functions for the store to work --

// Add item to cart
function addToCart(id) {
  // Find the item to add
  const itemStore = state.items.find(itemStore => itemStore.id === id);

  // Check if the item already exists in the cart or not
  const itemCart = state.cart.find(itemCart => itemCart.id === id);
  if (itemCart) {
    itemCart.quantity++;
  } else {
    state.cart.push({ ...itemStore, quantity: 1 });
  }
  renderCartItems();
}

// Decrease item quantity in cart
function decreaseItem(id) {
  // Find the item to decrease
  const itemCart = state.cart.find(itemCart => itemCart.id === id);

  // Decrease the quantity
  itemCart.quantity--;

  // Remove if quanitity is 0
  if (itemCart.quantity === 0) {
    const index = state.cart.findIndex(item => item.id === id);
    if (index !== -1) {
      state.cart.splice(index, 1);
    }
  }
  renderCartItems();
}

// Increase item quantity in cart
function increaseItem(id) {
  // Find the item to increase
  const itemCart = state.cart.find(itemCart => itemCart.id === id);

  // Increase the quantity
  itemCart.quantity++;

  renderCartItems();
}

// Update the total price of the cart
function updateTotal() {
  // Calculate the new total
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Update the text to match the new total
  document.querySelector('.total-number').textContent = `£${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderStoreItems();
});