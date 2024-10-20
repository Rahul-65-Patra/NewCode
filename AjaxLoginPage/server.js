const express = require('express');
const app=express();
const path = require('path');

app.use(express.json());

const staticPath = path.join(__dirname)
app.use(express.static(staticPath));

app.get('/',(req,res)=>{
  res.sendFile(`${staticPath}/index.html`)
})

app.post('/login',(req,res)=>{
  console.log(req.body);
  if(req.body.username ==="Rahul"){
    res.json({msg:true})
  //res.send("true")
  }
else{
  res.json({msg:false})
  //res.send("false")
 
}
  
})

app.listen(2000,(req,res)=>{
  console.log('Server is running on port 2000')
})