const formatDateEditRemindr = (date) => {

  dateTrim = date.replace('Alert Day currently selected: ', '')

  let dateArr = dateTrim.split('-')

  return `Alert Day currently selected: ${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`

}

if(document.getElementById('formatted-date')){
  const rawDate = document.getElementById('formatted-date').textContent
  document.querySelector('#formatted-date').textContent = formatDateEditRemindr(rawDate);
}

// FORMATS DATE FOR VIEWABLE PLEASURE MM/DD/YYYY
const formatDateProfile = () => {
  const remindrDates = document.querySelectorAll('.remindr-date');
  
  // ITERATE OVER THE CLASS AND CONVERT DATE PROPERLY TO MM/DD/YYYY
  for (let i = 0; i < remindrDates.length; i++) {
    let dateArr = remindrDates[i].innerHTML.split('-');
    remindrDates[i].innerHTML = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`
  }
}

if(document.querySelector('.remindr-date')){
  formatDateProfile();
}