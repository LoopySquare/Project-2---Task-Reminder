const loginFormHandler = async (event) => {
  event.preventDefault();

  console.log('I clicked this button');

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      document.getElementById("").classList.add('MyClass');
    }
  }
};

const signupFormHandler = async (event) => {
  document.location.replace('/create');
};

document
  .querySelector('#login-button')
  .addEventListener('click', loginFormHandler);

console.log(document.querySelector('#email-login'));

document
  .querySelector('#signup-form')
  .addEventListener('click', signupFormHandler);
