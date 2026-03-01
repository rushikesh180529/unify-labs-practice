const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;
const uri = "mongodb://localhost:27017";

app.use(express.json());
app.use(express.static(__dirname));

let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("unify_labs");
  console.log("Database connected successfully");
}

connectDB();

// GET all products
app.get("/products", async (req, res) => {
  const products = await db.collection("products").find().toArray();
  res.json(products);
});

// POST create product
app.post("/products", async (req, res) => {
  const { name, price, stock } = req.body;

  const newProduct = {
    name,
    price: Number(price),
    stock: Number(stock)
  };

  await db.collection("products").insertOne(newProduct);
  res.json({ message: "Product created" });
});

// PATCH update stock (increment by given amount)
app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  await db.collection("products").updateOne(
    { _id: new ObjectId(id) },
    { $inc: { stock: Number(stock) } }
  );

  res.json({ message: "Stock updated" });
});

// DELETE product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  await db.collection("products").deleteOne(
    { _id: new ObjectId(id) }
  );

  res.json({ message: "Product deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});