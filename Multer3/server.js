const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("Database connected");
}).catch((error)=>{
    console.log("Connection Failed",error);
});


app.use(session({
  secret: 'Multer',  
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017' }),
  cookie: { maxAge: 60 * 60 * 1000 }
}));


const mstorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userType = req.session.userType || "user"; 
      const folder = userType === "admin" ? "uploads/admin" : "uploads/user";
  
      fs.mkdir(folder, { recursive: true }, (err) => {
        if (err) return cb(err);
        cb(null, folder);
      });
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      const originalName = file.originalname.split('.')[0];
      const uniqueName = `${originalName}-${Date.now()}.${ext}`;
      cb(null, uniqueName);
    },
  });
  

  
const filter = (req, file, cb) => {
  const ext = file.mimetype.split("/")[1];
  if (ext !== "jpeg" && ext !== "jpg") {
    cb(new Error("Only JPEG images are allowed"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: mstorage,
  fileFilter: filter,
  limits: { fileSize: 1 * 1000 * 1000 }, 
});


const User = require("./models/User");
const { error } = require("console");

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
});


app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});


app.post("/signup", async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    const user = new User({ name, email, password, userType });
    await user.save();


    req.session.userId = user._id;
    req.session.userType = user.userType;
    
    res.status(201).json({ message: "User created and logged in!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password }); 
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id;
    req.session.userType = user.userType;

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});


app.get("/logout",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","login.html"));
})

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/login");
  });
});


app.post("/upload", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).redirect("/login");
  }
  upload.single("profileImage")(req, res, function (err) {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.send("Image uploaded successfully");
  });
});


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
