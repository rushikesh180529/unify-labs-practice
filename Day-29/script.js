const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

const uri = "mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/zenith_blog?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.static(__dirname));

let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("zenith_blog");
  console.log("Connected to MongoDB Atlas");
}

connectDB();

// GET all posts
app.get("/api/posts", async (req, res) => {
  const posts = await db.collection("posts").find().toArray();
  res.json(posts);
});

// POST create post
app.post("/api/posts", async (req, res) => {
  const { title, category, content } = req.body;

  await db.collection("posts").insertOne({
    title,
    category,
    content
  });

  res.json({ message: "Post created" });
});

// DELETE post
app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;

  await db.collection("posts").deleteOne({
    _id: new ObjectId(id)
  });

  res.json({ message: "Post deleted" });
});

// PATCH update post
app.patch("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, category, content } = req.body;

  await db.collection("posts").updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, category, content } }
  );

  res.json({ message: "Post updated" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});