require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Book = require("./models/Books");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// GET All Books
app.get("/api/books", async (req, res) => {
  try {
    const category = req.query.category;
    const filter = {};
    if (category) {
      filter.category = category;
    }

    const data = await Book.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured wile fetching the books" });
  }
});

// GET Single Book
app.get('/api/books/:slug', async(req,res)=>{
  try{
    const data = await Book.find(filter);
    res.json(data);
  }catch (error){
    res.status(500).json({error: "An error occured while fetching book."})
  }
})

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}...`);
});
