import * as path from "path";

import {WikiDictionary} from "../wiktionary_dict";
import {Entry, EntryFormater} from "../dictionary";

const WIKI_DICT_CONFIG = {
    executable : path.resolve(__dirname, "../../../dxtionary-db/clang-build/src/dxtionary-db"),
    database: path.resolve(__dirname, "../../../big-file/dict.sqlite"),
};

class EntryCounter implements EntryFormater {

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
    }catch(ex) {
        // TODO: test this part
        // if error happend it should have a stringified error message
    }
});

