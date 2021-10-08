const { timeFormatter } = require('./convertTime');

const currentTime = () => {
  let now = new Date();
  console.log(now);
  return timeFormatter(now);

}

currentTime()

module.exports = currentTime;



