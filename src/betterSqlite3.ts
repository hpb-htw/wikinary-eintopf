import { Entry } from "./wiktionary";
import * as sqlite from 'better-sqlite3';

const SCHEMA: string = `CREATE TABLE wiki (
    id INTEGER,
    title TEXT,
    text TEXT
)`;

const SQL_INSERT = `INSERT INTO wiki (id, title, text) VALUES (@id, @title, @text)`;
const SQL_COUNT = `SELECT count(*) as 'count_from_sql_db' FROM wiki`;

let db:sqlite.Database;

export function initDb (filename:string) {
    if(!db) {
        db = new sqlite(filename);
        db.exec(SCHEMA);
    }
}


export function insertEntry(entries: Entry[]):Promise<number> {
    return new Promise((resolve, rejects) => {
        try{
            const insert = db.prepare(SQL_INSERT);
            let i: number = 0;
            const insertMany = db.transaction( (entries:Entry[])=>{
                for(const e of entries) {
                    let r = insert.run(e);
                    i += r.changes;
                }
            });
            insertMany(entries);
            resolve(i);            
        }catch(ex) {
            rejects(ex);            
        }
    });
}

export function verify(): Promise<number> {
    return new Promise( (resolve, rejects)=> {
        try {
            const selectCount = db.prepare(SQL_COUNT);
            let result = selectCount.get();
            resolve(result);
        }catch(ex) {
            rejects(ex);
        }
    });
}

export function done(): Promise<any> {
    return new Promise( (resolve, reject)=>{
        try{
            if(db) {
                db.close();
            }
            resolve("Done");
        }catch(ex) {
            reject(ex);
        }
    });
}