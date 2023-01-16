const myfiles = require('./modules/myfiles/myfiles');
const {pathToFileURL} = require("url");
const path = require("path");
const pathUrl = pathToFileURL(path.join(__dirname, '2-read-write-users.json'));
myfiles.saveData(pathUrl, "abc3", true);