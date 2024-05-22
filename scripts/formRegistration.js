document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (username === '' || password === '' || confirmPassword === '') {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Send registration data to server
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed.');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            window.location.href = '/login';
            registerForm.reset();
        })
        .catch(error => {
            console.error('Registration error:', error);
            alert('An error occurred during registration. Please try again.');
        });
    });
});
