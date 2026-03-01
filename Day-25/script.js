// ================= PRODUCT DATABASE =================
let products = [
  {
    name: "iPhone 15",
    category: "Electronics",
    price: 800,
    stock: 5,
    tags: []
  },
  {
    name: "Laptop",
    category: "Electronics",
    price: 1200,
    stock: 0,
    tags: []
  },
  {
    name: "T-Shirt",
    category: "Clothing",
    price: 300,
    stock: 20,
    tags: []
  },
  {
    name: "Sofa",
    category: "Furniture",
    price: 1500,
    stock: 3,
    tags: []
  }
];

// ================= DISPLAY =================
function displayProducts() {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>Price: ₹${p.price}</p>
        <p>Stock: ${p.stock}</p>
        <p>Featured: ${p.featured ? "Yes" : "No"}</p>
        <p>Tags: ${p.tags.join(", ")}</p>
      </div>
    `;
  });
}

// ================= $inc =================
function increaseElectronics() {
  products.forEach(p => {
    if (p.category === "Electronics") {
      p.price += 10; // $inc simulation
    }
  });
  displayProducts();
}

// ================= $set =================
function setFeatured() {
  products.forEach(p => {
    if (p.price > 500) {
      p.featured = true; // $set simulation
    }
  });
  displayProducts();
}

// ================= $push =================
function addNewArrival() {
  products.forEach(p => {
    if (p.category === "Electronics") {
      p.tags.push("new-arrival"); // $push simulation
    }
  });
  displayProducts();
}

// ================= deleteMany =================
function deleteZeroStock() {
  products = products.filter(p => p.stock !== 0);
  displayProducts();
}

// ================= countDocuments =================
function showCount() {
  alert("Total Products: " + products.length);
}

displayProducts();