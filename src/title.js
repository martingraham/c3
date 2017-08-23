import { c3_chart_internal_fn } from './core';

c3_chart_internal_fn.initTitle = function () {
    var $$ = this;
    $$.title = $$.svg.append("text")
          .text($$.config.title_text)
          .attr("class", $$.CLASS.title);
};
// MJG - make redrawTitle compute rect once and use in xForTitle and yForTitle to save possible extra computation
c3_chart_internal_fn.redrawTitle = function () {
    var $$ = this;
    if ($$.title.node().textContent) {  // MJG - only bother working out title position if title has content
        var textRect = $$.getTextRect($$.title.node().textContent, $$.CLASS.title, $$.title.node());

        $$.title
              .attr("x", $$.xForTitle.bind($$, textRect))
              .attr("y", $$.yForTitle.bind($$, textRect));
    }
};
c3_chart_internal_fn.xForTitle = function (preComputed) {
    var $$ = this, config = $$.config, position = config.title_position || 'left', x;
    if (position.indexOf('right') >= 0) {
        x = $$.currentWidth - (preComputed || $$.getTextRect($$.title.node().textContent, $$.CLASS.title, $$.title.node())).width - config.title_padding.right;
    } else if (position.indexOf('center') >= 0) {
        x = ($$.currentWidth - (preComputed || $$.getTextRect($$.title.node().textContent, $$.CLASS.title, $$.title.node())).width) / 2;
    } else { // left
        x = config.title_padding.left;
    }
    return x;
};
c3_chart_internal_fn.yForTitle = function (preComputed) {
    var $$ = this;
    return $$.config.title_padding.top + (preComputed || $$.getTextRect($$.title.node().textContent, $$.CLASS.title, $$.title.node())).height;
};
// MJG to Here
c3_chart_internal_fn.getTitlePadding = function() {
    var $$ = this;
    return $$.yForTitle() + $$.config.title_padding.bottom;
};
