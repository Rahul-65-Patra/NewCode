const express = require('express')
const app = express();
const {MongoClient} = require('mongodb')
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const Objid = require('mongodb').ObjectId;

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');


client.connect().then((req)=>{
  console.log("Connected successfully to server");
}).catch((err)=>{
  console.log(err);
  process.exit(1);
})


app.get('/getData',(req,res)=>{

  const db = client.db('Data');
  const collection = db.collection('students');
  collection.find({}).toArray().then((result)=>{
    // res.json(result);
    // console.log(result);
    res.render('home',{data:result})
  })
})

app.get('/add',(req,res)=>{
   res.render("add")
})

app.post('/storeData',(req,res)=>{

  const db = client.db('Data');  // database
  const collection = db.collection('students');  // collection

  // let obj={name:'Rahul',age:21}

  let obj={
    name:req.body.name,
    age:req.body.age
  }
 collection.insertOne(obj).then(()=>{
  res.redirect('/getData')
  console.log("Data inserted successfully");
 })
})

// Show details on particular data
app.get("/viewData/:id",(req,res)=>{
 // console.log(req.params.id)  
  const db = client.db('Data');  
  const collection = db.collection('students');
  collection.findOne({"_id":new Objid(req.params.id)}).then((result)=>{
    res.render('Student',{data:result})
  })
})


// Update data show
app.get("/updateData/:id",(req,res)=>{
 // console.log(req.params.id)  
  const db = client.db('Data');  
  const collection = db.collection('students');
  collection.findOne({"_id":new Objid(req.params.id)}).then((result)=>{
    res.render('update',{data:result})
  })
})

// main work this update end point
app.post('/updateData',(req,res)=>{
  const db = client.db('Data');  
  const collection = db.collection('students');
  collection.updateOne({"_id":new Objid(req.body.id)},{$set:{"name":req.body.name,"age":req.body.age}}).then(()=>{
    res.redirect('/getData')
    console.log("Data updated successfully");
  })
})

app.get("/deleteData/:id",(req,res)=>{
  // console.log(req.params.id)  
   const db = client.db('Data');  
    const collection = db.collection('students');
    collection.findOne({"_id":new Objid(req.params.id)}).then((result)=>{
     res.render('deleteData',{data:result})
   })
 })


app.post('/deleteData',(req,res)=>{
  const db = client.db('Data');
  const collection = db.collection('students');

  collection.deleteOne({"_id":new Objid(req.body.id)}).then(()=>{
    res.redirect('/getData');
    console.log("Data Delete successfully");
  })
})

app.listen(3000,()=>{
  console.log("server running")
})