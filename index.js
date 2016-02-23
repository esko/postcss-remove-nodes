var postcss = require('postcss');

module.exports = postcss.plugin('postcss-remove-nodes', function (opts) {
    opts = opts || {};

    return function (css, result) {
        css.walkAtRules('remove', function (atrule) {
          	var params = atrule.params;
          	var selector = atrule.parent.selector;
              
          	if (atrule.parent.type == "root") {
              param = "all";
              selector = atrule.params;
            }
            
        	removeRules[selector] = {params: params, line: atrule.source.start.line};
          	atrule.remove();
        });

        css.walkRules(function (rule) {
          	var sel = removeRules[rule.selector];
              
          	if (sel === undefined) return;
              
          	if (sel.params === "all") {
              rule.remove();
              return;
            }
            
	        rule.walkDecls(sel.params, function (decl) {
              	if (sel.line >= decl.source.start.line) decl.remove();
            });
        });

    };
});
