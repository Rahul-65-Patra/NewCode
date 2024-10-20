const express = require("express")
const app = express();
const path = require('path');
const fs = require('fs')
const ejs = require('ejs');
const session = require("express-session")
const cookieParser = require('cookie-parser')
const oneDay = 1000*60*60*24;   // for one day


  
function test(req,res,next){

  const userroutes = require("./routing/userroutes");
  app.use("/users",test,userroutes)

  const adminroutes = require("./routing/adminroutes");
  app.use("/admin",testadmin,adminroutes)


  if(req.session.username){
    next()
  }
  else{ 
    res.redirect('/login')
  }
}


function testadmin(req,res,next){
  if(req.session.username && req.session.role == "admin" ){
    next()
  }
  else{ 
    res.redirect('/')
  }
}

app.use(cookieParser());   // as a middlewire
app.use(session({
  secret:"123@wieubfiuwe#biuwbe@noiwenf",
  saveUninitialized:true,
  resave:false,
  cookie:({maxAge:oneDay})
}))

app.use(express.urlencoded({extended:true}))
const staticPath = path.join(__dirname,'./public')
app.use(express.static(staticPath));

app.set('view engine','ejs');



app.get('/',(req,res)=>{
  res.sendFile(`${staticPath}/login.html`)
})

app.get("/dashboard",(req,res)=>{
  if(req.session.username){
  res.render('dashboard',{name:req.session.username})
  }
  else{
    res.redirect('/login')
  }
})
app.get('/login',(req,res)=>{
  
  if(req.session.username){
    res.redirect('/dashboard')
  }
  else{
  res.render('login',{msg:""})
  }
})
app.post('/login',(req,res)=>{
     
    fs.readFile('users.txt','utf-8',(err,data)=>{

      if(err){
        return res.status(500).send("Error reading user data")
      }
      const result = JSON.parse(data);   // .txt file convert in json file
      const record = result.filter((item)=>{
        if(item.username === req.body.name && item.password === req.body.password){
          return true;
        }
      })
      if(record.length == 0){  
        res.render("login",{msg:"Invalid username or password"})
      }
      else{ 
        //res.send("Welcome User")
        req.session.username = req.body.name;
        req.session.role = record[0].role;   // add authorization
        res.redirect('/dashboard')
      }
      
    })
})

app.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/login')
})


app.get('*',(req,res)=>{
  res.send("<h1>404 Error: Page not found</h1>")
})

app.listen(3000,()=>{
  console.log("Server running");
})