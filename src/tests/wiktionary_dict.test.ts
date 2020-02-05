import * as path from "path";

import {WikiDictionary} from "../wiktionary_dict";
import {Entry, EntryFormater} from "../dictionary";

const WIKI_DICT_CONFIG = {
    executable : "../../../dxtionary-db/clang-build/src/dxtionary-db",
    database: "../../../big-file/dict.sqlite",
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
    let dbPath = path.resolve(__dirname, WIKI_DICT_CONFIG.database);        
    let executable = path.resolve(__dirname, WIKI_DICT_CONFIG.executable);
    
    let dict = new WikiDictionary(executable, dbPath);
    dict.formater = new EntryCounter;
    let result = await dict.query("ich");
    expect(result).toBe("50");
});

