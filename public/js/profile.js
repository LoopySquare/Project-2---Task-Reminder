
// FUNCTION TO HANDLE DELETING MESSAGE
const delButtonHandler = async (event) => {
  console.log('I clicked here');
  if (event.target.hasAttribute('data-remindrId')) {
    const id = event.target.getAttribute('data-remindrId');

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This Remindr will be lost, and cannot be recovered',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete this Remindr!',
      cancelButtonText: 'No, keep this Remindr'
    })
    
    if (result.isConfirmed) {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });
    
      if (response.ok) {
        document.location.replace('/profile');
      }

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return;
    }

  }
};

// FUNCTION TO HANDLE TRANSITION TO EDIT PAGE
const editButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-remindrId')) {
    const id = event.target.getAttribute('data-remindrId');

    
    document.location.replace(`/message/edit/${id}`);
  };
}

const newButtonHandler = async () => {
  
  document.location.replace(`/message/add/`);

};

const editAccountHandler = async () => {
  
  document.location.replace(`/account/edit/`);

};

// HAD TO USE JQUERY BECAUSE TABLE BUTTON BINDING ISSUES
$(document).ready(function () {

  $(document).on('click', '.delete-remindr', delButtonHandler)

})

$(document).ready(function () {

  $(document).on('click', '.edit-remindr', editButtonHandler)

})

document
  .querySelector('#new-remindr')
  .addEventListener('click', newButtonHandler);

document
  .querySelector('#edit-account')
  .addEventListener('click', editAccountHandler);