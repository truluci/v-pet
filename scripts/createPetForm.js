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
    formContainer.empty(); // Clear any existing form

    const form = $('<form>').attr('id', 'petForm');

    const title = $('<h2>').text(`Add a new ${petType.charAt(0).toUpperCase() + petType.slice(1)}`);
    form.append(title);

    const nameLabel = $('<label>').text('Name: ');
    const nameInput = $('<input>').attr({ type: 'text', name: 'name' });
    nameLabel.append(nameInput);
    form.append(nameLabel);

    form.append($('<br>'));

    const dobLabel = $('<label>').text('Date of Birth: ');
    const dobInput = $('<input>').attr({ type: 'date', name: 'dob' });
    dobLabel.append(dobInput);
    form.append(dobLabel);

    form.append($('<br>'));

    const genderLabel = $('<label>').text('Gender: ');
    const genderSelect = $('<select>').attr('name', 'gender');
    const maleOption = $('<option>').attr({ value: 'male' }).text('Male');
    const femaleOption = $('<option>').attr({ value: 'female' }).text('Female');
    genderSelect.append(maleOption, femaleOption);
    genderLabel.append(genderSelect);
    form.append(genderLabel);

    form.append($('<br>'));

    const breedLabel = $('<label>').text('Breed: ');
    const breedInput = $('<input>').attr({ type: 'text', name: 'breed' });
    breedLabel.append(breedInput);
    form.append(breedLabel);

    form.append($('<br>'));

    const submitButton = $('<button>').attr('type', 'button').text('Add Pet');
    submitButton.on('click', function() {
        addPet(petType);
    });
    form.append(submitButton);

    formContainer.append(form);
}
