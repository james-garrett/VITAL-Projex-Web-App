var render_canvas = require('./canvas');

// PNG rendering method
// currently returns a data url as a string since toBlob support really isn't there yet...
function render_png(polys, opts, canvas) {
  return render_canvas(polys, opts, canvas).toDataURL("image/png");
}

module.exports = render_png;
