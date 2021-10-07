const changPasswordButtonHandler = async (event=> {
    let oldpasswprd = document.getElementById('oldPassword').value;
    let newpassword = document.getElementById('newPassword').value;
    let confirmpassword = document.getElementById('confirmPassword').value;
    if (oldPassword == "" || newpassword == "" || confirmpassword == "") {
        alert('Please fill in all fields');
    }
    else if (oldpasswprd == newpassword) {
        alert("Old password and New Password cannot match");
    }
    else if (newpassword != confirmpassword) {
        alert("password mismatch");
    }
})