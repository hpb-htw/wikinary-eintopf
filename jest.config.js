module.exports =  {
    "transform": {
        "^.+\\.(t|j)sx?$": "ts-jest"
    },
    "testRegex": "(/tests/.*|(\\.|/)(test))\\.(ts)$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    testTimeout: 2147483647
};