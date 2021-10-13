const { zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz');

/**
//  * This function takes in the Values from the Form Submission and converts them 
      into a UTC DateTimes string.
 * @param {STRING} date '2021-10-30'
 * @param {STRING} time '02:00'
 * @param {STRING} ampm 'PM'
 * @param {STRING} timezone 'America/Denver'
 * @returns {STRING} '2021-10-30T20:15'
 */
const toUTC = (date, time, ampm, timezone) => {

  const timeArr = time.split(':');
  let hour = Number(timeArr[0]);
  const minutes = timeArr[1];

  if(ampm === 'AM'){
    // If ampm === 'AM' and hour === 12, return 0, else return hour
    hour = hour === 12 ? hour = 0 : hour
  } else {
    // If ampm === 'PM' if hour = 12 return 12, else hour += 12
    hour = hour === 12 ? hour : hour += 12
  }

  // if hour is less than 10, append a 0, e.g. hour = 9, returns hour = '09'
  hour = hour < 10 ? '0' + hour : hour;

  return timeFormatter(zonedTimeToUtc(`${date} ${hour}:${minutes}:00`, timezone));

}

/**
 * This function takes in a return of a DB call, and converts the UTC time in the DB
 *  to the users local time defined by the TimeZone values stored in their user Profile.
 * ONLY UPDATES THE send_date field in User Object.
 * @param {ARRAY} remindrArr {send_date: "2021-10-09T22:45"}
 * @param {STRING} timeZone 
 * @returns {ARRAY}
 */
const toLocal = (remindrArr, timeZone) => {

  options = {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: 'numeric', minute: 'numeric',
    timezone: timeZone,
    hour12: false
  }

  if(remindrArr.length === 0){
    // return only if array has a length of 0
    return;
  } else if(remindrArr[0] === undefined) {

    //Run only is a single object not in an array is passed through
    const timeObj = remindrArr.send_date;
    // const localTime = localTimeFormatterTesting(new Intl.DateTimeFormat('ko-KR', options).format(dateConstructor(timeObj)));
    const localTime = localTimeFormatter(utcToZonedTime(dateConstructor(timeObj), timeZone));
    remindrArr.send_date = localTime;

  } else {
    for (let i = 0; i < remindrArr.length; i++) {
      const timeObj = remindrArr[i].send_date;
      // const localTime = localTimeFormatterTesting(new Intl.DateTimeFormat('ko-KR', options).format(dateConstructor(timeObj)));
      const localTime = localTimeFormatter(utcToZonedTime(dateConstructor(timeObj), timeZone));
      remindrArr[i].send_date = localTime;
    }
  }
  return remindrArr
}

/**
 * The function utcToZonedTime requires the date time to be in a very specific format
 * This function takes value from the send_date DB field and converts it into the proper format
 * needed in the utcToZonedTime() function
 * @param {String} timeObj 
 * @returns {STRING}
 */
const dateConstructor = (time) => {

  // const year = Number(time.substring(0,4));
  // const month = Number(time.substring(5,7)) - 1
  // const day = Number(time.substring(8,10));
  // const hour = Number(time.substring(11,13));
  // const minute = Number(time.substring(14,16));
  // return new Date(Date.UTC(year, month, day, hour, minute));
  return new Date(Date.UTC(time.substring(0,4), Number(time.substring(5,7)) - 1, Number(time.substring(8,10)), Number(time.substring(11,13)), Number(time.substring(14,16))));

}

/**
 * This function takes in the output from utcToZonedTime() and converts the output object
 * into a String that can then be used by other functions and methods
 * @param {Object} time {2021-10-09T22:45:00.000Z}
 * @returns {STRING} '2021-10-09T22:45'
 */
const localTimeFormatter = (time) => {

  timeStr = timeFormatter(time)
  // const year = timeStr.substring(0,4);
  // const month = timeStr.substring(5,7);
  // const day = timeStr.substring(8,10);
  // const hour = timeStr.substring(11,13);
  // const minute = timeStr.substring(14,16);
  return `${timeStr.substring(0,4)}-${timeStr.substring(5,7)}-${timeStr.substring(8,10)}T${timeStr.substring(11,13)}:${timeStr.substring(14,16)}`
}

/**
 * This function takes in the output from utcToZonedTime() and converts the output object
 * into a String that can then be used by other functions and methods
 * @param {Object} time '2021. 10. 09. 16:45'
 * @returns {STRING} '2021-10-09T16:45'
 */
 const localTimeFormatterTesting = (time) => {

  // const year = time.substring(0,4);
  // const month = time.substring(6,8)
  // const day = time.substring(10,12);
  // const hour = time.substring(14,16);
  // const minute = time.substring(17,19);
  return `${time.substring(0,4)}-${time.substring(6,8)}-${time.substring(10,12)}T${time.substring(14,16)}:${time.substring(17,19)}`
}

/**
 * This function is similar to localTimeFormatter, however, this is for writing to the DB
 * It uses JSON.stringify to convert the Object to a String, then removes the double quotes
 * from the outside of the String
 * @param {Object} timeObj 
 * @returns {STRING}
 */
const timeFormatter = (timeObj) => {

  return JSON.stringify(timeObj).replace('"', '').substring(0,16)

}


module.exports = {toUTC, toLocal, timeFormatter};

