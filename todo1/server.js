const express = require('express')
const app = express();
const fs = require('fs')
const path = require('path');


app.use(express.urlencoded({extended: true}));
const staticPath = path.join(__dirname)
app.use(express.static(staticPath))


app.get('/',(req,res)=>{
  res.sendFile(`${staticPath}/index.html`)
})

app.post('/GetTodo',(req,res)=>{

  const userid = parseInt(req.body.userid);

  fs.readFile("todo.json",'utf-8',(err,data)=>{
    
    const taskId = JSON.parse(data);
    var userID = taskId.filter( item =>item.userId === userid)
           
         if(userID.length > 0){
          res.json(userID)
       }
  })

})

app.listen(2000,()=>{
  console.log('Server running on port 2000')
})
