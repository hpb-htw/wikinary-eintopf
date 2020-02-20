module.exports =  {
    "transform": {
        "^.+\\.(t|j)sx?$": "ts-jest"
    },
    "testRegex": "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
/*
    "collectCoverage": true,
    "coverageReporters": ["text","json", "lcov"],
    "coverageDirectory": "coverage"
 */
}