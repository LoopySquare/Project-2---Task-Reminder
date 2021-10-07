const editButtonHandler = async (event) => {
    event.preventDefault ();

    const id = event.target.getAttribute('profile-id');

     // Collect values from the login form

     const first_name = document.querySelector('#first-name').value.trim();
     const last_name = document.querySelector('#last-name').value.trim();
     const password = document.querySelector('#password').value.trim();
     const confirmPassword = document.querySelector('#confirm-password').value.trim();
     const email = document.querySelector('#email').value.trim();
     const rawPhone = document.querySelector('#phone').value.trim();

     if (first_name && last_name && password && confirmPassword && email && rawPhone) {

        const response = await fetch(`/api/users/create/${id}`, {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, email, password, phone }),
            headers: { 'Content-Type': 'application/json' },
          });
      
        if (response.ok) {
        // If successful, redirect the browser to the profile page
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }  
    }
        
};
const cancelButtonHandler = async (event) => {
    event.preventDefault();
  
    const cancel = confirm("Are you sure you want to cancel?\n All changes will not be saved.")
  
    if(cancel){
      document.location.replace(`/profile`);
    } else {
      return;
    }
};
document
  .querySelector('#save-profile')
  .addEventListener('click', editButtonHandler);

document
  .querySelector('#cancel')
  .addEventListener('click', cancelButtonHandler);
