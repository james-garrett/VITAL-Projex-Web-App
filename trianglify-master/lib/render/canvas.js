// conditionally load jsdom if we don't have a browser environment available.
var doc = require('./document');

// Canvas rendering method
function render_canvas(polys, opts, canvas) {
  // check for canvas support
  var ctx;
  if (typeof process !== "undefined") {
    try {
      require('canvas');
    } catch (e) {
      throw Error('The optional node-canvas dependency is needed for Trianglify to render using canvas in node.');
    }
  }

  if (!canvas) {
    canvas = doc.createElement('canvas');
  }

  canvas.setAttribute('width', opts.width);
  canvas.setAttribute('height', opts.height);
  ctx = canvas.getContext("2d");
  ctx.canvas.width = opts.width;
  ctx.canvas.height = opts.height;

  polys.forEach(function(poly) {
    ctx.fillStyle = ctx.strokeStyle = poly[0];
    ctx.lineWidth = opts.stroke_width;
    ctx.beginPath();
    ctx.moveTo.apply(ctx, poly[1][0]);
    ctx.lineTo.apply(ctx, poly[1][1]);
    ctx.lineTo.apply(ctx, poly[1][2]);
    ctx.fill();
    ctx.stroke();
  });

  return canvas;
}

module.exports = render_canvas;
