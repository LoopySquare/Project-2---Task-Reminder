const createFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const currPassword = document.querySelector('#current-password').value.trim();
  const newPassword = document.querySelector('#new-password').value.trim();
  const confirmPassword = document.querySelector('#confirm-password').value.trim();

  console.log(document.querySelector('#current-password').value.trim());

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

    console.log(response);

    if (response.ok) {
      Swal.fire({
        title: 'Congratulations!',
        text: 'Your Password has been updated!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Thank you!',
      }).then((result) => {
        if (result.isConfirmed) {
          document.location.replace(`/profile`);
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } 
      })
    } else {
      swal.fire("Current Password Does not match what's on record");
      document.querySelector('#current-password').focus();
      document.getElementById("current-password").classList.add('is-danger');
    }
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
