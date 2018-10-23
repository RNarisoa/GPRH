module.exports = {
    "extends": "airbnb-base",

    "parserOptions": {
        "ecmaVersion": 6
    },

    "env": {
        "node": true
    },

    "rules": {
        "indent": [2, "tab"],
        "space-before-function-paren": [2, "never"],
        "func-names": 0,
        "max-len": [1, { "code": 160 }],
        "no-restricted-syntax": 0,
        "no-tabs": 0,
        "linebreak-style": 0,
        "comma-dangle": ["error", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "exports": "always-multiline",
            "functions": "ignore"
        }],
        "no-console": 0,
        "no-trailing-spaces": 0,
        "global-strict": 0,
        "strict": [2, "global"],
    },

    "globals": {
        "Ext": true,
        "window": true,
    }
};