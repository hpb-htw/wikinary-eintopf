# Wikinary Eintopf

Tool to convert CSV Version of the German Wiktionary dump file to Sqlite database –
A Complement for the Visual Studio Code Extension „dxtionary“ extension.

This tool is used in „dxtionary“ to access German Wiktioanry in form of a Sqlite Database.
To create the Sqlite Databse, this tool needs a CSV file, which is the output of the 
sibling project `de-wiktionary-parser`. See `de-wiktionary-parser/README.md`
to get Information how to create such a CSV File. (CSV is just a convention, it does NOT use
a `,` to separate columns, but uses the token `<separator>`.) 

## Install
To install just do

```bash
npm install wikinary-eintopf
```

## Usage
This package is designed to be used as a library.
(TODO)



