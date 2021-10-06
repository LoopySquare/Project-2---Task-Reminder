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
  .querySelector('#save-remindr')
  .addEventListener('click', saveButtonHandler);

document
  .querySelector('#cancel')
  .addEventListener('click', cancelButtonHandler);


