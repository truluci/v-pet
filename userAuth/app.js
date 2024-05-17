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

app.post('/add-pet', async (req, res) => {
    const { username, name, dob, gender, breed, petType } = req.body;

    if (!username || !name || !dob || !gender || !breed || !petType) {
        return res.status(400).send('Incomplete pet data.');
    }

    try {
        const projectData = JSON.parse(await fs.readFile('../data/projectData.json'));

        projectData.push({ username, name, dob, gender, breed, petType });

        await fs.writeFile('../data/projectData.json', JSON.stringify(projectData, null, 2));

        res.status(201).json({ message: 'Pet added successfully.' });

    } catch (error) {
        console.error('Error adding pet:', error);
        res.status(500).send('Failed to add pet.');
    }
});

app.get('/get-pets', async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).send('Username is required.');
    }

    try {
        const projectData = JSON.parse(await fs.readFile('../data/projectData.json'));
        const userPets = projectData.filter(pet => pet.username === username);

        res.json(userPets);

    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).send('Failed to fetch pets.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
