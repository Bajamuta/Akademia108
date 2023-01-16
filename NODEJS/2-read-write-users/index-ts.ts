import * as myfiles from "./modules/myfiles";
import {pathToFileURL} from "url";
import * as path from "path";
const pathUrl = pathToFileURL(path.join(__dirname, '2-read-write-users.json'));
myfiles.saveData(pathUrl, "test-ts", false);