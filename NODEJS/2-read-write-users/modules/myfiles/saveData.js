const fs = require('fs');
const path = require("path");
const {constants} = require("fs");
function saveData(pathUrl, folderName, overwrite) {
    const currentDirectory = path.dirname(pathUrl.pathname);
    fs.readFile(pathUrl, 'utf-8', (err, data) => {
        if (!err)
        {
            createFolder(currentDirectory, folderName);
            // how to stop if createFolder throw error?
            processFiles(currentDirectory, folderName, data, overwrite);
        }
        else
        {
            console.error("An error has occurred during reading from file", err);
        }
    });

    return null;
}

function createFolder(currentDirectory, folderName) {
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

function processUserData(user) {
    const name = `Name: ${user.name}`;
    const username = `Username: ${user.username}`;
    const email = `Email: ${user.email}`;
    const street = `Street: ${user.address.street}`;
    const zipCode = `Zip Code: ${user.address.zipcode}`;
    const city = `City: ${user.address.city}`;
    const phone = `Phone: ${user.phone}`;
    return name + '\n' + username + '\n' + email + '\n' + street + '\n' + zipCode + '\n' + city + '\n' + phone;
}

function processFiles(currentDirectory, folderName, data, overwrite) {
    const datas = JSON.parse(data);
    datas.forEach(
      (user) => {
          const fileName = user.name.replace(' ', '-') + '.txt';
          const userInfo = processUserData(user);
          fs.access(path.join(currentDirectory, folderName, fileName), constants.F_OK, (err) => {
              // err => file doesn't exists
              if (!err && !overwrite)
              {
                  console.log(`File ${fileName} already exists!`);
              }
              else
              {
                  if (!err && overwrite)
                  {
                      console.log(`File ${fileName} ready to overwrite.`);
                  }
                  else if (err)
                  {
                      console.log(`File ${fileName} will be created.`);
                  }
                  fs.writeFile(path.join(currentDirectory, folderName, fileName), userInfo, (err) => {
                      if (!err)
                      {
                          console.log('Done.');
                      }
                      else
                      {
                          console.error('An error has occurred during writing to file', err);
                      }
                  })
              }
          })
      }
    )
}

module.exports = saveData;