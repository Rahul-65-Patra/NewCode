const express = require('express');
const route = express.Router();
const path = require('path')


const staticPath = path.join(__dirname,'../public')
route.use(express.static(staticPath))

route.get('/dashboard',(req,res)=>{
    res.sendFille(`${staticPath}/dashboard.html`)
})
route.get('/profile',(req,res)=>{
  res.send("This is my profile page")
})


module.exports = route;