const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, default: 1 },
    netPrice: { type: Number, required: true },
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
