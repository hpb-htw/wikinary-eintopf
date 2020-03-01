export enum Lang {
    en = "Englisch",
    de = "Deutsch"
}

export const UEBERSETZUNGS_TABELL = "{{Ü-Tabelle|Ü-links=";
export const NOT_APPLICABLE_SIGN = "—";
export const WIKI_BASE_URL = "https://de.wiktionary.org/wiki/";

export namespace WikiBlockName {
    export const Lesungen = "{{Lesungen}}",
        Anmerkung = "{{Anmerkung}}",
        Alternative_Schreibweisen="{{Alternative Schreibweisen}}",
        Nicht_mehr_gueltige_Schreibweisen="{{Nicht mehr gültige Schreibweisen}}",
        Veraltete_Schreibweisen = "{{Veraltete Schreibweisen}}",
        Nebenformen = "{{Nebenformen}}",
        Worttrennung = "{{Worttrennung}}",
        in_arabischer_Schrift= "{{in arabischer Schrift}}",
        in_kyrillischer_Schrift = "{{in kyrillischer Schrift}}",
        in_lateinischer_Schrift = "{{in lateinischer Schrift}}",
        Strichreihenfolge= "{{Strichreihenfolge}}",
        Vokalisierung= "{{Vokalisierung}}",
        Umschrift= "{{Umschrift}}",
        Aussprache= "{{Aussprache}}",
        Grammatische_Merkmale= "{{Grammatische Merkmale}}",
        Bedeutungen = "{{Bedeutungen}}",
        Abkuerzungen = "{{Abkürzungen}}",
        Symbole = "{{Symbole}}",
        Herkunft= "{{Herkunft}}",
        Wortfamilie = "{{Wortfamilie}}",
        Synonyme= "{{Synonyme}}",

        Sinnverwandte_Woerter = "{{Sinnverwandte Wörter}}",
        Sinnverwandte_Zeichen = "{{Sinnverwandte Zeichen}}",
        Sinnverwandte_Redewendungen = "{{Sinnverwandte Redewendungen}}",

        Gegenwoerter = "{{Gegenwörter}}",
        Weibliche_Wortformen = "{{Weibliche Wortformen}}",
        Maennliche_Wortformen = "{{Männliche Wortformen}}",
        Verkleinerungsformen= "{{Verkleinerungsformen}}",
        Vergroesserungsformen= "{{Vergrößerungsformen}}",
        Oberbegriffe= "{{Oberbegriffe}}",
        Unterbegriffe= "{{Unterbegriffe}}",

        Verbandsbegriffe= "{{Verbandsbegriffe}}",
        Holonyme= "{{Holonyme}}",

        Teilbegriffe= "{{Teilbegriffe}}",
        Meronyme= "{{Meronyme}}",

        Kurzformen= "{{Kurzformen}}",
        Koseformen= "{{Koseformen}}",
        Namensvarianten= "{{Namensvarianten}}",
        Weibliche_Namensvarianten= "{{Weibliche Namensvarianten}}",
        Maennliche_Namensvarianten= "{{Männliche Namensvarianten}}",
        Bekannte_Namenstraeger= "{{Bekannte Namensträger}}",
        Beispiele= "{{Beispiele}}",
        Redewendungen= "{{Redewendungen}}",
        Sprichwoerter= "{{Sprichwörter}}",
        Charakteristische_Wortkombinationen= "{{Charakteristische Wortkombinationen}}",
        Wortbildungen= "{{Wortbildungen}}",
        Entlehnungen= "{{Entlehnungen}}",
        Lemmaverweis= "{{Lemmaverweis}}",

        Aehnlichkeiten = "{{Ähnlichkeiten}}",
        Aehnlichkeiten_1= "{{Ähnlichkeiten 1}}",
        Aehnlichkeiten_2= "{{Ähnlichkeiten 2}}";
    // Exceptional: Übersetzung
    export const Uebersetzungen = "{{Übersetzungen}}";
}

