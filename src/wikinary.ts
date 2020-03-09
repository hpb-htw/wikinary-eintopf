import {resolve} from "path";
import {WikiDictionary, EntryFormatter, getExecutablePath, Entry} from "./index";

const bin = {
    dxtinary: getExecutablePath('./', 'dxtionary-db'),
    dict: resolve('../big-file/dict.sqlite')
};

class JSONFormater implements EntryFormatter<any[]> {

    data:any[] = [];
    count:number = 0;

    accumulate(e: Entry): void {
        this.data.push (JSON.parse(e.text));
    }

    serialize():any[]{
        return this.data;
    }
}

async function singleMain() {
    let dict = new WikiDictionary(bin.dxtinary, bin.dict);
    let word = "Hallo";
    let result = await dict.typedQuery(word, new JSONFormater());
    console.log(result.length);
}
singleMain();

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
