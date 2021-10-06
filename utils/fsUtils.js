const fs = require('fs');
const path = require('path');
const util = require('util')

// Promise version of fs.readFile
// const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

// const test = path.join(__dirname, '../exporter/jsonExport/remindrExport.json')

// console.log(test);

const writeToFile = (content) =>
  fs.writeFile(path.join(__dirname, '../exporter/jsonExport/remindrExport.json'), JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(``)
  );


const readFromFile = util.promisify(fs.readFile);

module.exports = { readFromFile, writeToFile };

