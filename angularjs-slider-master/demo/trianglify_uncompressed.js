! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var r;
        r = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, r.Trianglify = e()
    }
}(function() {
    var e;
    return function r(e, n, t) {
        function f(a, i) {
            if (!n[a]) {
                if (!e[a]) {
                    var u = "function" == typeof require && require;
                    if (!i && u) return u(a, !0);
                    if (o) return o(a, !0);
                    var c = new Error("Cannot find module '" + a + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var s = n[a] = {
                    exports: {}
                };
                e[a][0].call(s.exports, function(r) {
                    var n = e[a][1][r];
                    return f(n ? n : r)
                }, s, s.exports, r, e, n, t)
            }
            return n[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < t.length; a++) f(t[a]);
        return f
    }({
        "./lib/trianglify.js": [function(e, r) {
            function n(e) {
                function r(e, r, n) {
                    return (e - r[0]) * (n[1] - n[0]) / (r[1] - r[0]) + n[0]
                }

                function n(e) {
                    return {
                        x: (e[0][0] + e[1][0] + e[2][0]) / 3,
                        y: (e[0][1] + e[1][1] + e[2][1]) / 3
                    }
                }

                function a() {
                    if (e.palette instanceof Array) return e.palette[Math.floor(d() * e.palette.length)];
                    var r = Object.keys(e.palette);
                    return e.palette[r[Math.floor(d() * r.length)]]
                }

                function s(e, r) {
                    var n = {};
                    for (var t in e) n[t] = e[t];
                    for (t in r) {
                        if (!e.hasOwnProperty(t)) throw new Error(t + " is not a configuration option for Trianglify. Check your spelling?");
                        n[t] = r[t]
                    }
                    return n
                }
                var d;
                if (e = s(c, e), d = f(e.seed), "random" === e.x_colors && (e.x_colors = a()), "random" === e.y_colors && (e.y_colors = a()), "match_x" === e.y_colors && (e.y_colors = e.x_colors), !(e.width > 0 && e.height > 0)) throw new Error("Width and height must be numbers greater than 0");
                if (e.cell_size < 2) throw new Error("Cell size must be greater than 2.");
                var l;
                if (e.color_function) l = function(r, n) {
                    return o(e.color_function(r, n))
                };
                else {
                    var b = o.scale(e.x_colors).mode(e.color_space),
                        h = o.scale(e.y_colors).mode(e.color_space);
                    l = function(r, n) {
                        return o.interpolate(b(r), h(n), .5, e.color_space)
                    }
                }
                for (var g = e.width, p = e.height, m = Math.floor((g + 4 * e.cell_size) / e.cell_size), y = Math.floor((p + 4 * e.cell_size) / e.cell_size), v = (m * e.cell_size - g) / 2, w = (y * e.cell_size - p) / 2, x = e.cell_size * e.variance / 2, _ = function(e) {
                        return r(e, [-v, g + v], [0, 1])
                    }, k = function(e) {
                        return r(e, [-w, p + w], [0, 1])
                    }, j = e.points || i(g, p, v, w, e.cell_size, x, d), M = t.triangulate(j), q = [], C = function(e) {
                        return j[e]
                    }, N = 0; N < M.length; N += 3) {
                    var U = [M[N], M[N + 1], M[N + 2]].map(C),
                        A = n(U),
                        P = l(_(A.x), k(A.y)).hex();
                    q.push([P, U])
                }
                return u(q, e)
            }
            var t = e("delaunay-fast"),
                f = e("seedrandom"),
                o = e("chroma-js"),
                a = e("./colorbrewer"),
                i = e("./points"),
                u = e("./pattern"),
                c = {
                    width: 600,
                    height: 400,
                    cell_size: 75,
                    variance: .75,
                    seed: null,
                    x_colors: "random",
                    y_colors: "match_x",
                    palette: a,
                    color_space: "lab",
                    color_function: null,
                    stroke_width: 1.51,
                    points: void 0
                };
            n.colorbrewer = a, n.defaults = c, r.exports = n
        }, {
            "./colorbrewer": "/Users/qrohlf/Code/trianglify/lib/colorbrewer.js",
            "./pattern": "/Users/qrohlf/Code/trianglify/lib/pattern.js",
            "./points": "/Users/qrohlf/Code/trianglify/lib/points.js",
            "chroma-js": "/Users/qrohlf/Code/trianglify/node_modules/chroma-js/chroma.js",
            "delaunay-fast": "/Users/qrohlf/Code/trianglify/node_modules/delaunay-fast/delaunay.js",
            seedrandom: "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/index.js"
        }],
        "/Users/qrohlf/Code/trianglify/lib/colorbrewer.js": [function(e, r) {
            r.exports = {
                YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
                YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
                GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
                BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
                PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
                PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
                BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
                RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
                PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
                OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
                YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
                YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
                Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
                Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
                Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
                Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
                Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
                Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
                PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
                BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
                PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
                PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
                RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
                RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
                RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
                Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
                RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]
            }
        }, {}],
        "/Users/qrohlf/Code/trianglify/lib/pattern.js": [function(e, r) {
            (function(n) {
                function t(r, t) {
                    function o(e) {
                        var n = f.createElementNS("http://www.w3.org/2000/svg", "svg");
                        return n.setAttribute("width", t.width), n.setAttribute("height", t.height), e && e.includeNamespace && n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), r.forEach(function(e) {
                            var r = f.createElementNS("http://www.w3.org/2000/svg", "path");
                            r.setAttribute("d", "M" + e[1].join("L") + "Z"), r.setAttribute("fill", e[0]), r.setAttribute("stroke", e[0]), r.setAttribute("stroke-width", t.stroke_width), n.appendChild(r)
                        }), n
                    }

                    function a(o) {
                        var a;
                        if ("undefined" != typeof n) try {
                            e("canvas")
                        } catch (i) {
                            throw Error("The optional node-canvas dependency is needed for Trianglify to render using canvas in node.")
                        }
                        return o || (o = f.createElement("canvas")), o.setAttribute("width", t.width), o.setAttribute("height", t.height), a = o.getContext("2d"), a.canvas.width = t.width, a.canvas.height = t.height, r.forEach(function(e) {
                            a.fillStyle = a.strokeStyle = e[0], a.lineWidth = t.stroke_width, a.beginPath(), a.moveTo.apply(a, e[1][0]), a.lineTo.apply(a, e[1][1]), a.lineTo.apply(a, e[1][2]), a.fill(), a.stroke()
                        }), o
                    }

                    function i() {
                        return a().toDataURL("image/png")
                    }
                    return {
                        polys: r,
                        opts: t,
                        svg: o,
                        canvas: a,
                        png: i
                    }
                }
                var f = "undefined" != typeof document ? document : e("jsdom").jsdom("<html/>");
                r.exports = t
            }).call(this, e("_process"))
        }, {
            _process: "/Users/qrohlf/Code/trianglify/node_modules/process/browser.js",
            canvas: "/Users/qrohlf/Code/trianglify/node_modules/browser-resolve/empty.js",
            jsdom: "/Users/qrohlf/Code/trianglify/node_modules/browser-resolve/empty.js"
        }],
        "/Users/qrohlf/Code/trianglify/lib/points.js": [function(e, r) {
            function n(e, r, n, t, f, o, a) {
                for (var i = e + n, u = r + t, c = .5 * f, s = 2 * o, d = -o, l = [], b = -n; i > b; b += f)
                    for (var h = -t; u > h; h += f) {
                        var g = b + c + (a() * s + d),
                            p = h + c + (a() * s + d);
                        l.push([Math.floor(g), Math.floor(p)])
                    }
                return l
            }
            r.exports = n
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/browser-resolve/empty.js": [function() {}, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/chroma-js/chroma.js": [function(r, n, t) {
            (function() {
                var r, f, o, a, i, u, c, s, d, l, b, h, g, p, m, y, v, w, x, _, k, j, M, q, C, N, U, A, P, G, E, z, B, I, R, S, O, T, Y;
                l = function(e, n, t, f) {
                    return new r(e, n, t, f)
                }, "undefined" != typeof n && null !== n && null != n.exports && (n.exports = l), "function" == typeof e && e.amd ? e([], function() {
                    return l
                }) : (I = "undefined" != typeof t && null !== t ? t : this, I.chroma = l), l.color = function(e, n, t, f) {
                    return new r(e, n, t, f)
                }, l.hsl = function(e, n, t, f) {
                    return new r(e, n, t, f, "hsl")
                }, l.hsv = function(e, n, t, f) {
                    return new r(e, n, t, f, "hsv")
                }, l.rgb = function(e, n, t, f) {
                    return new r(e, n, t, f, "rgb")
                }, l.hex = function(e) {
                    return new r(e)
                }, l.css = function(e) {
                    return new r(e)
                }, l.lab = function(e, n, t) {
                    return new r(e, n, t, "lab")
                }, l.lch = function(e, n, t) {
                    return new r(e, n, t, "lch")
                }, l.hsi = function(e, n, t) {
                    return new r(e, n, t, "hsi")
                }, l.gl = function(e, n, t, f) {
                    return new r(255 * e, 255 * n, 255 * t, f, "gl")
                }, l.interpolate = function(e, n, t, f) {
                    return null == e || null == n ? "#000" : ("string" === R(e) && (e = new r(e)), "string" === R(n) && (n = new r(n)), e.interpolate(t, n, f))
                }, l.mix = l.interpolate, l.contrast = function(e, n) {
                    var t, f;
                    return "string" === R(e) && (e = new r(e)), "string" === R(n) && (n = new r(n)), t = e.luminance(), f = n.luminance(), t > f ? (t + .05) / (f + .05) : (f + .05) / (t + .05)
                }, l.luminance = function(e) {
                    return l(e).luminance()
                }, l._Color = r, r = function() {
                    function e() {
                        var e, r, n, t, f, o, a, i, u, c, s, d, l, h, g, p;
                        for (f = this, n = [], c = 0, s = arguments.length; s > c; c++) r = arguments[c], null != r && n.push(r);
                        if (0 === n.length) d = [255, 0, 255, 1, "rgb"], a = d[0], i = d[1], u = d[2], e = d[3], t = d[4];
                        else if ("array" === R(n[0])) {
                            if (3 === n[0].length) l = n[0], a = l[0], i = l[1], u = l[2], e = 1;
                            else {
                                if (4 !== n[0].length) throw "unknown input argument";
                                h = n[0], a = h[0], i = h[1], u = h[2], e = h[3]
                            }
                            t = null != (g = n[1]) ? g : "rgb"
                        } else "string" === R(n[0]) ? (a = n[0], t = "hex") : "object" === R(n[0]) ? (p = n[0]._rgb, a = p[0], i = p[1], u = p[2], e = p[3], t = "rgb") : n.length >= 3 && (a = n[0], i = n[1], u = n[2]);
                        3 === n.length ? (t = "rgb", e = 1) : 4 === n.length ? "string" === R(n[3]) ? (t = n[3], e = 1) : "number" === R(n[3]) && (t = "rgb", e = n[3]) : 5 === n.length && (e = n[3], t = n[4]), null == e && (e = 1), "rgb" === t ? f._rgb = [a, i, u, e] : "gl" === t ? f._rgb = [255 * a, 255 * i, 255 * u, e] : "hsl" === t ? (f._rgb = v(a, i, u), f._rgb[3] = e) : "hsv" === t ? (f._rgb = w(a, i, u), f._rgb[3] = e) : "hex" === t ? f._rgb = m(a) : "lab" === t ? (f._rgb = _(a, i, u), f._rgb[3] = e) : "lch" === t ? (f._rgb = M(a, i, u), f._rgb[3] = e) : "hsi" === t && (f._rgb = y(a, i, u), f._rgb[3] = e), o = b(f._rgb)
                    }
                    return e.prototype.rgb = function() {
                        return this._rgb.slice(0, 3)
                    }, e.prototype.rgba = function() {
                        return this._rgb
                    }, e.prototype.hex = function() {
                        return U(this._rgb)
                    }, e.prototype.toString = function() {
                        return this.name()
                    }, e.prototype.hsl = function() {
                        return P(this._rgb)
                    }, e.prototype.hsv = function() {
                        return G(this._rgb)
                    }, e.prototype.lab = function() {
                        return E(this._rgb)
                    }, e.prototype.lch = function() {
                        return z(this._rgb)
                    }, e.prototype.hsi = function() {
                        return A(this._rgb)
                    }, e.prototype.gl = function() {
                        return [this._rgb[0] / 255, this._rgb[1] / 255, this._rgb[2] / 255, this._rgb[3]]
                    }, e.prototype.luminance = function(r, n) {
                        var t, f, o, a;
                        return null == n && (n = "rgb"), arguments.length ? (0 === r && (this._rgb = [0, 0, 0, this._rgb[3]]), 1 === r && (this._rgb = [255, 255, 255, this._rgb[3]]), t = C(this._rgb), f = 1e-7, o = 20, a = function(e, t) {
                            var i, u;
                            return u = e.interpolate(.5, t, n), i = u.luminance(), Math.abs(r - i) < f || !o-- ? u : i > r ? a(e, u) : a(u, t)
                        }, this._rgb = (t > r ? a(new e("black"), this) : a(this, new e("white"))).rgba(), this) : C(this._rgb)
                    }, e.prototype.name = function() {
                        var e, r;
                        e = this.hex();
                        for (r in l.colors)
                            if (e === l.colors[r]) return r;
                        return e
                    }, e.prototype.alpha = function(e) {
                        return arguments.length ? (this._rgb[3] = e, this) : this._rgb[3]
                    }, e.prototype.css = function(e) {
                        var r, n, t, f;
                        return null == e && (e = "rgb"), n = this, t = n._rgb, 3 === e.length && t[3] < 1 && (e += "a"), "rgb" === e ? e + "(" + t.slice(0, 3).map(Math.round).join(",") + ")" : "rgba" === e ? e + "(" + t.slice(0, 3).map(Math.round).join(",") + "," + t[3] + ")" : "hsl" === e || "hsla" === e ? (r = n.hsl(), f = function(e) {
                            return Math.round(100 * e) / 100
                        }, r[0] = f(r[0]), r[1] = f(100 * r[1]) + "%", r[2] = f(100 * r[2]) + "%", 4 === e.length && (r[3] = t[3]), e + "(" + r.join(",") + ")") : void 0
                    }, e.prototype.interpolate = function(r, n, t) {
                        var f, o, a, i, u, c, s, d, l, b, h, g, p, m;
                        if (d = this, null == t && (t = "rgb"), "string" === R(n) && (n = new e(n)), "hsl" === t || "hsv" === t || "lch" === t || "hsi" === t) "hsl" === t ? (p = d.hsl(), m = n.hsl()) : "hsv" === t ? (p = d.hsv(), m = n.hsv()) : "hsi" === t ? (p = d.hsi(), m = n.hsi()) : "lch" === t && (p = d.lch(), m = n.lch()), "h" === t.substr(0, 1) ? (a = p[0], h = p[1], c = p[2], i = m[0], g = m[1], s = m[2]) : (c = p[0], h = p[1], a = p[2], s = m[0], g = m[1], i = m[2]), isNaN(a) || isNaN(i) ? isNaN(a) ? isNaN(i) ? o = Number.NaN : (o = i, 1 !== c && 0 !== c || "hsv" === t || (b = g)) : (o = a, 1 !== s && 0 !== s || "hsv" === t || (b = h)) : (f = i > a && i - a > 180 ? i - (a + 360) : a > i && a - i > 180 ? i + 360 - a : i - a, o = a + r * f), null == b && (b = h + r * (g - h)), u = c + r * (s - c), l = "h" === t.substr(0, 1) ? new e(o, b, u, t) : new e(u, b, o, t);
                        else if ("rgb" === t) p = d._rgb, m = n._rgb, l = new e(p[0] + r * (m[0] - p[0]), p[1] + r * (m[1] - p[1]), p[2] + r * (m[2] - p[2]), t);
                        else {
                            if ("lab" !== t) throw "color mode " + t + " is not supported";
                            p = d.lab(), m = n.lab(), l = new e(p[0] + r * (m[0] - p[0]), p[1] + r * (m[1] - p[1]), p[2] + r * (m[2] - p[2]), t)
                        }
                        return l.alpha(d.alpha() + r * (n.alpha() - d.alpha())), l
                    }, e.prototype.premultiply = function() {
                        var e, r;
                        return r = this.rgb(), e = this.alpha(), l(r[0] * e, r[1] * e, r[2] * e, e)
                    }, e.prototype.darken = function(e) {
                        var r, n;
                        return null == e && (e = 20), n = this, r = n.lch(), r[0] -= e, l.lch(r).alpha(n.alpha())
                    }, e.prototype.darker = function(e) {
                        return this.darken(e)
                    }, e.prototype.brighten = function(e) {
                        return null == e && (e = 20), this.darken(-e)
                    }, e.prototype.brighter = function(e) {
                        return this.brighten(e)
                    }, e.prototype.saturate = function(e) {
                        var r, n;
                        return null == e && (e = 20), n = this, r = n.lch(), r[1] += e, l.lch(r).alpha(n.alpha())
                    }, e.prototype.desaturate = function(e) {
                        return null == e && (e = 20), this.saturate(-e)
                    }, e
                }(), b = function(e) {
                    var r;
                    for (r in e) 3 > r ? (e[r] < 0 && (e[r] = 0), e[r] > 255 && (e[r] = 255)) : 3 === r && (e[r] < 0 && (e[r] = 0), e[r] > 1 && (e[r] = 1));
                    return e
                }, p = function(e) {
                    var r, n, t, f, o, a, i, u;
                    if (e = e.toLowerCase(), null != l.colors && l.colors[e]) return m(l.colors[e]);
                    if (t = e.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
                        for (f = t.slice(1, 4), n = o = 0; 2 >= o; n = ++o) f[n] = +f[n];
                        f[3] = 1
                    } else if (t = e.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/))
                        for (f = t.slice(1, 5), n = a = 0; 3 >= a; n = ++a) f[n] = +f[n];
                    else if (t = e.match(/rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
                        for (f = t.slice(1, 4), n = i = 0; 2 >= i; n = ++i) f[n] = Math.round(2.55 * f[n]);
                        f[3] = 1
                    } else if (t = e.match(/rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
                        for (f = t.slice(1, 5), n = u = 0; 2 >= u; n = ++u) f[n] = Math.round(2.55 * f[n]);
                        f[3] = +f[3]
                    } else(t = e.match(/hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) ? (r = t.slice(1, 4), r[1] *= .01, r[2] *= .01, f = v(r), f[3] = 1) : (t = e.match(/hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) && (r = t.slice(1, 4), r[1] *= .01, r[2] *= .01, f = v(r), f[3] = +t[4]);
                    return f
                }, m = function(e) {
                    var r, n, t, f, o, a;
                    if (e.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) return (4 === e.length || 7 === e.length) && (e = e.substr(1)), 3 === e.length && (e = e.split(""), e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), a = parseInt(e, 16), f = a >> 16, t = a >> 8 & 255, n = 255 & a, [f, t, n, 1];
                    if (e.match(/^#?([A-Fa-f0-9]{8})$/)) return 9 === e.length && (e = e.substr(1)), a = parseInt(e, 16), f = a >> 24 & 255, t = a >> 16 & 255, n = a >> 8 & 255, r = 255 & a, [f, t, n, r];
                    if (o = p(e)) return o;
                    throw "unknown color: " + e
                }, y = function(e, r, n) {
                    var t, f, i, u;
                    return u = S(arguments), e = u[0], r = u[1], n = u[2], e /= 360, 1 / 3 > e ? (t = (1 - r) / 3, i = (1 + r * g(a * e) / g(o - a * e)) / 3, f = 1 - (t + i)) : 2 / 3 > e ? (e -= 1 / 3, i = (1 - r) / 3, f = (1 + r * g(a * e) / g(o - a * e)) / 3, t = 1 - (i + f)) : (e -= 2 / 3, f = (1 - r) / 3, t = (1 + r * g(a * e) / g(o - a * e)) / 3, i = 1 - (f + t)), i = q(n * i * 3), f = q(n * f * 3), t = q(n * t * 3), [255 * i, 255 * f, 255 * t]
                }, v = function() {
                    var e, r, n, t, f, o, a, i, u, c, s, d, l, b;
                    if (l = S(arguments), t = l[0], i = l[1], o = l[2], 0 === i) a = n = e = 255 * o;
                    else {
                        for (s = [0, 0, 0], r = [0, 0, 0], c = .5 > o ? o * (1 + i) : o + i - o * i, u = 2 * o - c, t /= 360, s[0] = t + 1 / 3, s[1] = t, s[2] = t - 1 / 3, f = d = 0; 2 >= d; f = ++d) s[f] < 0 && (s[f] += 1), s[f] > 1 && (s[f] -= 1), r[f] = 6 * s[f] < 1 ? u + 6 * (c - u) * s[f] : 2 * s[f] < 1 ? c : 3 * s[f] < 2 ? u + (c - u) * (2 / 3 - s[f]) * 6 : u;
                        b = [Math.round(255 * r[0]), Math.round(255 * r[1]), Math.round(255 * r[2])], a = b[0], n = b[1], e = b[2]
                    }
                    return [a, n, e]
                }, w = function() {
                    var e, r, n, t, f, o, a, i, u, c, s, d, l, b, h, g, p, m;
                    if (d = S(arguments), t = d[0], u = d[1], s = d[2], s *= 255, 0 === u) i = n = e = s;
                    else switch (360 === t && (t = 0), t > 360 && (t -= 360), 0 > t && (t += 360), t /= 60, f = Math.floor(t), r = t - f, o = s * (1 - u), a = s * (1 - u * r), c = s * (1 - u * (1 - r)), f) {
                        case 0:
                            l = [s, c, o], i = l[0], n = l[1], e = l[2];
                            break;
                        case 1:
                            b = [a, s, o], i = b[0], n = b[1], e = b[2];
                            break;
                        case 2:
                            h = [o, s, c], i = h[0], n = h[1], e = h[2];
                            break;
                        case 3:
                            g = [o, a, s], i = g[0], n = g[1], e = g[2];
                            break;
                        case 4:
                            p = [c, o, s], i = p[0], n = p[1], e = p[2];
                            break;
                        case 5:
                            m = [s, o, a], i = m[0], n = m[1], e = m[2]
                    }
                    return i = Math.round(i), n = Math.round(n), e = Math.round(e), [i, n, e]
                }, f = 18, i = .95047, u = 1, c = 1.08883, x = function() {
                    var e, r, n, t, f, o;
                    return o = S(arguments), f = o[0], e = o[1], r = o[2], n = Math.sqrt(e * e + r * r), t = Math.atan2(r, e) / Math.PI * 180, [f, n, t]
                }, _ = function(e, r, n) {
                    var t, f, o, a, s, d, l;
                    return void 0 !== e && 3 === e.length && (d = e, e = d[0], r = d[1], n = d[2]), void 0 !== e && 3 === e.length && (l = e, e = l[0], r = l[1], n = l[2]), a = (e + 16) / 116, o = a + r / 500, s = a - n / 200, o = k(o) * i, a = k(a) * u, s = k(s) * c, f = T(3.2404542 * o - 1.5371385 * a - .4985314 * s), t = T(-.969266 * o + 1.8760108 * a + .041556 * s), n = T(.0556434 * o - .2040259 * a + 1.0572252 * s), [q(f, 0, 255), q(t, 0, 255), q(n, 0, 255), 1]
                }, k = function(e) {
                    return e > .206893034 ? e * e * e : (e - 4 / 29) / 7.787037
                }, T = function(e) {
                    return Math.round(255 * (.00304 >= e ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - .055))
                }, j = function() {
                    var e, r, n, t;
                    return t = S(arguments), n = t[0], e = t[1], r = t[2], r = r * Math.PI / 180, [n, Math.cos(r) * e, Math.sin(r) * e]
                }, M = function(e, r, n) {
                    var t, f, o, a, i, u, c;
                    return u = j(e, r, n), t = u[0], f = u[1], o = u[2], c = _(t, f, o), i = c[0], a = c[1], o = c[2], [q(i, 0, 255), q(a, 0, 255), q(o, 0, 255)]
                }, C = function(e, r, n) {
                    var t;
                    return t = S(arguments), e = t[0], r = t[1], n = t[2], e = N(e), r = N(r), n = N(n), .2126 * e + .7152 * r + .0722 * n
                }, N = function(e) {
                    return e /= 255, .03928 >= e ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
                }, U = function() {
                    var e, r, n, t, f, o;
                    return o = S(arguments), n = o[0], r = o[1], e = o[2], f = n << 16 | r << 8 | e, t = "000000" + f.toString(16), "#" + t.substr(t.length - 6)
                }, A = function() {
                    var e, r, n, t, f, o, a, i, u;
                    return u = S(arguments), a = u[0], n = u[1], r = u[2], e = 2 * Math.PI, a /= 255, n /= 255, r /= 255, o = Math.min(a, n, r), f = (a + n + r) / 3, i = 1 - o / f, 0 === i ? t = 0 : (t = (a - n + (a - r)) / 2, t /= Math.sqrt((a - n) * (a - n) + (a - r) * (n - r)), t = Math.acos(t), r > n && (t = e - t), t /= e), [360 * t, i, f]
                }, P = function(e, r, n) {
                    var t, f, o, a, i, u;
                    return void 0 !== e && e.length >= 3 && (u = e, e = u[0], r = u[1], n = u[2]), e /= 255, r /= 255, n /= 255, a = Math.min(e, r, n), o = Math.max(e, r, n), f = (o + a) / 2, o === a ? (i = 0, t = Number.NaN) : i = .5 > f ? (o - a) / (o + a) : (o - a) / (2 - o - a), e === o ? t = (r - n) / (o - a) : r === o ? t = 2 + (n - e) / (o - a) : n === o && (t = 4 + (e - r) / (o - a)), t *= 60, 0 > t && (t += 360), [t, i, f]
                }, G = function() {
                    var e, r, n, t, f, o, a, i, u, c;
                    return c = S(arguments), a = c[0], n = c[1], e = c[2], o = Math.min(a, n, e), f = Math.max(a, n, e), r = f - o, u = f / 255, 0 === f ? (t = Number.NaN, i = 0) : (i = r / f, a === f && (t = (n - e) / r), n === f && (t = 2 + (e - a) / r), e === f && (t = 4 + (a - n) / r), t *= 60, 0 > t && (t += 360)), [t, i, u]
                }, E = function() {
                    var e, r, n, t, f, o, a;
                    return a = S(arguments), n = a[0], r = a[1], e = a[2], n = B(n), r = B(r), e = B(e), t = O((.4124564 * n + .3575761 * r + .1804375 * e) / i), f = O((.2126729 * n + .7151522 * r + .072175 * e) / u), o = O((.0193339 * n + .119192 * r + .9503041 * e) / c), [116 * f - 16, 500 * (t - f), 200 * (f - o)]
                }, B = function(e) {
                    return (e /= 255) <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
                }, O = function(e) {
                    return e > .008856 ? Math.pow(e, 1 / 3) : 7.787037 * e + 4 / 29
                }, z = function() {
                    var e, r, n, t, f, o, a;
                    return o = S(arguments), f = o[0], n = o[1], r = o[2], a = E(f, n, r), t = a[0], e = a[1], r = a[2], x(t, e, r)
                }, l.scale = function(e, r) {
                    var n, t, f, o, a, i, u, c, s, d, b, h, g, p, m, y, v, w, x, _, k;
                    return y = "rgb", v = l("#ccc"), k = 0, g = !1, h = [0, 1], d = [], x = !1, _ = [], m = 0, p = 1, b = !1, w = 0, s = {}, i = function(e, r) {
                        var n, t, f, o, i, u, c;
                        if (null == e && (e = ["#ddd", "#222"]), null != e && "string" === R(e) && null != (null != (i = l.brewer) ? i[e] : void 0) && (e = l.brewer[e]), "array" === R(e)) {
                            for (e = e.slice(0), n = f = 0, u = e.length - 1; u >= 0 ? u >= f : f >= u; n = u >= 0 ? ++f : --f) t = e[n], "string" === R(t) && (e[n] = l(t));
                            if (null != r) _ = r;
                            else
                                for (_ = [], n = o = 0, c = e.length - 1; c >= 0 ? c >= o : o >= c; n = c >= 0 ? ++o : --o) _.push(n / (e.length - 1))
                        }
                        return a(), d = e
                    }, u = function(e) {
                        return null == e && (e = []), h = e, m = e[0], p = e[e.length - 1], a(), w = 2 === e.length ? 0 : e.length - 1
                    }, f = function(e) {
                        var r, n;
                        if (null != h) {
                            for (n = h.length - 1, r = 0; n > r && e >= h[r];) r++;
                            return r - 1
                        }
                        return 0
                    }, c = function(e) {
                        return e
                    }, n = function(e) {
                        var r, n, t, o, a;
                        return a = e, h.length > 2 && (o = h.length - 1, r = f(e), t = h[0] + (h[1] - h[0]) * (0 + .5 * k), n = h[o - 1] + (h[o] - h[o - 1]) * (1 - .5 * k), a = m + (h[r] + .5 * (h[r + 1] - h[r]) - t) / (n - t) * (p - m)), a
                    }, o = function(e, r) {
                        var n, t, o, a, i, u, b, g, x;
                        if (null == r && (r = !1), isNaN(e)) return v;
                        if (r ? b = e : h.length > 2 ? (n = f(e), b = n / (w - 1)) : (b = o = m !== p ? (e - m) / (p - m) : 0, b = o = (e - m) / (p - m), b = Math.min(1, Math.max(0, b))), r || (b = c(b)), i = Math.floor(1e4 * b), s[i]) t = s[i];
                        else {
                            if ("array" === R(d))
                                for (a = g = 0, x = _.length - 1; x >= 0 ? x >= g : g >= x; a = x >= 0 ? ++g : --g) {
                                    if (u = _[a], u >= b) {
                                        t = d[a];
                                        break
                                    }
                                    if (b >= u && a === _.length - 1) {
                                        t = d[a];
                                        break
                                    }
                                    if (b > u && b < _[a + 1]) {
                                        b = (b - u) / (_[a + 1] - u), t = l.interpolate(d[a], d[a + 1], b, y);
                                        break
                                    }
                                } else "function" === R(d) && (t = d(b));
                            s[i] = t
                        }
                        return t
                    }, a = function() {
                        return s = {}
                    }, i(e, r), t = function(e) {
                        var r;
                        return r = o(e), x && r[x] ? r[x]() : r
                    }, t.domain = function(e, r, n, f) {
                        var o;
                        return null == n && (n = "e"), arguments.length ? (null != r && (o = l.analyze(e, f), e = 0 === r ? [o.min, o.max] : l.limits(o, n, r)), u(e), t) : h
                    }, t.mode = function(e) {
                        return arguments.length ? (y = e, a(), t) : y
                    }, t.range = function(e, r) {
                        return i(e, r), t
                    }, t.out = function(e) {
                        return x = e, t
                    }, t.spread = function(e) {
                        return arguments.length ? (k = e, t) : k
                    }, t.correctLightness = function(e) {
                        return arguments.length ? (b = e, a(), c = b ? function(e) {
                            var r, n, t, f, a, i, u, c, s;
                            for (r = o(0, !0).lab()[0], n = o(1, !0).lab()[0], u = r > n, t = o(e, !0).lab()[0], a = r + (n - r) * e, f = t - a, c = 0, s = 1, i = 20; Math.abs(f) > .01 && i-- > 0;) ! function() {
                                return u && (f *= -1), 0 > f ? (c = e, e += .5 * (s - e)) : (s = e, e += .5 * (c - e)), t = o(e, !0).lab()[0], f = t - a
                            }();
                            return e
                        } : function(e) {
                            return e
                        }, t) : b
                    }, t.colors = function(r) {
                        var n, f, o, a, i, u;
                        if (null == r && (r = "hex"), e = [], f = [], h.length > 2)
                            for (n = o = 1, u = h.length; u >= 1 ? u > o : o > u; n = u >= 1 ? ++o : --o) f.push(.5 * (h[n - 1] + h[n]));
                        else f = h;
                        for (a = 0, i = f.length; i > a; a++) n = f[a], e.push(t(n)[r]());
                        return e
                    }, t
                }, null == (Y = l.scales) && (l.scales = {}), l.scales.cool = function() {
                    return l.scale([l.hsl(180, 1, .9), l.hsl(250, .7, .4)])
                }, l.scales.hot = function() {
                    return l.scale(["#000", "#f00", "#ff0", "#fff"], [0, .25, .75, 1]).mode("rgb")
                }, l.analyze = function(e, r, n) {
                    var t, f, o, a, i, u, c;
                    if (o = {
                            min: Number.MAX_VALUE,
                            max: -1 * Number.MAX_VALUE,
                            sum: 0,
                            values: [],
                            count: 0
                        }, null == n && (n = function() {
                            return !0
                        }), t = function(e) {
                            null == e || isNaN(e) || (o.values.push(e), o.sum += e, e < o.min && (o.min = e), e > o.max && (o.max = e), o.count += 1)
                        }, i = function(e, f) {
                            return n(e, f) ? null != r && "function" === R(r) ? t(r(e)) : null != r && "string" === R(r) || "number" === R(r) ? t(e[r]) : t(e) : void 0
                        }, "array" === R(e))
                        for (u = 0, c = e.length; c > u; u++) a = e[u], i(a);
                    else
                        for (f in e) a = e[f], i(a, f);
                    return o.domain = [o.min, o.max], o.limits = function(e, r) {
                        return l.limits(o, e, r)
                    }, o
                }, l.limits = function(e, r, n) {
                    var t, f, o, a, i, u, c, s, d, b, h, g, p, m, y, v, w, x, _, k, j, M, q, C, N, U, A, P, G, E, z, B, I, S, O, T, Y, L, F, D, V, X, W, $, Z, H, J, K, Q, er, rr, nr, tr, fr, or, ar;
                    if (null == r && (r = "equal"), null == n && (n = 7), "array" === R(e) && (e = l.analyze(e)), p = e.min, h = e.max, q = e.sum, U = e.values.sort(function(e, r) {
                            return e - r
                        }), b = [], "c" === r.substr(0, 1) && (b.push(p), b.push(h)), "e" === r.substr(0, 1)) {
                        for (b.push(p), c = A = 1, Y = n - 1; Y >= 1 ? Y >= A : A >= Y; c = Y >= 1 ? ++A : --A) b.push(p + c / n * (h - p));
                        b.push(h)
                    } else if ("l" === r.substr(0, 1)) {
                        if (0 >= p) throw "Logarithmic scales are only possible for values > 0";
                        for (m = Math.LOG10E * Math.log(p), g = Math.LOG10E * Math.log(h), b.push(p), c = P = 1, $ = n - 1; $ >= 1 ? $ >= P : P >= $; c = $ >= 1 ? ++P : --P) b.push(Math.pow(10, m + c / n * (g - m)));
                        b.push(h)
                    } else if ("q" === r.substr(0, 1)) {
                        for (b.push(p), c = G = 1, Z = n - 1; Z >= 1 ? Z >= G : G >= Z; c = Z >= 1 ? ++G : --G) _ = U.length * c / n, k = Math.floor(_), k === _ ? b.push(U[k]) : (j = _ - k, b.push(U[k] * j + U[k + 1] * (1 - j)));
                        b.push(h)
                    } else if ("k" === r.substr(0, 1)) {
                        for (v = U.length, t = new Array(v), i = new Array(n), M = !0, w = 0, o = null, o = [], o.push(p), c = E = 1, H = n - 1; H >= 1 ? H >= E : E >= H; c = H >= 1 ? ++E : --E) o.push(p + c / n * (h - p));
                        for (o.push(h); M;) {
                            for (s = z = 0, J = n - 1; J >= 0 ? J >= z : z >= J; s = J >= 0 ? ++z : --z) i[s] = 0;
                            for (c = B = 0, K = v - 1; K >= 0 ? K >= B : B >= K; c = K >= 0 ? ++B : --B) {
                                for (N = U[c], y = Number.MAX_VALUE, s = I = 0, Q = n - 1; Q >= 0 ? Q >= I : I >= Q; s = Q >= 0 ? ++I : --I) u = Math.abs(o[s] - N), y > u && (y = u, f = s);
                                i[f]++, t[c] = f
                            }
                            for (x = new Array(n), s = S = 0, er = n - 1; er >= 0 ? er >= S : S >= er; s = er >= 0 ? ++S : --S) x[s] = null;
                            for (c = O = 0, rr = v - 1; rr >= 0 ? rr >= O : O >= rr; c = rr >= 0 ? ++O : --O) a = t[c], null === x[a] ? x[a] = U[c] : x[a] += U[c];
                            for (s = T = 0, L = n - 1; L >= 0 ? L >= T : T >= L; s = L >= 0 ? ++T : --T) x[s] *= 1 / i[s];
                            for (M = !1, s = nr = 0, F = n - 1; F >= 0 ? F >= nr : nr >= F; s = F >= 0 ? ++nr : --nr)
                                if (x[s] !== o[c]) {
                                    M = !0;
                                    break
                                }
                            o = x, w++, w > 200 && (M = !1)
                        }
                        for (d = {}, s = tr = 0, D = n - 1; D >= 0 ? D >= tr : tr >= D; s = D >= 0 ? ++tr : --tr) d[s] = [];
                        for (c = fr = 0, V = v - 1; V >= 0 ? V >= fr : fr >= V; c = V >= 0 ? ++fr : --fr) a = t[c], d[a].push(U[c]);
                        for (C = [], s = or = 0, X = n - 1; X >= 0 ? X >= or : or >= X; s = X >= 0 ? ++or : --or) C.push(d[s][0]), C.push(d[s][d[s].length - 1]);
                        for (C = C.sort(function(e, r) {
                                return e - r
                            }), b.push(C[0]), c = ar = 1, W = C.length - 1; W >= ar; c = ar += 2) isNaN(C[c]) || b.push(C[c])
                    }
                    return b
                }, l.brewer = d = {
                    OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
                    PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
                    BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
                    Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
                    BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
                    YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
                    YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
                    Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
                    RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
                    Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
                    YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
                    Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
                    GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
                    Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
                    YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
                    PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
                    Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
                    PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
                    Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
                    RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
                    RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
                    PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
                    PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
                    RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
                    BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
                    RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
                    PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
                    Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
                    Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
                    Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
                    Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
                    Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
                    Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
                    Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
                    Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
                }, l.colors = h = {
                    indigo: "#4b0082",
                    gold: "#ffd700",
                    hotpink: "#ff69b4",
                    firebrick: "#b22222",
                    indianred: "#cd5c5c",
                    yellow: "#ffff00",
                    mistyrose: "#ffe4e1",
                    darkolivegreen: "#556b2f",
                    olive: "#808000",
                    darkseagreen: "#8fbc8f",
                    pink: "#ffc0cb",
                    tomato: "#ff6347",
                    lightcoral: "#f08080",
                    orangered: "#ff4500",
                    navajowhite: "#ffdead",
                    lime: "#00ff00",
                    palegreen: "#98fb98",
                    darkslategrey: "#2f4f4f",
                    greenyellow: "#adff2f",
                    burlywood: "#deb887",
                    seashell: "#fff5ee",
                    mediumspringgreen: "#00fa9a",
                    fuchsia: "#ff00ff",
                    papayawhip: "#ffefd5",
                    blanchedalmond: "#ffebcd",
                    chartreuse: "#7fff00",
                    dimgray: "#696969",
                    black: "#000000",
                    peachpuff: "#ffdab9",
                    springgreen: "#00ff7f",
                    aquamarine: "#7fffd4",
                    white: "#ffffff",
                    orange: "#ffa500",
                    lightsalmon: "#ffa07a",
                    darkslategray: "#2f4f4f",
                    brown: "#a52a2a",
                    ivory: "#fffff0",
                    dodgerblue: "#1e90ff",
                    peru: "#cd853f",
                    lawngreen: "#7cfc00",
                    chocolate: "#d2691e",
                    crimson: "#dc143c",
                    forestgreen: "#228b22",
                    darkgrey: "#a9a9a9",
                    lightseagreen: "#20b2aa",
                    cyan: "#00ffff",
                    mintcream: "#f5fffa",
                    silver: "#c0c0c0",
                    antiquewhite: "#faebd7",
                    mediumorchid: "#ba55d3",
                    skyblue: "#87ceeb",
                    gray: "#808080",
                    darkturquoise: "#00ced1",
                    goldenrod: "#daa520",
                    darkgreen: "#006400",
                    floralwhite: "#fffaf0",
                    darkviolet: "#9400d3",
                    darkgray: "#a9a9a9",
                    moccasin: "#ffe4b5",
                    saddlebrown: "#8b4513",
                    grey: "#808080",
                    darkslateblue: "#483d8b",
                    lightskyblue: "#87cefa",
                    lightpink: "#ffb6c1",
                    mediumvioletred: "#c71585",
                    slategrey: "#708090",
                    red: "#ff0000",
                    deeppink: "#ff1493",
                    limegreen: "#32cd32",
                    darkmagenta: "#8b008b",
                    palegoldenrod: "#eee8aa",
                    plum: "#dda0dd",
                    turquoise: "#40e0d0",
                    lightgrey: "#d3d3d3",
                    lightgoldenrodyellow: "#fafad2",
                    darkgoldenrod: "#b8860b",
                    lavender: "#e6e6fa",
                    maroon: "#800000",
                    yellowgreen: "#9acd32",
                    sandybrown: "#f4a460",
                    thistle: "#d8bfd8",
                    violet: "#ee82ee",
                    navy: "#000080",
                    magenta: "#ff00ff",
                    dimgrey: "#696969",
                    tan: "#d2b48c",
                    rosybrown: "#bc8f8f",
                    olivedrab: "#6b8e23",
                    blue: "#0000ff",
                    lightblue: "#add8e6",
                    ghostwhite: "#f8f8ff",
                    honeydew: "#f0fff0",
                    cornflowerblue: "#6495ed",
                    slateblue: "#6a5acd",
                    linen: "#faf0e6",
                    darkblue: "#00008b",
                    powderblue: "#b0e0e6",
                    seagreen: "#2e8b57",
                    darkkhaki: "#bdb76b",
                    snow: "#fffafa",
                    sienna: "#a0522d",
                    mediumblue: "#0000cd",
                    royalblue: "#4169e1",
                    lightcyan: "#e0ffff",
                    green: "#008000",
                    mediumpurple: "#9370db",
                    midnightblue: "#191970",
                    cornsilk: "#fff8dc",
                    paleturquoise: "#afeeee",
                    bisque: "#ffe4c4",
                    slategray: "#708090",
                    darkcyan: "#008b8b",
                    khaki: "#f0e68c",
                    wheat: "#f5deb3",
                    teal: "#008080",
                    darkorchid: "#9932cc",
                    deepskyblue: "#00bfff",
                    salmon: "#fa8072",
                    darkred: "#8b0000",
                    steelblue: "#4682b4",
                    palevioletred: "#db7093",
                    lightslategray: "#778899",
                    aliceblue: "#f0f8ff",
                    lightslategrey: "#778899",
                    lightgreen: "#90ee90",
                    orchid: "#da70d6",
                    gainsboro: "#dcdcdc",
                    mediumseagreen: "#3cb371",
                    lightgray: "#d3d3d3",
                    mediumturquoise: "#48d1cc",
                    lemonchiffon: "#fffacd",
                    cadetblue: "#5f9ea0",
                    lightyellow: "#ffffe0",
                    lavenderblush: "#fff0f5",
                    coral: "#ff7f50",
                    purple: "#800080",
                    aqua: "#00ffff",
                    whitesmoke: "#f5f5f5",
                    mediumslateblue: "#7b68ee",
                    darkorange: "#ff8c00",
                    mediumaquamarine: "#66cdaa",
                    darksalmon: "#e9967a",
                    beige: "#f5f5dc",
                    blueviolet: "#8a2be2",
                    azure: "#f0ffff",
                    lightsteelblue: "#b0c4de",
                    oldlace: "#fdf5e6"
                }, R = function() {
                    var e, r, n, t, f;
                    for (e = {}, f = "Boolean Number String Function Array Date RegExp Undefined Null".split(" "), n = 0, t = f.length; t > n; n++) r = f[n], e["[object " + r + "]"] = r.toLowerCase();
                    return function(r) {
                        var n;
                        return n = Object.prototype.toString.call(r), e[n] || "object"
                    }
                }(), q = function(e, r, n) {
                    return null == r && (r = 0), null == n && (n = 1), r > e && (e = r), e > n && (e = n), e
                }, S = function(e) {
                    return e.length >= 3 ? e : e[0]
                }, a = 2 * Math.PI, o = Math.PI / 3, g = Math.cos, s = function(e) {
                    var r, n, t, f, o, a, i, u, c, d, b;
                    return e = function() {
                        var r, n, t;
                        for (t = [], r = 0, n = e.length; n > r; r++) f = e[r], t.push(l(f));
                        return t
                    }(), 2 === e.length ? (c = function() {
                        var r, n, t;
                        for (t = [], r = 0, n = e.length; n > r; r++) f = e[r], t.push(f.lab());
                        return t
                    }(), o = c[0], a = c[1], r = function(e) {
                        var r, n;
                        return n = function() {
                            var n, t;
                            for (t = [], r = n = 0; 2 >= n; r = ++n) t.push(o[r] + e * (a[r] - o[r]));
                            return t
                        }(), l.lab.apply(l, n)
                    }) : 3 === e.length ? (d = function() {
                        var r, n, t;
                        for (t = [], r = 0, n = e.length; n > r; r++) f = e[r], t.push(f.lab());
                        return t
                    }(), o = d[0], a = d[1], i = d[2], r = function(e) {
                        var r, n;
                        return n = function() {
                            var n, t;
                            for (t = [], r = n = 0; 2 >= n; r = ++n) t.push((1 - e) * (1 - e) * o[r] + 2 * (1 - e) * e * a[r] + e * e * i[r]);
                            return t
                        }(), l.lab.apply(l, n)
                    }) : 4 === e.length ? (b = function() {
                        var r, n, t;
                        for (t = [], r = 0, n = e.length; n > r; r++) f = e[r], t.push(f.lab());
                        return t
                    }(), o = b[0], a = b[1], i = b[2], u = b[3], r = function(e) {
                        var r, n;
                        return n = function() {
                            var n, t;
                            for (t = [], r = n = 0; 2 >= n; r = ++n) t.push((1 - e) * (1 - e) * (1 - e) * o[r] + 3 * (1 - e) * (1 - e) * e * a[r] + 3 * (1 - e) * e * e * i[r] + e * e * e * u[r]);
                            return t
                        }(), l.lab.apply(l, n)
                    }) : 5 === e.length && (n = s(e.slice(0, 3)), t = s(e.slice(2, 5)), r = function(e) {
                        return .5 > e ? n(2 * e) : t(2 * (e - .5))
                    }), r
                }, l.interpolate.bezier = s
            }).call(this)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/delaunay-fast/delaunay.js": [function(e, r) {
            var n;
            ! function() {
                "use strict";

                function e(e) {
                    var r, n, t, f, o, a, i = Number.POSITIVE_INFINITY,
                        u = Number.POSITIVE_INFINITY,
                        c = Number.NEGATIVE_INFINITY,
                        s = Number.NEGATIVE_INFINITY;
                    for (r = e.length; r--;) e[r][0] < i && (i = e[r][0]), e[r][0] > c && (c = e[r][0]), e[r][1] < u && (u = e[r][1]), e[r][1] > s && (s = e[r][1]);
                    return n = c - i, t = s - u, f = Math.max(n, t), o = i + .5 * n, a = u + .5 * t, [
                        [o - 20 * f, a - f],
                        [o, a + 20 * f],
                        [o + 20 * f, a - f]
                    ]
                }

                function t(e, r, n, t) {
                    var f, a, i, u, c, s, d, l, b, h, g = e[r][0],
                        p = e[r][1],
                        m = e[n][0],
                        y = e[n][1],
                        v = e[t][0],
                        w = e[t][1],
                        x = Math.abs(p - y),
                        _ = Math.abs(y - w);
                    if (o > x && o > _) throw new Error("Eek! Coincident points!");
                    return o > x ? (u = -((v - m) / (w - y)), s = (m + v) / 2, l = (y + w) / 2, f = (m + g) / 2, a = u * (f - s) + l) : o > _ ? (i = -((m - g) / (y - p)), c = (g + m) / 2, d = (p + y) / 2, f = (v + m) / 2, a = i * (f - c) + d) : (i = -((m - g) / (y - p)), u = -((v - m) / (w - y)), c = (g + m) / 2, s = (m + v) / 2, d = (p + y) / 2, l = (y + w) / 2, f = (i * c - u * s + l - d) / (i - u), a = x > _ ? i * (f - c) + d : u * (f - s) + l), b = m - f, h = y - a, {
                        i: r,
                        j: n,
                        k: t,
                        x: f,
                        y: a,
                        r: b * b + h * h
                    }
                }

                function f(e) {
                    var r, n, t, f, o, a;
                    for (n = e.length; n;)
                        for (f = e[--n], t = e[--n], r = n; r;)
                            if (a = e[--r], o = e[--r], t === o && f === a || t === a && f === o) {
                                e.splice(n, 2), e.splice(r, 2);
                                break
                            }
                }
                var o = 1 / 1048576;
                n = {
                    triangulate: function(r, n) {
                        var a, i, u, c, s, d, l, b, h, g, p, m, y = r.length;
                        if (3 > y) return [];
                        if (r = r.slice(0), n)
                            for (a = y; a--;) r[a] = r[a][n];
                        for (u = new Array(y), a = y; a--;) u[a] = a;
                        for (u.sort(function(e, n) {
                                return r[n][0] - r[e][0]
                            }), c = e(r), r.push(c[0], c[1], c[2]), s = [t(r, y + 0, y + 1, y + 2)], d = [], l = [], a = u.length; a--; l.length = 0) {
                            for (m = u[a], i = s.length; i--;) b = r[m][0] - s[i].x, b > 0 && b * b > s[i].r ? (d.push(s[i]), s.splice(i, 1)) : (h = r[m][1] - s[i].y, b * b + h * h - s[i].r > o || (l.push(s[i].i, s[i].j, s[i].j, s[i].k, s[i].k, s[i].i), s.splice(i, 1)));
                            for (f(l), i = l.length; i;) p = l[--i], g = l[--i], s.push(t(r, g, p, m))
                        }
                        for (a = s.length; a--;) d.push(s[a]);
                        for (s.length = 0, a = d.length; a--;) d[a].i < y && d[a].j < y && d[a].k < y && s.push(d[a].i, d[a].j, d[a].k);
                        return s
                    },
                    contains: function(e, r) {
                        if (r[0] < e[0][0] && r[0] < e[1][0] && r[0] < e[2][0] || r[0] > e[0][0] && r[0] > e[1][0] && r[0] > e[2][0] || r[1] < e[0][1] && r[1] < e[1][1] && r[1] < e[2][1] || r[1] > e[0][1] && r[1] > e[1][1] && r[1] > e[2][1]) return null;
                        var n = e[1][0] - e[0][0],
                            t = e[2][0] - e[0][0],
                            f = e[1][1] - e[0][1],
                            o = e[2][1] - e[0][1],
                            a = n * o - t * f;
                        if (0 === a) return null;
                        var i = (o * (r[0] - e[0][0]) - t * (r[1] - e[0][1])) / a,
                            u = (n * (r[1] - e[0][1]) - f * (r[0] - e[0][0])) / a;
                        return 0 > i || 0 > u || i + u > 1 ? null : [i, u]
                    }
                }, "undefined" != typeof r && (r.exports = n)
            }()
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/process/browser.js": [function(e, r) {
            function n() {
                if (!a) {
                    a = !0;
                    for (var e, r = o.length; r;) {
                        e = o, o = [];
                        for (var n = -1; ++n < r;) e[n]();
                        r = o.length
                    }
                    a = !1
                }
            }

            function t() {}
            var f = r.exports = {},
                o = [],
                a = !1;
            f.nextTick = function(e) {
                o.push(e), a || setTimeout(n, 0)
            }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = t, f.addListener = t, f.once = t, f.off = t, f.removeListener = t, f.removeAllListeners = t, f.emit = t, f.binding = function() {
                throw new Error("process.binding is not supported")
            }, f.cwd = function() {
                return "/"
            }, f.chdir = function() {
                throw new Error("process.chdir is not supported")
            }, f.umask = function() {
                return 0
            }
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/index.js": [function(e, r) {
            var n = e("./lib/alea"),
                t = e("./lib/xor128"),
                f = e("./lib/xorwow"),
                o = e("./lib/xorshift7"),
                a = e("./lib/xor4096"),
                i = e("./lib/tychei"),
                u = e("./seedrandom");
            u.alea = n, u.xor128 = t, u.xorwow = f, u.xorshift7 = o, u.xor4096 = a, u.tychei = i, r.exports = u
        }, {
            "./lib/alea": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/alea.js",
            "./lib/tychei": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/tychei.js",
            "./lib/xor128": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor128.js",
            "./lib/xor4096": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor4096.js",
            "./lib/xorshift7": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorshift7.js",
            "./lib/xorwow": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorwow.js",
            "./seedrandom": "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/seedrandom.js"
        }],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/alea.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    var r = this,
                        n = a();
                    r.next = function() {
                        var e = 2091639 * r.s0 + 2.3283064365386963e-10 * r.c;
                        return r.s0 = r.s1, r.s1 = r.s2, r.s2 = e - (r.c = 0 | e)
                    }, r.c = 1, r.s0 = n(" "), r.s1 = n(" "), r.s2 = n(" "), r.s0 -= n(e), r.s0 < 0 && (r.s0 += 1), r.s1 -= n(e), r.s1 < 0 && (r.s1 += 1), r.s2 -= n(e), r.s2 < 0 && (r.s2 += 1), n = null
                }

                function f(e, r) {
                    return r.c = e.c, r.s0 = e.s0, r.s1 = e.s1, r.s2 = e.s2, r
                }

                function o(e, r) {
                    var n = new t(e),
                        o = r && r.state,
                        a = n.next;
                    return a.int32 = function() {
                        return 4294967296 * n.next() | 0
                    }, a.double = function() {
                        return a() + 1.1102230246251565e-16 * (2097152 * a() | 0)
                    }, a.quick = a, o && ("object" == typeof o && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }

                function a() {
                    var e = 4022871197,
                        r = function(r) {
                            r = r.toString();
                            for (var n = 0; n < r.length; n++) {
                                e += r.charCodeAt(n);
                                var t = .02519603282416938 * e;
                                e = t >>> 0, t -= e, t *= e, e = t >>> 0, t -= e, e += 4294967296 * t
                            }
                            return 2.3283064365386963e-10 * (e >>> 0)
                        };
                    return r
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.alea = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/tychei.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    var r = this,
                        n = "";
                    r.next = function() {
                        var e = r.b,
                            n = r.c,
                            t = r.d,
                            f = r.a;
                        return e = e << 25 ^ e >>> 7 ^ n, n = n - t | 0, t = t << 24 ^ t >>> 8 ^ f, f = f - e | 0, r.b = e = e << 20 ^ e >>> 12 ^ n, r.c = n = n - t | 0, r.d = t << 16 ^ n >>> 16 ^ f, r.a = f - e | 0
                    }, r.a = 0, r.b = 0, r.c = -1640531527, r.d = 1367130551, e === Math.floor(e) ? (r.a = e / 4294967296 | 0, r.b = 0 | e) : n += e;
                    for (var t = 0; t < n.length + 20; t++) r.b ^= 0 | n.charCodeAt(t), r.next()
                }

                function f(e, r) {
                    return r.a = e.a, r.b = e.b, r.c = e.c, r.d = e.d, r
                }

                function o(e, r) {
                    var n = new t(e),
                        o = r && r.state,
                        a = function() {
                            return (n.next() >>> 0) / 4294967296
                        };
                    return a.double = function() {
                        do var e = n.next() >>> 11,
                            r = (n.next() >>> 0) / 4294967296,
                            t = (e + r) / (1 << 21); while (0 === t);
                        return t
                    }, a.int32 = n.next, a.quick = a, o && ("object" == typeof o && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.tychei = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor128.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    var r = this,
                        n = "";
                    r.x = 0, r.y = 0, r.z = 0, r.w = 0, r.next = function() {
                        var e = r.x ^ r.x << 11;
                        return r.x = r.y, r.y = r.z, r.z = r.w, r.w ^= r.w >>> 19 ^ e ^ e >>> 8
                    }, e === (0 | e) ? r.x = e : n += e;
                    for (var t = 0; t < n.length + 64; t++) r.x ^= 0 | n.charCodeAt(t), r.next()
                }

                function f(e, r) {
                    return r.x = e.x, r.y = e.y, r.z = e.z, r.w = e.w, r
                }

                function o(e, r) {
                    var n = new t(e),
                        o = r && r.state,
                        a = function() {
                            return (n.next() >>> 0) / 4294967296
                        };
                    return a.double = function() {
                        do var e = n.next() >>> 11,
                            r = (n.next() >>> 0) / 4294967296,
                            t = (e + r) / (1 << 21); while (0 === t);
                        return t
                    }, a.int32 = n.next, a.quick = a, o && ("object" == typeof o && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.xor128 = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xor4096.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    function r(e, r) {
                        var n, t, f, o, a, i = [],
                            u = 128;
                        for (r === (0 | r) ? (t = r, r = null) : (r += "\x00", t = 0, u = Math.max(u, r.length)), f = 0, o = -32; u > o; ++o) r && (t ^= r.charCodeAt((o + 32) % r.length)), 0 === o && (a = t), t ^= t << 10, t ^= t >>> 15, t ^= t << 4, t ^= t >>> 13, o >= 0 && (a = a + 1640531527 | 0, n = i[127 & o] ^= t + a, f = 0 == n ? f + 1 : 0);
                        for (f >= 128 && (i[127 & (r && r.length || 0)] = -1), f = 127, o = 512; o > 0; --o) t = i[f + 34 & 127], n = i[f = f + 1 & 127], t ^= t << 13, n ^= n << 17, t ^= t >>> 15, n ^= n >>> 12, i[f] = t ^ n;
                        e.w = a, e.X = i, e.i = f
                    }
                    var n = this;
                    n.next = function() {
                        var e, r, t = n.w,
                            f = n.X,
                            o = n.i;
                        return n.w = t = t + 1640531527 | 0, r = f[o + 34 & 127], e = f[o = o + 1 & 127], r ^= r << 13, e ^= e << 17, r ^= r >>> 15, e ^= e >>> 12, r = f[o] = r ^ e, n.i = o, r + (t ^ t >>> 16) | 0
                    }, r(n, e)
                }

                function f(e, r) {
                    return r.i = e.i, r.w = e.w, r.X = e.X.slice(), r
                }

                function o(e, r) {
                    null == e && (e = +new Date);
                    var n = new t(e),
                        o = r && r.state,
                        a = function() {
                            return (n.next() >>> 0) / 4294967296
                        };
                    return a.double = function() {
                        do var e = n.next() >>> 11,
                            r = (n.next() >>> 0) / 4294967296,
                            t = (e + r) / (1 << 21); while (0 === t);
                        return t
                    }, a.int32 = n.next, a.quick = a, o && (o.X && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.xor4096 = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorshift7.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    function r(e, r) {
                        var n, t, f = [];
                        if (r === (0 | r)) t = f[0] = r;
                        else
                            for (r = "" + r, n = 0; n < r.length; ++n) f[7 & n] = f[7 & n] << 15 ^ r.charCodeAt(n) + f[n + 1 & 7] << 13;
                        for (; f.length < 8;) f.push(0);
                        for (n = 0; 8 > n && 0 === f[n]; ++n);
                        for (t = 8 == n ? f[7] = -1 : f[n], e.x = f, e.i = 0, n = 256; n > 0; --n) e.next()
                    }
                    var n = this;
                    n.next = function() {
                        var e, r, t = n.x,
                            f = n.i;
                        return e = t[f], e ^= e >>> 7, r = e ^ e << 24, e = t[f + 1 & 7], r ^= e ^ e >>> 10, e = t[f + 3 & 7], r ^= e ^ e >>> 3, e = t[f + 4 & 7], r ^= e ^ e << 7, e = t[f + 7 & 7], e ^= e << 13, r ^= e ^ e << 9, t[f] = r, n.i = f + 1 & 7, r
                    }, r(n, e)
                }

                function f(e, r) {
                    return r.x = e.x.slice(), r.i = e.i, r
                }

                function o(e, r) {
                    null == e && (e = +new Date);
                    var n = new t(e),
                        o = r && r.state,
                        a = function() {
                            return (n.next() >>> 0) / 4294967296
                        };
                    return a.double = function() {
                        do var e = n.next() >>> 11,
                            r = (n.next() >>> 0) / 4294967296,
                            t = (e + r) / (1 << 21); while (0 === t);
                        return t
                    }, a.int32 = n.next, a.quick = a, o && (o.x && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.xorshift7 = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/lib/xorwow.js": [function(r, n) {
            ! function(e, r, n) {
                function t(e) {
                    var r = this,
                        n = "";
                    r.next = function() {
                        var e = r.x ^ r.x >>> 2;
                        return r.x = r.y, r.y = r.z, r.z = r.w, r.w = r.v, (r.d = r.d + 362437 | 0) + (r.v = r.v ^ r.v << 4 ^ (e ^ e << 1)) | 0
                    }, r.x = 0, r.y = 0, r.z = 0, r.w = 0, r.v = 0, e === (0 | e) ? r.x = e : n += e;
                    for (var t = 0; t < n.length + 64; t++) r.x ^= 0 | n.charCodeAt(t), t == n.length && (r.d = r.x << 10 ^ r.x >>> 4), r.next()
                }

                function f(e, r) {
                    return r.x = e.x, r.y = e.y, r.z = e.z, r.w = e.w, r.v = e.v, r.d = e.d, r
                }

                function o(e, r) {
                    var n = new t(e),
                        o = r && r.state,
                        a = function() {
                            return (n.next() >>> 0) / 4294967296
                        };
                    return a.double = function() {
                        do var e = n.next() >>> 11,
                            r = (n.next() >>> 0) / 4294967296,
                            t = (e + r) / (1 << 21); while (0 === t);
                        return t
                    }, a.int32 = n.next, a.quick = a, o && ("object" == typeof o && f(o, n), a.state = function() {
                        return f(n, {})
                    }), a
                }
                r && r.exports ? r.exports = o : n && n.amd ? n(function() {
                    return o
                }) : this.xorwow = o
            }(this, "object" == typeof n && n, "function" == typeof e && e)
        }, {}],
        "/Users/qrohlf/Code/trianglify/node_modules/seedrandom/seedrandom.js": [function(r, n) {
            ! function(t, f) {
                function o(e, r, n) {
                    var o = [];
                    r = 1 == r ? {
                        entropy: !0
                    } : r || {};
                    var l = c(u(r.entropy ? [e, d(t)] : null == e ? s() : e, 3), o),
                        b = new a(o),
                        p = function() {
                            for (var e = b.g(g), r = y, n = 0; v > e;) e = (e + n) * h, r *= h, n = b.g(1);
                            for (; e >= w;) e /= 2, r /= 2, n >>>= 1;
                            return (e + n) / r
                        };
                    return p.int32 = function() {
                        return 0 | b.g(4)
                    }, p.quick = function() {
                        return b.g(4) / 4294967296
                    }, p.double = p, c(d(b.S), t), (r.pass || n || function(e, r, n, t) {
                        return t && (t.S && i(t, b), e.state = function() {
                            return i(b, {})
                        }), n ? (f[m] = e, r) : e
                    })(p, l, "global" in r ? r.global : this == f, r.state)
                }

                function a(e) {
                    var r, n = e.length,
                        t = this,
                        f = 0,
                        o = t.i = t.j = 0,
                        a = t.S = [];
                    for (n || (e = [n++]); h > f;) a[f] = f++;
                    for (f = 0; h > f; f++) a[f] = a[o = x & o + e[f % n] + (r = a[f])], a[o] = r;
                    (t.g = function(e) {
                        for (var r, n = 0, f = t.i, o = t.j, a = t.S; e--;) r = a[f = x & f + 1], n = n * h + a[x & (a[f] = a[o = x & o + r]) + (a[o] = r)];
                        return t.i = f, t.j = o, n
                    })(h)
                }

                function i(e, r) {
                    return r.i = e.i, r.j = e.j, r.S = e.S.slice(), r
                }

                function u(e, r) {
                    var n, t = [],
                        f = typeof e;
                    if (r && "object" == f)
                        for (n in e) try {
                            t.push(u(e[n], r - 1))
                        } catch (o) {}
                    return t.length ? t : "string" == f ? e : e + "\x00"
                }

                function c(e, r) {
                    for (var n, t = e + "", f = 0; f < t.length;) r[x & f] = x & (n ^= 19 * r[x & f]) + t.charCodeAt(f++);
                    return d(r)
                }

                function s() {
                    try {
                        if (l) return d(l.randomBytes(h));
                        var e = new Uint8Array(h);
                        return (b.crypto || b.msCrypto).getRandomValues(e), d(e)
                    } catch (r) {
                        var n = b.navigator,
                            f = n && n.plugins;
                        return [+new Date, b, f, b.screen, d(t)]
                    }
                }

                function d(e) {
                    return String.fromCharCode.apply(0, e)
                }
                var l, b = this,
                    h = 256,
                    g = 6,
                    p = 52,
                    m = "random",
                    y = f.pow(h, g),
                    v = f.pow(2, p),
                    w = 2 * v,
                    x = h - 1;
                if (f["seed" + m] = o, c(f.random(), t), "object" == typeof n && n.exports) {
                    n.exports = o;
                    try {
                        l = r("crypto")
                    } catch (_) {}
                } else "function" == typeof e && e.amd && e(function() {
                    return o
                })
            }([], Math)
        }, {
            crypto: !1
        }]
    }, {}, ["./lib/trianglify.js"])("./lib/trianglify.js")
});