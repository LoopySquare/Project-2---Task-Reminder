const currentTime = require('../utils/getDateTime');
const fetch = require('node-fetch');
require('dotenv').config({path: "../.env"});

const remindrExporter = async () => {

  const URL = process.env.BASEURL || 'http://localhost:3001'

  const currTime = currentTime();

  if (currTime) {
    // Send a POST request to the API endpoint
    const response = await fetch(`${URL}/api/messages/export`, {
      method: 'POST',
      body: JSON.stringify({ currTime }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      
      return await response.json();

    } else {

      console.log('Something went horribly wrong');
    }
   }
}

module.exports = remindrExporter;

