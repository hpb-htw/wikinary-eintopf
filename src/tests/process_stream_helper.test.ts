import {BinaryEnvironment, getExecutablePath} from "../process_stream_helper";
import {resolve} from "path";


const EXE = 'dxtionary-db';
const BIN_DIR =  resolve(__dirname, `../../bin/`);

test("unknown env path", () => {
    let env:BinaryEnvironment = {
        platform: "unknown",
        arch: "xzy"
    };

    try {
        let exe = getExecutablePath(env, BIN_DIR, EXE);
        fail("expected an exception");
    }catch (e) {
        let msg = e.message;
        expect(msg).toEqual('No support for platform unknown and architecture xzy');
    }
});

test("get executable on linux", () => {
    let env:BinaryEnvironment = {
        platform: 'linux',
        arch: 'x64'
    };
    let exe = getExecutablePath(env, BIN_DIR, EXE);
    expect(exe).toEqual(resolve(BIN_DIR, 'Linux-x86_64', EXE));
});

test ("get executable on MacOS", () =>{
    let env:BinaryEnvironment = {
        platform: 'darwin',
        arch: 'not affect'
    };
    let exe = getExecutablePath(env, BIN_DIR, EXE);
    expect(exe).toEqual(resolve(BIN_DIR, 'Darwin-x86_64', EXE));
});

test ("get executable on Windoof", () =>{
    let env:BinaryEnvironment = {
        platform: 'win32',
        arch: 'not affect'
    };
    let exe = getExecutablePath(env, BIN_DIR, EXE);
    expect(exe).toEqual(resolve(BIN_DIR, 'Windows-AMD64', EXE+'.exe'));
});


test('executable not exist', () => {
    let env:BinaryEnvironment = {
        platform: 'linux',
        arch: 'x64'
    };
    try {
        let exe = getExecutablePath(env, BIN_DIR, 'not-exist');
        fail("expected an exception");
    }catch (e) {
        let msg = e.message;
        expect(msg.startsWith('Binary not found')).toEqual(true);
    }
});
