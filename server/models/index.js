const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ooeef.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const port = process.env.PORT || 5000;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Connect to the MongoDB database
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const bookCollection = db.collection("books");
    const userBookCollection = db.collection("users");
    const ordersCollection = db.collection("orders");

    // Default route to test server connectivity
    app.get("/", (req, res) => {
      res.send("Hello World");
    });

    // Route to add a book to the database
    app.post('/addBook', async (req, res) => {
      try {
        const bookData = req.body;
        const result = await bookCollection.insertOne(bookData);
        res.send(result.ops[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error adding book");
      }
    });

    // Route to fetch all books based on a search query
    app.get('/allBooks', async (req, res) => {
      try {
        const search = req.query.search;
        const documents = await bookCollection.find({ bookName: { $regex: search } }).toArray();
        res.send(documents);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching books");
      }
    });

    // Add other routes here...

    // Start the server & listen on the specified port
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Call the connectDB function to establish the database connection
connectDB();
