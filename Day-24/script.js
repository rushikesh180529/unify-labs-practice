// ================= PRODUCT DATABASE =================
const products = [
  {
    name: "iPhone 15",
    category: "Electronics",
    price: 79999,
    stock: 25,
    specs: { color: "Black", weight: "171g" }
  },
  {
    name: "Samsung 55-inch TV",
    category: "Electronics",
    price: 65999,
    stock: 10,
    specs: { color: "Gray", weight: "14kg" }
  },
  {
    name: "Men's Denim Jacket",
    category: "Clothing",
    price: 2999,
    stock: 50,
    specs: { color: "Blue", weight: "1kg" }
  },
  {
    name: "Office Chair",
    category: "Furniture",
    price: 8499,
    stock: 15,
    specs: { color: "Black", weight: "12kg" }
  },
  {
    name: "Wooden Study Table",
    category: "Furniture",
    price: 15999,
    stock: 8,
    specs: { color: "Brown", weight: "25kg" }
  }
];

// ================= DISPLAY FUNCTION =================
function displayProducts(list) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  list.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <h3>${product.name}</h3>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p><strong>Color:</strong> ${product.specs.color}</p>
        <p><strong>Weight:</strong> ${product.specs.weight}</p>
      </div>
    `;
  });
}

// ================= FILTER ELECTRONICS =================
function showElectronics() {
  const electronics = products.filter(p => p.category === "Electronics");
  displayProducts(electronics);
}

// ================= SORT & LIMIT =================
function showTop2() {
  const sorted = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 2);

  displayProducts(sorted);
}

// ================= SHOW ALL =================
function showAll() {
  displayProducts(products);
}

// Initial load
showAll();