const { timeFormatter } = require('./convertTime');

const currentTime = () => {
  let now = new Date();
  return timeFormatter(now);

}

currentTime()

module.exports = currentTime;