// this can be used as map table or as a set to check if a simple template exists
// the values of map are just explanation about the key, one can use other text for generate view of wiki entry
export const WikiSimpleTemplate = {
    "{{Akk.}}":"{{Akk.}}" ,
    "{{Dat.}}":"{{Dat.}}" ,
    "{{Du.}}":"{{Du.}}" ,
    "{{Fem.}}":"{{Fem.}}" ,
    "{{Gen.}}":"{{Gen.}}" ,

    "{{IPA}}":"{{IPA}}" ,
    "{{Imp.}}":"{{Imp.}}" ,
    "{{Impf.}}":"{{Impf.}}" ,
    "{{Komp.1}}":"{{Komp.1}}" ,
    "{{Komp.2}}":"{{Komp.2}}" ,
    "{{Komp.}}":"{{Komp.}}" ,
    "{{Mask.}}":"{{Mask.}}" ,
    "{{Neutr.}}":"{{Neutr.}}" ,
    "{{PPerf.}}":"{{PPerf.}}" ,
    "{{PPräs.}}":"{{PPräs.}}" ,
    "{{Part.}}":"{{Part.}}" ,

    "{{Pl.1}}":"{{Pl.1}}" ,
    "{{Pl.2}}":"{{Pl.2}}" ,
    "{{Pl.3}}":"{{Pl.3}}" ,
    "{{Pl.4}}":"{{Pl.4}}" ,
    "{{Pl.}}":"{{Pl.}}" ,
    "{{Pl}}":"{{Pl}}" ,
    "{{Pos.}}":"{{Pos.}}" ,
    "{{Präs.}}":"{{Präs.}}" ,
    "{{Prät.}}":"{{Prät.}}" ,
    "{{Sg.1}}":"{{Sg.1}}" ,
    "{{Sg.2}}":"{{Sg.2}}" ,
    "{{Sp.}}":"{{Sp.}}" ,
    "{{Sup.1}}":"{{Sup.1}}" ,
    "{{Sup.2}}":"{{Sup.2}}" ,
    "{{Sup.}}":"{{Sup.}}" ,

    "{{attr.}}":"{{attr.}}" ,
    "{{f}}":"{{f}}" ,
    "{{kP.}}":"{{kP.}}" ,
    "{{kPl.}}":"{{kPl.}}" ,
    "{{kPl..}}":"{{kPl..}}" ,
    "{{kPl}}":"{{kPl}}" ,
    "{{kSg.}}":"{{kSg.}}" ,
    "{{kSt.}}":"{{kSt.}}" ,
    "{{m}}":"{{m}}" ,
    "{{part.}}":"{{part.}}" ,

    "{{ugs.}}":"{{ugs.}}" ,
    "{{österr.}}":"{{österr.}}" ,
};


/**
 * One wiki entry contain one or more pages. A page is a text from begin --or when it starts at the midle of a
 * multiple pages text-- from a line begin with `== ` to the line before the next line, which also begin
 * with `== `.
 *
 * The line with `== ` is the title of the page.
 * A Page contain one or more body. In most cases it has only *one* body. A Body begins with the line with Triple Equal
 * (`=== `) and ends with the line before the next line beginning with Triple Equal. Line beginning with Triple Equal
 * are partOfSpeech.
 * */
export type WikiEntry = WikiPage[];
export class WikiPage {
    title: Title;                  // everything from begin to the line begining with `== ` (Double Equal sign)
    body: Body[] = [];             // everything from `=== ` to the line before the next line beginning with ` ===`
    constructor(title:Title) {
        this.title = title;
    }
}

export class Title {
    lemma:string;
    language:string;
    constructor(title:string, language:string) {
        this.lemma=title;
        this.language = language;
    }
}

export class Body {

    /**
     *
     * copy of Page.title.title, to the page this Body belongs.
     * */
    lemma: string;

    partofSpeech: PartOfSpeech;

    flexion?: Flexion;

    //   {{Lesungen}} (Platzierung zwischen der Überschrift der Ebene 2 und der darauf folgenden Überschrift der Ebene 3; alle nachfolgenden Textbausteine stehen unterhalb beider Überschriften)

    //   {{Anmerkung}}
    notice?: fallbackPlaintext;

