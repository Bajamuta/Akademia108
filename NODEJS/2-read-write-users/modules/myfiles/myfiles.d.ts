declare namespace myfiles {}

declare const myfiles: {
    saveData(path: string, folderName: string, overwrite: boolean): void;
}
export = myfiles;
