# Wikinary Eintopf

Tool to convert CSV Version of the German Wiktionary dump file to Sqlite database –
A Complement for the Visual Studio Code Extension „dxtionary“ extension.

This tool is used in „dxtionary“ to access German Wiktioanry in form of a Sqlite Database.

* To make a CSV Version of the German Wiktionary dump file read `de-wiktionary-parser/README.md`
* To make a Sqlite Database file from the CSV file read `dxtionary-db/README.md`  

## Install
To install just do

```bash
npm install wikinary-eintopf
```

## Usage
This package is designed to be used as a library.

To query entries of a word in database, one need an instance of `WikiDictionary`,
and a maybe an instance of `EntryFormatter` to format entries. The instance of 
`WikiDictionary` is reusable. 

### Query a word to string based result
A typical usage looks like following:

```typescript
// Prepare
import {WikiDictionary, EntryFormatter} from "wikinary-eintopf";

const executable = "path/to/executable/dxtionary-db", 
      dbPath = "path/to/sqlite-db/dict.sqlite"; 
const formatter = new YouOwnFormatter();
let dict = new WikiDictionary(executable, dbPath);
dict.formatter = formatter;

// use dict to query a word
let result:Promise<string> = dict.query('Rosa'); // → result is always a Promise<string> 
```

The class `YourOwnFormatter` must implement the interface `EntryFormater<string>`.
This type of usage covers almost all use-case. Once can implement his own formatter to convert 
instance of `Entry` instantly to JSON-String or to XML-String or whatever suits his use-case. 

Implementing an `EntryFormater<string>` is very simple, for example, to convert all entries
to a (very long) validate JSON-String, once can write as follow:


```typescript
/**
 * this class collects all Entry.text into a JS Array. It expects
 * that Entry.text is already a valid JSON String.
 * */
class JSONStringFormatter implements EntryFormatter<string> {

    text = "[";
    count = 0;

    accumulate(e: Entry): void {
        this.text += ( (++this.count > 1? ",": "") + e.text );
    }

    serialize(): string {
        return this.text + "]";
    }
}
```
 

### Query a word to formatted result

This use-case is less common than the use-case above, but gives users more flexibility.

To make a typed query, also result should not be a string, but be formatted in a expected type,
once can use `typedQuery`, which looks like:

```typescript
// Prepare as above
// then create a formatter, which can format an instance of `Entry` to expected type:
let formatter:EntryFormatter<T> = new TypedFormatter();

// do query:
let typedResult:Promise<T> = dict.typedQuery('Rosa', formatter);
```

For example to implement a Formatter, which collects only `Entry.title` to a big JSON Array, 
one can write:

```typescript
// Prepare as above, then implement your own Formatter
class EntryTitleToArray implements EntryFormatter<string[]> {

    count: number = 0;
    collected:string[] = [];

    accumulate(e: Entry): void {
        this.collected.push(e.title);
    }

    serialize(): string[] {
        return this.collected;
    }
}

let result:Promise<string[]> = dict.typedQuery("ich", new EntryTitleToArray());
``` 

### Write your own query

One can also write his own query and use the function `executeSql2`. This allows
library consumer to process output lines of the process `dxtionary-db`. This approach 
is anyway low-level. S. Unit-test of `executeSql2` to learn more about it. 


