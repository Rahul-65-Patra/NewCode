const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);


async function toConnectDatabase() {
  try {
    await client.connect();
    console.log("Database Connected");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

app.set('view engine', 'ejs');


app.get('/data', async (req, res) => {
  try {
    const db = client.db("testProduct");
    const collection = db.collection("products"); 
    const data = await collection.find({}).toArray(); 
    res.render("data", { data: data }); 
    console.log("Data received from the database");
    
    //res.json(data)
    //console.log(data);
  } 
  catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(2000, async () => {
  console.log("Server created at port 2000");
  await toConnectDatabase(); 
});
