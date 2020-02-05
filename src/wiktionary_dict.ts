/** 
 * implement a dictionary to represent wiktionary
*/
import { Entry, EntryFormater, Dictionary, idMap } from "./dictionary";
import { spawn} from 'child_process';
import { chunksToLines, chomp, onExit } from "./process_stream_helper";
import { escapeString } from "./sql_escape_string";


const SQL_SELECT = {
    byText: `SELECT id, title, text FROM dewiktionary WHERE dewiktionary MATCH @word LIMIT 50`,
    byTitle: 
    `WITH entry AS (
        SELECT id, title, text, editdist3(title, @word) as ranke 
        FROM dewiktionary 
        WHERE ranke < 400 
        ORDER BY ranke 
        LIMIT 50
    ) SELECT id, title, text FROM entry; `.replace(/\s+/g, " ")
};


export class WikiDictionary implements Dictionary {
    

    dbPath: string;
    dxtionary_db_cmd: string;

    
    formater : EntryFormater ;
    
    /**
     * @param dbPath path to sqlite3 Database file
     */
    constructor(sqlite3CliCmd: string, dbPath: string) {
        this.dbPath = dbPath;
        this.dxtionary_db_cmd = sqlite3CliCmd;
        this.formater = new PlainTextFormater();
    }

    async query(word: string): Promise<string> {
        let escapeWord = plainEscape(word);
        const selectCmd = SQL_SELECT.byTitle.replace("@word", escapeWord);        
        const sqliteArgv: string[] = [this.dbPath, selectCmd];        
        return executeSql(this.dxtionary_db_cmd, sqliteArgv, this.formater);
    }

    save(entry: Entry): Promise<any> {
        throw new Error("Method not implemented.");
    }

    saveAll(entries: Entry[]): Promise<number> {
        throw new Error("Method not implemented.");
    }

    close(): Promise<any> {
        return Promise.resolve(`disconnect to database`);
    }
}



class PlainTextFormater implements EntryFormater {

    result: string = "";

    accumulate(e: Entry): void {
        this.result += (e.text + "\n");
    }    
    
    serialize(): string {
        throw new Error("Method not implemented.");
    }
}

// TODO: escape bad text
function plainEscape(word: string): string {
    return escapeString(word);
}

function likeEscape(word: string): string {
    return escapeString(`%${word}%`);
}

async function executeSql(sqlite3CliCmd: string, sqlite3Argv: string[], fmt: EntryFormater ) :Promise<string> {
    const source = spawn(sqlite3CliCmd, sqlite3Argv, {
        stdio: ['ignore', 'pipe', 'pipe']
    });
    // capture std out
    const acc = (e:Entry) => fmt.accumulate(e) ;
    await collectEntries(linesToEntries(chunksToLines(source.stdout)), acc);

    // capture std err
    let errorMsg = "";
    const lineAcc = (l:string) => {        
        errorMsg += l;
    };
    await collectLines(chunksToLines(source.stderr), lineAcc);

    // catch error
    try{
        let exit = await onExit(source);
    }catch(ex) {
        let messageObj = {exit: Number.parseInt(ex.message), stderr: errorMsg};
       throw Error(JSON.stringify(messageObj));
    }
    return Promise.resolve(fmt.serialize());
}


async function* linesToEntries(lines: AsyncIterable<string>): AsyncIterable<any> {
    let cache: string[] = [];
    for await (const line of lines) {
        cache.push(line);
        while (true) {
            if (cache.length === 4) {
                yield cacheToEntry(cache);
                cache = [];
            } else {
                break;
            }
        }
    }
    if (cache.length >= 3) {
        yield cacheToEntry(cache);
    }
}

async function collectEntries(entries: AsyncIterable<Entry>, entryAcc:(e:Entry)=>any): Promise<any> {    
    for await (const e of entries) {
        entryAcc(e);
    }
    return Promise.resolve(undefined);
}

async function collectLines(lines: AsyncIterable<string>, lineAcc:(l:string)=>any): Promise<any> {
    for await(const l of lines) {        
        lineAcc(l);
    }
    return Promise.resolve(undefined);
}

function trimHead(text: string) {
    let index = text.indexOf("=");
    return text.slice(index + 1);
}

function cacheToEntry(cache: string[]): Entry {
    return {
        id: Number.parseInt(trimHead(cache[0])),
        title: chomp(trimHead(cache[1]).trim()),
        text: JSON.parse(trimHead(cache[2]))
    };
}
