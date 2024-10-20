const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');

app.use(cookieParser());

app.use(session({
  secret: "qwpif#infon#o23y9r", 
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge:20000 }  
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const staticPath = path.join(__dirname, './public');
app.use(express.static(staticPath));
app.use(express.static(__dirname));
app.set('view engine','ejs')

const uplodeFileData = './Uplode';


const mStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uplodeFileData);  
  },
  filename: (req, file, cb) => {
 
      const extName = path.extname(file.originalname); 
    
    cb(null, req.session.username + extName);
  }
});


const filter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } 
  else {
    cb(new Error('File not supported'), false);
  }
};


const uplode = multer({
  // dest: uplodeFileData,
  storage: mStorage,
  fileFilter:filter,
  limits: { 
    fileSize: 1024 * 1024 * 5      
  } 
});

app.get('/', (req, res) => {
  res.sendFile(`${staticPath}/uplode.html`);
});  

app.post('/uplodefile', uplode.single("pic"), (req, res) => {
  console.log(req.file)
  req.session.image = req.file.filename; 
  res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
  if (req.session.username) {
    res.render("dashboard",{
      username:req.session.username,
      image:req.session.image
    })
  } 
  else { 
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  if(req.session.username){
    res.redirect('/dashboard')
  }
  else{
    res.sendFile(`${staticPath}/login.html`);
  }
});

app.post('/login', (req, res) => {
  if (req.body.username === req.body.password) {
    req.session.username = req.body.username;
    res.redirect('/dashboard');
  } 
  else {
    res.redirect('/login');
  }
});

app.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/login')
})

app.get('*',(req,res)=>{
  res.send("404 Page Not Found");
})

app.listen(4000, () => {
  console.log("server running on port 4000");
});
