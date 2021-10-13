/**
 * Takes in the hour value and checks if it is greater or less than 12
 * Retuns appropriate AM or PM value
 * @param {STRING} time 
 * @returns {STRING}
 */
const getAmPm = (time) => {
  return time >= 12 ? 'PM' : 'AM';
}

/**
 * Converts the hour value from 24 to 12 hour format
 * @param {STRING} time 
 * @returns STRING
 */
const getHour = (time) => {
  hour = time % 12;
  hour = hour ? hour : 12;
  hour = hour < 10 ? '0' + hour : hour;
  return hour
}

/**
 * Takes the constructed time value, and checks if it is AM or PM
 * Then selects the radio button that matches
 * @param {STRING} time 
 */
const setAmPm = (time) => {

  const timeArr = time.split(' ');
  const amRadio = document.querySelector("#AM");
  const pmRadio = document.querySelector("#PM");
  
  if(timeArr[1] == "AM"){
    amRadio.checked = true;
  } else {
    pmRadio.checked = true;
  }

}

/**
 * Takes in the DateTime value and converts to a readable Date
 * @param {STRING} date 2021-10-10T16:00
 * @returns {STRING} 10/10/2021
 */
const formatDateEditRemindr = (date) => {

  dateTrim = date.replace('Alert Day currently selected: ', '')

  const year = dateTrim.substring(0,4)
  const month = dateTrim.substring(5,7)
  const day = dateTrim.substring(8,10)

  return `Alert Day currently selected: ${month}/${day}/${year}`
}

/**
 * Takes in the DateTime value and converts to a readable time
 * @param {STRING} date 2021-10-10T16:00
 * @returns {STRING} 4:00 PM
 */
const formatTimeEditRemindr = (date) => {

  timeTrim = date.replace('Alert Time currently selected: ', '')

  let hour = Number(timeTrim.substring(11,13));
  const ampm = getAmPm(hour);
  hour = getHour(hour);
  const min = timeTrim.substring(14,16)

  return `${hour}:${min} ${ampm}`

}

/**
 * Takes the value of the time value '4:00 PM', splits it on a ' ' (Space)
 * and sets the '4:00' value to the Drop-down selector value
 * @param {STRING} time 
 */
const setTime = (time) => {
  const timeArr = time.split(' ');
  
  const selectorElem = document.querySelector('#send_time')

  selectorElem.setAttribute('data-userSelectedTime' , timeArr[0]);

  const timeToSelect = selectorElem.getAttribute('data-userSelectedTime')

  for (let i = 0; i < selectorElem.length; i++) {
    if(timeToSelect === selectorElem.options[i].text){
      selectorElem.options[i].selected = true;
      return;
    }
  }
}

const setDate = (date) => {

  formattedDate = date.replace('Alert Day currently selected: ', '');
  dateArr = formattedDate.split('/')
  
  document.getElementById('send_date').value = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;

}

// FORMATS DATE FOR VIEWABLE PLEASURE MM/DD/YYYY
const formatDateProfile = () => {
  const remindrDates = document.querySelectorAll('.remindr-date');
  
  // ITERATE OVER THE CLASS AND CONVERT DATE PROPERLY TO MM/DD/YYYY
  for (let i = 0; i < remindrDates.length; i++) {
    const date = remindrDates[i].innerHTML;
    const year = date.substring(0,4)
    const month = date.substring(5,7)
    const day = date.substring(8,10)
    remindrDates[i].innerHTML = `${month}/${day}/${year}`
  }
}

// FORMATS DATE FOR VIEWABLE PLEASURE MM/DD/YYYY
const formatTimeProfile = () => {
  const remindrTimes = document.querySelectorAll('.remindr-time');
  
  // ITERATE OVER THE CLASS AND CONVERT DATE PROPERLY TO MM/DD/YYYY
  for (let i = 0; i < remindrTimes.length; i++) {
    let time = remindrTimes[i].innerHTML
    let hour = Number(time.substring(11,13));
    const ampm = getAmPm(hour);
    hour = getHour(hour);
    const min = time.substring(14,16)
    remindrTimes[i].innerHTML = `${hour}:${min} ${ampm}`
  }
}

/**
 * Conditional statement, since this script is used on both the Edit Remindr page, and New Remindr Page.
 * Takes the data return from the Fetch request, and properly formats it for viewing ease.
 */
if(document.getElementById('formatted-time') && document.getElementById('formatted-date')){
  const rawTime = document.getElementById('formatted-time').textContent
  const newTime = formatTimeEditRemindr(rawTime);
  document.querySelector('#formatted-time').textContent = `Alert Time currently selected: ${newTime}`;
  setTime(newTime);
  setAmPm(newTime);

  const rawDate = document.getElementById('formatted-date').textContent
  setDate(formatDateEditRemindr(rawDate));
  document.querySelector('#formatted-date').textContent = formatDateEditRemindr(rawDate);
}

/**
 * Conditional statement, since this script is used on both the Edit Remindr page, and New Remindr Page.
 * Takes the data return from the Fetch request, and properly formats it for viewing ease.
 */
if(document.querySelector('.remindr-date') && document.querySelector('.remindr-time')){
  formatDateProfile();
  formatTimeProfile();
}
