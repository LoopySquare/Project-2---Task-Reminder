const sql = require('../db/query_lib');
const cTable = require("console.table");
const dateTime = require('../utils/getDateTime')
const writeToFile = require('../utils/fsUtils');

function sleep(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
}

const exportMessages = async () => {

  const results = await sql.exportMessages(dateTime())

  writeToFile('./jsonExport/remindrExport.json', results[0])

  await sleep(1000)
  process.exit(1)
}

exportMessages();
