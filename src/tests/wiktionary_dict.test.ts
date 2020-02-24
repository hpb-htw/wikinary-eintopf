import * as path from "path";

import {WikiDictionary, executeSql2, trimHead} from "../wiktionary_dict";
import {Entry, EntryFormatter} from "../dictionary";
import { chomp } from "../process_stream_helper";

const WIKI_DICT_CONFIG = {
    executable : path.resolve(__dirname, "../../../dxtionary-db/clang-build/src/dxtionary-db"),
    database: path.resolve(__dirname, "../../../big-file/dict.sqlite"),
};

class EntryCounter implements EntryFormatter {

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
    dict.formater = new EntryCounter();
    try{
        let result = await dict.query("ich");
        expect(result).toBe("50");
        return ;
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
        expect(lines).toHaveLength(50);
    }catch(ex) {
        throw ex;
    }
});



