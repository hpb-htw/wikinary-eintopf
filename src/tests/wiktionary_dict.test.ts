import * as path from "path";

import {WikiDictionary, executeSql2, trimHead} from "../wiktionary_dict";
import {Entry, EntryFormatter} from "../dictionary";
import {chomp, getExecutablePath} from "../process_stream_helper";

import {writeFileSync} from "fs";

const WIKI_DICT_CONFIG = {
    executable : getExecutablePath(path.resolve(__dirname, `../../bin/`), 'dxtionary-db'),
    database:    path.resolve(__dirname, "../../test-data/dict.sqlite"),
};

class EntryCounter implements EntryFormatter<string> {

    count: number = 0;

    accumulate(e: Entry): void {        
        this.count += 1;
    }    
    
    serialize(): string {
        return `${this.count}`;
    }
}



test("Query a text", async () => {
    let dbPath = WIKI_DICT_CONFIG.database;
    let executable = WIKI_DICT_CONFIG.executable;
    
    let dict = new WikiDictionary(executable, dbPath);
    dict.formatter = new EntryCounter();
    try{
        let result = await dict.query("ich");
        expect(result).toBe("5");
        return ;
    }catch(ex) {
        fail(ex);
    }
});



/**
 * this class collects all Entry.text into a JS Array. it expects
 * that Entry.text is a valid JSON String ()
 * */
class JSONStringFormatter implements EntryFormatter<string> {

    text = "[";
    count = 0;

    accumulate(e: Entry): void {
        this.text += ( (++this.count > 1? ",": "") + e.text );
    }

    serialize(): string {
        return this.text + "]";
    }
}
test("Query a text to JSON String", async () => {
    let dbPath = WIKI_DICT_CONFIG.database;
    let executable = WIKI_DICT_CONFIG.executable;

    let dict = new WikiDictionary(executable, dbPath);
    dict.formatter = new JSONStringFormatter();
    try{
        let result = await dict.query("ich");
        writeFileSync('/tmp/query.json', result, 'utf8');
        let resultAsJson = JSON.parse(result);
        expect(resultAsJson).toHaveLength(5);
    }catch(ex) {
        fail(ex);
    }
});

class EntryTitleToArray implements EntryFormatter<string[]> {

    count: number = 0;
    collected:string[] = [];

    accumulate(e: Entry): void {
        this.collected.push(e.title);
    }

    serialize(): string[] {
        return this.collected;
    }
}
test ("Query a text to JSON", async () => {
    let dbPath = WIKI_DICT_CONFIG.database;
    let executable = WIKI_DICT_CONFIG.executable;

    let dict = new WikiDictionary(executable, dbPath);
    //dict.formatter = new JSONStringFormatter();
    try{
        let result:string[] = await dict.typedQuery("ich", new EntryTitleToArray());
        //console.log(result);
        expect(result).toStrictEqual([ 'ich', 'dich', 'mich', 'nich', 'sich' ]);
    }catch(ex) {
        fail(ex);
    }
});


async function linesToTitle(lines:AsyncIterable<string>): Promise<object[]> {
    let cache:string[] = [];
    let objects:{title:string}[] = [];

    for await(const l of lines) {
        cache.push(l);
        if (cache.length === 2) {
            objects.push({
                title: chomp( trimHead(cache[0]) )
            });
            cache = [];
        }
    }
    return Promise.resolve( objects );
}

test("collect only title", async () =>{
    let executable = WIKI_DICT_CONFIG.executable;
    let dbPath = WIKI_DICT_CONFIG.database;    
    let sql = `SELECT title FROM dewiktionary ORDER BY title LIMIT 50;`;
    try{
        let lines = await executeSql2(executable, [dbPath, sql], linesToTitle);
        expect(lines).toHaveLength(9);
    }catch(ex) {
        throw ex;
    }
});



