var postcss = require('postcss');

function checkIsBefore(removerule, node) {
    return removerule.line >= node.source.start.line &&
           removerule.column >= node.source.start.column;
}

function isMq(node) {
    return node.name === 'media' && node.type === 'atrule';
}

module.exports = postcss.plugin('postcss-remove-nodes', function (opts) {
    opts = opts || {};
    var removeRules = {};

    return function (css) {
        css.walkAtRules('remove', function (atrule) {
            var params = {};

            params.line = atrule.source.end.line;
            params.column = atrule.source.end.column;
            params.context = atrule.parent.type === 'rule' ? 'root' : atrule.parent.type;

            switch(atrule.parent.type) {
                case 'root':
                case 'atrule':
                    params.target = 'all';
                    params.selector = atrule.params;
                    if (atrule.parent.name === 'media') params.mq = atrule.parent.params;
                    break;
                case 'rule':
                    params.target = atrule.params;
                    params.selector = atrule.parent.selector;
                    if (isMq(atrule.parent.parent)) {
                        params.mq = atrule.parent.parent.params;
                        params.context = 'atrule';
                    }
            }

            removeRules[params.selector] = params;

            atrule.remove();
        });

        css.walkRules(function (rule) {
            var sel = removeRules[rule.selector];
          
            if (sel === undefined || sel.context !== rule.parent.type) return;
          	if (rule.parent.params !== sel.mq) return;
          
            if (sel.target === 'all' && checkIsBefore(sel, rule)) {
                rule.remove();
                return;
            }

            rule.walkDecls(sel.target, function (decl) {
                if (checkIsBefore(sel, decl)) decl.remove();
            });
        });

    };
});



