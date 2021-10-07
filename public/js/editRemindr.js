const elem = document.getElementById('ampm');

const am_pm = elem.dataset.ampm

const amRadio = document.querySelector("#AM");
const pmRadio = document.querySelector("#PM");

if(am_pm == "AM"){
  amRadio.checked = true;
} else {
  pmRadio.checked = true;
}

const saveButtonHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-remindrId');

  // Collect values from the login form
  const event_name = document.querySelector('#event_name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const content = document.querySelector('#content').value.trim();
  const send_date = document.querySelector('#send_date').value.trim();
  const send_time = document.querySelector('#send_time').value.trim();
  const am_pm = document.querySelector('input[name="ampm"]:checked').value.trim();

  console.log(am_pm);

  if (event_name && description && content && send_date && send_time && am_pm) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ event_name, description, content, send_date, send_time, am_pm }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      Swal.fire({
        title: 'Congratulations!',
        text: 'You successfully updated your Remindr!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Thank you!',
      }).then((result) => {
        if (result.isConfirmed) {
          document.location.replace(`/profile`);
        } 
      })
    } else {
      alert(response.statusText);
    }
  }
};

const cancelButtonHandler = async (event) => {
  event.preventDefault();

  Swal.fire({
    title: 'Are you sure?',
    text: 'All data will be lost, and not recoverable',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, cancel!',
    cancelButtonText: 'No, I will complete'
  }).then((result) => {
    if (result.isConfirmed) {
      document.location.replace(`/profile`);
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return
    }
  })
};

document
  .querySelector('#save-remindr')
  .addEventListener('click', saveButtonHandler);

document
  .querySelector('#cancel')
  .addEventListener('click', cancelButtonHandler);


