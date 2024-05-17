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

    function addPet() {
        const petName = prompt('Enter pet name:');
        if (petName) {
            // Create a new pet element
            const newPetElement = document.createElement('div');
            newPetElement.textContent = petName;
            newPetElement.classList.add('pet-item');

            // Append the new pet element to the pet list
            petListElement.appendChild(newPetElement);
        }
    }
});

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

        const token = userData.token;
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
            }

            const responseData = await response.json();
            console.log(responseData); // Log response from server
            alert('Pet added successfully.');

            // Clear the form
            form.reset();
            document.getElementById('petFormContainer').innerHTML = '';

        } catch (error) {
            console.error('Error adding pet:', error);
            alert('Failed to add pet. Please try again.');
        }
    } else {
        alert('Please fill out all fields.');
    }
}
