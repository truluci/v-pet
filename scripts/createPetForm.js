$(document).ready(function() {
    $('#showPetTypeSelectionBtn').on('click', function() {
        $('#petTypeSelectionContainer').show();
    });

    $('#selectPetTypeBtn').on('click', function() {
        const petType = $('#petType').val();
        if (petType) {
            createPetForm(petType);
            $('#petTypeSelectionContainer').hide();
        } else {
            alert('Please select a pet type.');
        }
    });
});

function createPetForm(petType) {
    const formContainer = $('#petFormContainer');
    formContainer.empty();

    const form = $('<form>').attr('id', 'petForm');

    const title = $('<h2>').text(`Add a new ${petType.charAt(0).toUpperCase() + petType.slice(1)}`);
    form.append(title);

    form.append($('<label>').text('Name: ').append($('<input>').attr({ type: 'text', name: 'name' })));
    form.append($('<br>'));

    form.append($('<label>').text('Date of Birth: ').append($('<input>').attr({ type: 'date', name: 'dob' })));
    form.append($('<br>'));

    form.append($('<label>').text('Gender: ').append($('<select>').attr('name', 'gender').append($('<option>').attr({ value: 'male' }).text('Male')).append($('<option>').attr({ value: 'female' }).text('Female'))));
    form.append($('<br>'));

    form.append($('<label>').text('Breed: ').append($('<input>').attr({ type: 'text', name: 'breed' })));
    form.append($('<br>'));

    const submitButton = $('<button>').attr('type', 'button').text('Add Pet');
    submitButton.on('click', function() {
        addPet(petType);
    });
    form.append(submitButton);

    formContainer.append(form);
}
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
        alert('Pet added successfully.');

        form.reset();
        document.getElementById('petFormContainer').innerHTML = '';

        // Add the new pet to the sidebar
        const petSidebarList = document.getElementById('petSidebarList');
        const newPetItem = document.createElement('li');
        newPetItem.textContent = name;
        petSidebarList.appendChild(newPetItem);

    } catch (error) {
        console.error('Error adding pet:', error);
        alert(error.message);
    }
}