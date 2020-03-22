import {resolve} from "path";
import {WikiDictionary, EntryFormatter, getExecutablePath, Entry} from "./index";
import {BinaryEnvironment} from "./process_stream_helper";
import {arch, platform} from "os";

const BIN_ENV : BinaryEnvironment = {
    arch: arch(),
    platform: platform()
};
const bin = {
    dxtionary: getExecutablePath(BIN_ENV,'./', 'dxtionary-db'),
    dict: resolve('../big-file/dict.sqlite')
};

class JSONFormater implements EntryFormatter<any[]> {

    data:any[] = [];
    count:number = 0;

    accumulate(e: Entry): void {
        try {
            this.data.push(JSON.parse(e.text));
        }catch (ex) {
            console.log(e);
        }
    }

    serialize():any[]{
        return this.data;
    }
}

/*
async function singleSyncMain() {
    let dict = new WikiDictionary(bin.dxtinary, bin.dict);
    let word = "Hallo";
    let result = dict.syncTypedQuery(word, new JSONFormater());
    console.log(result.length);
}
singleSyncMain();
*/


async function syncMain() {
    let dict = new WikiDictionary(bin.dxtionary, bin.dict);
    let words:string[] = ['Anthropologie', 'Rosa', 'gehen', 'weil', 'sein', 'haben'];
    const max = 100, LENGTH = words.length;
    let count:number[] = [];
    for(let i = 0; i < max; ++i){
        let word = words[i % LENGTH];
        let result = dict.syncTypedQuery(word, new JSONFormater());
        count.push(result.length);
        //console.log(i);
    }
    console.log(count.length);
}

syncMain();

/*
async function main() {
    let dict = new WikiDictionary(bin.dxtinary, bin.dict);
    let words:string[] = ['Anthropologie', 'Rosa', 'gehen', 'weil', 'sein', 'haben'];
    const max = 100, LENGTH = words.length;
    let count:number[] = [];
    for(let i = 0; i < max; ++i){
        let word = words[i % LENGTH];
        let result = await dict.typedQuery(word, new JSONFormater());
        count.push(result.length);
        console.log(i);
    }
    console.log(count.length);
}
*/
