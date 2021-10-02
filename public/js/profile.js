
const delButtonHandler = async (event) => {
  console.log('I clicked here');
  if (event.target.hasAttribute('data-messageId')) {
    const id = event.target.getAttribute('data-messageId');

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

document
  .querySelector('.delete-message')
  .addEventListener('click', delButtonHandler);
