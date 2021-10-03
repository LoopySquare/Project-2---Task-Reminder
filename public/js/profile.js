
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

const editButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-remindrId')) {
    const id = event.target.getAttribute('data-remindrId');

    console.log('I clicked');
    
    document.location.replace(`/message/edit/${id}`);
  };
}

document
  .querySelector('.delete-remindr')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.edit-remindr')
  .addEventListener('click', editButtonHandler);
