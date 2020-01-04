#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs";
import { parseWikiDump, Entry } from "./wiktionary";
//import * as backend from "./neDbBackend";
import * as backend from "./betterSqlite3";

const GERMAN_WORD_INDICATOR = "== ${title} ({{Sprache|Deutsch}}) ==";

//const DB_FILENAME = "dummy.db";

function isGermanWord(entry:Entry) {
    let {title, text} = entry;    
    return text.includes(GERMAN_WORD_INDICATOR.replace("${title}", title));
}

function initDb3(filename: string) {
    try {
        fs.unlinkSync(filename);
    } catch (e) {
        //ignore
    }
    //
    backend.initDb(filename);
}


const bufferSize = 1024;

let insertEntries: (en: Entry[]) => Promise<number> = backend.insertEntry;
//let insertEntries: (en: Entry[]) => number = (en: Entry[]) => en.length;
let verify: () => Promise<number> = backend.verify;
//let verify:() => number = () => 0;


async function importDic(xmlPath: string): Promise<number> {
    let buffer: Entry[] = [];
    let countGermanWords = 0;
    let savedEntries = 0;
    console.log(`enter`);
    return await parseWikiDump(xmlPath, async (entry: Entry) => {
        if (isGermanWord(entry)) {
            buffer.push(entry);
            ++countGermanWords;
            //++bufferLength;
            if (buffer.length === bufferSize) {                
                let cache: Entry[] = buffer;                
                buffer = [];
                let r = await insertEntries(cache);                
                savedEntries += r;
                console.log({ countGermanWords, savedEntries, r });
            }
        }
    }).then((countResultFromParseWikiDump) => {
        console.log({ countGermanWords, countResultFromParseWikiDump });
        if (buffer.length > 0) {
            return insertEntries(buffer);
        } else {
            return 0;
        }
    }).then((lastChunk) => {
        console.log({ countGermanWords, savedEntries, lastChunk });
        return savedEntries + lastChunk;
    })
        ;
}

function checkFile(processArgv: string[]): [string, string] {
    let myArgv = processArgv.slice(2);
    let progname = path.basename(process.argv[1]);    
    if (myArgv.length !== 1) {
        throw Error(`Bad argument, ${progname} expected a XML file`);
    } else {
        let xmlPath = path.resolve("./", myArgv[0]);
        if (fs.existsSync(xmlPath)) {
            //files.push(xmlPath);
            let basename = path.basename(xmlPath, ".xml");
            let dbPath = path.resolve("./",basename + ".db");
            return [xmlPath, dbPath];
        } else {
            throw Error(`given path ${myArgv[0]} is resolved to ${xmlPath}, which does not exist.`);
        }
    }
}

function main() {
    try {        
        let files = checkFile(process.argv);
        console.log(`     xml file: ${files[0]}`);
        console.log(`database file: ${files[1]}`);
        initDb3(files[1]);
        importDic(files[0])
            .then((countGermanWords) => {
                console.log({ countGermanWords });
            })
            .then(() => {
                return verify();
            })
            .then((verifyCount) => {
                console.log({ verifyCount });
            })
            .then(() => {
                backend.done();
            })
            .catch((ex) => {
                console.error(ex);
            });
    } catch (ex) {
        console.error(ex.message);
    }
}

main();


