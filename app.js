const form = document.getElementById('form');
const button = document.getElementById('button');
const firstName = document.querySelector('.firstName');
const lastName = document.querySelector('.lastName');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const toggleIcon = document.querySelector('.toggle-icon');
const inputs = form.querySelectorAll('input');

// Event listener for the toggle icon
toggleIcon.addEventListener('click', function () {
    if (password.type === 'password') {
        password.type = 'text';
        toggleIcon.classList.add('visible');
    } else {
        password.type = 'password';
        toggleIcon.classList.remove('visible');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    const fields = [
        {element: firstName, name: 'First Name'},
        {element: lastName, name: 'Last Name'},
        {element: email, name: 'Email'},
        {element: password, name: 'Password'}
    ];

    fields.forEach(field => {
        const errorSpan = field.element.nextElementSibling;
        const value = field.element.value.trim();

        // allow error message to be updated esp for email field
        if (errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.remove();
        }

        if (value === '') {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = `${field.name} cannot be empty`;
            field.element.parentNode.insertBefore(errorMessage, field.element.nextSibling);
            field.element.parentNode.classList.add('error');
            hasError = true;

            // adjust password toggle icon
            if (field.name === 'Password') {
                toggleIcon.classList.add('hide');
            }
        } else if (field.name === 'Email' && !validateEmail(value)) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = "Looks like this is not an email";
            field.element.parentNode.insertBefore(errorMessage, field.element.nextSibling);
            field.element.parentNode.classList.add('error');
            hasError = true;
        } else {
            field.element.parentNode.classList.remove('error');
            toggleIcon.classList.remove('hide');
        }
    });

    if (!hasError) {
        form.submit();
    }
});

//Validate email
function validateEmail(email) {
    var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return  re.test(String(email).toLowerCase());
}