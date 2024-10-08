import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
// import fs from 'fs';
import path from 'path';

const localpath = path.join(process.cwd(), 'tmp', 'DB.db');
// const dbPath = path.join('/tmp', 'DB.db');
// if(!fs.existsSync('/tmp')) {
//     fs.mkdirSync('/tmp');
// }

// const exists = fs.existsSync(dbPath);
// if (!exists) {
//     fs.copyFile(localpath, dbPath, fs.constants.COPYFILE_EXCL, (err) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log('copied file from local ' + localpath + ' to ' + dbPath);
//     });
// }


export const db = await open({
    filename: localpath,
    driver: sqlite3.Database
})

