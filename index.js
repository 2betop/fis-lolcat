var x256 = require('x256');

String.prototype.segment = function(length, offset) {
    "use strict";
    var output = [];
    // Make sure offset < length, then move the pointer to that position
    var position = offset % length - length;
    for (; position < this.length;) output.push(this.slice(Math.max(0, position), position += length));
    return output;
}

function lolcat(string, seed) {
    if (lolcat.disabled) {
      return string;
    }

    var segmentLength = 11;
    var spread = 3;
    var freq = 0.1;
    seed = seed || (Math.random() * 20);
    // Make tabs display as spaces
    var output = string.replace(/\t/g, "        ").split("\n");
    var color, string;
    for (var line = 0; line < output.length; line++) {
        output[line] = output[line].segment(segmentLength, line * spread + 2);
        for (var segment = 0; segment < output[line].length; segment++) {
            string = output[line][segment];
            color = rainbow(freq, (segment - line - seed) * spread);
            output[line][segment] = color + 'm' + string;
        }
        output[line] = output[line].join("");
    }
    return output.join("\n") + '\x1b[0m';
}

// Ported directly from lol.rb:rainbow
function rainbow(freq, i) {
    var red = Math.round(Math.sin(freq * i + 0) * 127 + 128);
    var green = Math.round(Math.sin(freq * i + 2 * Math.PI / 3) * 127 + 128);
    var blue = Math.round(Math.sin(freq * i + 4 * Math.PI / 3) * 127 + 128);
    var ix = x256(red, green, blue);
    return '\x1b[38;5;' + ix;
}

lolcat.disabled = process.platform.indexOf('win') === 0;

module.exports = lolcat;
