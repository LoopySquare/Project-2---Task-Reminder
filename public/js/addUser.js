const createFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const first_name = document.querySelector('#first-name').value.trim();
  const last_name = document.querySelector('#last-name').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassword = document.querySelector('#confirm-password').value.trim();
  const email = document.querySelector('#email').value.trim();
  const rawPhone = document.querySelector('#phone').value.trim();
  const timeZone = document.querySelector('#time-zone').value.trim();
  

  const validName = await validateName(first_name, last_name)
  const passMatch = await validatePass(password, confirmPassword);
  const validEmail = await validateEmail(email);
  const phone = await formatPhone(rawPhone);
  const validPhone = await validatePhone(phone)
  const validTZ = await validateTZ(timeZone);


  if(!validName){
    blankPass();
    return;
  }
  
  if(!validEmail){
    blankPass();
    return;
  } 

   if(!passMatch) {
    blankPass();
    document.querySelector('#password').focus();
    return;
  } 
  
  if(!validPhone){
    blankPass();
    document.querySelector('#phone').focus();
    return;
  }

  if(!validTZ){
    blankPass();
    document.querySelector('#time-zone').focus();
    return;
  } 
  
  if (first_name && last_name && email && password && phone && timeZone) {

    const response = await fetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({ first_name, last_name, email, password, phone, timeZone }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      const result = await Swal.fire({
        title: 'Account Already Exists:',
        text: 'Seems an account already exists with that email',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Recover Account',
        cancelButtonText: 'Create with different email'
      })

      if (result.isConfirmed) {
        document.location.replace(`/account/recovery/`);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        document.querySelector("#email").classList.add('is-danger');
        document.querySelector('#email').focus();
        return;
      }
    }
  }
};

const cancelButtonHandler = async (event) => {
  event.preventDefault();

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'All data will be lost, and not recoverable',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, cancel!',
    cancelButtonText: 'No, I will complete'
  })

  if (result.isConfirmed) {
    document.location.replace(`/`);
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    return
  }
  
};

const validateName = async (fname, lname) => {

  if(fname == '' && lname == ''){
    swal.fire("Please Enter your Name");
    document.querySelector('#first-name').focus();
    return false;
  }

  if(fname == ''){
    swal.fire("Please Enter your First Name");
    document.querySelector('#first-name').focus();
    return false;
  }

  if(lname == '' ){
    swal.fire("Please Enter your Last Name");
    document.querySelector('#last-name').focus();
    return false;
  }

  return true;

}

// VALIDATE PASSWORD AND CONFIRM PASSWORD ARE THE SAME AND PROPER LEN
const validatePass = async (pass, confirmPass) => {

  if(pass === ''){
    swal.fire("Please Enter a Password");
    return false;
  }

  if(pass.length < 8){
    swal.fire("Password must be atleast 8 Characters");
    document.getElementById("password").classList.add('is-danger');
    document.getElementById("passLength").classList.add('is-hidden');
    document.getElementById("passLengthError").classList.remove('is-hidden');
    return false;
  }

  if(pass !== confirmPass) {
    swal.fire("Passwords do not match!");
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

// STRIP DASHES FROM PHONE FIELDS

const validatePhone = async (phone) => {
  if(phone === '' || phone.length !== 10){
    swal.fire("Please Enter a 10 Digit Phone Number");
    return false;
  } else {
    return true;
  }
}

const formatPhone = (phone) => {

  return phone.replace(/\D/g, '');
}

const validateTZ = async (timeZone) => {

  if(timeZone === 'default'){
    swal.fire("Please Select Your Time Zone");
    return false;
  }
  return true;
}

// BLANK OUT PW FIELDS UPON REFRESHES
const blankPass = () => {
  document.querySelector('#password').value = ""
  document.querySelector('#confirm-password').value = ""
}

document
  .querySelector('#create-button')
  .addEventListener('click', createFormHandler);

document
  .querySelector('#cancel')
  .addEventListener('click', cancelButtonHandler);
