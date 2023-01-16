import {UserData} from "./myfiles";

declare namespace myfiles {
    export interface UserAddressData {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: any;
    }

    export interface UserCompanyData {
        name: string;
        catchPhrase: string;
        bs: string;
    }

    export interface UserData {
        id: number;
        name: string;
        username: string;
        email: string;
        address: UserAddressData;
        phone: string;
        website: string;
        company: UserCompanyData;
    }

}


declare const myfiles: {
    saveData(path: URL, folderName: string, overwrite: boolean): void;
    createFolder(currentDirectory: string, folderName: string): void;
    processFiles(currentDirectory: string, folderName: string, data: UserData, overwrite: boolean): void;
    processUserData(user: UserData): void;
}
export = myfiles;
