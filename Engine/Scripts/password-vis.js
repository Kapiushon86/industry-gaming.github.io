function togglePassword() {
    var passwordInput = document.getElementById('password');
    var togglePasswordIcon = document.querySelector('.toggle-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordIcon.innerHTML = '&#x1F441;';
    } else {
        passwordInput.type = 'password';
        togglePasswordIcon.innerHTML = '&#x1F441;';
    }
}
