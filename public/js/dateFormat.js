const getAmPm = (time) => {
  return time >= 12 ? 'PM' : 'AM';
}

const getHour = (time) => {
  hour = time % 12;
  hour = hour ? hour : 12;
  hour = hour < 10 ? '0' + hour : hour;
  return hour
}

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

const formatDateEditRemindr = (date) => {

  dateTrim = date.replace('Alert Day currently selected: ', '')

  const year = dateTrim.substring(0,4)
  const month = dateTrim.substring(5,7)
  const day = dateTrim.substring(8,10)

  return `Alert Day currently selected: ${month}/${day}/${year}`
}

const formatTimeEditRemindr = (date) => {

  timeTrim = date.replace('Alert Time currently selected: ', '')

  let hour = Number(timeTrim.substring(11,13));
  const ampm = getAmPm(hour);
  hour = getHour(hour);
  const min = timeTrim.substring(14,16)

  return `${hour}:${min} ${ampm}`

}

const setTime = (time) => {
  const timeArr = time.split(' ');

  document.querySelector('#user-current-time').innerHTML = timeArr[0]
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

if(document.getElementById('formatted-time') && document.getElementById('formatted-date')){
  const rawTime = document.getElementById('formatted-time').textContent
  const newTime = formatTimeEditRemindr(rawTime);
  document.querySelector('#formatted-time').textContent = `Alert Time currently selected: ${newTime}`;
  setTime(newTime);
  setAmPm(newTime);

  const rawDate = document.getElementById('formatted-date').textContent
  document.querySelector('#formatted-date').textContent = formatDateEditRemindr(rawDate);
}

if(document.querySelector('.remindr-date') && document.querySelector('.remindr-time')){
  formatDateProfile();
  formatTimeProfile();
}
