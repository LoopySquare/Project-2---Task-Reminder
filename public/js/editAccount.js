
const saveButtonHandler = async (event) => {
  event.preventDefault ();

  // Collect values from the login form

  const first_name = document.querySelector('#first-name').value.trim();
  const last_name = document.querySelector('#last-name').value.trim();
  const phone = formatPhone(document.querySelector('#phone').value.trim());
  const bio = document.querySelector('#user-bio').value.trim();
  const timeZone = document.querySelector('#time-zone').value.trim();

  const validName = await validateName(first_name, last_name);
  const validPhone = await validatePhone(phone);
  const validTZ = await validateTZ(timeZone);

  if(!validName){
    return;
  }

  if(!validPhone){
    return;
  }

  if(!validTZ){
    return;
  }

  if (first_name && last_name && phone && timeZone) {

    console.log('Sending Fetch');
    const response = await fetch(`/api/users/account/edit/`, {
      method: 'PUT',
      body: JSON.stringify({ first_name, last_name, phone, bio, timeZone }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      
      const result = await Swal.fire({
        title: 'Congradulations!',
        text: 'You successfully updated your Remindr Profile!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Thank you!',
      })
        
      if (result.isConfirmed) {
        document.location.replace(`/profile`);
      } 

    } else {
      alert(response.statusText);
    }  
  }   
};


const cancelButtonHandler = async (event) => {
  event.preventDefault();

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You will be returned to your Account Page.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, cancel!',
    cancelButtonText: 'No, I will complete'
  })
  
  if (result.isConfirmed) {
    document.location.replace(`/profile`);
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    return
  }
};

const updatePasswordHandler = async () => {
  
  document.location.replace(`/account/password/update`);

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

const formatPhone = (phone) => {

  return phone.replace(/\D/g, '');
}

const validatePhone = async (phone) => {

  if(phone === '' || phone.length !== 10){
    swal.fire("Please Enter a 10 Digit Phone Number");
    document.querySelector('#phone').focus();
    return false;
  }
    return true;
}

const validateTZ = async (timeZone) => {

  if(timeZone === 'default'){
    swal.fire("Please Select Your Time Zone");
    return false;
  }
  return true;
}

document
  .querySelector('#save-profile')
  .addEventListener('click', saveButtonHandler);

document
  .querySelector('#cancel')
  .addEventListener('click', cancelButtonHandler);

document
  .querySelector('#update-password')
  .addEventListener('click', updatePasswordHandler);


