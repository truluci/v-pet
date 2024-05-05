const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Route to handle user registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        // Read existing user data from userData.json
        const userData = JSON.parse(await fs.readFile('../data/userData.json'));

        // Check if username already exists
        if (userData.some(user => user.username === username)) {
            return res.status(400).send('Username already exists. Please choose a different username.');
        }

        // Add new user to userData array
        userData.push({ username, password });

        // Write updated userData back to userData.json
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
