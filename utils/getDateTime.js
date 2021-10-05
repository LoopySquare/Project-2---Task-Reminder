
const dateTime = () => {
  let now = new Date();
  let date = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  // Must be done before Formatting of hours variable
  let ampm = hours >= 12 ? 'PM' : 'AM';

  // Format Date and Month for consumption
  date = date < 10 ? '0' + date : date;
  month = month + 1;

  // Format Hours into 12 Hour Format
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? '0' + hours : hours;
  
  // Format Minutes from M to MM
  minutes = minutes < 10 ? '0' + minutes : minutes;

  let currentDate = `${year}-${month}-${date}`;
  let currentTime = `${hours}:${minutes}`


  let timeObj = {
    current_date: currentDate,
    current_time: currentTime,
    am_pm: ampm
  }

  return timeObj
}

module.exports = dateTime;



