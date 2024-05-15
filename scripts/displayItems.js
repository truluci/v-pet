document.addEventListener("DOMContentLoaded", function () {
    const petListElement = document.getElementById('petList');

    window.displayPets = function () {
        const pets = JSON.parse(localStorage.getItem('pets')) || [];

        petListElement.innerHTML = ''; // Clear existing pet list

        if (pets.length === 0) {
            petListElement.innerHTML = '<p>No pets found.</p>';
            return;
        }

        pets.forEach(pet => {
            const petElement = document.createElement('div');
            petElement.classList.add('pet-item');
            petElement.innerHTML = `
                <h3>${pet.name}</h3>
                <p>Type: ${pet.petType}</p>
                <p>Date of Birth: ${pet.dob}</p>
                <p>Gender: ${pet.gender}</p>
                <p>Breed: ${pet.breed}</p>
            `;
            petListElement.appendChild(petElement);
        });
    }
});
