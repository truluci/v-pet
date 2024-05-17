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

app.post('/delete-pet', async (req, res) => {
    const { username, name } = req.body;

    if (!username || !name) {
        return res.status(400).send('Incomplete data.');
    }

    try {
        let projectData = JSON.parse(await fs.readFile('../data/projectData.json'));
        projectData = projectData.filter(pet => !(pet.username === username && pet.name === name));

        await fs.writeFile('../data/projectData.json', JSON.stringify(projectData, null, 2));
        res.status(200).json({ message: 'Pet deleted successfully.' });
    } catch (error) {
        console.error('Error deleting pet:', error);
        res.status(500).send('Failed to delete pet.');
    }
});

app.post('/update-pet', async (req, res) => {
    const { username, originalName, name, dob, gender, breed, petType } = req.body;

    if (!username || !originalName || !name || !dob || !gender || !breed || !petType) {
        return res.status(400).send('Incomplete pet data.');
    }

    try {
        let projectData = JSON.parse(await fs.readFile('../data/projectData.json'));
        const petIndex = projectData.findIndex(pet => pet.username === username && pet.name === originalName);

        if (petIndex === -1) {
            return res.status(404).send('Pet not found.');
        }

        projectData[petIndex] = { username, name, dob, gender, breed, petType };

        await fs.writeFile('../data/projectData.json', JSON.stringify(projectData, null, 2));
        res.status(200).json({ message: 'Pet updated successfully.' });
    } catch (error) {
        console.error('Error updating pet:', error);
        res.status(500).send('Failed to update pet.');
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

app.get('/get-pet', async (req, res) => {
    const { username, name } = req.query;

    if (!username || !name) {
        return res.status(400).send('Incomplete data.');
    }

    try {
        const projectData = JSON.parse(await fs.readFile('../data/projectData.json'));
        const pet = projectData.find(pet => pet.username === username && pet.name === name);

        if (pet) {
            res.json(pet);
        } else {
            res.status(404).send('Pet not found.');
        }
    } catch (error) {
        console.error('Error fetching pet:', error);
        res.status(500).send('Failed to fetch pet.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
