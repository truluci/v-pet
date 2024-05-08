const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        const userData = JSON.parse(await fs.readFile('../data/userData.json'));

        if (userData.some(user => user.username === username)) {
            return res.status(400).send('Username already exists. Please choose a different username.');
        }

        userData.push({ username, password });

        await fs.writeFile('../data/userData.json', JSON.stringify(userData, null, 2));

        res.send('Registration successful. Please login with your credentials.');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('An error occurred during registration.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
