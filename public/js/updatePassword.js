const createFormHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-editId');

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

    const response = await fetch(`/password/update/${id}`, {
      method: 'POST',
      body: JSON.stringify({ currPassword, newPassword }),
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
