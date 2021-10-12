const { timeFormatter } = require('./convertTime');

/**
 * Gets the current time on the machine / server running the code
 * @returns {STRING}
 */
const currentTime = () => {
  let now = new Date();
  return timeFormatter(now);

}

currentTime()

module.exports = currentTime;



