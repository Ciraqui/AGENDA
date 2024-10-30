// public/js/auth.js

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        // Usuário está logado
        document.getElementById('loginNav').classList.add('d-none');
        document.getElementById('dashboardNav').classList.remove('d-none');
        document.getElementById('logoutNav').classList.remove('d-none');
    } else {
        // Usuário não está logado
        document.getElementById('loginNav').classList.remove('d-none');
        document.getElementById('dashboardNav').classList.add('d-none');
        document.getElementById('logoutNav').classList.add('d-none');
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}

// Função para verificar se o usuário está autenticado
function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

// Função para redirecionar usuários não autenticados
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/login.html';
    }
}

// Executar verificação de autenticação quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    if (window.location.pathname !== '/login.html' && window.location.pathname !== '/index.html') {
        requireAuth();
    }
});