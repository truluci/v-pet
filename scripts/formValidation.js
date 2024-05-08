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

        try {
            const response = await fetch('../data/userData.json');
            const userData = await response.json();

            const user = userData.find(user => user.username === username && user.password === password);

            if (user) {
                // user datayı main pagede kullanmak için local storage'a kaydediyoruz
                localStorage.setItem('currentUser', JSON.stringify(user));

                alert('Login successful!');
                window.location.href = '../pages/main.html'; // Redirect to main page
            } else {
                alert('Invalid username or password. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching or parsing user data:', error);
            alert('An error occurred while processing your request. Please try again later.');
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
