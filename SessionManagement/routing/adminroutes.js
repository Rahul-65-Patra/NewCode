const express = require('express');
const route = express.Router();

route.get('/allProducts', (req, res) => {
  res.send("Admin access all products");
});

module.exports = route;
