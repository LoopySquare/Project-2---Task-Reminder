
// FUNCTION TO HANDLE DELETING MESSAGE
const delButtonHandler = async (event) => {
  console.log('I clicked here');
  if (event.target.hasAttribute('data-remindrId')) {
    const id = event.target.getAttribute('data-remindrId');

    let confirmDel = confirm("Are you sure you want to delete this Remindr?");

    if(confirmDel){
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    } else {
      document.location.replace('/profile');
    }

  }
};

// FUNCTION TO HANDLE TRANSITION TO EDIT PAGE
const editButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-remindrId')) {
    const id = event.target.getAttribute('data-remindrId');

    console.log('I clicked');
    
    document.location.replace(`/message/edit/${id}`);
  };
}

const newButtonHandler = async () => {
  
  document.location.replace(`/message/add/`);

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