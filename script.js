function openLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginError').style.display = 'none';
}

function loginUser() {
    let username = document.getElementById('loginUser').value.trim();
    let password = document.getElementById('loginPass').value;
    let errorDiv = document.getElementById('loginError');
    errorDiv.style.display = 'none';

    if (!username || !password) {
        errorDiv.innerText = "Both username and password are required.";
        errorDiv.style.display = 'block';
        return;
    }

    fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(res => {
        if (!res.ok) throw new Error('Invalid credentials');
        return res.json();
    })
    .then(data => {
        sessionStorage.setItem('auth_token', data.access_token);
        closeLoginModal();
        updateUIAfterLogin();
    })
    .catch(err => {
        errorDiv.innerText = "Access Denied: Invalid username or password.";
        errorDiv.style.display = 'block';
    });
}

function logoutUser() {
    sessionStorage.removeItem('auth_token');
    document.getElementById('mainDashboard').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('navLoginBtn').style.display = 'inline-block';
    document.getElementById('navLogoutBtn').style.display = 'none';
}

function updateUIAfterLogin() {
    if (sessionStorage.getItem('auth_token')) {
        document.getElementById('homePage').style.display = 'none';
        document.getElementById('mainDashboard').style.display = 'block';
        document.getElementById('navLoginBtn').style.display = 'none';
        document.getElementById('navLogoutBtn').style.display = 'inline-block';
    }
}

// Check session state on initial page load
window.onload = function() {
    updateUIAfterLogin();
};