const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({extended:true}))
const staticPath = path.join(__dirname);
app.use(express.static(staticPath))



app.get('/',(req,res)=>{
  res.sendFile(`${staticPath}/index.html`);
})

app.post('/GetUsers',(req,res)=>{

   const{region} = req.body;
  fs.readFile('users.json','utf-8',(err,data)=>{
    const userData= JSON.parse(data);
    const matchData = userData.filter(item =>item.region === region);
    
    if(matchData.length > 0){
      res.json(matchData)
      console.log(matchData)
    }
  })
})


app.listen(2000,()=>{
  console.log('Server running on port 2000')
})