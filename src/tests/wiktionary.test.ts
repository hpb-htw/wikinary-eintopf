import * as path from "path";
import { parseWikiDump, Entry } from "../wiktionary";

const bigDumpXML = "../../big-file/dewiktionary-20191020-pages-articles.xml";
const smallDumpXML = "../../big-file/small-dewiktionary-20191020-pages-articles.xml";
const nsZeroPageCountInSmallDumpXML = 6;

const halloPageDict = {
    path: "../../big-file/hallo-page.xml",
    lineOfPage: 56,
    firstLine: '{{Siehe auch|[[hallo]], [[halló]]}}',
    lastLine: '{{Ähnlichkeiten 1|[[Hall]], [[Halle]], [[halle]], [[Halo]], [[holla]], [[Holle]]}}'
};

describe('wikipedia', () => {
    test('parse xml dump', async () => {
        let xmlPath = path.join(__dirname, smallDumpXML);
        let result: any[] = [];
        await parseWikiDump(xmlPath, (entry: any) => {
            result.push(entry);
        });
        let entriesCount = result.length;
       expect(entriesCount).toBe(nsZeroPageCountInSmallDumpXML);
    });

    
    test('parse page correct', async () => {
        let xmlPath = path.join(__dirname, halloPageDict.path);
        let result: Entry[] = [];
        await parseWikiDump(xmlPath, (entry) => {
            result.push(entry);
        });
        //console.log(result);
        let hallo = result.filter((page) => page.id === 555);
        //assert.equal(hallo.length, 1, "there is only one page with tile Hallo");
        let text = hallo[0].text.split("\n");
        expect(text.length).toBe(halloPageDict.lineOfPage);
        expect(text[0]).toBe(halloPageDict.firstLine);
        expect(text[halloPageDict.lineOfPage-1]).toBe(halloPageDict.lastLine);
    });
});

