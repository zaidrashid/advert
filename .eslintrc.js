module.exports = {
    "extends": [
        "eslint:recommended",
        "google"
    ],
    "rules": {
        "guard-for-in": "off",
        "no-var": "off",
        "comma-dangle": [
            "error",
            "only-multiline"
        ],
        "require-jsdoc": 0,
        "max-len": [
            "error",
            {
                "code": 100,
                "ignoreComments": true,
                "ignoreTrailingComments": true,
                "ignoreUrls": true,
                "ignoreRegExpLiterals": true,
                "ignoreStrings": true
            }
        ]
    },
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    },
    "globals": {
        "moment": true,
        "$cardApi": true,
        "uuid": true,
        "inject": true,
        "xolor": true
    }
};