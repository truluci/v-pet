document.addEventListener("DOMContentLoaded", async function() {
    const usernameElement = document.getElementById('username');
    const petSidebarList = document.getElementById('petSidebarList');

    const userData = JSON.parse(localStorage.getItem('currentUser'));
    console.log('UserData:', userData);

    if (userData) {
        const username = userData.username;
        console.log('Username:', username);
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
        console.log('No user data found in localStorage.');
        window.location.href = '/login';
    }
});

async function addPet(petType) {
    const form = document.getElementById('petForm');
    const name = form.elements['name'].value.trim();
    const dob = form.elements['dob'].value;
    const gender = form.elements['gender'].value;
    const breed = form.elements['breed'].value.trim();

    if (!name || !dob || !gender || !breed) {
        alert('Please fill out all fields.');
        return;
    }

    const userData = JSON.parse(localStorage.getItem('currentUser'));

    if (!userData) {
        alert('User data not found. Please log in again.');
        window.location.href = '/login';
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
            const errorText = await response.text();
            throw new Error(`Failed to add pet: ${errorText}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        //alert('Pet added successfully.');

        form.reset();
        document.getElementById('petFormContainer').innerHTML = '';

    } catch (error) {
        console.error('Error adding pet:', error);
        alert(error.message);
    }
}
