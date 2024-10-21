const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('your_atlas_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/createrecord', async (req, res) => {
    const { name, age, gender } = req.body;

    if (!name || !age || !gender) {
        return res.status(400).json({ msg: 'Name, age, and gender are required.' });
    }

    const user = new User({ name, age, gender });

    try {
        await user.save(); 
        return res.status(201).json({ msg: 'User created successfully!', user });
    } catch (error) {
        return res.status(500).json({ msg: 'Error creating user.', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
