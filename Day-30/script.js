const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const uri = "YOUR_ATLAS_URI";

app.use(express.json());
app.use(express.static(__dirname));

let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("titan_store");
  console.log("Connected to MongoDB Atlas");
}

connectDB();

// Security sanitizer
function sanitize(input) {
  return typeof input === "string"
    ? input.replace(/\$/g, "").replace(/\./g, "")
    : input;
}

// GET products with optional category filter
app.get("/api/products", async (req, res) => {
  const category = sanitize(req.query.category);
  const query = category ? { category } : {};
  const products = await db.collection("products").find(query).toArray();
  res.json(products);
});

// POST order
app.post("/api/orders", async (req, res) => {
  const { name, email, address, items } = req.body;

  await db.collection("orders").insertOne({
    name: sanitize(name),
    email: sanitize(email),
    address: sanitize(address),
    items,
    createdAt: new Date()
  });

  res.json({ message: "Order saved" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});