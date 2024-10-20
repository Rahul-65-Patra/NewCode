const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const USERS_FILE_PATH = path.join(__dirname, 'users.json');

app.use(express.json());
app.use(express.static('public')); 

const loadUsers = () => {
    if (!fs.existsSync(USERS_FILE_PATH)) {
        return [];
    }
    const data = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
})
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.json({ success: false });
    }

    const newUser = { username, password };
    users.push(newUser);

    fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error writing to users file:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.json({ success: true });
    });
});


app.listen(2000, () => {
    console.log("server running on port 2000");
});
