import * as path from "path";
import * as fs from "fs";
import {parseWikiDump, Entry} from "./wiktionary";
import * as backend from "./neDbBackend";


const bigDumpXML = "../big-file/dewiktionary-20191020-pages-articles.xml";
let xmlPath = path.join(__dirname, bigDumpXML);
const GERMAN_WORD_INDICATOR = "{{Sprache|Deutsch}}";

const DB_FILENAME = "dummy.db";

function isGermanWord(text: string) {
    return text.split("\n")[0].includes(GERMAN_WORD_INDICATOR);
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


const bufferSize = 10;

let insertEntry:(en:Entry[])=>Promise<number> = backend.insertEntry;

async function importDic(): Promise<number> {
    let buffer:Entry[] = [];
    let count = 0;
    let savedEntries = 0;
    console.log(`enter`);
    return await parseWikiDump(xmlPath, async (entry: Entry) => {        
        if (isGermanWord(entry.text)) {
            buffer.push(entry);
            ++count;            
            if (count === bufferSize) {
                console.log({count});
                count = 0;
                let r = await insertEntry(buffer);
                savedEntries += r;
                buffer = [];
            }
        }
    }).then((resultFromParseWikiDump)=> {
        console.log(`rounded entry: ${resultFromParseWikiDump}`);
        if(buffer.length > 0) {
            return insertEntry(buffer);
        } else {
            return 0;
        }
    }).then((lastChuck) => {
        return savedEntries + lastChuck;
    })
    ;
}

initDb3(DB_FILENAME);
importDic()
    .then((count)=>{
        console.log(count);
    });





