const fs = require('fs');
const path = require("path");
function saveData(pathUrl, folderName, overwrite) {
    const currentDirectory = path.dirname(pathUrl.pathname);
    fs.readFile(pathUrl, 'utf-8', (err, data) => {
        if (!err)
        {
            createFolder(currentDirectory, folderName);
            // how to stop if createFolder throw error?
            processFiles(currentDirectory, folderName, data);
        }
        else
        {
            console.error("An error has occurred during reading from file", err);
        }
    });

    return null;
}

function createFolder(currentDirectory, folderName, data) {
    fs.access(path.join(currentDirectory, folderName), (err) => {
        if (!err)
        {
            console.log(`The category ${folderName} already exists.`);
        }
        else
        {
            fs.mkdir(path.join(currentDirectory, folderName), (err) => {
                if (!err)
                {
                    console.log(`The directory ${folderName} has been created.`);

                }
                else
                {
                    console.error('An error has occurred creating a directory', err);
                }
            });
        }
    });
}

function processFiles(currentDirectory, folderName, data) {
    const datas = JSON.parse(data);
    datas.forEach(
      (user) => {
          const fileName = user.name.replace(' ', '-') + '.txt';
          fs.writeFile(path.join(currentDirectory, folderName, fileName), 'test', (err) => {
              if (!err)
              {
                  console.log('Written');
              }
              else
              {
                  console.error('An error has occurred during writing to file', err);
              }
          })
      }
    )
}

module.exports = saveData;