import {ListItem, Possessivpronomen} from "../de_wiki_lang";

describe("de_wiki_lang/Possessivpronomen", () => {
    test("constructor", () => {
        let drittPerson = new Possessivpronomen("sein");
        //console.log(JSON.stringify(drittPerson, null, 2));
        let akkusativ = drittPerson.attributiv.akkusativ;
        expect(akkusativ).toHaveLength(4);

    });
});


describe("ListItem", () => {
    test("toJSON", () => {
        let root = new ListItem("root");
        let secondGeneration:ListItem[] = [];
        const secondLength = 3;
        for (let i = 0; i < secondLength; ++i) {
            secondGeneration[i] = new ListItem(`2-${i}`);
            root.appendSubList(secondGeneration[i]);
        }
        for (let i = 0; i < 5; ++i) {
            let thirdGeneration = new ListItem(`3-${i}`);
            secondGeneration[i % secondLength].appendSubList(thirdGeneration);
        }
        let json =  JSON.stringify(root) ;
        let obj = JSON.parse(json);
        let expectedObject = {
            "content": "root",
            "items": [
                {"content": "2-0","items": [{"content": "3-0","items": []},
                                         {"content": "3-3","items": []}]
                },
                {"content": "2-1","items": [{"content": "3-1","items": []},
                                         {"content": "3-4","items": []}]
                },
                {"content": "2-2","items": [{"content": "3-2","items": []}]
                }
            ]
        };
        expect(obj).toStrictEqual(expectedObject);
    });
});