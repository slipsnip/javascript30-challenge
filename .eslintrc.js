module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "always"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
          "warn",
          { "allow": ["info", "error"] }
        ],
        "no-underscore-dangle": [0],
    }
};