    //   {{Alternative Schreibweisen}}
    //   Für eine abweichende Platzierung siehe auch Hilfe:Vor- und Nachnamen und hinsichtlich einer speziellen Vorgabe für den Inhalt Hilfe:Schweiz und Liechtenstein.
    alternativeSpelling?: fallbackPlaintext ;

    //   {{Nicht mehr gültige Schreibweisen}} ersetzt die frühere Vorlage {{Veraltete Schreibweisen}}
    oldSpelling?: fallbackPlaintext;
    //   {{Nebenformen}}

    //   {{Worttrennung}}
    hyphen: Hyphen[] = [];

    //   {{in arabischer Schrift}}
    //   {{in kyrillischer Schrift}}
    //   {{in lateinischer Schrift}}
    //   {{Strichreihenfolge}}
    //   {{Vokalisierung}}

    //   {{Umschrift}}
    transcript: fallbackPlaintext[] = [];

    //   {{Aussprache}}
    pronunciation?: Pronunciation;  // for

    //   {{Grammatische Merkmale}}
    grammaticalNote?: fallbackPlaintext; // for now render as plain text

    //   {{Bedeutungen}}
    sense: Sense = new Sense();

    //   {{Abkürzungen}}
    abbreviations: Abbreviation[] = [];
    //   {{Symbole}}
    //   {{Herkunft}}
    //   {{Wortfamilie}}
    //   {{Synonyme}}
    //   {{Sinnverwandte Wörter}} / {{Sinnverwandte Zeichen}} / {{Sinnverwandte Redewendungen}}
    //   {{Gegenwörter}}
    //   {{Weibliche Wortformen}}
    //   {{Männliche Wortformen}}
    //   {{Verkleinerungsformen}}
    //   {{Vergrößerungsformen}}
    //   {{Oberbegriffe}}
    //   {{Unterbegriffe}}
    //   {{Verbandsbegriffe}} / {{Holonyme}}
    //   {{Teilbegriffe}} / {{Meronyme}}
    //   {{Kurzformen}}
    //   {{Koseformen}}
    //   {{Namensvarianten}}
    //   {{Weibliche Namensvarianten}}
    //   {{Männliche Namensvarianten}}
    //   {{Bekannte Namensträger}}

    //   {{Beispiele}}
    examples: Example[] = [];

    //   {{Redewendungen}}
    phrase: string[] = [];
    //   {{Sprichwörter}}
    //   {{Charakteristische Wortkombinationen}}
    //   {{Wortbildungen}}
    //   {{Entlehnungen}}
    //   {{Lemmaverweis}}

    constructor(lemma:string, pos:PartOfSpeech) {
        this.lemma = lemma;
        this.partofSpeech = pos;
    }

}

export class PartOfSpeech {
    pos: string[] = [];
    addition:string[] = []; // Not implemented for now
}
export class Flexion {
    // intend to be empty
}


export interface Kasus {
    singular:string[];
    plural:string[];
}
export class SubstantivFlexion extends Flexion {
    static substantiv:string = "Deutsch Substantiv Übersicht";
    static substantiv_sch:string = "Deutsch Substantiv Übersicht -sch";

    //static nachname: string = "Deutsch Nachname Übersicht";

    static possibleTitle:string[] = [
        SubstantivFlexion.substantiv,
        //SubstantivFlexion.substantiv_sch
        //SubstantivFlexion.nachname
    ];
    // Kasus
    static GENUS = "Genus";
    static NOMINATIV = "Nominativ";
    static GENITIVE = "Genitiv";
    static DATIV = "Dativ";
    static AKKUSATIV = "Akkusativ";
    // Numerus
    static  SINGULAR = "Singular";
    static PLURAL = "Plural";
    // Daten
    genus:string[] = [];
    nominativ : Kasus = {singular:[], plural: []};
    genitiv : Kasus  = {singular:[], plural: []};
    dativ : Kasus = {singular:[], plural: []};
    akkusativ: Kasus = {singular:[], plural: []};

}


export class VornameFlexion extends SubstantivFlexion {
    static wiktionaryRef:string = "https://de.wiktionary.org/wiki/Hilfe:Vor-_und_Nachnamen/Grammatik_der_deutschen_Namen";
    static title:string = "Deutsch Vorname Übersicht";

