const createFormHandler = async (event) => {
  event.preventDefault();

  

  // Collect values from the login form
  const currPassword = document.querySelector('#current-password').value.trim();
  const newPassword = document.querySelector('#new-password').value.trim();
  const confirmPassword = document.querySelector('#confirm-password').value.trim();

  const passMatch = await validatePass(currPassword, newPassword, confirmPassword);

   if(!passMatch) {
    blankPass();
    document.querySelector('#password').focus();
    return;
  } 
  
  if (currPassword && newPassword && confirmPassword) {

    const response = await fetch(`/api/users/password/update/`, {
      method: 'PUT',
      body: JSON.stringify({ currPassword, newPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {

      const result = await Swal.fire({
        title: 'Congradulations!',
        text: 'Your Password has been updated!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Thank you!',
      })
      
      if (result.isConfirmed) {
        document.location.replace(`/profile`);
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } 

    } else {
      swal.fire("Current Password Does not match what's on record");
      document.querySelector('#current-password').focus();
      document.getElementById("current-password").classList.add('is-danger');
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

// VALIDATE PASSWORD AND CONFIRM PASSWORD ARE THE SAME AND PROPER LEN
const validatePass = async (currPass, newPass, confirmPass) => {

  if(currPass === ''){
    swal.fire("Please Your Current Password");
    return false;
  }

  if(newPass === ''){
    swal.fire("Please Your New Password");
    return false;
  }

  if(newPass.length < 8){
    swal.fire("Password must be more than 8 Characters");
    return false;
  }

  if(newPass !== confirmPass) {
    swal.fire("New Password / Confirm New Password did not match");
    return false;
  } else {
    return true;
  }

}

// BLANK OUT PW FIELDS UPON REFRESHES
const blankPass = () => {
  document.querySelector('#current-password').value = ""
  document.querySelector('#new-password').value = ""
  document.querySelector('#confirm-password').value = ""
}

document
  .querySelector('#update-password')
  .addEventListener('click', createFormHandler);

document
  .querySelector('#cancel')
  .addEventListener('click', cancelButtonHandler);
