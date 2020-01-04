//import XMLStream from "xml-stream";
const XMLStream = require("xml-stream");
import * as fs from "fs";
import * as es from "event-stream";
import * as path from "path";

//TODO: create a typedef package and move this declaration into it, 
//      so that other projects can use this declaration to communicate with each others.
export type Entry = {
    /**
     * unique id of the entry in a dictionary
     */
    id: number,
    /**
     * text description about the entry
     */
    text: string,
};

/**
 * parse a XML dump file from http://dumps.wikimedia.org/backup-index.html
 * Result of this function is a Promise. See Unit test for Usage.
 * 
 */
export async function parseWikiDump(dumpFile: string, insertEntry: (entry: Entry) => any):Promise<number> {
    console.log(`call parseWiki`);
    let xmlFile = fs.createReadStream(dumpFile);
    let count = 0;
    let promisses = new Promise<number>((resolve, reject) => {
        let xml = new XMLStream(xmlFile);
        xml.preserve('text', true);
        xml.on("endElement: page", (element: any) => {           
            let ns = element["ns"];
            if (ns === '0') {
                ++count;
                let title = Number.parseInt(element["id"]);
                let originText = element["revision"]["text"]["$children"];
                try {
                    let text = joinText(originText);                    
                    insertEntry({
                        id: title,
                        text: text
                    });
                } catch (ex) {                    
                    reject(ex);
                }
            }
        });
        xml.on("end", () => {
            resolve(count);
        });
    });
    return promisses;
}

function joinText(text: string[]): string {
    return text.map((line) => escape(line)).join("");
}

// XML entities.
var entities: { [index: string]: string } = {
    '"': '&quot;',
    '&': '&amp;',
    '\'': '&apos;',
    '<': '&lt;',
    '>': '&gt;'
};

// Escapes text for XML.
function escape(value: string) {
    return value.replace(/"|&|'|<|>/g, function (entity) {
        return entities[entity];
    });
}