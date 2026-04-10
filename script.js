document.addEventListener('DOMContentLoaded', function () {

    // --- Interactive Parallax Background Setup ---
    const layers = document.querySelectorAll('.parallax-layer');
    document.addEventListener('mousemove', function (e) {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        layers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const moveX = (x * speed * 50);
            const moveY = (y * speed * 50);
            layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    function setupToggle(btnId, inputId) {
        const btn = document.getElementById(btnId);
        const input = document.getElementById(inputId);
        const icon = btn.querySelector('i');

        btn.addEventListener('click', function () {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);

            if (type === 'password') {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    }
    setupToggle('togglePassword', 'password');
    setupToggle('toggleConfirmPassword', 'confirmPassword');

    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    function updateStrengthMeter() {
        const val = passwordInput.value;
        let strength = 0;

        strengthBar.className = 'strength-meter-bar';
        strengthBar.style.width = '';
        strengthText.className = 'strength-text';

        if (val.length === 0) {
            strengthText.textContent = '';
            return;
        }

        if (val.length >= 8) strength += 1;
        if (val.match(/[a-z]/) && val.match(/[A-Z]/)) strength += 1;
        if (val.match(/\d/) || val.match(/[^a-zA-Z\d]/)) strength += 1;

        if (val.length < 8 || strength === 1) {
            strengthBar.classList.add('strength-weak');
            strengthText.textContent = 'Weak (Needs 8+ chars, mix of letters/numbers)';
            strengthText.classList.add('text-weak');
        } else if (strength === 2) {
            strengthBar.classList.add('strength-medium');
            strengthText.textContent = 'Medium';
            strengthText.classList.add('text-medium');
        } else if (strength === 3) {
            strengthBar.classList.add('strength-strong');
            strengthText.textContent = 'Strong';
            strengthText.classList.add('text-strong');
        }
    }

    passwordInput.addEventListener('input', updateStrengthMeter);

    function showError(inputElement, errorElementId, message) {
        document.getElementById(errorElementId).textContent = message;
        if (inputElement.type !== 'radio') {
            inputElement.classList.add('input-error');
        }
    }

    function clearError(inputElement, errorElementId) {
        document.getElementById(errorElementId).textContent = '';
        if (inputElement.type !== 'radio') {
            inputElement.classList.remove('input-error');
        }
    }

    function validateField(input) {
        const id = input.id || input.name;
        const errorId = id + 'Error';
        let isValid = true;

        if (!input.checkValidity()) {
            isValid = false;
            if (input.validity.valueMissing) {
                showError(input, errorId, 'This field is required.');
            } else if (input.validity.typeMismatch && input.type === 'email') {
                showError(input, errorId, 'Please enter a valid email format.');
            } else if (input.validity.patternMismatch && id === 'studentId') {
                showError(input, errorId, 'Student ID must contain numbers only.');
            } else if (input.validity.tooShort) {
                showError(input, errorId, `Must be at least ${input.minLength} characters.`);
            }
        } else {
            if (id === 'confirmPassword' && input.value !== document.getElementById('password').value) {
                showError(input, errorId, 'Passwords do not match.');
                isValid = false;
            } else {
                clearError(input, errorId);
            }
        }
        return isValid;
    }

    const allInputs = form.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('input-error')) {
                validateField(this);
            }
        });

        if (input.type === 'radio') {
            input.addEventListener('change', function () {
                clearError(input, input.name + 'Error');
            });
        }
    });

    passwordInput.addEventListener('input', function () {
        const confirmInput = document.getElementById('confirmPassword');
        if (confirmInput.value.length > 0 || confirmInput.classList.contains('input-error')) {
            validateField(confirmInput);
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        successMessage.classList.add('hidden');

        let isFormValid = true;

        const fieldsToValidate = ['fullName', 'email', 'studentId', 'course', 'password', 'confirmPassword'];
        fieldsToValidate.forEach(id => {
            const input = document.getElementById(id);
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        const radioGroups = ['yearLevel', 'gender'];
        radioGroups.forEach(name => {
            const checked = document.querySelector(`input[name="${name}"]:checked`);
            if (!checked) {
                const firstRadio = document.querySelector(`input[name="${name}"]`);
                showError(firstRadio, name + 'Error', 'Please select an option.');
                isFormValid = false;
            }
        });

        if (isFormValid) {
            form.reset();
            allInputs.forEach(input => {
                if (input.type !== 'radio') input.classList.remove('input-error');
            });

            strengthBar.className = 'strength-meter-bar';
            strengthBar.style.width = '';
            strengthText.textContent = '';

            document.getElementById('password').setAttribute('type', 'password');
            document.querySelector('#togglePassword i').className = 'fa-regular fa-eye';

            document.getElementById('confirmPassword').setAttribute('type', 'password');
            document.querySelector('#toggleConfirmPassword i').className = 'fa-regular fa-eye';

            successMessage.classList.remove('hidden');
        }
    });

    form.addEventListener('reset', function () {
        allInputs.forEach(input => {
            const errorId = (input.id || input.name) + 'Error';
            clearError(input, errorId);
        });
        successMessage.classList.add('hidden');

        strengthBar.className = 'strength-meter-bar';
        strengthBar.style.width = '';
        strengthText.textContent = '';

        document.getElementById('password').setAttribute('type', 'password');
        document.querySelector('#togglePassword i').className = 'fa-regular fa-eye';

        document.getElementById('confirmPassword').setAttribute('type', 'password');
        document.querySelector('#toggleConfirmPassword i').className = 'fa-regular fa-eye';
    });
});