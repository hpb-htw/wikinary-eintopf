const bufferSize = 100;
function mode(max:number, cb:any) {
    let count  = 0;
    let buffer = [];
    for(let i = 0; i < max; ++i) {
        ++count;
        buffer.push(count);
        if(count%bufferSize === 0) {
            cb(count);
            buffer = [];
        }
    }
}

function arrayLength(max:number, cb:any) {
    let count  = 0;
    let buffer = [];
    for(let i = 0; i < max; ++i) {
        ++count;
        buffer.push(count);
        if (buffer.length = bufferSize) {
            cb(count);
            buffer = [];
        }
    }
}

let MAX = 800_000;
let cb = (count:number) => {return count +1;};

console.time("mode");
mode(MAX, cb);
console.timeEnd("mode");

console.time("array.length");
arrayLength(MAX, cb);
console.timeEnd("array.length");