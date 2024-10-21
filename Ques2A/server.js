const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const Cart = require('./models/cart');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('your_mongodb_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});


app.post('/add-to-cart', async (req, res) => {
    const { productName, price } = req.body;
    const netPrice = price; 

    const cartItem = new Cart({ productName, price, qty: 1, netPrice });
    await cartItem.save();

    res.redirect('/');
});


app.get('/cart', async (req, res) => {
    const carts = await Cart.find();
    const totalAmount = carts.reduce((total, item) => total + item.netPrice, 0);
    res.render('cart', { carts, totalAmount });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
