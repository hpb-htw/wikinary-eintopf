import { ChildProcess } from "child_process";

/**
 * Unverschämt geklaut von 
 * https://2ality.com/2019/11/nodejs-streams-async-iteration.html
 * 
 * @param chunkIterable An asynchronous or synchronous iterable
 * over “chunks” (arbitrary strings)
 * @returns An asynchronous iterable over “lines”
 * (strings with at most one newline that always appears at the end)
 */
export async function* chunksToLines(chunkIterable: AsyncIterable<string>): AsyncIterable<string> {
    let previous = '';
    for await (const chunk of chunkIterable) {
        previous += chunk;
        while (true) {
            const eolIndex = previous.indexOf('\n');
            if (eolIndex < 0) { break; }

            // line includes the EOL
            const line = previous.slice(0, eolIndex + 1);
            yield line;
            previous = previous.slice(eolIndex + 1);
        }
    }
    if (previous.length > 0) {
        yield previous;
    }
}

const RE_NEWLINE = /\r?\n$/u;
export function chomp(line: string): string {
    const match = RE_NEWLINE.exec(line);
    if (!match) { return line; }
    return line.slice(0, match.index);
}

//---------- Tools for child processes

export function onExit(childProcess: ChildProcess): Promise<void> {
    return new Promise((resolve, reject) => {
        childProcess.once('exit', (code: number, signal: string) => {
            if (code === 0) {
                resolve(undefined);
            } else {
                reject(new Error('Exit with error code: ' + code));
            }
        });
        childProcess.once('error', (err: Error) => {
            reject(err);
        });
    });
}
