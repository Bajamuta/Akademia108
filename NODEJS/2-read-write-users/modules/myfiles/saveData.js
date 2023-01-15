const {pathToFileURL} = require("url");
const path = require("path");

function saveData(pathString, folderName, overwrite) {
    const fs = require('fs');
    fs.readFile(pathToFileURL(path.join(__dirname, '2-read-write-users.json')), null, (err, data) => {
        console.log('data', data);
    });
    return null;
}

module.exports = saveData;