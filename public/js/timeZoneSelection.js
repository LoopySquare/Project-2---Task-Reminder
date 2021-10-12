/**
 * Takes in the value returned from user account fetch, and converts the value into
 * a readable string. 
 * @param {STRING} timeZoneID 'America/New_York'
 * @returns {STRING} 'Eastern Time'
 */
const updateTZ = (timeZoneID) => {
  switch (timeZoneID) {
    case 'America/New_York':
      return 'Eastern Time'

    case 'America/Chicago':
      return 'Central Time'

    case 'America/Denver':
      return 'Mountain Time'

    case 'America/Phoenix':
      return 'Mountain Time(AZ)'

    case 'America/Los_Angeles':
      return 'Pacific Time'
    default:
      break;
  }
}

const userTimeZoneElem = document.querySelector('#user-time-zone')
userTimeZoneElem.innerHTML = updateTZ(userTimeZoneElem.value);

