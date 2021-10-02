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
    document.querySelector('#email').focus();
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

const validatePass = (pass, confirmPass) => {

  if(pass.length < 8){
    alert("Password must be more than 8 Characters");
    return false;
  }

  if(pass !== confirmPass) {
    alert("Passwords did not match");
    return false;
  } else {
    return true;
  }
}

const validateEmail = (email) => {

  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(!email.match(mailFormat)) {
     alert("You have entered an invalid email address!")
     return false;
  } else {
    return true;
  }

}

const formatPhone = (phone) => {

  return phone.replace(/\D/g, '');
}

const blankPass = () => {
  document.querySelector('#password').value = ""
  document.querySelector('#confirm-password').value = ""
}

document
  .querySelector('#create-button')
  .addEventListener('click', createFormHandler);
