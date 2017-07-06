# WIP

> This plugin for stylelint should ultimately check for:

- If direct value is used instead of already declared variable
- If value is used several times and propose a variable

## Install

```
    npm i do-not-repeat-values-from-variables --save-dev
```

## Usage

Stylelint config:

```
    module.exports = {
        extends: [
            ...
        ],
        ignoreFiles: [
            ...
        ],
        plugins: [
            "do-not-repeat-values-from-variables",
            ...
        ],
        rules: {
            "dkunin/do-not-repeat-values-from-variables": 1,
            ...
        }
    };


```

## Contribute

PRs accepted.

## License

MIT © Dmitri Kunin
