$(document).ready(function() {
    $('#petSidebarList').on('click', '.delete-btn', async function() {
        const petName = $(this).parent().data('petName');
        const userData = JSON.parse(localStorage.getItem('currentUser'));

        if (!userData) {
            alert('User data not found. Please log in again.');
            window.location.href = 'login.html';
            return;
        }

        const token = userData.token;
        const username = userData.username;

        try {
            const response = await fetch(`http://localhost:3000/delete-pet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username, name: petName })
            });

            if (!response.ok) {
                throw new Error('Failed to delete pet.');
            }

            $(this).parent().remove();
            //alert('Pet deleted successfully.');
        } catch (error) {
            console.error('Error deleting pet:', error);
            alert('Failed to delete pet. Please try again.');
        }
    });
});
