<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {
=======
document.addEventListener("DOMContentLoaded", async function() {
>>>>>>> 7aeca45610c2589317b8a88de413f112e44bc767
    const usernameElement = document.getElementById('username');
    const petSidebarList = document.getElementById('petSidebarList');

    const userData = JSON.parse(localStorage.getItem('currentUser'));

    if (userData) {
        const username = userData.username;
        usernameElement.textContent = username;

        try {
            const response = await fetch(`http://localhost:3000/get-pets?username=${username}`, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch pets.');
            }

            const pets = await response.json();
            pets.forEach(pet => {
                const newPetItem = document.createElement('li');
                newPetItem.classList.add('pet-item');
                newPetItem.textContent = pet.name;
                newPetItem.dataset.petName = pet.name;

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-btn');
                deleteButton.textContent = 'Delete';

                const updateButton = document.createElement('button');
                updateButton.classList.add('update-btn');
                updateButton.textContent = 'Update';

                newPetItem.appendChild(deleteButton);
                newPetItem.appendChild(updateButton);

                petSidebarList.appendChild(newPetItem);
            });
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    } else {
        window.location.href = 'login.html';
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
            console.log(responseData);
            //alert('Pet added successfully.');

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
