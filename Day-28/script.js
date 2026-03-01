const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

// 🔥 Replace with your Atlas SRV string
const uri = "mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/unify_labs?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.static(__dirname));

let db;

async function connectDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db("unify_labs");
    console.log("Connected to MongoDB Atlas successfully");
  } catch (error) {
    console.error("Atlas connection failed:", error.message);
  }
}

connectDB();

// GET all products
app.get("/products", async (req, res) => {
  const products = await db.collection("products").find().toArray();
  res.json(products);
});

// POST product
app.post("/products", async (req, res) => {
  const { name, price, stock } = req.body;

  await db.collection("products").insertOne({
    name,
    price: Number(price),
    stock: Number(stock)
  });

  res.json({ message: "Product created" });
});

// PATCH update stock (+ increment)
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

  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});