/** 
 * implement a dictionary to represent wiktionary
*/
import { Entry, Dictionary, idMap } from "./dictionary";
import { spawn} from 'child_process';
import { chunksToLines, chomp, onExit } from "./process_stream_helper";
import { escapeString } from "./sql_escape_string";


const SQL_SELECT = {
    byText: `SELECT id, title, text FROM dewiktionary WHERE editdist3(title, @word) < 400 LIMIT 50`,
    byTitle: `SELECT id, title, text FROM dewiktionary WHERE editdist3(title, @word) < 400 LIMIT 50`
};


export class WikiDictionary implements Dictionary {

    dbPath: string;
    sqlite3: string;

    entryMapper: (word: string, entities: Entry[]) => any = idMap;

    /**
     * @param dbPath path to sqlite3 Database file
     */
    constructor(sqlite3CliCmd: string, dbPath: string) {
        this.dbPath = dbPath;
        this.sqlite3 = sqlite3CliCmd;
    }

    async query(word: string): Promise<string> {
        let escapeWord = plainEscape(word);
        const selectCmd = SQL_SELECT.byTitle.replace("@word", escapeWord);
        console.error(selectCmd);
        const sqliteArgv: string[] = [this.dbPath, selectCmd];
        const mapper = (e:Entry)=> this.entryMapper(word, [e]);
        return executeSql(this.sqlite3, sqliteArgv, mapper);
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

// TODO: escape bad text
function plainEscape(word: string): string {
    return escapeString(word);
}

function likeEscape(word: string): string {
    return escapeString(`%${word}%`);
}

async function executeSql(sqlite3CliCmd: string, sqlite3Argv: string[], mapper:(e:Entry)=>string ) :Promise<string> {
    const source = spawn(sqlite3CliCmd, sqlite3Argv, {
        stdio: ['ignore', 'pipe', process.stderr]
    });
    let result:string = "";    
    const acc = (e:Entry) => {
        result += mapper(e);
    };
    await collectEntries(linesToEntries(chunksToLines(source.stdout)), acc);
    await onExit(source);    
    return Promise.resolve(result);
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
