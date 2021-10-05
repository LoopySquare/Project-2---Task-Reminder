const dateTime = require('../utils/getDateTime');
const fetch = require('node-fetch');
require('dotenv').config();

const exporter = async () => {

  const timeObj = dateTime();

  const {current_date, current_time, am_pm} = timeObj;

  if (current_date && current_time && am_pm) {
    // Send a POST request to the API endpoint
    const response = await fetch(`http://localhost:3001/api/messages/export`, {
      method: 'POST',
      body: JSON.stringify({ current_date, am_pm }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

exporter();