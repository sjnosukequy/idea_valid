import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path';

const dbPath = path.join(process.cwd(), 'app/tmp/DB.db');

export const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
})