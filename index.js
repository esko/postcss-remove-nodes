var postcss = require('postcss');

module.exports = postcss.plugin('postcss-remove-nodes', function (opts) {
    opts = opts || {};
    var removeRules = {};

    return function (css) {
        css.walkAtRules('remove', function (atrule) {
            var params = atrule.params;
            var selector = atrule.parent.selector;

            if (atrule.parent.type === 'root') {
                params = 'all';
                selector = atrule.params;
            }

            removeRules[selector] = {
                params: params,
                line: atrule.source.end.line,
                column: atrule.source.end.column
            };
            atrule.remove();
        });

        css.walkRules(function (rule) {
            var sel = removeRules[rule.selector];

            if (sel === undefined) return;

            if (sel.params === 'all' &&
                sel.line >= rule.source.start.line &&
                sel.column >= rule.source.start.column) {
                rule.remove();
                return;
            }

            rule.walkDecls(sel.params, function (decl) {
                if (sel.line >= decl.source.start.line &&
                    sel.column >= decl.source.start.column) decl.remove();
            });
        });

    };
});

