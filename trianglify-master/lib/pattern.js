/*
 * Pattern.js
 * Contains rendering implementations for trianglify-generated geometry
 */
function Pattern(polys, opts, generationFn) {
  this.polys = polys;
  this.opts = opts;
  this.generationFn = generationFn;
}

Pattern.prototype.render = function(renderFn, args) {
  if (typeof renderFn === 'function') {
    return renderFn(this.polys, this.opts);
  } else if (renderFn === 'canvas') {
    return this.canvas(args);
  } else if (renderFn === 'png') {
    return this.png(args);
  } else if (renderFn === 'svg') {
    return this.svg(args);
  }
};

Pattern.prototype.recalculate = function(opts) {
  this.polys = this.generationFn(Object.assign(this.opts, opts));
};

Pattern.prototype.canvas = function(canvas) {
  var canvas_fn = require('./render/canvas');
  return canvas_fn(this.polys, this.opts, canvas);
};

Pattern.prototype.png = function(canvas) {
  var png_fn = require('./render/png');
  return png_fn(this.polys, this.opts, canvas);
};

Pattern.prototype.svg = function(svgOpts) {
  var svg_fn = require('./render/svg');
  return svg_fn(this.polys, this.opts, svgOpts);
};

module.exports = Pattern;
