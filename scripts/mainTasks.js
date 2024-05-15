document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.getElementById('username');
    const petListElement = document.getElementById('petList');

    // Get user data from localStorage (assuming user is already logged in)
    const userData = JSON.parse(localStorage.getItem('currentUser'));

    if (userData) {
        const username = userData.username;
        usernameElement.textContent = username;
    } else {
        // Redirect to login page if user data is not found
        window.location.href = 'login.html';
    }

    async function addPet(petType) {
        const form = document.getElementById('petForm');
        const name = form.elements['name'].value;
        const dob = form.elements['dob'].value;
        const gender = form.elements['gender'].value;
        const breed = form.elements['breed'].value;

        if (name && dob && gender && breed) {
            const userData = JSON.parse(localStorage.getItem('currentUser'));

<<<<<<< HEAD
            if (!userData) {
                alert('User data not found. Please log in again.');
                window.location.href = 'login.html';
                return;
=======
async function addPet(petType) {
    const form = document.getElementById('petForm');
    const name = form.elements['name'].value;
    const dob = form.elements['dob'].value;
    const gender = form.elements['gender'].value;
    const breed = form.elements['breed'].value;

    if (name && dob && gender && breed) {
        const userData = JSON.parse(localStorage.getItem('currentUser'));

        if (!userData) {
            alert('User data not found. Please log in again.');
            window.location.href = 'login.html';
            return;
        }

        const token = userData.token; // Assuming you have a token for authentication
        const username = userData.username;

        try {
            const response = await fetch('http://localhost:3000/add-pet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username,
                    name,
                    dob,
                    gender,
                    breed,
                    petType
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add pet.');
>>>>>>> 3d0df817a127656de3bb00ddb2c41c34cebde3f7
            }

            const pet = {
                name,
                dob,
                gender,
                breed,
                petType
            };

            // Save pet data in localStorage
            let pets = JSON.parse(localStorage.getItem('pets')) || [];
            pets.push(pet);
            localStorage.setItem('pets', JSON.stringify(pets));

            alert('Pet added successfully.');

            // Clear the form
            form.reset();
            document.getElementById('petFormContainer').innerHTML = '';
        } else {
            alert('Please fill out all fields.');
        }
    }

<<<<<<< HEAD
    window.showPetTypeSelection = function () {
        const petType = prompt("Would you like to add a Cat or a Dog?", "Cat/Dog");

        if (petType) {
            createPetForm(petType.trim().toLowerCase());
        }
    }

    function createPetForm(petType) {
        const formContainer = document.getElementById('petFormContainer');
        formContainer.innerHTML = ''; // Clear any existing form

        // Create the form elements
        const form = document.createElement('form');
        form.id = 'petForm';

        const title = document.createElement('h2');
        title.innerText = `Add a new ${petType.charAt(0).toUpperCase() + petType.slice(1)}`;
        form.appendChild(title);

        const nameLabel = document.createElement('label');
        nameLabel.innerText = 'Name: ';
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameLabel.appendChild(nameInput);
        form.appendChild(nameLabel);

        form.appendChild(document.createElement('br'));

        const dobLabel = document.createElement('label');
        dobLabel.innerText = 'Date of Birth: ';
        const dobInput = document.createElement('input');
        dobInput.type = 'date';
        dobInput.name = 'dob';
        dobLabel.appendChild(dobInput);
        form.appendChild(dobLabel);

        form.appendChild(document.createElement('br'));

        const genderLabel = document.createElement('label');
        genderLabel.innerText = 'Gender: ';
        const genderSelect = document.createElement('select');
        genderSelect.name = 'gender';
        const maleOption = document.createElement('option');
        maleOption.value = 'male';
        maleOption.innerText = 'Male';
        const femaleOption = document.createElement('option');
        femaleOption.value = 'female';
        femaleOption.innerText = 'Female';
        genderSelect.appendChild(maleOption);
        genderSelect.appendChild(femaleOption);
        genderLabel.appendChild(genderSelect);
        form.appendChild(genderLabel);

        form.appendChild(document.createElement('br'));

        const breedLabel = document.createElement('label');
        breedLabel.innerText = 'Breed: ';
        const breedInput = document.createElement('input');
        breedInput.type = 'text';
        breedInput.name = 'breed';
        breedLabel.appendChild(breedInput);
        form.appendChild(breedLabel);

        form.appendChild(document.createElement('br'));

        const submitButton = document.createElement('button');
        submitButton.type = 'button';
        submitButton.innerText = 'Add Pet';
        submitButton.onclick = () => addPet(petType);
        form.appendChild(submitButton);

        formContainer.appendChild(form);
    }

    window.createPetForm = createPetForm;
});
=======

>>>>>>> 3d0df817a127656de3bb00ddb2c41c34cebde3f7
