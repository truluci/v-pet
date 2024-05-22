document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector('form');

    async function handleFormSubmit(event) {
        event.preventDefault();
        
        const usernameInput = document.querySelector('input[type="text"]');
        const passwordInput = document.querySelector('input[type="password"]');
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '' || password === '') {
            alert('Please enter both username and password.');
            return;
        }

        // Send login data to server
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed.');
            }

            const userData = await response.json();
            localStorage.setItem('currentUser', JSON.stringify(userData));
            window.location.href = '/main';
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        }

        loginForm.reset();
    }

    loginForm.addEventListener('submit', handleFormSubmit);

    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleFormSubmit(event);
        }
    });

    const loginButton = document.querySelector('.btn');
    loginButton.addEventListener('click', handleFormSubmit);
});
