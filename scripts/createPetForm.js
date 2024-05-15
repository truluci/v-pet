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