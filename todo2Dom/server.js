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

app.get('/GetTodo',(req,res)=>{
  fs.readFile('todo.json','utf-8',(err,data)=>{
    const showData = JSON.parse(data);
    res.json(showData);
  })
})

app.listen(2000,()=>{
  console.log("Server running on port 2000");
});