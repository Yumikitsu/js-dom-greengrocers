const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.20,
      type: 1
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.10,
      type: 1
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: 2
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.40,
      type: 2
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.50,
      type: 2
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.45,
      type: 2
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.25,
      type: 1
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.03,
      type: 2
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.01,
      type: 2
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.25,
      type: 1
    }
  ],
  cart: [],
  filter: 0,
  sort: 0
};

const filterAndSort = document.querySelector('.filtersAndSortings');

// Function to render filter and sort buttons
function renderFilterAndSort() {
  filterAndSort.innerHTML = '';

  // Create the div element
  const div = document.createElement('div');
  div.className = 'filterAndSort';

  // Create the button elements
  const button = document.createElement('button');
  button.className = 'filterButton';
  button.textContent = filterToText();
  button.onclick = () => nextFilter();

  const button2 = document.createElement('button');
  button2.className = 'sortingButton';
  button2.textContent = sortToText();
  button2.onclick = () => nextSort();
  
  // Append the div and button to the filter
  filterAndSort.appendChild(div);
  filterAndSort.appendChild(button);
  filterAndSort.appendChild(button2);

  renderStoreItems();
}

// Function to render all the items in the store
function renderStoreItems() {
  const store = document.querySelector('.store--item-list');
  store.innerHTML = '';

  // Loop through all items
  filteredList().forEach(item => {
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

    // Create the paragraph element
    const p = document.createElement('p');
    p.textContent = `£${item.price}`;

    // Append div and button to the list
    li.appendChild(div);
    li.appendChild(p);
    li.appendChild(button);

    // Add the list to the store
    store.appendChild(li);
  });

  // Create a new list element
  const li = document.createElement('li');

  // Create a text area to write in
  const textarea = document.createElement('textarea');
  textarea.className = 'newItemText'
  textarea.textContent = 'id: 011,\nname: cucumber,\nprice: 0.23,\ntype: 1';

  // Create a button to add a new item
  const button = document.createElement('button');
  button.textContent = 'Add new item';
  button.onclick = () => addNewItem(textarea.textContent);

  li.appendChild(textarea);
  li.appendChild(button);

  store.appendChild(li);
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

// Get the filter as a string
function filterToText() {
  switch (state.filter) {
    case 0:
      return 'All'
    case 1:
      return 'Vegetables'
    case 2:
      return 'Fruits'
  }
}

// Get the sort as a string
function sortToText() {
  switch (state.sort) {
    case 0:
      return 'None'
    case 1:
      return 'Alphabetically'
    case 2:
      return 'Price'
  }
}

// Function to update the current filter
function nextFilter() {
  state.filter++;
  if (state.filter > 2) {
    state.filter = 0;
  }
  renderFilterAndSort();
}

// Function to update the current sort method
function nextSort() {
  state.sort++;
  if (state.sort > 2) {
    state.sort = 0;
  }
  renderFilterAndSort();
}

// Get the item list by filter and sorting method
function filteredList() {
  switch (state.filter) {
    case 0:
      switch (state.sort) {
        case 0:
          return state.items
        case 1:
          return [...state.items].sort((a, b) => a.name.localeCompare(b.name));
        case 2:
          return [...state.items].sort((a, b) => a.price - b.price);
      }
    case 1:
      switch (state.sort) {
        case 0:
          return state.items.filter(item => item.type === 1);
        case 1:
          return [...state.items.filter(item => item.type === 1)].sort((a, b) => a.name.localeCompare(b.name));
        case 2:
          return [...state.items.filter(item => item.type === 1)].sort((a, b) => a.price - b.price);
      }
    case 2:
      switch (state.sort) {
        case 0:
          return state.items.filter(item => item.type === 2);
        case 1:
          return [...state.items.filter(item => item.type === 2)].sort((a, b) => a.name.localeCompare(b.name));
        case 2:
          return [...state.items.filter(item => item.type === 2)].sort((a, b) => a.price - b.price);
      }
  }
}

// Function to add a new item to the store
function addNewItem(itemDetails) {
  const obj = itemDetails.split(',\n').reduce((buildingObject, pair) => {
    const [key, value] = pair.split(': ').map(item => item.trim());
    if (key === 'price') {
      buildingObject[key] = parseFloat(value);
    } else if (key === 'type') {
      buildingObject[key] = parseInt(value, 10);
    } else {
      buildingObject[key] = value;
    }
    return buildingObject;
  }, {});
  if (state.items.find(item => item.id === obj.id) != null) {
    return null;
  }
  state.items.push(obj);
  renderStoreItems();
}

// This loads the basic things necessary to use the site
document.addEventListener('DOMContentLoaded', () => {
  renderFilterAndSort();
});