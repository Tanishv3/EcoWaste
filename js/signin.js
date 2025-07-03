// Basic Sign In/Sign Up logic for EcoWaste

document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => content.style.display = 'none');
            const tabId = button.getAttribute('data-tab') + '-tab';
            const tab = document.getElementById(tabId);
            if (tab) tab.style.display = 'block';
        });
    });

    // Show Sign In tab by default
    document.getElementById('signin-tab').style.display = 'block';
    document.getElementById('signup-tab').style.display = 'none';

    // Sign In form submission
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation (add real auth logic as needed)
            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;
            if (email && password) {
                if (typeof showToast === 'function') {
                    showToast('Sign In successful! (Demo)', 'success');
                } else {
                    alert('Sign In successful! (Demo)');
                }
                // Redirect or update UI as needed
            } else {
                if (typeof showToast === 'function') {
                    showToast('Please fill in all fields.', 'error');
                } else {
                    alert('Please fill in all fields.');
                }
            }
        });
    }

    // Sign Up form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation (add real registration logic as needed)
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            if (name && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                    if (typeof showToast === 'function') {
                        showToast('Passwords do not match.', 'error');
                    } else {
                        alert('Passwords do not match.');
                    }
                } else {
                    if (typeof showToast === 'function') {
                        showToast('Sign Up successful! (Demo)', 'success');
                    } else {
                        alert('Sign Up successful! (Demo)');
                    }
                    // Redirect or update UI as needed
                }
            } else {
                if (typeof showToast === 'function') {
                    showToast('Please fill in all fields.', 'error');
                } else {
                    alert('Please fill in all fields.');
                }
            }
        });
    }
}); 