// conditionally load jsdom if we don't have a browser environment available.
var doc = require('./document');

// SVG rendering method
function render_svg(polys, opts, svgOpts) {
  var svg = doc.createElementNS("http://www.w3.org/2000/svg", 'svg');
  svg.setAttribute('width', opts.width);
  svg.setAttribute('height', opts.height);
  if (svgOpts && svgOpts.includeNamespace) {
    svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
  }

  polys.forEach(function(poly) {
    var path = doc.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute("d", "M" + poly[1].join("L") + "Z");
    path.setAttribute("fill", poly[0]);
    path.setAttribute("stroke", poly[0]);
    path.setAttribute("stroke-width", opts.stroke_width);
    svg.appendChild(path);
  });

  return svg;
}

module.exports = render_svg;
