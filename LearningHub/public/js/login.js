window.addEventListener("DOMContentLoaded", main);

function main() {
    const loginForm = document.getElementById('login-form');
    const userDiv = document.getElementById('logged-in-user');
    const usernameDisplay = document.getElementById('username-display');
    FetchData.updateCartItemsDisplay();     // Display cart items count 

    // Check if there is an active session
    if (sessionStorage.getItem('sessionId')) {
        const username = sessionStorage.getItem('username');
        loginForm.style.display = "none"; // Hide the login form
        userDiv.style.display = "flex"; // Show the logged-in user section in header
        usernameDisplay.textContent = username;
    } else {
        loginForm.style.display = "flex"; // Show the login form
        userDiv.style.display = "none"; // Hide the logged-in user section in header
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Extract username and password from the form
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // If there isn't an active session
            if (!sessionStorage.getItem('sessionId')) {
                const response = await fetch('/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.sessionId) {
                        sessionStorage.setItem('sessionId', data.sessionId);    // Add sessionId to sessionStorage for future use
                        sessionStorage.setItem('username', username);           // Add username to sessionStorage for future use

                        loginForm.style.display = "none";   // Hide the login form
                        userDiv.style.display = "block";    // Show the logged-in user section in header
                        usernameDisplay.textContent = username;
                    }
                    alert("Login successful.");
                    FetchData.updateCartItemsDisplay();
                } else {
                    alert("Login unsuccessful.");
                }
            }
        } catch (error) {
            alert('An error occurred while trying to log in. Please try again later.');
        }
    });
}
