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

  console.log("i clicked this");

  const id = event.target.getAttribute('data-remindrId');

  console.log(id);

  // Collect values from the login form
  const event_name = document.querySelector('#event_name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const content = document.querySelector('#content').value.trim();
  const send_date = document.querySelector('#send_date').value.trim();
  const send_time = document.querySelector('#send_time').value.trim();
  const ampm = document.querySelector('input[name="ampm"]:checked').value.trim();

  console.log(ampm);

  if (event_name && description && content && send_date && send_time && ampm) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ event_name, description, content, send_date, send_time, ampm }),
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

document
  .querySelector('#save-remindr')
  .addEventListener('click', saveButtonHandler);