    static PLURAL = "Plural";
}

export class ToponymFlexion extends Flexion {

    genus:string[] = ["n"];
    link:string = WIKI_BASE_URL;

    constructor(lemma:string) {
        super();
        this.link = WIKI_BASE_URL + lemma;
    }


    static title = "Deutsch Toponym Übersicht";
}


export enum GrammaticalPerson {
    maunal = 0,
    ich = 1,
    du =2,
    er_sie_es = 3,
}
export class PersonalpronomenFlexion extends Flexion {

    /**
     * original wiki template
     * */
    nominativ : Kasus = {singular:[], plural: []};
    genitiv : Kasus  = {singular:[], plural: []};
    dativ : Kasus = {singular:[], plural: []};
    akkusativ: Kasus = {singular:[], plural: []};

    constructor(person:number) {
        super();
        let kasus : {
            nominativ:Kasus, genitiv:Kasus, dativ:Kasus, akkusativ:Kasus
        }|undefined;
        switch (person) {
            case GrammaticalPerson.ich: {
                kasus = PersonalpronomenFlexion.ichPerson;
            } break;
            case GrammaticalPerson.du:{
                kasus = PersonalpronomenFlexion.duPerson;
            } break;
            case GrammaticalPerson.er_sie_es:{
                kasus = PersonalpronomenFlexion.er_sie_esPerson;
            } default: {
                // Nothing to do
            }
        }
        if(kasus !== undefined) {
            this.nominativ = kasus.nominativ;
            this.genitiv = kasus.genitiv;
            this.dativ = kasus.dativ;
            this.akkusativ = kasus.akkusativ;
        }
    }

    static ichPerson: {
        nominativ:Kasus,
        genitiv:Kasus,
        dativ:Kasus,
        akkusativ:Kasus
    } = {
        nominativ: {
            singular: ["ich"],
            plural: ["wir"]
        },
        genitiv : {
            singular: ["meiner"],
            plural: ["unser"]
        },
        dativ: {
            singular: ["mir"],
            plural: ["uns"]
        },
        akkusativ : {
            singular: ["mich"],
            plural: ["uns"]
        }
    };

    static duPerson: {
        nominativ:Kasus,
        genitiv:Kasus,
        dativ:Kasus,
        akkusativ:Kasus
    } =  {
        nominativ: {
            singular: ["du"],
            plural: ["ihr"]
        },
        genitiv : {
            singular: ["deiner"],
            plural: ["euer"]
        },
        dativ: {
            singular: ["dir"],
            plural: ["euch"]
        },
        akkusativ : {
            singular: ["dich"],
            plural: ["euch"]
        }
    };

    static er_sie_esPerson : {
        nominativ:Kasus,
        genitiv:Kasus,
        dativ:Kasus,
        akkusativ:Kasus
    } =  {
        nominativ: {
            singular: ["er",    "sie",    "es"],
            plural:   ["sie"]
        },
        genitiv : {
            singular: ["seiner", "ihrer", "seiner"],
            plural:   ["ihrer"]
        },
        dativ: {
            singular: ["ihm",    "ihr",   "ihm"],
            plural:   ["ihnen"]
        },
        akkusativ : {
            singular: ["ihn",     "sie",    "es"],
            plural:   ["sie"]
        }
    };
    static fixPersonalpromomen:string[] = [
        "{{Deutsch Personalpronomen 1}}",
        "{{Deutsch Personalpronomen 2}}",
        "{{Deutsch Personalpronomen 3}}"
    ];

    static title = "Deutsch Pronomen Übersicht";
}


type ProsessivpronomenForm = {artikel:string, deklination:string};
type ProsessivpronomenDeklination = {
    nominativ : [ProsessivpronomenForm, ProsessivpronomenForm, ProsessivpronomenForm, ProsessivpronomenForm],
    genitiv   : [ProsessivpronomenForm, ProsessivpronomenForm, ProsessivpronomenForm, ProsessivpronomenForm],
    dativ     : [ProsessivpronomenForm, ProsessivpronomenForm, ProsessivpronomenForm, ProsessivpronomenForm],
    akkusativ : [ProsessivpronomenForm, ProsessivpronomenForm, ProsessivpronomenForm, ProsessivpronomenForm]
};

