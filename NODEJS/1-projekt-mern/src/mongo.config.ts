import mongoose, {Connection} from "mongoose";

export const connection = () => new Promise((resolve, reject) => {
    // mongoose.connect(`${config.get('DB_HOST')}/${config.get('DB_NAME')}`);
    mongoose.connect(`mongodb:://localhost:27017/typescript-registration`);
    const db: Connection = mongoose.connection;
    db.on('error', error => {
        console.error(`Error connecting to database.`);
        reject(error);
    });
    db.once('open', () => {
        console.info(`Connection to database is open.`);
        resolve(mongoose);
    });
});
