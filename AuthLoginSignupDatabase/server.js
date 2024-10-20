const express = require('express');
const app = express();
const path = require('path');
const User = require("./models/Users");
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser= require('cookie-parser');
const oneDay = 1024*60*60*24;


app.use(cookieParser())
app.use(session({
  secret:"13knwnvonkn#knonwov",
  saveUninitialized:true,
  resave:false,
  cookie:{maxAge:oneDay}
}))


mongoose.connect("mongodb://localhost:27017/authSystem").then(()=>{
  console.log('Database is connected')
}).catch(()=>{
  console.log('Database is not connected')
})

const isAuth = (req,res,next)=>{

  if(req.session.userId){
    next();
  }
  else{
      res.redirect("/signup")
  }
}

app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
const staticPath = path.join(__dirname,'./public');
app.use(express.static(staticPath));


app.get('/',isAuth,(req,res)=>{
  res.render("home",{user:req.session.username})
})

app.get('/signup',(req,res)=>{
  res.render("signup")
})

app.post('/signup',async(req,res)=>{
   const {username,password} = req.body;

   try{
      const newUser = new User({username,password});
      await newUser.save();
      res.redirect("/login")  
   }
   catch(err){
     console.log("Error in saving user");
     res.redirect("/signup")
   }
})

app.get('/login',(req,res)=>{
  res.render("login",{msg:""})
})
app.post('/login',async(req,res)=>{
  const {username,password} =req.body;

  try{
     const user =await User.findOne({username});
     if(user && password === user.password){
      req.session.userId = user._id;
      req.session.username = user.username;  
      res.redirect("/")
     }
     else{
       res.render('login',{msg:"Invalid username or password"});
     }
  } 
  catch(err){
    console.log("Error in finding user");
    res.redirect("/login")
  }
}) 

app.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect("/login")
})

app.listen(2000,(req,res)=>{
  console.log("Server started on port 2000")
})