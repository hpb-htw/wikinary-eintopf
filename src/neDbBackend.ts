import { Entry } from "./wiktionary";
import * as Datastore from "nedb";



let db: Datastore;

export function initDb (filename:string) {
    if(!db) {
        db = new Datastore({filename: filename, autoload: true});
    }
}


export function insertEntry(entries: Entry[]):Promise<number> {
    return new Promise((resolve, rejects) => {
        db.insert(entries, function(err){
            if (err) {
                rejects(err);
            } else {
                resolve(entries.length);
            }
        });
    });
}

export function verify(): Promise<number> {
    return new Promise( (resolve, rejects)=> {
        db.count({}, (err, count)=>{
            if(err) {
                rejects(err);
            }else {
                resolve(count);
            }
        });
    });
}

export function done(): Promise<any> {
    return new Promise(()=>"done");
}