const recoverFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email').value.trim();

  validEmail = await validateEmail(email);
  
  if (email) {

    const response = await fetch(`/api/users/account/recovery/`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/account/password/reset`);
    } else {
      swal.fire("No Account found with this Email Address");
      document.querySelector('#current-password').focus();
      document.getElementById("current-password").classList.add('is-danger');
    }
  }
};

const cancelFormHandler = async () => {
  document.location.replace('/');
}

const validateEmail = async (email) => {

  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(!email.match(mailFormat)) {
    swal.fire("Please Enter a valid Email!");
    document.getElementById("email").classList.add('is-danger');
    document.getElementById("invalidEmail").classList.remove('is-hidden');

     return false;
  } else {
    document.getElementById("email").classList.remove('is-danger');
    document.getElementById("invalidEmail").classList.add('is-hidden');
    return true;
  }

}


document
  .querySelector('#recover-account')
  .addEventListener('click', recoverFormHandler);

document
  .querySelector('#cancel')
  .addEventListener('click', cancelFormHandler);
