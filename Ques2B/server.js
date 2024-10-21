const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('your_atlas_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
    name: String,
    img: String,
    price: Number,
    description: String,
});

const cartSchema = new mongoose.Schema({
    productname: String,
    price: Number,
    qty: Number,
    netprice: Number,
});

const Product = mongoose.model('Product', productSchema);
const Cart = mongoose.model('Cart', cartSchema);

app.use(cors());
app.use(bodyParser.json());

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.get('/cart', async (req, res) => {
    const cart = await Cart.find();
    res.json(cart);
});

app.delete('/cart/:id', async (req, res) => {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.json({ msg: 'Product removed from cart' });
});

app.put('/cart/:id', async (req, res) => {
    const { id } = req.params;
    const { qty } = req.body; 
    const cartItem = await Cart.findById(id);
    if (cartItem) {
        cartItem.qty = qty;
        cartItem.netprice = cartItem.price * qty; 
        await cartItem.save();
        res.json(cartItem);
    } else {
        res.status(404).json({ msg: 'Item not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
