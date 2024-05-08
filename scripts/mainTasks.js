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
