const stylelint = require('stylelint');

const ruleName = 'dkunin/do-not-repeat-color-from-variables';
const fs = require('fs');

// const messages = stylelint.utils.ruleMessages(ruleName, {
//     unexpected: (block, rule) =>
//         `Unexpected rule "${block}" inside at-rule "${rule}".`
// });

module.exports = stylelint.createPlugin(ruleName, function(options = '') {
    return function(root, result) {
        var validOptions = stylelint.utils.validateOptions({
            ruleName,
            result,
            actual: options
        });

        if (!validOptions) {
            return;
        }

        let variables = [];

        root.walkAtRules(function(statement) {
            if (statement.name === 'import') {
                const guide = fs
                    .readFileSync(statement.params.replace(/\'/g, ''))
                    .toString();
                variables = guide.match(/--[a-z-]+:\s.+;/g).map(singleLine => {
                    singleLine = singleLine.replace(';', '').trim();
                    let arry = singleLine.split(':');
                    return {
                        name: arry[0].trim(),
                        value: arry[1].trim()
                    };
                });
            }
        });

        let errors = [];
        root.walk(decl => {
            if (decl.type === 'decl') {
                const foundUsage = variables.find(singleVar => {
                    return singleVar.value === decl.value;
                });
                if (foundUsage) {
                    errors.push({
                        foundUsage,
                        decl
                    });
                }
            }
        });
        errors.forEach(singleError => {
            stylelint.utils.report({
                ruleName: 'custom-rule',
                result,
                node: singleError.decl,
                message: `Used ${singleError.decl.value}, instead of ${singleError.foundUsage.name}`
            });
        });
    };
});