const attributivT:ProsessivpronomenDeklination = Object.freeze({
    nominativ: [{artikel:"", deklination:""},  {artikel:"", deklination:"e"}, {artikel:"", deklination:""},  {artikel:"", deklination:"e"}],
    genitiv  : [{artikel:"", deklination:"es"},{artikel:"", deklination:"er"},{artikel:"", deklination:"es"},{artikel:"", deklination:"er"}],
    dativ    : [{artikel:"", deklination:"em"},{artikel:"", deklination:"er"},{artikel:"", deklination:"em"},{artikel:"", deklination:"en"}],
    akkusativ: [{artikel:"", deklination:"en"},{artikel:"", deklination:"e"}, {artikel:"", deklination:""},  {artikel:"", deklination:"e"}]
});

const nichtAttributivT:ProsessivpronomenDeklination = Object.freeze({
    nominativ: [{artikel:"", deklination:"er"},{artikel:"", deklination:"e"}, {artikel:"", deklination:"es"},{artikel:"", deklination:"e"}],
    genitiv  : [{artikel:"", deklination:"es"},{artikel:"", deklination:"er"},{artikel:"", deklination:"es"},{artikel:"", deklination:"er"}],
    dativ    : [{artikel:"", deklination:"em"},{artikel:"", deklination:"er"},{artikel:"", deklination:"em"},{artikel:"", deklination:"en"}],
    akkusativ: [{artikel:"", deklination:"en"},{artikel:"", deklination:"e"}, {artikel:"", deklination:"es"},{artikel:"", deklination:"e"}]
});

const nichtAttributivMitArtikelT:ProsessivpronomenDeklination = Object.freeze({
    nominativ: [{artikel:"der", deklination:"e"}, {artikel:"die", deklination:"e"}, {artikel:"das", deklination:"e"}, {artikel:"die", deklination:"en"}],
    genitiv  : [{artikel:"des", deklination:"em"},{artikel:"der", deklination:"en"},{artikel:"des", deklination:"en"},{artikel:"der", deklination:"en"}],
    dativ    : [{artikel:"dem", deklination:"en"},{artikel:"der", deklination:"en"},{artikel:"dem", deklination:"en"},{artikel:"den", deklination:"en"}],
    akkusativ: [{artikel:"den", deklination:"en"},{artikel:"die", deklination:"e"}, {artikel:"das", deklination:"e"}, {artikel:"die", deklination:"en"}]
});
function mapTemplate(person:string, template: ProsessivpronomenDeklination): ProsessivpronomenDeklination {
    let d = {};
    for (let [key, value] of Object.entries(template) ) {
        let f : ProsessivpronomenForm[] = [];
        value.forEach( (deklination, idx) => {
           f.push({
               artikel: deklination.artikel,
               deklination: person + deklination.deklination
           });
        });
        // @ts-ignore
        d[key] = f;
    }
    return <ProsessivpronomenDeklination>d;
}
export class Possessivpronomen extends Flexion {
    static fixPossessivpronomen:string[] = [
        "{{Deutsch Possessivpronomen|mein}}",
        "{{Deutsch Possessivpronomen|dein}}",
        "{{Deutsch Possessivpronomen|sein}}"
    ];

    attributiv:ProsessivpronomenDeklination;
    nichtAttributiv:ProsessivpronomenDeklination;
    nichtAttributivMitArtikel: ProsessivpronomenDeklination;

    constructor(person:string) {
        super();
        if (person === "mein" || person==="dein" || person === "sein") {
            this.attributiv = mapTemplate(person, attributivT);
            this.nichtAttributiv = mapTemplate(person, nichtAttributivT);
            this.nichtAttributivMitArtikel = mapTemplate(person, nichtAttributivMitArtikelT);
        } else {
            throw new Error(`Unknow person '${person}' of Possessivpronomen`);
        }
    }
}

