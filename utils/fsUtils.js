const fs = require('fs');
const util = require('util')

// Promise version of fs.readFile
// const readFromFile = util.promisify(fs.readFile);

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

// const readFromFile = () =>{

//   fs.readFile('../exporter/jsonExport/remindrExport.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//     } else {
//       // console.log(JSON.parse(data));
//        return JSON.parse(data);
//     }
//   })

// }

const readFromFile = util.promisify(fs.readFile);

module.exports = { readFromFile, writeToFile };

