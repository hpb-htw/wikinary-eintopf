import { ChildProcess } from "child_process";

import {join} from 'path';
import { existsSync } from 'fs';

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

export function onExit(childProcess: ChildProcess): Promise<undefined|Error> {
    return new Promise((resolve, reject) => {
        childProcess.once('exit', (code: number, signal: string) => {            
            if (code === 0) {
                resolve(undefined);
            } else {
                reject(new Error('' + code));
            }
        });
        childProcess.once('error', (err: Error) => {
            reject(err);
        });
    });
}

export type BinaryEnvironment = {
    platform: string,
    arch: string
};
export function getExecutablePath(env: BinaryEnvironment, binaryDirectory: string, binName:string): string {
    let sqliteBin: string;
    switch ( env.platform ) {
        case 'win32':
            sqliteBin = `Windows-AMD64/${binName}.exe`;
            break;
        case 'linux':
            if (env.arch === 'x64') {
                sqliteBin = `Linux-x86_64/${binName}`;
            } else {
                sqliteBin = '';
            }
            break;
        case 'darwin':
            sqliteBin = `Darwin-x86_64/${binName}`;
            break;
        default:
            sqliteBin = '';
            break;
    }
    if (sqliteBin) {
        let path = join(binaryDirectory, sqliteBin);
        if ( existsSync(path)) {
            return path;
        } else {
            throw new Error(`Binary not found: '${path}' does not exist.`);
        }
    } else {
        throw new Error(`No support for platform ${env.platform} and architecture ${env.arch}`);
    }
}