$(document).ready(function() {
    $('#petSidebarList').on('click', '.pet-item', function() {
        const petName = $(this).data('petName');
        const userData = JSON.parse(localStorage.getItem('currentUser'));

        if (!userData) {
            alert('User data not found. Please log in again.');
            window.location.href = 'login.html';
            return;
        }

        const username = userData.username;

        fetch(`http://localhost:3000/get-pet?username=${username}&name=${petName}`, {
            headers: {
                'Authorization': `Bearer ${userData.token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch pet details.');
            }
            return response.json();
        })
        .then(pet => {
            $('#petInfoContainer').html(`
                <h3>${pet.name}</h3>
                <p>Type: ${pet.petType}</p>
                <p>Breed: ${pet.breed}</p>
                <p>Gender: ${pet.gender}</p>
                <p>Date of Birth: ${pet.dob}</p>
            `);
        })
        .catch(error => {
            console.error('Error fetching pet details:', error);
            alert('Failed to fetch pet details.');
        });
    });
});
