declare namespace myfiles {}

declare const myfiles: {
    saveData(path: URL, folderName: string, overwrite: boolean): void;
}
export = myfiles;
