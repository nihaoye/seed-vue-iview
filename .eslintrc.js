//https://github.com/vuejs/eslint-plugin-vue
//https://eslint.org/docs/rules/
module.exports = {
    "root": true,
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    "env": {
        "browser": true,
        "es6": true
    },
    "rules": {
        //缩进
        "indent": ["error", 4],
        //template缩进
        "vue/html-indent": ["error", 4],
        //强制尾逗号
        "comma-dangle": ["error", "always-multiline"],

        "vue/html-self-closing": "off",
        "no-console": "off",
        // "no-undef": "off",
        // "no-unused-vars": "off",
        // "no-useless-escape": "off",
        // "no-redeclare": "off",
        // "no-extra-semi": "off",
        // "no-octal": "off",
        // "no-empty": "off",
        // "no-mixed-spaces-and-tabs": "off",
        // "no-irregular-whitespace": "off",
        // "no-sparse-arrays": "off",
        // "no-cond-assign": "off",
        // "vue/require-v-for-key": "off",
        // "vue/no-confusing-v-for-v-if": "off",
        // "no-dupe-keys": "off",
        // "vue/no-textarea-mustache": "off",
        // "vue/valid-v-if": "off",
        // "vue/no-parsing-error": "off",
        // "vue/valid-v-bind": "off",
        // "vue/valid-v-model": "off"
    }
}
