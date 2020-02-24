/** 
 * implement a dictionary to represent wiktionary
*/
import { Entry, EntryFormatter, Dictionary, idMap } from "./dictionary";
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
        LIMIT 5
    ) SELECT id, title, text FROM entry; `.replace(/\s+/g, " ")
};


export class WikiDictionary implements Dictionary {
    

    dbPath: string;
    dxtionaryExecutableCli: string;

    
    formatter : EntryFormatter<string> ;
    
    /**
     * @param dxtionaryExecutableCli path to program `dxtionary-db`
     * @param dbPath path to sqlite3 Database file (mostly `dict.sqlite`)
     */
    constructor(dxtionaryExecutableCli: string, dbPath: string) {
        this.dbPath = dbPath;
        this.dxtionaryExecutableCli = dxtionaryExecutableCli;
        this.formatter = new PlainTextFormatter();
    }

    async query(word: string): Promise<string> {
        let escapeWord = plainEscape(word);
        const selectCmd = SQL_SELECT.byTitle.replace("@word", escapeWord);        
        const sqliteArgv: string[] = [this.dbPath, selectCmd];        
        return executeSql(this.dxtionaryExecutableCli, sqliteArgv, this.formatter);
    }

    async typedQuery<T>(word:string, formatter:EntryFormatter<T>): Promise<T> {
        let escapeWord = plainEscape(word);
        const selectCmd = SQL_SELECT.byTitle.replace("@word", escapeWord);
        const sqliteArgv: string[] = [this.dbPath, selectCmd];
        return executeSql(this.dxtionaryExecutableCli, sqliteArgv, formatter);
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

export async function executeSql2<R>(
            sqlite3CliCmd: string, 
            sqlite3Argv: string[], 
            stdoutCapture: (lines: AsyncIterable<string>) => Promise<R> 
): Promise<R> {
    const source = spawn(sqlite3CliCmd, sqlite3Argv, {
        stdio: ['ignore', 'pipe', 'pipe']
    });
    let errorMsg = "";
    try {
        // capture std out
        let capturedLines = await stdoutCapture(chunksToLines(source.stdout));
        // capture std err
        const lineAcc = (l:string) => {        
            errorMsg += l;
        };
        await collectLines(chunksToLines(source.stderr), lineAcc);
        let exit = await onExit(source);
        return Promise.resolve(capturedLines);
    }catch (ex) {
        let messageObj = {exit: Number.parseInt(ex.message), stderr: errorMsg};
        throw Error(JSON.stringify(messageObj));
    }    
}

class PlainTextFormatter implements EntryFormatter<string> {

    result: string = "";

    accumulate(e: Entry): void {
        this.result += (e.text + "\n");
    }    
    
    serialize(): string {
        return this.result;
    }
}

// TODO: escape bad text
function plainEscape(word: string): string {
    return escapeString(word);
}

function likeEscape(word: string): string {
    return escapeString(`%${word}%`);
}

async function executeSql<T>(sqlite3CliCmd: string, sqlite3Argv: string[], fmt: EntryFormatter<T> ) :Promise<T> {
    const source = spawn(sqlite3CliCmd, sqlite3Argv, {
        stdio: ['ignore', 'pipe', 'pipe']
    });

    let errorMsg = "";
    
    try{
        // capture std out
        const acc = (e:Entry) => fmt.accumulate(e) ;
        await collectEntries(linesToEntries(chunksToLines(source.stdout)), acc);

        // capture std err
        const lineAcc = (l:string) => {        
            errorMsg += l;
        };
        await collectLines(chunksToLines(source.stderr), lineAcc);
        let exit = await onExit(source);
    }catch(ex) { // catch error from process
        let messageObj = {exit: Number.parseInt(ex.message), stderr: errorMsg};
        throw Error(JSON.stringify(messageObj));
    }
    return Promise.resolve(fmt.serialize());
}


async function* linesToEntries(lines: AsyncIterable<string>): AsyncIterable<any> {
    let cache: string[] = [];
    function cacheToEntry(cache: string[]): Entry {
        let text = trimHead(cache[2]);
        try{
            JSON.parse(text);
        }catch (e) {
            throw new Error( `title: ${cache[0]}` + e.message);
        }
        return {
            id:Number.parseInt(trimHead(cache[0])),
            title: chomp(trimHead(cache[1]).trim()),
            text: trimHead(cache[2])
        };
    }
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

export function trimHead(text: string):string {
    let index = text.indexOf("=");
    return text.slice(index + 1);
}


