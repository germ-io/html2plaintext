var decode = require('he').decode;
var plumb = require('plumb');

// "private" helper for ensuring html entities are properly escaped
function _escapeHtml (input) {
  return String(input)
   .replace(/&/g, '&amp;')
   .replace(/</g, '&lt;')
   .replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;')
   .replace(/'/g, '&#039;');
 }

function stripStylesAndScripts(str) {
  var div = document.createElement('div');
  div.innerHTML = str;

  div.querySelectorAll('script').forEach((e) => e.remove() );
  div.querySelectorAll('style').forEach((e) => e.remove() );
  return div.innerHTML;
}

function stringify(x) {
  if (x === null || x === undefined) {
    return ''
  };

  return String(x);
}

function collapseWhitespace (val) {
  var output = val.replace(/\s+/g, ' ');
  return output;
}

function linebreaks (str) {
  var output = str.replace(/<\s?(p|br)[^<]*>/gi, function (x, tag) {
    switch (tag.toLowerCase()) {
      case 'p':
        return '\n\n';
      case 'br':
        return '\n';
    }

    return x;
  });

  return output;
}

function stripCssConditionalComment (str) {
  return str.replace(/<!--\[if.*?<!\[endif\]-->/g, '');
}

function stripTags (str) {
  return str.replace(/<[^<]+>/g, '');
}

function trim (str) {
  return str.trim();
}


module.exports = plumb(
  stringify,
  stripStylesAndScripts,
  listOrdered,
  listUnordered,
  collapseWhitespace,
  linebreaks,
  stripCssConditionalComment,
  stripTags,
  decode,
  trim
);
