const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if(!password){

  }

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response);

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      swal.fire("Incorrect email or password, please try again");
      document.querySelector("#email-login").classList.add('is-danger');
      document.querySelector("#password-login").classList.add('is-danger');
      document.querySelector('#password-login').value = ""
    }
  }
};

const signupFormHandler = async (event) => {
  document.location.replace('/create');
};

const forgotPasswordHandler = async (event) => {
  document.location.replace('/account/recovery/');
};

document
  .querySelector('#login-button')
  .addEventListener('click', loginFormHandler);

document
  .querySelector('#signup-form')
  .addEventListener('click', signupFormHandler);

document
  .querySelector('#forgot-password')
  .addEventListener('click', forgotPasswordHandler);