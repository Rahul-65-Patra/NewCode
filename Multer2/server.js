const express = require('express')
const app = express();
const multer = require('multer');
const path = require('path')
const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017";
const client =  new MongoClient(url)


let instance;
client.connect().then((database)=>{
  console.log("server connected")
  instance = database.db("user");
}).catch(()=>{
  console.log("server not connected")
})

app.use(express.urlencoded({extended:true}))
const staticPath = path.join(__dirname,"./public")
app.use(express.static(staticPath))


const uplodePath ="./uplode"

const mStorage = multer.diskStorage({
  destination:(req,file,cb)=>{
     cb(null,uplodePath)
  },
  filename:(req,file,cb)=>{
    const exe = path.extname(file.originalname);
    cb(null,Date.now() + exe);
  }

})

const filter=(req,file,cb)=>{
     if( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
      cb(null,true);
     }
     else{
      cb(new Error("File not Supported",false))
     }
}

const uplode =multer({
 // dest:uplodePath
 storage:mStorage,
  fileFilter:filter,
  limits:{
    fileSize:1024*1024*1
  }
})

app.get('/',(req,res)=>{
    res.sendFile(`${staticPath}/uplodeFile.html`)
})
app.post('/uplode',uplode.single("pic"),async(req,res)=>{
  try{
    console.log(req.file);
 const collection  = instance.collection("users");
 const {name,email} = req.body;
 const picPath = req.file.filename;
 const insertData = await collection.insertOne({name,email,picPath});
 console.log(insertData)
  res.send("Data Inserted");
  }
catch(err){
  console.log("Error",err)
}
})

app.get('/showdata',async(req,res)=>{
  const collection  = instance.collection("users");
  const store = await collection.find({}).toArray();
  console.log(store);
  res.json(store) 
})

app.get('*',(req,res)=>{
  res.send("<h1>404 Error: Page not found</h1>")
})

app.listen(2000,()=>{
  console.log('Server is running on port 2000')
})