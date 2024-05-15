document.addEventListener("DOMContentLoaded", function() {
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

function showPetTypeSelection() {
    // Create a modal or simple prompt to ask the user for the pet type
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

    // Append the form to the form container
    formContainer.appendChild(form);
}

function addPet(petType) {
    const form = document.getElementById('petForm');
    const name = form.elements['name'].value;
    const dob = form.elements['dob'].value;
    const gender = form.elements['gender'].value;
    const breed = form.elements['breed'].value;

    if (name && dob && gender && breed) {
        const petList = document.getElementById('petList');
        
        const petDiv = document.createElement('div');
        petDiv.className = 'pet';
        
        petDiv.innerHTML = `<h3>${petType.charAt(0).toUpperCase() + petType.slice(1)}: ${name}</h3>
                            <p>Date of Birth: ${dob}</p>
                            <p>Gender: ${gender}</p>
                            <p>Breed: ${breed}</p>`;
        
        petList.appendChild(petDiv);
        
        // Clear the form
        document.getElementById('petFormContainer').innerHTML = '';
    } else {
        alert('Please fill out all fields.');
    }
}

