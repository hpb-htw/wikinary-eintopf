import * as path from "path";

import {WikiDictionary} from "../wiktionary_dict";
import { Entry} from "../dictionary";

const WIKI_DICT_CONFIG = {
    executable : "../../../dxtionary-db/clang-build/src/dxtionary-db",
    database: "../../../big-file/dict.sqlite",
};

function makeCountingMapper(initCount: number = 0): (word: string, entries: Entry[])=>string {
    let count = initCount;
    return function(word: string, entries: Entry[]) {
        count += entries.length;
        return `Number of entries of „${word}“ is ${count}\n`;
    };
}

test("Query a text", async () => {
    let dbPath = path.resolve(__dirname, WIKI_DICT_CONFIG.database);        
    let executable = path.resolve(__dirname, WIKI_DICT_CONFIG.executable);
    
    let dict = new WikiDictionary(executable, dbPath);
    dict.entryMapper = makeCountingMapper(0);
    let result = await dict.query("ich");
    expect(result).toBe("ich");
});