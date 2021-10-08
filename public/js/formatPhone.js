const formatNumber = (number) => {

  // RegEx to remove all non-numeric characters
  // split into an array
  let numArr = number.split('');

  // Format numbers to be in the example format
  if (numArr.length === 10) {
      // Exampe Format if 10 digit number '(555) 555-5555'
      numArr.splice(3, 0, '-');
      numArr.splice(7, 0, '-');
  } else {
      // Else return the original Input as the Number is bad
      return number;
  }

  // Convert back to a string
  clearNum = numArr.join('');

  return clearNum;
}

if(document.querySelector('#phone')){
  document.querySelector('#phone').value = formatNumber(document.querySelector('#phone').value.trim());
}
