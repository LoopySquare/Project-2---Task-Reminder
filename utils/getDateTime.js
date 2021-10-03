
const dateTime = () => {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  
  let ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  let timeStamp = ''
  
  if(hours.length = 1){
    timeStamp = `0${hours}:${minutes}`
  } else {
    timeStamp = `${hours}:${minutes}`
  }

  let timeObj = {
    current_time: timeStamp,
    am_pm: ampm
  }

  console.log(timeObj);
  return timeObj
}

module.exports = dateTime;



