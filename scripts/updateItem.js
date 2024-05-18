$(document).ready(function() {
    $('#petSidebarList').on('click', '.update-btn', function() {
        const petItem = $(this).parent();
        const petName = petItem.data('petName');
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
            $('#petFormContainer').html(`
                <form id="updatePetForm">
                    <h2>Update ${pet.name}</h2>
                    <label>Name: <input type="text" name="name" value="${pet.name}"></label><br>
                    <label>Date of Birth: <input type="date" name="dob" value="${pet.dob}"></label><br>
                    <label>Gender: 
                        <select name="gender">
                            <option value="male" ${pet.gender === 'male' ? 'selected' : ''}>Male</option>
                            <option value="female" ${pet.gender === 'female' ? 'selected' : ''}>Female</option>
                        </select>
                    </label><br>
                    <label>Breed: <input type="text" name="breed" value="${pet.breed}"></label><br>
                    <button type="button" id="saveUpdateBtn">Save</button>
                </form>
            `);

            $('#saveUpdateBtn').on('click', async function() {
                const form = $('#updatePetForm');
                const updatedName = form.find('input[name="name"]').val();
                const updatedDob = form.find('input[name="dob"]').val();
                const updatedGender = form.find('select[name="gender"]').val();
                const updatedBreed = form.find('input[name="breed"]').val();

                try {
                    const response = await fetch(`http://localhost:3000/update-pet`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userData.token}`
                        },
                        body: JSON.stringify({
                            username,
                            originalName: pet.name,
                            name: updatedName,
                            dob: updatedDob,
                            gender: updatedGender,
                            breed: updatedBreed,
                            petType: pet.petType
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to update pet.');
                    }

                    //alert('Pet updated successfully.');
                    petItem.find('.pet-name').text(updatedName);
                    $('#petFormContainer').empty();
                } catch (error) {
                    console.error('Error updating pet:', error);
                    alert('Failed to update pet. Please try again.');
                }
            });
        })
        .catch(error => {
            console.error('Error fetching pet details:', error);
            alert('Failed to fetch pet details.');
        });
    });
});
