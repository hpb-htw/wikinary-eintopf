import {WikiDictionary, executeSql2} from "./wiktionary_dict";
import {Dictionary, Entry, EntryFormatter} from "./dictionary";
import {getExecutablePath} from "./process_stream_helper";

/** This value is result of de-wiktionary-parser */
export const ENTRIES_IN_DE_WIKI = 651463;

/** forward-export */
export {WikiDictionary, executeSql2};
export {Dictionary, Entry, EntryFormatter};
export {getExecutablePath};

import * as WikiLang from './de_wiki_lang';

export {WikiLang};

