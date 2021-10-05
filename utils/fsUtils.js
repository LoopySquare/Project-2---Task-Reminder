const fs = require('fs');

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

const writeToFile = (content) =>
  fs.writeFile('./exporter/jsonExport/remindrExport.json', JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(``)
  );

module.exports = writeToFile;