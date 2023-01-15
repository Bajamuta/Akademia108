const {pathToFileURL} = require("url");
const path = require("path");
const fs = require('fs');

function saveData(pathUrl, folderName, overwrite) {
    fs.readFile(pathUrl, null, (err, data) => {
        console.log('data', pathUrl, data);
    });
    return null;
}

module.exports = saveData;