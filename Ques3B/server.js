const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'public', 'files');
        fs.exists(dir, (exists) => {
            if (!exists) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        const { name } = req.body;
        const ext = path.extname(file.originalname);
        const filename = `${name}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

app.post('/profile', upload.single('file'), (req, res) => {
    const { name } = req.body;
    const filename = `${name}${path.extname(req.file.originalname)}`;
    const filePath = path.join(__dirname, 'public', 'files', filename);

    if (fs.existsSync(filePath)) {
        return res.status(400).json({ msg: 'File already exists. Upload ignored.' });
    }
    return res.status(200).json({ msg: 'File uploaded successfully!', filename });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
