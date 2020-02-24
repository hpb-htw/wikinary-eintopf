

export type Entry = {
    /**
     * unique id of the entry in a dictionary
     */
    id: number,
    title: string,
    /**
     * text description about the entry, this is the content of the dictionary
     */
    text: string,
};

export const idMap = (word: string, entries: Entry[]) =>
    `${word}\n${entries.map(e => e.text).join('\n')}`;

export interface Dictionary {

    formatter : EntryFormatter<string> ;

    /**
     * 
     * @param word searching word in dictionary database
     * @returns a Promise of String. The String is ready to be shown on the client of 
     * this dictionary. Normally, the string is a HTML-Block which is embedded in WebView Panel 
     * of this extension.
     */
    query(word: string): Promise<string>;

    /**
     * @param entry the entry to be saved into dictionary database.
     */
    save(entry: Entry): Promise<any>;

    saveAll(entries: Entry[]): Promise<number>;
    /**
     * clients of a dictionary must call this method when they don't need this dictionary any more.
     * Clients expect that this method release all resource which are bound to this dictionary.
     * 
     * @returns a Promiss, expected to be resolved if sussess, or rejected of closing dictionary 
     * causes problems.
     */
    close(): Promise<any>;
    
}


export interface EntryFormatter<T> {

    /**
     *  
     * Accumulate an entry. Implementation can process this entry on-the-fly 
     * or saved it in a cache and process it later in context of other entry.
     * This method is called for each found entries in conjunction with a word.
    */
    accumulate(e: Entry): void ;

    /** 
     * returns the final result of a lookup for a word, which can be displayed
     * */
    serialize(): T;
}

