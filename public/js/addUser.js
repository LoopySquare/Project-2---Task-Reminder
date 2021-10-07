const createFormHandler = async (event) => {
  event.preventDefault();

  console.log('I clicked this button');

  // Collect values from the login form
  const first_name = document.querySelector('#first-name').value.trim();
  const last_name = document.querySelector('#last-name').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassword = document.querySelector('#confirm-password').value.trim();
  const email = document.querySelector('#email').value.trim();
  const rawPhone = document.querySelector('#phone').value.trim();

  let passMatch = validatePass(password, confirmPassword);
  let validEmail = validateEmail(email);
  let phone = formatPhone(rawPhone);

  if(!validEmail){
    
    blankPass();
    return
  }

  if(!passMatch) {
    blankPass();
    document.querySelector('#password').focus();
    return
  }

  if(phone.length !== 10){
    blankPass();
    document.querySelector('#phone').focus();
    alert("Please enter a valid 10 digit Phone Number")
    return
  }

  if (first_name && last_name && email && password && phone) {
    const response = await fetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({ first_name, last_name, email, password, phone }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// VALIDATE PASSWORD AND CONFIRM PASSWORD ARE THE SAME AND PROPER LEN
const validatePass = (pass, confirmPass) => {

  if(pass.length < 8){
    document.getElementById("password").classList.add('is-danger');
    document.getElementById("passLength").classList.add('is-hidden');
    document.getElementById("passLengthError").classList.remove('is-hidden');
    return false;
  }

  if(pass !== confirmPass) {
    document.getElementById("confirm-password").classList.add('is-danger');
    document.getElementById("no-match").classList.remove('is-hidden');
    
    return false;
  } else {
    document.getElementById("password").classList.remove('is-danger');
    document.getElementById("passLength").classList.remove('is-hidden');
    document.getElementById("passLengthError").classList.add('is-hidden');
    document.getElementById("confirm-password").classList.remove('is-danger');
    document.getElementById("no-match").classList.add('is-hidden');
    return true;
  }
}

// VALIDATE EMAIL IS IN AN EMAIL FORMAT
const validateEmail = (email) => {

  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(!email.match(mailFormat)) {
    document.getElementById("email").classList.add('is-danger');
    document.getElementById("invalidEmail").classList.remove('is-hidden');
     return false;
  } else {
    document.getElementById("email").classList.remove('is-danger');
    document.getElementById("invalidEmail").classList.add('is-hidden');
    return true;
  }

}

// STRIP DASHES FROM PHONE FIELDS
const formatPhone = (phone) => {

  return phone.replace(/\D/g, '');
}

// BLANK OUT PW FIELDS UPON REFRESHES
const blankPass = () => {
  document.querySelector('#password').value = ""
  document.querySelector('#confirm-password').value = ""
}

document
  .querySelector('#create-button')
  .addEventListener('click', createFormHandler);
