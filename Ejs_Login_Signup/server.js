const express = require('express');
const app = express();
const path = require('path')
const cookieparser = require('cookie-parser');
const session = require('express-session')
const PORT = 4000;


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.set('view engine','ejs');

app.use(session({
  secret:"aaaciuiuv#343",
  saveUninitialized:true,  
  resave:false,
  cookie:{maxAge:60000}
}))


const staticPath = path.join(__dirname,"./public");
app.use(express.static(staticPath));


app.get('/test',(req,res)=>{
  res.render("home",{yourName:"TestCode",courses:['course1','course2','course3']})    // {}---> contain jsonObject
})

app.get('/login',(req,res)=>{
  res.render('login',{msg:""})
})
app.post('/login',(req,res)=>{

   const name = req.body.username;
   const password = req.body.password;
  
   if(name == password){
    req.session.username = req.body.username;
    res.redirect('/dashboard')
   }
   else{
     res.render('login',{msg:"Invalid User/Password"})  
   }
})

app.get('/dashboard',(req,res)=>{
  res.render("dashboard",{user:req.session.username})
})

app.get('*',(req,res)=>{
  res.send("404 Page Not Found");
})

app.listen(PORT,(err)=>{
  if(err){
    console.log("Server Error ...",err);
  }
  else{
    console.log(`Server started at port ${PORT}`);
  }
})