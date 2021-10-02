const createFormHandler = async (event) => {
  event.preventDefault();

  console.log('I clicked this button');

  // Collect values from the login form
  const firstName = document.querySelector('#first-name').value.trim();
  const lastName = document.querySelector('#last-name').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassword = document.querySelector('#confirm-password').value.trim();
  const email = document.querySelector('#email').value.trim();
  const phone = document.querySelector('#phone').value.trim();

  let passMatch = validatePass(password, confirmPassword);
  let validEmail = validateEmail(email);

  console.log(passMatch);

  if(!validEmail){
    document.querySelector('#confirm-password').focus();
  }

  if(!passMatch) {
    document.querySelector('#password').value = ""
    document.querySelector('#confirm-password').value = ""
  }

  if (firstName && lastName && email && validEmail && password && passMatch && phone) {
    const response = await fetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password, phone }),
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

  let cleanNum =  phone.replace(/\D/g, '');

  if(cleanNum.length !== 10){
    alert("Please enter a valid 10 digit Phone Number")
  }

}

document
  .querySelector('#create-button')
  .addEventListener('click', createFormHandler);


  console.log(document.querySelector('#create-button'));