/**
 * Doku: https://de.wiktionary.org/wiki/Vorlage:Deutsch_Verb_%C3%9Cbersicht
 * */
export class VerbFlexion extends Flexion {
    static title:string = "Deutsch Verb Übersicht";

    // Tempus:
    /**
     * Präsens Zeit Singular von 1. 2. und 3. Person;
     * (Das Attribut is in Latein um Umlaut in Variable-Name zu vermeinden, ebenso
     * wie imperfekt statt Präteritum)
     * */
    praesens:  {ich: string[], du: string[], er_sie_es: string[]} = {
        //Präsensform der 1. Person Singular
        ich:[],
        //Präsensform der 2. Person Singular
        du:[],
        //Präsensform der 3. Person Singular
        er_sie_es:[]
    };

    /**
     * anderem Wort für Präteritum; Präteritumform der 1. oder 3. Person Singular
     * */
    imperfekt: string[] = [];

    /**
     * Partizip II Form/Partizip Perfekt, mehrere Alternative
     * */
    perfekt: string[] = [];

    /**
     * Konjunktiv Präteritum der 1. oder 3. Person Singular
     * */
    konjunktiv_II:string[] = [];

    /**
     * Imperativ der 2. Person Singular und Plural
     * */
    imperativ: {
        singular:  string[],
        plural:    string[]
    } = {
        singular:[],
        plural:[]
    };

    /**
     * Angabe des Hilfsverbs
     * */
    hilfverb:string[] = [];

    weitereKonjugationen:string = "";

    static PRAESENS_ICH = "Präsens_ich";
    static PRAESENS_DU = "Präsens_du";
    static PRAESENS_ER_SIE_ES = "Präsens_er, sie, es";
    //
    static PRAETERITUM_ICH = "Präteritum_ich";
    static KONJUNKTIV_II_ICH = "Konjunktiv II_ich";
    static IMPERATIV_SINGULAR = "Imperativ Singular";
    static IMPERATIV_PLURAL = "Imperativ Plural";
    static PARTIZIP_II = "Partizip II";
    static HILF_VERB = "Hilfsverb";

    static WEITERE_KONJUGATIONEN = "Weitere_Konjugationen";

}

export class AdjektivFlexion extends Flexion {
    static title = "Deutsch Adjektiv Übersicht";


    positiv:string[] = []; // there is only one form of positiv, keeping it in an array make converting tasks easier
    komparativ:string[] = [];
    superlativ:string[] = [];

    moreForm?:boolean;

    //
    static  POSITIV = "Positiv";
    static KOMPARATIV = "Komparativ";
    static SUPERLATIV = "Superlativ";
    static KEIN_WEITERE_FORMEN = "keine weiteren Formen";

}


export class Hyphen {
    form : string = "";
    additionalInformation: string[] = [];
    syllable: string[] = [];
}

export class Pronunciation {

    variant:string = "_";
    ipa:string;

    constructor(ipa: string, variant:string = "_") {
        this.variant = variant;
        this.ipa = ipa;
    }
}

export class Abbreviation {
    type_ :string = "_"; // default
    abb: string ;
    constructor(abb:string, type_:string = "_") {
        this.type_ = type_;
        this.abb = abb;
    }
}

export class ListItem {
    text:string;
    private items:ListItem[] = [];
    parent:ListItem|undefined;

    constructor(text:string, parent:ListItem|undefined = undefined) {
        this.text = text;
        this.parent = parent;
    }

    toJSON() {
        return {text:this.text, items:this.items};
    }

    appendSubList(list:ListItem) {
        list.parent = this;
        this.items?.push(list);
    }
}


export class Sense {

    introText?:string;
    ambiguity: ListItem[] = [];
}

export class Example {
    ofSense:number[] = [];
    origin: string;
    translate: string|undefined = undefined;
    constructor(ofSense:number[], origin:string, translate:string|undefined=undefined) {
        this.ofSense = [...ofSense];
        this.origin = origin;
        this.translate = translate;
    }
}




export interface EndTeil {
    //TODO
}

export type fallbackPlaintext = string;



