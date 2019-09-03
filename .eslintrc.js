module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "@nuxtjs"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "parser": "babel-eslint",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
};