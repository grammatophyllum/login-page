let isLogin = true; // Tracks whether the current mode is login or signup

// HELPER FUNCTIONS
// Toggle between login and signup forms
function toggleForm() {
    isLogin = !isLogin;
    document.querySelector('#form-title').textContent = isLogin ? 'Login' : 'Sign Up';
    document.querySelector('#toggle-text').textContent = isLogin ? "Don't have an account?" : 'Already have an account?';
    document.querySelector('#toggle-link').textContent = isLogin ? 'Sign up' : 'Login';
    document.querySelector('#error-msg').textContent = '';
}

// Show home page with greeting
function showHome(username) {
    document.querySelector('#auth-box').style.display = 'none';
    document.querySelector('#home-page').style.display = 'flex';
    document.querySelector('#welcome-message').textContent = `Hello ${username}!`;
}

// Log out and return to auth screen
function logout() {
    document.querySelector('#auth-box').style.display = 'block';
    document.querySelector('#home-page').style.display = 'none';
    document.querySelector('#username').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#error-msg').textContent = '';
}

function showLoading() {
  const btnSpinner = document.querySelector('#btn-spinner');
  const btnText = document.querySelector('.btn-text');
  const submitBtn = document.querySelector('#submit-btn');

  btnSpinner.style.display = 'inline-block';
  btnText.style.display = 'none';
  submitBtn.disabled = true;
}

function hideLoading() {
  const btnSpinner = document.querySelector('#btn-spinner');
  const btnText = document.querySelector('.btn-text');
  const submitBtn = document.querySelector('#submit-btn');

  btnSpinner.style.display = 'none';
  btnText.style.display = 'inline';
  submitBtn.disabled = false;
}

// Helper function
function isAlphanumeric(str) {
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
    str = str.toLowerCase();
    for (let i = 0; i < str.length; i++) {
        if (!allowed.includes(str[i])) {
        return false;
        }
    }
    return true;
}

// API endpoint URL
const API_URL = "https://script.google.com/macros/s/AKfycbx-WIB89PeWZncikgcA3ABQ3x279r_C6Iy4jPf_pgXPU0JaGOrr_v-jOd3fd8KrQ6whpg/exec";

// Login function - calls GET API
async function login(username, password) {
    try {
        const url = new URL(API_URL);
        url.searchParams.append('username', username);
        url.searchParams.append('password', password);

        const response = await fetch(url, { method: 'GET' });
        return await response.json();
    } catch (err) {
        return { status: "error", message: "Network error during login." };
    }
}

// Signup function - calls POST API
async function signup(username, password) {
    try {
        const url = new URL(API_URL);
        url.searchParams.append('username', username);
        url.searchParams.append('password', password);

        const response = await fetch(url, { method: 'POST' });
        return await response.json();
    } catch (err) {
        return { status: "error", message: "Network error during signup." };
    }
}

// Handle login or signup submission
async function handleSubmit() {
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    document.querySelector('#error-msg').textContent = '';

    // Basic validation
    if (username.length < 4 || password.length < 4) {
        document.querySelector('#error-msg').textContent = 'Username and password must be at least 4 characters.';
        return;
    }

    if (!isAlphanumeric(username) || !isAlphanumeric(password)) {
        document.querySelector('#error-msg').textContent = 'Username and password must be alphanumeric only.';
        return;
    }

    showLoading();
    if (isLogin) {
        const res = await login(username, password);
        if (res.status === "success") {
            showHome(username);
        } else {
            document.querySelector('#error-msg').textContent = res.message || 'Login failed.';
        }
    } else {
        const res = await signup(username, password);
        if (res.status === "success") {
            showHome(username);
        } else {
            document.querySelector('#error-msg').textContent = res.message || 'Signup failed.';
        }
    }
    hideLoading();
}
