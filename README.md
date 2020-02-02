# Wikinary Eintopf

Tool to convert the German Wiktionary dump file to Sqlite database –
A Complement for the Visual Studio Code Extension „dxtionary“ extension

## Install
This extension uses the NodeJS-package `lib-expat` to parser XML files, which depends on 
a CPP Compiler. So it works well on a linux with well-configured 
[node-gyp](https://github.com/nodejs/node-gyp).
Unfortunately I don't have time to test this package on others systems. 

To install just do

```bash
sudo npm install wikinary-eintopf
```


## Usage

1. Download the dump file from https://dumps.wikimedia.org/backup-index.html 
   (Choose a Mirror 
   → `dumps/dewiki/` 
   → some version this version is now referenced as `${version}`
   → `dewiki-${version}-pages-articles.xml.bz2`)
2. Extract the download pages somewhere, it takes app. > 1.3GB.
3. Run `wikinary-eintopf dewiki-${version}-pages-articles.xml`. This command create a 
   SQLite3 Database named `dewiki-${version}-pages-articles.xml.db` in the current 
   working directory. This file contains only pages titled `{{Sprache|Deutsch}}`. 
   You can use this file as a dictionary for the extension „dxtionary“. 

## Limitation

This package works *per-design* only with the German dump file. There are two reasons for
this design:

1. „dxtionary“ is designed to help me writing German text.
2. Size is matter. „dxtionary“ is design to work offline, so it must access an offline database. 
A big Database is –in my opinion– not a good deal by distributing an extension.

