const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('your_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    name: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.delete('/deleterecord/:id', async (req, res) => {
    const { id } = req.params;

    try {

        const result = await User.deleteOne({ _id: id });

        if (result.deletedCount === 1) {

            return res.status(200).json({ msg: 'Record deleted successfully.' });
        } else {

            return res.status(404).json({ msg: 'Record not found.' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'An error occurred.', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
