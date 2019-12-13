/*
 Highcharts JS v7.1.3 (2019-08-14)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(O, M) { "object" === typeof module && module.exports ? (M["default"] = M, module.exports = O.document ? M(O) : M) : "function" === typeof define && define.amd ? define("highcharts/highcharts", function() { return M(O) }) : (O.Highcharts && O.Highcharts.error(16, !0), O.Highcharts = M(O)) })("undefined" !== typeof window ? window : this, function(O) {
	function M(c, p, y, G) { c.hasOwnProperty(p) || (c[p] = G.apply(null, y)) }
	var J = {};
	M(J, "parts/Globals.js", [], function() {
		var c = "undefined" === typeof O ? "undefined" !== typeof window ? window : {} : O,
			p = c.document,
			y = c.navigator && c.navigator.userAgent || "",
			G = p && p.createElementNS && !!p.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
			F = /(edge|msie|trident)/i.test(y) && !c.opera,
			z = -1 !== y.indexOf("Firefox"),
			r = -1 !== y.indexOf("Chrome"),
			K = z && 4 > parseInt(y.split("Firefox/")[1], 10);
		return {
			product: "Highcharts",
			version: "7.1.3",
			deg2rad: 2 * Math.PI / 360,
			doc: p,
			hasBidiBug: K,
			hasTouch: !!O.TouchEvent,
			isMS: F,
			isWebKit: -1 !== y.indexOf("AppleWebKit"),
			isFirefox: z,
			isChrome: r,
			isSafari: !r && -1 !== y.indexOf("Safari"),
			isTouchDevice: /(Mobile|Android|Windows Phone)/.test(y),
			SVG_NS: "http://www.w3.org/2000/svg",
			chartCount: 0,
			seriesTypes: {},
			symbolSizes: {},
			svg: G,
			win: c,
			marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
			noop: function() {},
			charts: [],
			dateFormats: {}
		}
	});
	M(J, "parts/Utilities.js", [J["parts/Globals.js"]], function(c) {
		function p(b, d) { return parseInt(b, d || 10) }

		function y(b) { return "string" === typeof b }

		function G(b) { b = Object.prototype.toString.call(b); return "[object Array]" === b || "[object Array Iterator]" === b }

		function F(b, d) {
			return !!b && "object" === typeof b && (!d ||
				!G(b))
		}

		function z(b) { return F(b) && "number" === typeof b.nodeType }

		function r(b) { var d = b && b.constructor; return !(!F(b, !0) || z(b) || !d || !d.name || "Object" === d.name) }

		function K(b) { return "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b }

		function v(b) { return "undefined" !== typeof b && null !== b }

		function D(b, d, a) { for(var g in b) Object.prototype.hasOwnProperty.call(b, g) && d.call(a || b[g], b[g], g, b) } c.timers = [];
		var w = c.charts,
			n = c.doc,
			l = c.win;
		c.error = function(b, d, a) {
			var g = K(b) ? "Highcharts error #" + b + ": www.highcharts.com/errors/" +
				b : b,
				h = function() { if(d) throw Error(g);
					l.console && console.log(g) };
			a ? c.fireEvent(a, "displayError", { code: b, message: g }, h) : h()
		};
		c.Fx = function(b, d, a) { this.options = d;
			this.elem = b;
			this.prop = a };
		c.Fx.prototype = {
			dSetter: function() { var b = this.paths[0],
					d = this.paths[1],
					a = [],
					g = this.now,
					h = b.length; if(1 === g) a = this.toD;
				else if(h === d.length && 1 > g)
					for(; h--;) { var e = parseFloat(b[h]);
						a[h] = isNaN(e) ? d[h] : g * parseFloat("" + (d[h] - e)) + e } else a = d;
				this.elem.attr("d", a, null, !0) },
			update: function() {
				var b = this.elem,
					d = this.prop,
					a = this.now,
					g = this.options.step;
				if(this[d + "Setter"]) this[d + "Setter"]();
				else b.attr ? b.element && b.attr(d, a, null, !0) : b.style[d] = a + this.unit;
				g && g.call(b, a, this)
			},
			run: function(b, d, a) {
				var g = this,
					h = g.options,
					e = function(a) { return e.stopped ? !1 : g.step(a) },
					m = l.requestAnimationFrame || function(a) { setTimeout(a, 13) },
					u = function() { for(var a = 0; a < c.timers.length; a++) c.timers[a]() || c.timers.splice(a--, 1);
						c.timers.length && m(u) };
				b !== d || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = b, this.end = d, this.unit =
					a, this.now = this.start, this.pos = 0, e.elem = this.elem, e.prop = this.prop, e() && 1 === c.timers.push(e) && m(u)) : (delete h.curAnim[this.prop], h.complete && 0 === Object.keys(h.curAnim).length && h.complete.call(this.elem))
			},
			step: function(b) {
				var d = +new Date,
					a = this.options,
					g = this.elem,
					h = a.complete,
					e = a.duration,
					c = a.curAnim;
				if(g.attr && !g.element) b = !1;
				else if(b || d >= e + this.startTime) { this.now = this.end;
					this.pos = 1;
					this.update(); var u = c[this.prop] = !0;
					D(c, function(a) {!0 !== a && (u = !1) });
					u && h && h.call(g);
					b = !1 } else this.pos = a.easing((d -
					this.startTime) / e), this.now = this.start + (this.end - this.start) * this.pos, this.update(), b = !0;
				return b
			},
			initPath: function(b, d, a) {
				function g(a) { for(k = a.length; k--;) { var b = "M" === a[k] || "L" === a[k]; var f = /[a-zA-Z]/.test(a[k + 3]);
						b && f && a.splice(k + 1, 0, a[k + 1], a[k + 2], a[k + 1], a[k + 2]) } }

				function h(a, b) { for(; a.length < f;) { a[0] = b[f - a.length]; var q = a.slice(0, t);
						[].splice.apply(a, [0, 0].concat(q));
						A && (q = a.slice(a.length - t), [].splice.apply(a, [a.length, 0].concat(q)), k--) } a[0] = "M" }

				function e(a, b) {
					for(var q = (f - a.length) / t; 0 <
						q && q--;) x = a.slice().splice(a.length / B - t, t * B), x[0] = b[f - t - q * t], n && (x[t - 6] = x[t - 2], x[t - 5] = x[t - 1]), [].splice.apply(a, [a.length / B, 0].concat(x)), A && q--
				}
				d = d || "";
				var c = b.startX,
					u = b.endX,
					n = -1 < d.indexOf("C"),
					t = n ? 7 : 3,
					x, k;
				d = d.split(" ");
				a = a.slice();
				var A = b.isArea,
					B = A ? 2 : 1;
				n && (g(d), g(a));
				if(c && u) { for(k = 0; k < c.length; k++)
						if(c[k] === u[0]) { var H = k; break } else if(c[0] === u[u.length - c.length + k]) { H = k; var q = !0; break } else if(c[c.length - 1] === u[u.length - c.length + k]) { H = c.length - k; break } "undefined" === typeof H && (d = []) }
				if(d.length &&
					K(H)) { var f = a.length + H * B * t;
					q ? (h(d, a), e(a, d)) : (h(a, d), e(d, a)) }
				return [d, a]
			},
			fillSetter: function() { c.Fx.prototype.strokeSetter.apply(this, arguments) },
			strokeSetter: function() { this.elem.attr(this.prop, c.color(this.start).tweenTo(c.color(this.end), this.pos), null, !0) }
		};
		c.merge = function() {
			var b, d = arguments,
				a = {},
				g = function(a, b) { "object" !== typeof a && (a = {});
					D(b, function(d, e) {!F(d, !0) || r(d) || z(d) ? a[e] = b[e] : a[e] = g(a[e] || {}, d) }); return a };
			!0 === d[0] && (a = d[1], d = Array.prototype.slice.call(d, 2));
			var h = d.length;
			for(b =
				0; b < h; b++) a = g(a, d[b]);
			return a
		};
		c.attr = function(b, d, a) { var g;
			y(d) ? v(a) ? b.setAttribute(d, a) : b && b.getAttribute && ((g = b.getAttribute(d)) || "class" !== d || (g = b.getAttribute(d + "Name"))) : v(d) && F(d) && D(d, function(a, d) { b.setAttribute(d, a) }); return g };
		c.syncTimeout = function(b, d, a) { if(d) return setTimeout(b, d, a);
			b.call(0, a) };
		c.clearTimeout = function(b) { v(b) && clearTimeout(b) };
		c.extend = function(b, d) { var a;
			b || (b = {}); for(a in d) b[a] = d[a]; return b };
		c.pick = function() {
			var b = arguments,
				d, a = b.length;
			for(d = 0; d < a; d++) {
				var g =
					b[d];
				if("undefined" !== typeof g && null !== g) return g
			}
		};
		c.css = function(b, d) { c.isMS && !c.svg && d && "undefined" !== typeof d.opacity && (d.filter = "alpha(opacity=" + 100 * d.opacity + ")");
			c.extend(b.style, d) };
		c.createElement = function(b, d, a, g, h) { b = n.createElement(b); var e = c.css;
			d && c.extend(b, d);
			h && e(b, { padding: "0", border: "none", margin: "0" });
			a && e(b, a);
			g && g.appendChild(b); return b };
		c.extendClass = function(b, d) { var a = function() {};
			a.prototype = new b;
			c.extend(a.prototype, d); return a };
		c.pad = function(b, d, a) {
			return Array((d ||
				2) + 1 - String(b).replace("-", "").length).join(a || "0") + b
		};
		c.relativeLength = function(b, d, a) { return /%$/.test(b) ? d * parseFloat(b) / 100 + (a || 0) : parseFloat(b) };
		c.wrap = function(b, d, a) { var g = b[d];
			b[d] = function() { var b = Array.prototype.slice.call(arguments),
					d = arguments,
					c = this;
				c.proceed = function() { g.apply(c, arguments.length ? arguments : d) };
				b.unshift(g);
				b = a.apply(this, b);
				c.proceed = null; return b } };
		c.datePropsToTimestamps = function(b) {
			D(b, function(d, a) {
				F(d) && "function" === typeof d.getTime ? b[a] = d.getTime() : (F(d) || G(d)) &&
					c.datePropsToTimestamps(d)
			})
		};
		c.formatSingle = function(b, d, a) { var g = /\.([0-9])/,
				h = c.defaultOptions.lang; /f$/.test(b) ? (a = (a = b.match(g)) ? a[1] : -1, null !== d && (d = c.numberFormat(d, a, h.decimalPoint, -1 < b.indexOf(",") ? h.thousandsSep : ""))) : d = (a || c.time).dateFormat(b, d); return d };
		c.format = function(b, d, a) {
			for(var g = "{", h = !1, e, m, u, n, t = [], x; b;) {
				g = b.indexOf(g);
				if(-1 === g) break;
				e = b.slice(0, g);
				if(h) {
					e = e.split(":");
					m = e.shift().split(".");
					n = m.length;
					x = d;
					for(u = 0; u < n; u++) x && (x = x[m[u]]);
					e.length && (x = c.formatSingle(e.join(":"),
						x, a));
					t.push(x)
				} else t.push(e);
				b = b.slice(g + 1);
				g = (h = !h) ? "}" : "{"
			}
			t.push(b);
			return t.join("")
		};
		c.getMagnitude = function(b) { return Math.pow(10, Math.floor(Math.log(b) / Math.LN10)) };
		c.normalizeTickInterval = function(b, d, a, g, h) {
			var e = b;
			a = c.pick(a, 1);
			var m = b / a;
			d || (d = h ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === g && (1 === a ? d = d.filter(function(a) { return 0 === a % 1 }) : .1 >= a && (d = [1 / a])));
			for(g = 0; g < d.length && !(e = d[g], h && e * a >= b || !h && m <= (d[g] + (d[g + 1] || d[g])) / 2); g++);
			return e = c.correctFloat(e * a, -Math.round(Math.log(.001) /
				Math.LN10))
		};
		c.stableSort = function(b, d) { var a = b.length,
				g, h; for(h = 0; h < a; h++) b[h].safeI = h;
			b.sort(function(a, b) { g = d(a, b); return 0 === g ? a.safeI - b.safeI : g }); for(h = 0; h < a; h++) delete b[h].safeI };
		c.arrayMin = function(b) { for(var d = b.length, a = b[0]; d--;) b[d] < a && (a = b[d]); return a };
		c.arrayMax = function(b) { for(var d = b.length, a = b[0]; d--;) b[d] > a && (a = b[d]); return a };
		c.destroyObjectProperties = function(b, d) { D(b, function(a, g) { a && a !== d && a.destroy && a.destroy();
				delete b[g] }) };
		c.discardElement = function(b) {
			var d = c.garbageBin;
			d || (d = c.createElement("div"));
			b && d.appendChild(b);
			d.innerHTML = ""
		};
		c.correctFloat = function(b, d) { return parseFloat(b.toPrecision(d || 14)) };
		c.setAnimation = function(b, d) { d.renderer.globalAnimation = c.pick(b, d.options.chart.animation, !0) };
		c.animObject = function(b) { return F(b) ? c.merge(b) : { duration: b ? 500 : 0 } };
		c.timeUnits = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 };
		c.numberFormat = function(b, d, a, g) {
			b = +b || 0;
			d = +d;
			var h = c.defaultOptions.lang,
				e = (b.toString().split(".")[1] ||
					"").split("e")[0].length,
				m = b.toString().split("e");
			if(-1 === d) d = Math.min(e, 20);
			else if(!K(d)) d = 2;
			else if(d && m[1] && 0 > m[1]) { var u = d + +m[1];
				0 <= u ? (m[0] = (+m[0]).toExponential(u).split("e")[0], d = u) : (m[0] = m[0].split(".")[0] || 0, b = 20 > d ? (m[0] * Math.pow(10, m[1])).toFixed(d) : 0, m[1] = 0) }
			var n = (Math.abs(m[1] ? m[0] : b) + Math.pow(10, -Math.max(d, e) - 1)).toFixed(d);
			e = String(p(n));
			u = 3 < e.length ? e.length % 3 : 0;
			a = c.pick(a, h.decimalPoint);
			g = c.pick(g, h.thousandsSep);
			b = (0 > b ? "-" : "") + (u ? e.substr(0, u) + g : "");
			b += e.substr(u).replace(/(\d{3})(?=\d)/g,
				"$1" + g);
			d && (b += a + n.slice(-d));
			m[1] && 0 !== +b && (b += "e" + m[1]);
			return b
		};
		Math.easeInOutSine = function(b) { return -.5 * (Math.cos(Math.PI * b) - 1) };
		c.getStyle = function(b, d, a) {
			if("width" === d) return d = Math.min(b.offsetWidth, b.scrollWidth), a = b.getBoundingClientRect && b.getBoundingClientRect().width, a < d && a >= d - 1 && (d = Math.floor(a)), Math.max(0, d - c.getStyle(b, "padding-left") - c.getStyle(b, "padding-right"));
			if("height" === d) return Math.max(0, Math.min(b.offsetHeight, b.scrollHeight) - c.getStyle(b, "padding-top") - c.getStyle(b,
				"padding-bottom"));
			l.getComputedStyle || c.error(27, !0);
			if(b = l.getComputedStyle(b, void 0)) b = b.getPropertyValue(d), c.pick(a, "opacity" !== d) && (b = p(b));
			return b
		};
		c.inArray = function(b, d, a) { return d.indexOf(b, a) };
		c.find = Array.prototype.find ? function(b, d) { return b.find(d) } : function(b, d) { var a, g = b.length; for(a = 0; a < g; a++)
				if(d(b[a], a)) return b[a] };
		c.keys = Object.keys;
		c.offset = function(b) {
			var d = n.documentElement;
			b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : { top: 0, left: 0 };
			return {
				top: b.top + (l.pageYOffset ||
					d.scrollTop) - (d.clientTop || 0),
				left: b.left + (l.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
			}
		};
		c.stop = function(b, d) { for(var a = c.timers.length; a--;) c.timers[a].elem !== b || d && d !== c.timers[a].prop || (c.timers[a].stopped = !0) };
		D({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function(b, d) { c[d] = function(a) { return Array.prototype[b].apply(a, [].slice.call(arguments, 1)) } });
		c.addEvent = function(b, d, a, g) {
			void 0 === g && (g = {});
			var h = b.addEventListener || c.addEventListenerPolyfill;
			var e = "function" ===
				typeof b && b.prototype ? b.prototype.protoEvents = b.prototype.protoEvents || {} : b.hcEvents = b.hcEvents || {};
			c.Point && b instanceof c.Point && b.series && b.series.chart && (b.series.chart.runTrackerClick = !0);
			h && h.call(b, d, a, !1);
			e[d] || (e[d] = []);
			e[d].push({ fn: a, order: "number" === typeof g.order ? g.order : Infinity });
			e[d].sort(function(a, b) { return a.order - b.order });
			return function() { c.removeEvent(b, d, a) }
		};
		c.removeEvent = function(b, d, a) {
			function g(a, d) {
				var e = b.removeEventListener || c.removeEventListenerPolyfill;
				e && e.call(b,
					a, d, !1)
			}

			function h(a) { var e; if(b.nodeName) { if(d) { var h = {};
						h[d] = !0 } else h = a;
					D(h, function(b, d) { if(a[d])
							for(e = a[d].length; e--;) g(d, a[d][e].fn) }) } }
			var e;
			["protoEvents", "hcEvents"].forEach(function(c) { var m = b[c];
				m && (d ? (e = m[d] || [], a ? (m[d] = e.filter(function(b) { return a !== b.fn }), g(d, a)) : (h(m), m[d] = [])) : (h(m), b[c] = {})) })
		};
		c.fireEvent = function(b, d, a, g) {
			var h;
			a = a || {};
			if(n.createEvent && (b.dispatchEvent || b.fireEvent)) {
				var e = n.createEvent("Events");
				e.initEvent(d, !0, !0);
				c.extend(e, a);
				b.dispatchEvent ? b.dispatchEvent(e) :
					b.fireEvent(d, e)
			} else a.target || c.extend(a, { preventDefault: function() { a.defaultPrevented = !0 }, target: b, type: d }),
				function(d, e) { void 0 === d && (d = []);
					void 0 === e && (e = []); var g = 0,
						c = 0,
						m = d.length + e.length; for(h = 0; h < m; h++) !1 === (d[g] ? e[c] ? d[g].order <= e[c].order ? d[g++] : e[c++] : d[g++] : e[c++]).fn.call(b, a) && a.preventDefault() }(b.protoEvents && b.protoEvents[d], b.hcEvents && b.hcEvents[d]);
			g && !a.defaultPrevented && g.call(b, a)
		};
		c.animate = function(b, d, a) {
			var g, h = "",
				e, m;
			if(!F(a)) {
				var u = arguments;
				a = {
					duration: u[2],
					easing: u[3],
					complete: u[4]
				}
			}
			K(a.duration) || (a.duration = 400);
			a.easing = "function" === typeof a.easing ? a.easing : Math[a.easing] || Math.easeInOutSine;
			a.curAnim = c.merge(d);
			D(d, function(u, t) { c.stop(b, t);
				m = new c.Fx(b, a, t);
				e = null; "d" === t ? (m.paths = m.initPath(b, b.d, d.d), m.toD = d.d, g = 0, e = 1) : b.attr ? g = b.attr(t) : (g = parseFloat(c.getStyle(b, t)) || 0, "opacity" !== t && (h = "px"));
				e || (e = u);
				e && e.match && e.match("px") && (e = e.replace(/px/g, ""));
				m.run(g, e, h) })
		};
		c.seriesType = function(b, d, a, g, h) {
			var e = c.getOptions(),
				m = c.seriesTypes;
			e.plotOptions[b] =
				c.merge(e.plotOptions[d], a);
			m[b] = c.extendClass(m[d] || function() {}, g);
			m[b].prototype.type = b;
			h && (m[b].prototype.pointClass = c.extendClass(c.Point, h));
			return m[b]
		};
		c.uniqueKey = function() { var b = Math.random().toString(36).substring(2, 9),
				d = 0; return function() { return "highcharts-" + b + "-" + d++ } }();
		c.isFunction = function(b) { return "function" === typeof b };
		l.jQuery && (l.jQuery.fn.highcharts = function() {
			var b = [].slice.call(arguments);
			if(this[0]) return b[0] ? (new(c[y(b[0]) ? b.shift() : "Chart"])(this[0], b[0], b[1]), this) :
				w[c.attr(this[0], "data-highcharts-chart")]
		});
		return { defined: v, erase: function(b, d) { for(var a = b.length; a--;)
					if(b[a] === d) { b.splice(a, 1); break } }, isArray: G, isClass: r, isDOMElement: z, isNumber: K, isObject: F, isString: y, objectEach: D, pInt: p, splat: function(b) { return G(b) ? b : [b] } }
	});
	M(J, "parts/Color.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.isNumber,
			G = p.pInt,
			F = c.merge;
		c.Color = function(z) { if(!(this instanceof c.Color)) return new c.Color(z);
			this.init(z) };
		c.Color.prototype = {
			parsers: [{
				regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
				parse: function(c) { return [G(c[1]), G(c[2]), G(c[3]), parseFloat(c[4], 10)] }
			}, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function(c) { return [G(c[1]), G(c[2]), G(c[3]), 1] } }],
			names: { white: "#ffffff", black: "#000000" },
			init: function(z) {
				var r, p;
				if((this.input = z = this.names[z && z.toLowerCase ? z.toLowerCase() : ""] || z) && z.stops) this.stops = z.stops.map(function(w) { return new c.Color(w[1]) });
				else {
					if(z && z.charAt && "#" === z.charAt()) {
						var v = z.length;
						z = parseInt(z.substr(1), 16);
						7 === v ? r = [(z & 16711680) >>
							16, (z & 65280) >> 8, z & 255, 1
						] : 4 === v && (r = [(z & 3840) >> 4 | (z & 3840) >> 8, (z & 240) >> 4 | z & 240, (z & 15) << 4 | z & 15, 1])
					}
					if(!r)
						for(p = this.parsers.length; p-- && !r;) { var y = this.parsers[p];
							(v = y.regex.exec(z)) && (r = y.parse(v)) }
				}
				this.rgba = r || []
			},
			get: function(c) { var r = this.input,
					z = this.rgba; if(this.stops) { var v = F(r);
					v.stops = [].concat(v.stops);
					this.stops.forEach(function(r, w) { v.stops[w] = [v.stops[w][0], r.get(c)] }) } else v = z && y(z[0]) ? "rgb" === c || !c && 1 === z[3] ? "rgb(" + z[0] + "," + z[1] + "," + z[2] + ")" : "a" === c ? z[3] : "rgba(" + z.join(",") + ")" : r; return v },
			brighten: function(c) { var r, z = this.rgba; if(this.stops) this.stops.forEach(function(r) { r.brighten(c) });
				else if(y(c) && 0 !== c)
					for(r = 0; 3 > r; r++) z[r] += G(255 * c), 0 > z[r] && (z[r] = 0), 255 < z[r] && (z[r] = 255); return this },
			setOpacity: function(c) { this.rgba[3] = c; return this },
			tweenTo: function(c, r) {
				var z = this.rgba,
					v = c.rgba;
				v.length && z && z.length ? (c = 1 !== v[3] || 1 !== z[3], r = (c ? "rgba(" : "rgb(") + Math.round(v[0] + (z[0] - v[0]) * (1 - r)) + "," + Math.round(v[1] + (z[1] - v[1]) * (1 - r)) + "," + Math.round(v[2] + (z[2] - v[2]) * (1 - r)) + (c ? "," + (v[3] + (z[3] - v[3]) *
					(1 - r)) : "") + ")") : r = c.input || "none";
				return r
			}
		};
		c.color = function(z) { return new c.Color(z) }
	});
	M(J, "parts/SvgRenderer.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.erase,
			F = p.isArray,
			z = p.isNumber,
			r = p.isObject,
			K = p.isString,
			v = p.objectEach,
			D = p.pInt,
			w = p.splat,
			n = c.addEvent,
			l = c.animate,
			b = c.attr,
			d = c.charts,
			a = c.color,
			g = c.css,
			h = c.createElement,
			e = c.deg2rad,
			m = c.destroyObjectProperties,
			u = c.doc,
			E = c.extend,
			t = c.hasTouch,
			x = c.isFirefox,
			k = c.isMS,
			A = c.isWebKit,
			B = c.merge,
			H = c.noop,
			q = c.pick,
			f = c.removeEvent,
			C = c.stop,
			N = c.svg,
			T = c.SVG_NS,
			R = c.symbolSizes,
			S = c.win;
		var L = c.SVGElement = function() { return this };
		E(L.prototype, {
			opacity: 1,
			SVG_NS: T,
			textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
			init: function(a, b) { this.element = "span" === b ? h(b) : u.createElementNS(this.SVG_NS, b);
				this.renderer = a;
				c.fireEvent(this, "afterInit") },
			animate: function(a, b, f) {
				var I = c.animObject(q(b, this.renderer.globalAnimation, !0));
				q(u.hidden, u.msHidden, u.webkitHidden, !1) && (I.duration = 0);
				0 !== I.duration ? (f && (I.complete = f), l(this, a, I)) : (this.attr(a, void 0, f), v(a, function(a, b) { I.step && I.step.call(this, a, { prop: b, pos: 1 }) }, this));
				return this
			},
			complexColor: function(a, b, f) {
				var I = this.renderer,
					q, d, e, k, g, h, P, m, A, C, N, Q = [],
					L;
				c.fireEvent(this.renderer, "complexColor", { args: arguments }, function() {
					a.radialGradient ? d = "radialGradient" : a.linearGradient && (d = "linearGradient");
					d && (e = a[d], g = I.gradients, P = a.stops, C = f.radialReference, F(e) && (a[d] =
						e = { x1: e[0], y1: e[1], x2: e[2], y2: e[3], gradientUnits: "userSpaceOnUse" }), "radialGradient" === d && C && !y(e.gradientUnits) && (k = e, e = B(e, I.getRadialAttr(C, k), { gradientUnits: "userSpaceOnUse" })), v(e, function(a, I) { "id" !== I && Q.push(I, a) }), v(P, function(a) { Q.push(a) }), Q = Q.join(","), g[Q] ? N = g[Q].attr("id") : (e.id = N = c.uniqueKey(), g[Q] = h = I.createElement(d).attr(e).add(I.defs), h.radAttr = k, h.stops = [], P.forEach(function(a) {
						0 === a[1].indexOf("rgba") ? (q = c.color(a[1]), m = q.get("rgb"), A = q.get("a")) : (m = a[1], A = 1);
						a = I.createElement("stop").attr({
							offset: a[0],
							"stop-color": m,
							"stop-opacity": A
						}).add(h);
						h.stops.push(a)
					})), L = "url(" + I.url + "#" + N + ")", f.setAttribute(b, L), f.gradient = Q, a.toString = function() { return L })
				})
			},
			applyTextOutline: function(a) {
				var I = this.element,
					f; - 1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(I.style.fill)));
				a = a.split(" ");
				var q = a[a.length - 1];
				if((f = a[0]) && "none" !== f && c.svg) {
					this.fakeTS = !0;
					a = [].slice.call(I.getElementsByTagName("tspan"));
					this.ySetter = this.xSetter;
					f = f.replace(/(^[\d\.]+)(.*?)$/g, function(a, I,
						b) { return 2 * I + b });
					this.removeTextOutline(a);
					var d = I.firstChild;
					a.forEach(function(a, e) { 0 === e && (a.setAttribute("x", I.getAttribute("x")), e = I.getAttribute("y"), a.setAttribute("y", e || 0), null === e && I.setAttribute("y", 0));
						a = a.cloneNode(1);
						b(a, { "class": "highcharts-text-outline", fill: q, stroke: q, "stroke-width": f, "stroke-linejoin": "round" });
						I.insertBefore(a, d) })
				}
			},
			removeTextOutline: function(a) { for(var I = a.length, b; I--;) b = a[I], "highcharts-text-outline" === b.getAttribute("class") && G(a, this.element.removeChild(b)) },
			symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "),
			attr: function(a, b, f, q) {
				var I = this.element,
					d, e = this,
					g, k, h = this.symbolCustomAttribs;
				if("string" === typeof a && void 0 !== b) { var P = a;
					a = {};
					a[P] = b }
				"string" === typeof a ? e = (this[a + "Getter"] || this._defaultGetter).call(this, a, I) : (v(a, function(b, f) {
					g = !1;
					q || C(this, f);
					this.symbolName && -1 !== c.inArray(f, h) && (d || (this.symbolAttr(a), d = !0), g = !0);
					!this.rotation || "x" !== f && "y" !== f || (this.doTransform = !0);
					g || (k = this[f + "Setter"] || this._defaultSetter,
						k.call(this, b, f, I), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(f) && this.updateShadows(f, b, k))
				}, this), this.afterSetters());
				f && f.call(this);
				return e
			},
			afterSetters: function() { this.doTransform && (this.updateTransform(), this.doTransform = !1) },
			updateShadows: function(a, b, f) { for(var I = this.shadows, q = I.length; q--;) f.call(I[q], "height" === a ? Math.max(b - (I[q].cutHeight || 0), 0) : "d" === a ? this.d : b, a, I[q]) },
			addClass: function(a, b) {
				var I = this.attr("class") || "";
				b || (a = (a || "").split(/ /g).reduce(function(a,
					b) {-1 === I.indexOf(b) && a.push(b); return a }, I ? [I] : []).join(" "));
				a !== I && this.attr("class", a);
				return this
			},
			hasClass: function(a) { return -1 !== (this.attr("class") || "").split(" ").indexOf(a) },
			removeClass: function(a) { return this.attr("class", (this.attr("class") || "").replace(a, "")) },
			symbolAttr: function(a) { var b = this; "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(I) { b[I] = q(a[I], b[I]) });
				b.attr({ d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b) }) },
			clip: function(a) {
				return this.attr("clip-path",
					a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
			},
			crisp: function(a, b) { b = b || a.strokeWidth || 0; var I = Math.round(b) % 2 / 2;
				a.x = Math.floor(a.x || this.x || 0) + I;
				a.y = Math.floor(a.y || this.y || 0) + I;
				a.width = Math.floor((a.width || this.width || 0) - 2 * I);
				a.height = Math.floor((a.height || this.height || 0) - 2 * I);
				y(a.strokeWidth) && (a.strokeWidth = b); return a },
			css: function(a) {
				var f = this.styles,
					I = {},
					q = this.element,
					d = "",
					e = !f,
					k = ["textOutline", "textOverflow", "width"];
				a && a.color && (a.fill = a.color);
				f && v(a, function(a, b) {
					a !== f[b] && (I[b] = a,
						e = !0)
				});
				if(e) {
					f && (a = E(f, I));
					if(a)
						if(null === a.width || "auto" === a.width) delete this.textWidth;
						else if("text" === q.nodeName.toLowerCase() && a.width) var c = this.textWidth = D(a.width);
					this.styles = a;
					c && !N && this.renderer.forExport && delete a.width;
					if(q.namespaceURI === this.SVG_NS) { var h = function(a, b) { return "-" + b.toLowerCase() };
						v(a, function(a, b) {-1 === k.indexOf(b) && (d += b.replace(/([A-Z])/g, h) + ":" + a + ";") });
						d && b(q, "style", d) } else g(q, a);
					this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a &&
						a.textOutline && this.applyTextOutline(a.textOutline))
				}
				return this
			},
			getStyle: function(a) { return S.getComputedStyle(this.element || this, "").getPropertyValue(a) },
			strokeWidth: function() { if(!this.renderer.styledMode) return this["stroke-width"] || 0; var a = this.getStyle("stroke-width"); if(a.indexOf("px") === a.length - 2) a = D(a);
				else { var f = u.createElementNS(T, "rect");
					b(f, { width: a, "stroke-width": 0 });
					this.element.parentNode.appendChild(f);
					a = f.getBBox().width;
					f.parentNode.removeChild(f) } return a },
			on: function(a, b) {
				var f =
					this,
					q = f.element;
				t && "click" === a ? (q.ontouchstart = function(a) { f.touchEventFired = Date.now();
					a.preventDefault();
					b.call(q, a) }, q.onclick = function(a) {
					(-1 === S.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (f.touchEventFired || 0)) && b.call(q, a) }) : q["on" + a] = b;
				return this
			},
			setRadialReference: function(a) { var b = this.renderer.gradients[this.element.gradient];
				this.element.radialReference = a;
				b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr)); return this },
			translate: function(a, b) {
				return this.attr({
					translateX: a,
					translateY: b
				})
			},
			invert: function(a) { this.inverted = a;
				this.updateTransform(); return this },
			updateTransform: function() {
				var a = this.translateX || 0,
					b = this.translateY || 0,
					f = this.scaleX,
					d = this.scaleY,
					e = this.inverted,
					k = this.rotation,
					g = this.matrix,
					c = this.element;
				e && (a += this.width, b += this.height);
				a = ["translate(" + a + "," + b + ")"];
				y(g) && a.push("matrix(" + g.join(",") + ")");
				e ? a.push("rotate(90) scale(-1,1)") : k && a.push("rotate(" + k + " " + q(this.rotationOriginX, c.getAttribute("x"), 0) + " " + q(this.rotationOriginY, c.getAttribute("y") ||
					0) + ")");
				(y(f) || y(d)) && a.push("scale(" + q(f, 1) + " " + q(d, 1) + ")");
				a.length && c.setAttribute("transform", a.join(" "))
			},
			toFront: function() { var a = this.element;
				a.parentNode.appendChild(a); return this },
			align: function(a, b, f) {
				var d, I = {};
				var e = this.renderer;
				var k = e.alignedObjects;
				var g, c;
				if(a) { if(this.alignOptions = a, this.alignByTranslate = b, !f || K(f)) this.alignTo = d = f || "renderer", G(k, this), k.push(this), f = null } else a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo;
				f = q(f, e[d], e);
				d = a.align;
				e = a.verticalAlign;
				k = (f.x || 0) + (a.x || 0);
				var h = (f.y || 0) + (a.y || 0);
				"right" === d ? g = 1 : "center" === d && (g = 2);
				g && (k += (f.width - (a.width || 0)) / g);
				I[b ? "translateX" : "x"] = Math.round(k);
				"bottom" === e ? c = 1 : "middle" === e && (c = 2);
				c && (h += (f.height - (a.height || 0)) / c);
				I[b ? "translateY" : "y"] = Math.round(h);
				this[this.placed ? "animate" : "attr"](I);
				this.placed = !0;
				this.alignAttr = I;
				return this
			},
			getBBox: function(a, b) {
				var f, d = this.renderer,
					I = this.element,
					k = this.styles,
					g = this.textStr,
					c, h = d.cache,
					B = d.cacheKeys,
					P = I.namespaceURI === this.SVG_NS;
				b = q(b, this.rotation);
				var m = b * e;
				var A = d.styledMode ? I && L.prototype.getStyle.call(I, "font-size") : k && k.fontSize;
				if(y(g)) { var C = g.toString(); - 1 === C.indexOf("<") && (C = C.replace(/[0-9]/g, "0"));
					C += ["", b || 0, A, this.textWidth, k && k.textOverflow].join() } C && !a && (f = h[C]);
				if(!f) {
					if(P || d.forExport) {
						try {
							(c = this.fakeTS && function(a) {
								[].forEach.call(I.querySelectorAll(".highcharts-text-outline"), function(b) { b.style.display = a }) }) && c("none"), f = I.getBBox ? E({}, I.getBBox()) : { width: I.offsetWidth, height: I.offsetHeight }, c && c("") } catch(aa) { "" }
						if(!f ||
							0 > f.width) f = { width: 0, height: 0 }
					} else f = this.htmlGetBBox();
					d.isSVG && (a = f.width, d = f.height, P && (f.height = d = { "11px,17": 14, "13px,20": 16 }[k && k.fontSize + "," + Math.round(d)] || d), b && (f.width = Math.abs(d * Math.sin(m)) + Math.abs(a * Math.cos(m)), f.height = Math.abs(d * Math.cos(m)) + Math.abs(a * Math.sin(m))));
					if(C && 0 < f.height) { for(; 250 < B.length;) delete h[B.shift()];
						h[C] || B.push(C);
						h[C] = f }
				}
				return f
			},
			show: function(a) { return this.attr({ visibility: a ? "inherit" : "visible" }) },
			hide: function(a) {
				a ? this.attr({ y: -9999 }) : this.attr({ visibility: "hidden" });
				return this
			},
			fadeOut: function(a) { var b = this;
				b.animate({ opacity: 0 }, { duration: a || 150, complete: function() { b.attr({ y: -9999 }) } }) },
			add: function(a) { var b = this.renderer,
					f = this.element;
				a && (this.parentGroup = a);
				this.parentInverted = a && a.inverted;
				void 0 !== this.textStr && b.buildText(this);
				this.added = !0; if(!a || a.handleZ || this.zIndex) var q = this.zIndexSetter();
				q || (a ? a.element : b.box).appendChild(f); if(this.onAdd) this.onAdd(); return this },
			safeRemoveChild: function(a) { var b = a.parentNode;
				b && b.removeChild(a) },
			destroy: function() {
				var a =
					this,
					b = a.element || {},
					f = a.renderer,
					q = f.isSVG && "SPAN" === b.nodeName && a.parentGroup,
					d = b.ownerSVGElement,
					e = a.clipPath;
				b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
				C(a);
				e && d && ([].forEach.call(d.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {-1 < a.getAttribute("clip-path").indexOf(e.element.id) && a.removeAttribute("clip-path") }), a.clipPath = e.destroy());
				if(a.stops) { for(d = 0; d < a.stops.length; d++) a.stops[d] = a.stops[d].destroy();
					a.stops = null } a.safeRemoveChild(b);
				for(f.styledMode || a.destroyShadows(); q &&
					q.div && 0 === q.div.childNodes.length;) b = q.parentGroup, a.safeRemoveChild(q.div), delete q.div, q = b;
				a.alignTo && G(f.alignedObjects, a);
				v(a, function(b, f) { a[f] && a[f].parentGroup === a && a[f].destroy && a[f].destroy();
					delete a[f] })
			},
			shadow: function(a, f, d) {
				var e = [],
					k, g = this.element;
				if(!a) this.destroyShadows();
				else if(!this.shadows) {
					var I = q(a.width, 3);
					var c = (a.opacity || .15) / I;
					var h = this.parentInverted ? "(-1,-1)" : "(" + q(a.offsetX, 1) + ", " + q(a.offsetY, 1) + ")";
					for(k = 1; k <= I; k++) {
						var B = g.cloneNode(0);
						var m = 2 * I + 1 - 2 * k;
						b(B, {
							stroke: a.color ||
								"#000000",
							"stroke-opacity": c * k,
							"stroke-width": m,
							transform: "translate" + h,
							fill: "none"
						});
						B.setAttribute("class", (B.getAttribute("class") || "") + " highcharts-shadow");
						d && (b(B, "height", Math.max(b(B, "height") - m, 0)), B.cutHeight = m);
						f ? f.element.appendChild(B) : g.parentNode && g.parentNode.insertBefore(B, g);
						e.push(B)
					}
					this.shadows = e
				}
				return this
			},
			destroyShadows: function() {
				(this.shadows || []).forEach(function(a) { this.safeRemoveChild(a) }, this);
				this.shadows = void 0 },
			xGetter: function(a) {
				"circle" === this.element.nodeName &&
					("x" === a ? a = "cx" : "y" === a && (a = "cy"));
				return this._defaultGetter(a)
			},
			_defaultGetter: function(a) { a = q(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0); /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a)); return a },
			dSetter: function(a, b, f) { a && a.join && (a = a.join(" ")); /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
				this[b] !== a && (f.setAttribute(b, a), this[b] = a) },
			dashstyleSetter: function(a) {
				var b, f = this["stroke-width"];
				"inherit" === f && (f = 1);
				if(a = a && a.toLowerCase()) {
					a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot",
						"3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
					for(b = a.length; b--;) a[b] = D(a[b]) * f;
					a = a.join(",").replace(/NaN/g, "none");
					this.element.setAttribute("stroke-dasharray", a)
				}
			},
			alignSetter: function(a) { var b = { left: "start", center: "middle", right: "end" };
				b[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", b[a])) },
			opacitySetter: function(a, b, f) { this[b] = a;
				f.setAttribute(b, a) },
			titleSetter: function(a) {
				var b =
					this.element.getElementsByTagName("title")[0];
				b || (b = u.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
				b.firstChild && b.removeChild(b.firstChild);
				b.appendChild(u.createTextNode(String(q(a, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
			},
			textSetter: function(a) { a !== this.textStr && (delete this.bBox, delete this.textPxLength, this.textStr = a, this.added && this.renderer.buildText(this)) },
			setTextPath: function(a, b) {
				var f = this.element,
					q = { textAnchor: "text-anchor" },
					d = !1,
					e =
					this.textPathWrapper,
					k = !e;
				b = B(!0, { enabled: !0, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } }, b);
				var g = b.attributes;
				if(a && b && b.enabled) {
					this.options && this.options.padding && (g.dx = -this.options.padding);
					e || (this.textPathWrapper = e = this.renderer.createElement("textPath"), d = !0);
					var h = e.element;
					(b = a.element.getAttribute("id")) || a.element.setAttribute("id", b = c.uniqueKey());
					if(k)
						for(a = f.getElementsByTagName("tspan"); a.length;) a[0].setAttribute("y", 0), h.appendChild(a[0]);
					d && e.add({
						element: this.text ?
							this.text.element : f
					});
					h.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + b);
					y(g.dy) && (h.parentNode.setAttribute("dy", g.dy), delete g.dy);
					y(g.dx) && (h.parentNode.setAttribute("dx", g.dx), delete g.dx);
					v(g, function(a, b) { h.setAttribute(q[b] || b, a) });
					f.removeAttribute("transform");
					this.removeTextOutline.call(e, [].slice.call(f.getElementsByTagName("tspan")));
					this.text && !this.renderer.styledMode && this.attr({ fill: "none", "stroke-width": 0 });
					this.applyTextOutline = this.updateTransform = H
				} else e &&
					(delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(f, a));
				return this
			},
			destroyTextPath: function(a, b) { var f;
				b.element.setAttribute("id", ""); for(f = this.textPathWrapper.element.childNodes; f.length;) a.firstChild.appendChild(f[0]);
				a.firstChild.removeChild(this.textPathWrapper.element);
				delete b.textPathWrapper },
			fillSetter: function(a, b, f) { "string" === typeof a ? f.setAttribute(b, a) : a && this.complexColor(a, b, f) },
			visibilitySetter: function(a, b, f) {
				"inherit" === a ? f.removeAttribute(b) : this[b] !==
					a && f.setAttribute(b, a);
				this[b] = a
			},
			zIndexSetter: function(a, b) {
				var f = this.renderer,
					q = this.parentGroup,
					d = (q || f).element || f.box,
					e = this.element,
					k = !1;
				f = d === f.box;
				var g = this.added;
				var c;
				y(a) ? (e.setAttribute("data-z-index", a), a = +a, this[b] === a && (g = !1)) : y(this[b]) && e.removeAttribute("data-z-index");
				this[b] = a;
				if(g) {
					(a = this.zIndex) && q && (q.handleZ = !0);
					b = d.childNodes;
					for(c = b.length - 1; 0 <= c && !k; c--) {
						q = b[c];
						g = q.getAttribute("data-z-index");
						var h = !y(g);
						if(q !== e)
							if(0 > a && h && !f && !c) d.insertBefore(e, b[c]), k = !0;
							else if(D(g) <=
							a || h && (!y(a) || 0 <= a)) d.insertBefore(e, b[c + 1] || null), k = !0
					}
					k || (d.insertBefore(e, b[f ? 3 : 0] || null), k = !0)
				}
				return k
			},
			_defaultSetter: function(a, b, f) { f.setAttribute(b, a) }
		});
		L.prototype.yGetter = L.prototype.xGetter;
		L.prototype.translateXSetter = L.prototype.translateYSetter = L.prototype.rotationSetter = L.prototype.verticalAlignSetter = L.prototype.rotationOriginXSetter = L.prototype.rotationOriginYSetter = L.prototype.scaleXSetter = L.prototype.scaleYSetter = L.prototype.matrixSetter = function(a, b) {
			this[b] = a;
			this.doTransform = !0
		};
		L.prototype["stroke-widthSetter"] = L.prototype.strokeSetter = function(a, b, f) { this[b] = a;
			this.stroke && this["stroke-width"] ? (L.prototype.fillSetter.call(this, this.stroke, "stroke", f), f.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke ? (f.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (f.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) };
		p = c.SVGRenderer = function() {
			this.init.apply(this,
				arguments)
		};
		E(p.prototype, {
			Element: L,
			SVG_NS: T,
			init: function(a, f, q, d, e, k, c) {
				var h = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" });
				c || h.css(this.getStyle(d));
				d = h.element;
				a.appendChild(d);
				b(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && b(d, "xmlns", this.SVG_NS);
				this.isSVG = !0;
				this.box = d;
				this.boxWrapper = h;
				this.alignedObjects = [];
				this.url = (x || A) && u.getElementsByTagName("base").length ? S.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g,
					"%20") : "";
				this.createElement("desc").add().element.appendChild(u.createTextNode("Created with Highcharts 7.1.3"));
				this.defs = this.createElement("defs").add();
				this.allowHTML = k;
				this.forExport = e;
				this.styledMode = c;
				this.gradients = {};
				this.cache = {};
				this.cacheKeys = [];
				this.imgCount = 0;
				this.setSize(f, q, !1);
				var I;
				x && a.getBoundingClientRect && (f = function() { g(a, { left: 0, top: 0 });
					I = a.getBoundingClientRect();
					g(a, { left: Math.ceil(I.left) - I.left + "px", top: Math.ceil(I.top) - I.top + "px" }) }, f(), this.unSubPixelFix = n(S, "resize",
					f))
			},
			definition: function(a) {
				function b(a, q) { var d;
					w(a).forEach(function(a) { var e = f.createElement(a.tagName),
							k = {};
						v(a, function(a, b) { "tagName" !== b && "children" !== b && "textContent" !== b && (k[b] = a) });
						e.attr(k);
						e.add(q || f.defs);
						a.textContent && e.element.appendChild(u.createTextNode(a.textContent));
						b(a.children || [], e);
						d = e }); return d } var f = this; return b(a) },
			getStyle: function(a) { return this.style = E({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, a) },
			setStyle: function(a) { this.boxWrapper.css(this.getStyle(a)) },
			isHidden: function() { return !this.boxWrapper.getBBox().width },
			destroy: function() { var a = this.defs;
				this.box = null;
				this.boxWrapper = this.boxWrapper.destroy();
				m(this.gradients || {});
				this.gradients = null;
				a && (this.defs = a.destroy());
				this.unSubPixelFix && this.unSubPixelFix(); return this.alignedObjects = null },
			createElement: function(a) { var b = new this.Element;
				b.init(this, a); return b },
			draw: H,
			getRadialAttr: function(a, b) { return { cx: a[0] - a[2] / 2 + b.cx * a[2], cy: a[1] - a[2] / 2 + b.cy * a[2], r: b.r * a[2] } },
			truncate: function(a, b, f, d, q,
				e, k) {
				var g = this,
					c = a.rotation,
					h, I = d ? 1 : 0,
					B = (f || d).length,
					m = B,
					A = [],
					C = function(a) { b.firstChild && b.removeChild(b.firstChild);
						a && b.appendChild(u.createTextNode(a)) },
					N = function(e, c) { c = c || e; if(void 0 === A[c])
							if(b.getSubStringLength) try { A[c] = q + b.getSubStringLength(0, d ? c + 1 : c) } catch(ba) { "" } else g.getSpanWidth && (C(k(f || d, e)), A[c] = q + g.getSpanWidth(a, b)); return A[c] },
					L;
				a.rotation = 0;
				var P = N(b.textContent.length);
				if(L = q + P > e) {
					for(; I <= B;) m = Math.ceil((I + B) / 2), d && (h = k(d, m)), P = N(m, h && h.length - 1), I === B ? I = B + 1 : P > e ? B = m - 1 :
						I = m;
					0 === B ? C("") : f && B === f.length - 1 || C(h || k(f || d, m))
				}
				d && d.splice(0, m);
				a.actualWidth = P;
				a.rotation = c;
				return L
			},
			escapes: { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" },
			buildText: function(a) {
				var f = a.element,
					d = this,
					e = d.forExport,
					k = q(a.textStr, "").toString(),
					c = -1 !== k.indexOf("<"),
					h = f.childNodes,
					B, I = b(f, "x"),
					m = a.styles,
					A = a.textWidth,
					C = m && m.lineHeight,
					L = m && m.textOutline,
					t = m && "ellipsis" === m.textOverflow,
					H = m && "nowrap" === m.whiteSpace,
					x = m && m.fontSize,
					n, l = h.length;
				m = A && !a.added && this.box;
				var E = function(a) {
						var b;
						d.styledMode || (b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : x || d.style.fontSize || 12);
						return C ? D(C) : d.fontMetrics(b, a.getAttribute("style") ? a : f).h
					},
					w = function(a, b) { v(d.escapes, function(f, d) { b && -1 !== b.indexOf(f) || (a = a.toString().replace(new RegExp(f, "g"), d)) }); return a },
					R = function(a, b) { var f = a.indexOf("<");
						a = a.substring(f, a.indexOf(">") - f);
						f = a.indexOf(b + "="); if(-1 !== f && (f = f + b.length + 1, b = a.charAt(f), '"' === b || "'" === b)) return a = a.substring(f + 1), a.substring(0, a.indexOf(b)) },
					r = /<br.*?>/g;
				var S = [k, t, H, C, L, x, A].join();
				if(S !== a.textCache) {
					for(a.textCache = S; l--;) f.removeChild(h[l]);
					c || L || t || A || -1 !== k.indexOf(" ") && (!H || r.test(k)) ? (m && m.appendChild(f), c ? (k = d.styledMode ? k.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(/<(i|em)>/g, '<span class="highcharts-emphasized">') : k.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">'), k = k.replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(r)) : k = [k], k =
						k.filter(function(a) { return "" !== a }), k.forEach(function(q, k) {
							var c = 0,
								h = 0;
							q = q.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
							var m = q.split("|||");
							m.forEach(function(q) {
								if("" !== q || 1 === m.length) {
									var C = {},
										L = u.createElementNS(d.SVG_NS, "tspan"),
										P, l;
									(P = R(q, "class")) && b(L, "class", P);
									if(P = R(q, "style")) P = P.replace(/(;| |^)color([ :])/, "$1fill$2"), b(L, "style", P);
									(l = R(q, "href")) && !e && (b(L, "onclick", 'location.href="' + l + '"'), b(L, "class", "highcharts-anchor"), d.styledMode ||
										g(L, { cursor: "pointer" }));
									q = w(q.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
									if(" " !== q) {
										L.appendChild(u.createTextNode(q));
										c ? C.dx = 0 : k && null !== I && (C.x = I);
										b(L, C);
										f.appendChild(L);
										!c && n && (!N && e && g(L, { display: "block" }), b(L, "dy", E(L)));
										if(A) {
											var Q = q.replace(/([^\^])-/g, "$1- ").split(" ");
											C = !H && (1 < m.length || k || 1 < Q.length);
											l = 0;
											var r = E(L);
											if(t) B = d.truncate(a, L, q, void 0, 0, Math.max(0, A - parseInt(x || 12, 10)), function(a, b) { return a.substring(0, b) + "\u2026" });
											else if(C)
												for(; Q.length;) Q.length && !H && 0 < l && (L = u.createElementNS(T,
													"tspan"), b(L, { dy: r, x: I }), P && b(L, "style", P), L.appendChild(u.createTextNode(Q.join(" ").replace(/- /g, "-"))), f.appendChild(L)), d.truncate(a, L, null, Q, 0 === l ? h : 0, A, function(a, b) { return Q.slice(0, b).join(" ").replace(/- /g, "-") }), h = a.actualWidth, l++
										}
										c++
									}
								}
							});
							n = n || f.childNodes.length
						}), t && B && a.attr("title", w(a.textStr, ["&lt;", "&gt;"])), m && m.removeChild(f), L && a.applyTextOutline && a.applyTextOutline(L)) : f.appendChild(u.createTextNode(w(k)))
				}
			},
			getContrast: function(b) {
				b = a(b).rgba;
				b[0] *= 1;
				b[1] *= 1.2;
				b[2] *= .5;
				return 459 <
					b[0] + b[1] + b[2] ? "#000000" : "#FFFFFF"
			},
			button: function(a, b, f, d, q, e, g, c, h, m) {
				var I = this.label(a, b, f, h, null, null, m, null, "button"),
					A = 0,
					C = this.styledMode;
				I.attr(B({ padding: 8, r: 2 }, q));
				if(!C) {
					q = B({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, q);
					var N = q.style;
					delete q.style;
					e = B(q, { fill: "#e6e6e6" }, e);
					var L = e.style;
					delete e.style;
					g = B(q, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, g);
					var t = g.style;
					delete g.style;
					c = B(q, { style: { color: "#cccccc" } },
						c);
					var H = c.style;
					delete c.style
				}
				n(I.element, k ? "mouseover" : "mouseenter", function() { 3 !== A && I.setState(1) });
				n(I.element, k ? "mouseout" : "mouseleave", function() { 3 !== A && I.setState(A) });
				I.setState = function(a) { 1 !== a && (I.state = A = a);
					I.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
					C || I.attr([q, e, g, c][a || 0]).css([N, L, t, H][a || 0]) };
				C || I.attr(q).css(E({ cursor: "default" }, N));
				return I.on("click", function(a) {
					3 !== A && d.call(I,
						a)
				})
			},
			crispLine: function(a, b) { a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
				a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2); return a },
			path: function(a) { var b = this.styledMode ? {} : { fill: "none" };
				F(a) ? b.d = a : r(a) && E(b, a); return this.createElement("path").attr(b) },
			circle: function(a, b, f) { a = r(a) ? a : void 0 === a ? {} : { x: a, y: b, r: f };
				b = this.createElement("circle");
				b.xSetter = b.ySetter = function(a, b, f) { f.setAttribute("c" + b, a) }; return b.attr(a) },
			arc: function(a, b, f, q, d, e) {
				r(a) ? (q = a, b = q.y, f = q.r, a = q.x) : q = {
					innerR: q,
					start: d,
					end: e
				};
				a = this.symbol("arc", a, b, f, f, q);
				a.r = f;
				return a
			},
			rect: function(a, f, q, d, e, k) { e = r(a) ? a.r : e; var g = this.createElement("rect");
				a = r(a) ? a : void 0 === a ? {} : { x: a, y: f, width: Math.max(q, 0), height: Math.max(d, 0) };
				this.styledMode || (void 0 !== k && (a.strokeWidth = k, a = g.crisp(a)), a.fill = "none");
				e && (a.r = e);
				g.rSetter = function(a, f, q) { g.r = a;
					b(q, { rx: a, ry: a }) };
				g.rGetter = function() { return g.r }; return g.attr(a) },
			setSize: function(a, b, f) {
				var d = this.alignedObjects,
					e = d.length;
				this.width = a;
				this.height = b;
				for(this.boxWrapper.animate({
						width: a,
						height: b
					}, { step: function() { this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") }) }, duration: q(f, !0) ? void 0 : 0 }); e--;) d[e].align()
			},
			g: function(a) { var b = this.createElement("g"); return a ? b.attr({ "class": "highcharts-" + a }) : b },
			image: function(a, b, f, q, d, e) {
				var k = { preserveAspectRatio: "none" },
					g = function(a, b) { a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : a.setAttribute("hc-svg-href", b) },
					c = function(b) { g(h.element, a);
						e.call(h, b) };
				1 < arguments.length && E(k, {
					x: b,
					y: f,
					width: q,
					height: d
				});
				var h = this.createElement("image").attr(k);
				e ? (g(h.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), k = new S.Image, n(k, "load", c), k.src = a, k.complete && c({})) : g(h.element, a);
				return h
			},
			symbol: function(a, b, f, e, k, c) {
				var m = this,
					B = /^url\((.*?)\)$/,
					A = B.test(a),
					C = !A && (this.symbols[a] ? a : "circle"),
					I = C && this.symbols[C],
					N = y(b) && I && I.call(this.symbols, Math.round(b), Math.round(f), e, k, c);
				if(I) {
					var L = this.path(N);
					m.styledMode || L.attr("fill", "none");
					E(L, {
						symbolName: C,
						x: b,
						y: f,
						width: e,
						height: k
					});
					c && E(L, c)
				} else if(A) {
					var t = a.match(B)[1];
					L = this.image(t);
					L.imgwidth = q(R[t] && R[t].width, c && c.width);
					L.imgheight = q(R[t] && R[t].height, c && c.height);
					var H = function() { L.attr({ width: L.width, height: L.height }) };
					["width", "height"].forEach(function(a) {
						L[a + "Setter"] = function(a, b) {
							var f = {},
								q = this["img" + b],
								d = "width" === b ? "translateX" : "translateY";
							this[b] = a;
							y(q) && (c && "within" === c.backgroundSize && this.width && this.height && (q = Math.round(q * Math.min(this.width / this.imgwidth, this.height / this.imgheight))),
								this.element && this.element.setAttribute(b, q), this.alignByTranslate || (f[d] = ((this[b] || 0) - q) / 2, this.attr(f)))
						}
					});
					y(b) && L.attr({ x: b, y: f });
					L.isImg = !0;
					y(L.imgwidth) && y(L.imgheight) ? H() : (L.attr({ width: 0, height: 0 }), h("img", {
						onload: function() {
							var a = d[m.chartIndex];
							0 === this.width && (g(this, { position: "absolute", top: "-999em" }), u.body.appendChild(this));
							R[t] = { width: this.width, height: this.height };
							L.imgwidth = this.width;
							L.imgheight = this.height;
							L.element && H();
							this.parentNode && this.parentNode.removeChild(this);
							m.imgCount--;
							if(!m.imgCount && a && a.onload) a.onload()
						},
						src: t
					}), this.imgCount++)
				}
				return L
			},
			symbols: {
				circle: function(a, b, f, q) { return this.arc(a + f / 2, b + q / 2, f / 2, q / 2, { start: .5 * Math.PI, end: 2.5 * Math.PI, open: !1 }) },
				square: function(a, b, f, q) { return ["M", a, b, "L", a + f, b, a + f, b + q, a, b + q, "Z"] },
				triangle: function(a, b, f, q) { return ["M", a + f / 2, b, "L", a + f, b + q, a, b + q, "Z"] },
				"triangle-down": function(a, b, f, q) { return ["M", a, b, "L", a + f, b, a + f / 2, b + q, "Z"] },
				diamond: function(a, b, f, q) { return ["M", a + f / 2, b, "L", a + f, b + q / 2, a + f / 2, b + q, a, b + q / 2, "Z"] },
				arc: function(a,
					b, f, d, e) { var k = e.start,
						g = e.r || f,
						c = e.r || d || f,
						h = e.end - .001;
					f = e.innerR;
					d = q(e.open, .001 > Math.abs(e.end - e.start - 2 * Math.PI)); var m = Math.cos(k),
						B = Math.sin(k),
						A = Math.cos(h);
					h = Math.sin(h);
					k = .001 > e.end - k - Math.PI ? 0 : 1;
					e = ["M", a + g * m, b + c * B, "A", g, c, 0, k, q(e.clockwise, 1), a + g * A, b + c * h];
					y(f) && e.push(d ? "M" : "L", a + f * A, b + f * h, "A", f, f, 0, k, 0, a + f * m, b + f * B);
					e.push(d ? "" : "Z"); return e },
				callout: function(a, b, f, q, d) {
					var e = Math.min(d && d.r || 0, f, q),
						k = e + 6,
						g = d && d.anchorX;
					d = d && d.anchorY;
					var c = ["M", a + e, b, "L", a + f - e, b, "C", a + f, b, a + f, b, a + f, b +
						e, "L", a + f, b + q - e, "C", a + f, b + q, a + f, b + q, a + f - e, b + q, "L", a + e, b + q, "C", a, b + q, a, b + q, a, b + q - e, "L", a, b + e, "C", a, b, a, b, a + e, b
					];
					g && g > f ? d > b + k && d < b + q - k ? c.splice(13, 3, "L", a + f, d - 6, a + f + 6, d, a + f, d + 6, a + f, b + q - e) : c.splice(13, 3, "L", a + f, q / 2, g, d, a + f, q / 2, a + f, b + q - e) : g && 0 > g ? d > b + k && d < b + q - k ? c.splice(33, 3, "L", a, d + 6, a - 6, d, a, d - 6, a, b + e) : c.splice(33, 3, "L", a, q / 2, g, d, a, q / 2, a, b + e) : d && d > q && g > a + k && g < a + f - k ? c.splice(23, 3, "L", g + 6, b + q, g, b + q + 6, g - 6, b + q, a + e, b + q) : d && 0 > d && g > a + k && g < a + f - k && c.splice(3, 3, "L", g - 6, b, g, b - 6, g + 6, b, f - e, b);
					return c
				}
			},
			clipRect: function(a,
				b, f, q) { var d = c.uniqueKey() + "-",
					e = this.createElement("clipPath").attr({ id: d }).add(this.defs);
				a = this.rect(a, b, f, q, 0).add(e);
				a.id = d;
				a.clipPath = e;
				a.count = 0; return a },
			text: function(a, b, f, q) {
				var d = {};
				if(q && (this.allowHTML || !this.forExport)) return this.html(a, b, f);
				d.x = Math.round(b || 0);
				f && (d.y = Math.round(f));
				y(a) && (d.text = a);
				a = this.createElement("text").attr(d);
				q || (a.xSetter = function(a, b, f) {
					var q = f.getElementsByTagName("tspan"),
						d = f.getAttribute(b),
						e;
					for(e = 0; e < q.length; e++) {
						var k = q[e];
						k.getAttribute(b) ===
							d && k.setAttribute(b, a)
					}
					f.setAttribute(b, a)
				});
				return a
			},
			fontMetrics: function(a, b) { a = !this.styledMode && /px/.test(a) || !S.getComputedStyle ? a || b && b.style && b.style.fontSize || this.style && this.style.fontSize : b && L.prototype.getStyle.call(b, "font-size");
				a = /px/.test(a) ? D(a) : 12;
				b = 24 > a ? a + 3 : Math.round(1.2 * a); return { h: b, b: Math.round(.8 * b), f: a } },
			rotCorr: function(a, b, f) { var q = a;
				b && f && (q = Math.max(q * Math.cos(b * e), 4)); return { x: -a / 3 * Math.sin(b * e), y: q } },
			label: function(a, b, q, d, e, k, g, c, h) {
				var m = this,
					A = m.styledMode,
					C = m.g("button" !==
						h && "label"),
					N = C.text = m.text("", 0, 0, g).attr({ zIndex: 1 }),
					t, H, u = 0,
					x = 3,
					n = 0,
					I, l, T, P, w, Q = {},
					R, r, S = /^url\((.*?)\)$/.test(d),
					v = A || S,
					p = function() { return A ? t.strokeWidth() % 2 / 2 : (R ? parseInt(R, 10) : 0) % 2 / 2 };
				h && C.addClass("highcharts-" + h);
				var K = function() {
					var a = N.element.style,
						b = {};
					H = (void 0 === I || void 0 === l || w) && y(N.textStr) && N.getBBox();
					C.width = (I || H.width || 0) + 2 * x + n;
					C.height = (l || H.height || 0) + 2 * x;
					r = x + Math.min(m.fontMetrics(a && a.fontSize, N).b, H ? H.height : Infinity);
					v && (t || (C.box = t = m.symbols[d] || S ? m.symbol(d) : m.rect(),
						t.addClass(("button" === h ? "" : "highcharts-label-box") + (h ? " highcharts-" + h + "-box" : "")), t.add(C), a = p(), b.x = a, b.y = (c ? -r : 0) + a), b.width = Math.round(C.width), b.height = Math.round(C.height), t.attr(E(b, Q)), Q = {})
				};
				var D = function() { var a = n + x; var b = c ? 0 : r;
					y(I) && H && ("center" === w || "right" === w) && (a += { center: .5, right: 1 }[w] * (I - H.width)); if(a !== N.x || b !== N.y) N.attr("x", a), N.hasBoxWidthChanged && (H = N.getBBox(!0), K()), void 0 !== b && N.attr("y", b);
					N.x = a;
					N.y = b };
				var V = function(a, b) { t ? t.attr(a, b) : Q[a] = b };
				C.onAdd = function() {
					N.add(C);
					C.attr({ text: a || 0 === a ? a : "", x: b, y: q });
					t && y(e) && C.attr({ anchorX: e, anchorY: k })
				};
				C.widthSetter = function(a) { I = z(a) ? a : null };
				C.heightSetter = function(a) { l = a };
				C["text-alignSetter"] = function(a) { w = a };
				C.paddingSetter = function(a) { y(a) && a !== x && (x = C.padding = a, D()) };
				C.paddingLeftSetter = function(a) { y(a) && a !== n && (n = a, D()) };
				C.alignSetter = function(a) { a = { left: 0, center: .5, right: 1 }[a];
					a !== u && (u = a, H && C.attr({ x: T })) };
				C.textSetter = function(a) { void 0 !== a && N.attr({ text: a });
					K();
					D() };
				C["stroke-widthSetter"] = function(a, b) {
					a && (v = !0);
					R = this["stroke-width"] = a;
					V(b, a)
				};
				A ? C.rSetter = function(a, b) { V(b, a) } : C.strokeSetter = C.fillSetter = C.rSetter = function(a, b) { "r" !== b && ("fill" === b && a && (v = !0), C[b] = a);
					V(b, a) };
				C.anchorXSetter = function(a, b) { e = C.anchorX = a;
					V(b, Math.round(a) - p() - T) };
				C.anchorYSetter = function(a, b) { k = C.anchorY = a;
					V(b, a - P) };
				C.xSetter = function(a) { C.x = a;
					u && (a -= u * ((I || H.width) + 2 * x), C["forceAnimate:x"] = !0);
					T = Math.round(a);
					C.attr("translateX", T) };
				C.ySetter = function(a) { P = C.y = Math.round(a);
					C.attr("translateY", P) };
				var U = C.css;
				g = {
					css: function(a) {
						if(a) {
							var b = {};
							a = B(a);
							C.textProps.forEach(function(f) { void 0 !== a[f] && (b[f] = a[f], delete a[f]) });
							N.css(b);
							"width" in b && K();
							"fontSize" in b && (K(), D())
						}
						return U.call(C, a)
					},
					getBBox: function() { return { width: H.width + 2 * x, height: H.height + 2 * x, x: H.x - x, y: H.y - x } },
					destroy: function() { f(C.element, "mouseenter");
						f(C.element, "mouseleave");
						N && (N = N.destroy());
						t && (t = t.destroy());
						L.prototype.destroy.call(C);
						C = m = K = D = V = null }
				};
				A || (g.shadow = function(a) { a && (K(), t && t.shadow(a)); return C });
				return E(C, g)
			}
		});
		c.Renderer = p
	});
	M(J, "parts/Html.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.pInt,
			F = c.attr,
			z = c.createElement,
			r = c.css,
			K = c.extend,
			v = c.isFirefox,
			D = c.isMS,
			w = c.isWebKit,
			n = c.pick,
			l = c.SVGElement;
		p = c.SVGRenderer;
		var b = c.win;
		K(l.prototype, {
			htmlCss: function(b) {
				var a = "SPAN" === this.element.tagName && b && "width" in b,
					d = n(a && b.width, void 0);
				if(a) { delete b.width;
					this.textWidth = d; var c = !0 } b && "ellipsis" === b.textOverflow && (b.whiteSpace = "nowrap", b.overflow = "hidden");
				this.styles = K(this.styles, b);
				r(this.element, b);
				c && this.htmlUpdateTransform();
				return this
			},
			htmlGetBBox: function() { var b = this.element; return { x: b.offsetLeft, y: b.offsetTop, width: b.offsetWidth, height: b.offsetHeight } },
			htmlUpdateTransform: function() {
				if(this.added) {
					var b = this.renderer,
						a = this.element,
						g = this.translateX || 0,
						c = this.translateY || 0,
						e = this.x || 0,
						m = this.y || 0,
						u = this.textAlign || "left",
						n = { left: 0, center: .5, right: 1 }[u],
						t = this.styles,
						x = t && t.whiteSpace;
					r(a, { marginLeft: g, marginTop: c });
					!b.styledMode && this.shadows && this.shadows.forEach(function(a) {
						r(a, {
							marginLeft: g +
								1,
							marginTop: c + 1
						})
					});
					this.inverted && [].forEach.call(a.childNodes, function(d) { b.invertChild(d, a) });
					if("SPAN" === a.tagName) {
						t = this.rotation;
						var k = this.textWidth && G(this.textWidth),
							A = [t, u, a.innerHTML, this.textWidth, this.textAlign].join(),
							B;
						(B = k !== this.oldTextWidth) && !(B = k > this.oldTextWidth) && ((B = this.textPxLength) || (r(a, { width: "", whiteSpace: x || "nowrap" }), B = a.offsetWidth), B = B > k);
						B && (/[ \-]/.test(a.textContent || a.innerText) || "ellipsis" === a.style.textOverflow) ? (r(a, {
							width: k + "px",
							display: "block",
							whiteSpace: x ||
								"normal"
						}), this.oldTextWidth = k, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
						A !== this.cTT && (x = b.fontMetrics(a.style.fontSize, a).b, !y(t) || t === (this.oldRotation || 0) && u === this.oldAlign || this.setSpanRotation(t, n, x), this.getSpanCorrection(!y(t) && this.textPxLength || a.offsetWidth, x, n, t, u));
						r(a, { left: e + (this.xCorr || 0) + "px", top: m + (this.yCorr || 0) + "px" });
						this.cTT = A;
						this.oldRotation = t;
						this.oldAlign = u
					}
				} else this.alignOnAdd = !0
			},
			setSpanRotation: function(b, a, g) {
				var d = {},
					e = this.renderer.getTransformKey();
				d[e] = d.transform = "rotate(" + b + "deg)";
				d[e + (v ? "Origin" : "-origin")] = d.transformOrigin = 100 * a + "% " + g + "px";
				r(this.element, d)
			},
			getSpanCorrection: function(b, a, g) { this.xCorr = -b * g;
				this.yCorr = -a }
		});
		K(p.prototype, {
			getTransformKey: function() { return D && !/Edge/.test(b.navigator.userAgent) ? "-ms-transform" : w ? "-webkit-transform" : v ? "MozTransform" : b.opera ? "-o-transform" : "" },
			html: function(b, a, g) {
				var d = this.createElement("span"),
					e = d.element,
					m = d.renderer,
					u = m.isSVG,
					E = function(a, b) {
						["opacity", "visibility"].forEach(function(d) {
							a[d +
								"Setter"] = function(e, k, q) { var f = a.div ? a.div.style : b;
								l.prototype[d + "Setter"].call(this, e, k, q);
								f && (f[k] = e) }
						});
						a.addedSetters = !0
					},
					t = c.charts[m.chartIndex];
				t = t && t.styledMode;
				d.textSetter = function(a) { a !== e.innerHTML && (delete this.bBox, delete this.oldTextWidth);
					this.textStr = a;
					e.innerHTML = n(a, "");
					d.doTransform = !0 };
				u && E(d, d.element.style);
				d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function(a, b) { "align" === b && (b = "textAlign");
					d[b] = a;
					d.doTransform = !0 };
				d.afterSetters = function() {
					this.doTransform && (this.htmlUpdateTransform(),
						this.doTransform = !1)
				};
				d.attr({ text: b, x: Math.round(a), y: Math.round(g) }).css({ position: "absolute" });
				t || d.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize });
				e.style.whiteSpace = "nowrap";
				d.css = d.htmlCss;
				u && (d.add = function(a) {
					var b = m.box.parentNode,
						g = [];
					if(this.parentGroup = a) {
						var c = a.div;
						if(!c) {
							for(; a;) g.push(a), a = a.parentGroup;
							g.reverse().forEach(function(a) {
								function q(b, f) { a[f] = b; "translateX" === f ? e.left = b + "px" : e.top = b + "px";
									a.doTransform = !0 }
								var f = F(a.element, "class");
								f && (f = { className: f });
								c = a.div = a.div || z("div", f, { position: "absolute", left: (a.translateX || 0) + "px", top: (a.translateY || 0) + "px", display: a.display, opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents }, c || b);
								var e = c.style;
								K(a, { classSetter: function(a) { return function(b) { this.element.setAttribute("class", b);
											a.className = b } }(c), on: function() { g[0].div && d.on.apply({ element: g[0].div }, arguments); return a }, translateXSetter: q, translateYSetter: q });
								a.addedSetters || E(a)
							})
						}
					} else c = b;
					c.appendChild(e);
					d.added = !0;
					d.alignOnAdd && d.htmlUpdateTransform();
					return d
				});
				return d
			}
		})
	});
	M(J, "parts/Time.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.isObject,
			F = p.objectEach,
			z = p.splat,
			r = c.extend,
			K = c.merge,
			v = c.pick,
			D = c.timeUnits,
			w = c.win;
		c.Time = function(c) { this.update(c, !1) };
		c.Time.prototype = {
			defaultOptions: {},
			update: function(c) {
				var n = v(c && c.useUTC, !0),
					b = this;
				this.options = c = K(!0, this.options || {}, c);
				this.Date = c.Date || w.Date || Date;
				this.timezoneOffset = (this.useUTC = n) && c.timezoneOffset;
				this.getTimezoneOffset = this.timezoneOffsetFunction();
				(this.variableTimezone = !(n && !c.getTimezoneOffset && !c.timezone)) || this.timezoneOffset ? (this.get = function(d, a) { var g = a.getTime(),
						c = g - b.getTimezoneOffset(a);
					a.setTime(c);
					d = a["getUTC" + d]();
					a.setTime(g); return d }, this.set = function(d, a, g) { if("Milliseconds" === d || "Seconds" === d || "Minutes" === d && 0 === a.getTimezoneOffset() % 60) a["set" + d](g);
					else { var c = b.getTimezoneOffset(a);
						c = a.getTime() - c;
						a.setTime(c);
						a["setUTC" + d](g);
						d = b.getTimezoneOffset(a);
						c = a.getTime() + d;
						a.setTime(c) } }) : n ? (this.get = function(b, a) {
					return a["getUTC" +
						b]()
				}, this.set = function(b, a, c) { return a["setUTC" + b](c) }) : (this.get = function(b, a) { return a["get" + b]() }, this.set = function(b, a, c) { return a["set" + b](c) })
			},
			makeTime: function(n, l, b, d, a, g) { if(this.useUTC) { var h = this.Date.UTC.apply(0, arguments); var e = this.getTimezoneOffset(h);
					h += e; var m = this.getTimezoneOffset(h);
					e !== m ? h += m - e : e - 36E5 !== this.getTimezoneOffset(h - 36E5) || c.isSafari || (h -= 36E5) } else h = (new this.Date(n, l, v(b, 1), v(d, 0), v(a, 0), v(g, 0))).getTime(); return h },
			timezoneOffsetFunction: function() {
				var n = this,
					l = this.options,
					b = w.moment;
				if(!this.useUTC) return function(b) { return 6E4 * (new Date(b)).getTimezoneOffset() };
				if(l.timezone) { if(b) return function(d) { return 6E4 * -b.tz(d, l.timezone).utcOffset() };
					c.error(25) }
				return this.useUTC && l.getTimezoneOffset ? function(b) { return 6E4 * l.getTimezoneOffset(b) } : function() { return 6E4 * (n.timezoneOffset || 0) }
			},
			dateFormat: function(n, l, b) {
				if(!y(l) || isNaN(l)) return c.defaultOptions.lang.invalidDate || "";
				n = c.pick(n, "%Y-%m-%d %H:%M:%S");
				var d = this,
					a = new this.Date(l),
					g = this.get("Hours",
						a),
					h = this.get("Day", a),
					e = this.get("Date", a),
					m = this.get("Month", a),
					u = this.get("FullYear", a),
					E = c.defaultOptions.lang,
					t = E.weekdays,
					x = E.shortWeekdays,
					k = c.pad;
				a = c.extend({ a: x ? x[h] : t[h].substr(0, 3), A: t[h], d: k(e), e: k(e, 2, " "), w: h, b: E.shortMonths[m], B: E.months[m], m: k(m + 1), o: m + 1, y: u.toString().substr(2, 2), Y: u, H: k(g), k: g, I: k(g % 12 || 12), l: g % 12 || 12, M: k(d.get("Minutes", a)), p: 12 > g ? "AM" : "PM", P: 12 > g ? "am" : "pm", S: k(a.getSeconds()), L: k(Math.floor(l % 1E3), 3) }, c.dateFormats);
				F(a, function(a, b) {
					for(; - 1 !== n.indexOf("%" + b);) n =
						n.replace("%" + b, "function" === typeof a ? a.call(d, l) : a)
				});
				return b ? n.substr(0, 1).toUpperCase() + n.substr(1) : n
			},
			resolveDTLFormat: function(c) { return G(c, !0) ? c : (c = z(c), { main: c[0], from: c[1], to: c[2] }) },
			getTimeTicks: function(c, l, b, d) {
				var a = this,
					g = [],
					h = {};
				var e = new a.Date(l);
				var m = c.unitRange,
					u = c.count || 1,
					n;
				d = v(d, 1);
				if(y(l)) {
					a.set("Milliseconds", e, m >= D.second ? 0 : u * Math.floor(a.get("Milliseconds", e) / u));
					m >= D.second && a.set("Seconds", e, m >= D.minute ? 0 : u * Math.floor(a.get("Seconds", e) / u));
					m >= D.minute && a.set("Minutes",
						e, m >= D.hour ? 0 : u * Math.floor(a.get("Minutes", e) / u));
					m >= D.hour && a.set("Hours", e, m >= D.day ? 0 : u * Math.floor(a.get("Hours", e) / u));
					m >= D.day && a.set("Date", e, m >= D.month ? 1 : Math.max(1, u * Math.floor(a.get("Date", e) / u)));
					if(m >= D.month) { a.set("Month", e, m >= D.year ? 0 : u * Math.floor(a.get("Month", e) / u)); var t = a.get("FullYear", e) } m >= D.year && a.set("FullYear", e, t - t % u);
					m === D.week && (t = a.get("Day", e), a.set("Date", e, a.get("Date", e) - t + d + (t < d ? -7 : 0)));
					t = a.get("FullYear", e);
					d = a.get("Month", e);
					var x = a.get("Date", e),
						k = a.get("Hours",
							e);
					l = e.getTime();
					a.variableTimezone && (n = b - l > 4 * D.month || a.getTimezoneOffset(l) !== a.getTimezoneOffset(b));
					l = e.getTime();
					for(e = 1; l < b;) g.push(l), l = m === D.year ? a.makeTime(t + e * u, 0) : m === D.month ? a.makeTime(t, d + e * u) : !n || m !== D.day && m !== D.week ? n && m === D.hour && 1 < u ? a.makeTime(t, d, x, k + e * u) : l + m * u : a.makeTime(t, d, x + e * u * (m === D.day ? 1 : 7)), e++;
					g.push(l);
					m <= D.hour && 1E4 > g.length && g.forEach(function(b) { 0 === b % 18E5 && "000000000" === a.dateFormat("%H%M%S%L", b) && (h[b] = "day") })
				}
				g.info = r(c, { higherRanks: h, totalRange: m * u });
				return g
			}
		}
	});
	M(J, "parts/Options.js", [J["parts/Globals.js"]], function(c) {
		var p = c.color,
			y = c.merge;
		c.defaultOptions = {
			colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
			symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
			lang: {
				loading: "Loading...",
				months: "January February March April May June July August September October November December".split(" "),
				shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
				weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
				decimalPoint: ".",
				numericSymbols: "kMGTPE".split(""),
				resetZoom: "Reset zoom",
				resetZoomTitle: "Reset zoom level 1:1",
				thousandsSep: " "
			},
			global: {},
			time: c.Time.prototype.defaultOptions,
			chart: { styledMode: !1, borderRadius: 0, colorCount: 10, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } }, width: null, height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" },
			title: {
				text: "Chart title",
				align: "center",
				margin: 15,
				widthAdjust: -44
			},
			subtitle: { text: "", align: "center", widthAdjust: -44 },
			plotOptions: {},
			labels: { style: { position: "absolute", color: "#333333" } },
			legend: {
				enabled: !0,
				align: "center",
				alignColumns: !0,
				layout: "horizontal",
				labelFormatter: function() { return this.name },
				borderColor: "#999999",
				borderRadius: 0,
				navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
				itemStyle: { color: "#333333", cursor: "pointer", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" },
				itemHoverStyle: { color: "#000000" },
				itemHiddenStyle: { color: "#cccccc" },
				shadow: !1,
				itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" },
				squareSymbol: !0,
				symbolPadding: 5,
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				title: { style: { fontWeight: "bold" } }
			},
			loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center" } },
			tooltip: {
				enabled: !0,
				animation: c.svg,
				borderRadius: 3,
				dateTimeLabelFormats: {
					millisecond: "%A, %b %e, %H:%M:%S.%L",
					second: "%A, %b %e, %H:%M:%S",
					minute: "%A, %b %e, %H:%M",
					hour: "%A, %b %e, %H:%M",
					day: "%A, %b %e, %Y",
					week: "Week from %A, %b %e, %Y",
					month: "%B %Y",
					year: "%Y"
				},
				footerFormat: "",
				padding: 8,
				snap: c.isTouchDevice ? 25 : 10,
				headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
				pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
				backgroundColor: p("#f7f7f7").setOpacity(.85).get(),
				borderWidth: 1,
				shadow: !0,
				style: { color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none", whiteSpace: "nowrap" }
			},
			credits: {
				enabled: !0,
				href: "https://www.highcharts.com?credits",
				position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 },
				style: { cursor: "pointer", color: "#999999", fontSize: "9px" },
				text: ""
			}
		};
		c.setOptions = function(p) { c.defaultOptions = y(!0, c.defaultOptions, p);
			c.time.update(y(c.defaultOptions.global, c.defaultOptions.time), !1); return c.defaultOptions };
		c.getOptions = function() { return c.defaultOptions };
		c.defaultPlotOptions = c.defaultOptions.plotOptions;
		c.time = new c.Time(y(c.defaultOptions.global, c.defaultOptions.time));
		c.dateFormat = function(p, y, z) {
			return c.time.dateFormat(p,
				y, z)
		};
		""
	});
	M(J, "parts/Tick.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.isNumber,
			F = c.correctFloat,
			z = c.destroyObjectProperties,
			r = c.fireEvent,
			K = c.merge,
			v = c.pick,
			D = c.deg2rad;
		c.Tick = function(c, n, l, b, d) { this.axis = c;
			this.pos = n;
			this.type = l || "";
			this.isNewLabel = this.isNew = !0;
			this.parameters = d || {};
			this.tickmarkOffset = this.parameters.tickmarkOffset;
			this.options = this.parameters.options;
			l || b || this.addLabel() };
		c.Tick.prototype = {
			addLabel: function() {
				var w = this,
					n = w.axis,
					l =
					n.options,
					b = n.chart,
					d = n.categories,
					a = n.names,
					g = w.pos,
					h = v(w.options && w.options.labels, l.labels),
					e = n.tickPositions,
					m = g === e[0],
					u = g === e[e.length - 1];
				d = this.parameters.category || (d ? v(d[g], a[g], g) : g);
				var E = w.label;
				e = e.info;
				var t, x;
				if(n.isDatetimeAxis && e) { var k = b.time.resolveDTLFormat(l.dateTimeLabelFormats[!l.grid && e.higherRanks[g] || e.unitName]); var A = k.main } w.isFirst = m;
				w.isLast = u;
				w.formatCtx = { axis: n, chart: b, isFirst: m, isLast: u, dateTimeLabelFormat: A, tickPositionInfo: e, value: n.isLog ? F(n.lin2log(d)) : d, pos: g };
				l = n.labelFormatter.call(w.formatCtx, this.formatCtx);
				if(x = k && k.list) w.shortenLabel = function() { for(t = 0; t < x.length; t++)
						if(E.attr({ text: n.labelFormatter.call(c.extend(w.formatCtx, { dateTimeLabelFormat: x[t] })) }), E.getBBox().width < n.getSlotWidth(w) - 2 * v(h.padding, 5)) return;
					E.attr({ text: "" }) };
				if(y(E)) E && E.textStr !== l && (!E.textWidth || h.style && h.style.width || E.styles.width || E.css({ width: null }), E.attr({ text: l }), E.textPxLength = E.getBBox().width);
				else {
					if(w.label = E = y(l) && h.enabled ? b.renderer.text(l, 0, 0, h.useHTML).add(n.labelGroup) :
						null) b.styledMode || E.css(K(h.style)), E.textPxLength = E.getBBox().width;
					w.rotation = 0
				}
			},
			getLabelSize: function() { return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0 },
			handleOverflow: function(c) {
				var n = this.axis,
					l = n.options.labels,
					b = c.x,
					d = n.chart.chartWidth,
					a = n.chart.spacing,
					g = v(n.labelLeft, Math.min(n.pos, a[3]));
				a = v(n.labelRight, Math.max(n.isRadial ? 0 : n.pos + n.len, d - a[1]));
				var h = this.label,
					e = this.rotation,
					m = { left: 0, center: .5, right: 1 }[n.labelAlign || h.attr("align")],
					u = h.getBBox().width,
					E = n.getSlotWidth(this),
					t = E,
					x = 1,
					k, A = {};
				if(e || "justify" !== v(l.overflow, "justify")) 0 > e && b - m * u < g ? k = Math.round(b / Math.cos(e * D) - g) : 0 < e && b + m * u > a && (k = Math.round((d - b) / Math.cos(e * D)));
				else if(d = b + (1 - m) * u, b - m * u < g ? t = c.x + t * (1 - m) - g : d > a && (t = a - c.x + t * m, x = -1), t = Math.min(E, t), t < E && "center" === n.labelAlign && (c.x += x * (E - t - m * (E - Math.min(u, t)))), u > t || n.autoRotation && (h.styles || {}).width) k = t;
				k && (this.shortenLabel ? this.shortenLabel() : (A.width = Math.floor(k), (l.style || {}).textOverflow || (A.textOverflow = "ellipsis"), h.css(A)))
			},
			getPosition: function(w, n, l, b) { var d = this.axis,
					a = d.chart,
					g = b && a.oldChartHeight || a.chartHeight;
				w = { x: w ? c.correctFloat(d.translate(n + l, null, null, b) + d.transB) : d.left + d.offset + (d.opposite ? (b && a.oldChartWidth || a.chartWidth) - d.right - d.left : 0), y: w ? g - d.bottom + d.offset - (d.opposite ? d.height : 0) : c.correctFloat(g - d.translate(n + l, null, null, b) - d.transB) };
				w.y = Math.max(Math.min(w.y, 1E5), -1E5);
				r(this, "afterGetPosition", { pos: w }); return w },
			getLabelPosition: function(c, n, l, b, d, a, g, h) {
				var e = this.axis,
					m = e.transA,
					u = e.reversed,
					E = e.staggerLines,
					t = e.tickRotCorr || { x: 0, y: 0 },
					x = d.y,
					k = b || e.reserveSpaceDefault ? 0 : -e.labelOffset * ("center" === e.labelAlign ? .5 : 1),
					A = {};
				y(x) || (x = 0 === e.side ? l.rotation ? -8 : -l.getBBox().height : 2 === e.side ? t.y + 8 : Math.cos(l.rotation * D) * (t.y - l.getBBox(!1, 0).height / 2));
				c = c + d.x + k + t.x - (a && b ? a * m * (u ? -1 : 1) : 0);
				n = n + x - (a && !b ? a * m * (u ? 1 : -1) : 0);
				E && (l = g / (h || 1) % E, e.opposite && (l = E - l - 1), n += e.labelOffset / E * l);
				A.x = c;
				A.y = Math.round(n);
				r(this, "afterGetLabelPosition", { pos: A, tickmarkOffset: a, index: g });
				return A
			},
			getMarkPath: function(c,
				n, l, b, d, a) { return a.crispLine(["M", c, n, "L", c + (d ? 0 : -l), n + (d ? l : 0)], b) },
			renderGridLine: function(c, n, l) {
				var b = this.axis,
					d = b.options,
					a = this.gridLine,
					g = {},
					h = this.pos,
					e = this.type,
					m = v(this.tickmarkOffset, b.tickmarkOffset),
					u = b.chart.renderer,
					E = e ? e + "Grid" : "grid",
					t = d[E + "LineWidth"],
					x = d[E + "LineColor"];
				d = d[E + "LineDashStyle"];
				a || (b.chart.styledMode || (g.stroke = x, g["stroke-width"] = t, d && (g.dashstyle = d)), e || (g.zIndex = 1), c && (n = 0), this.gridLine = a = u.path().attr(g).addClass("highcharts-" + (e ? e + "-" : "") + "grid-line").add(b.gridGroup));
				if(a && (l = b.getPlotLinePath({ value: h + m, lineWidth: a.strokeWidth() * l, force: "pass", old: c }))) a[c || this.isNew ? "attr" : "animate"]({ d: l, opacity: n })
			},
			renderMark: function(c, n, l) {
				var b = this.axis,
					d = b.options,
					a = b.chart.renderer,
					g = this.type,
					h = g ? g + "Tick" : "tick",
					e = b.tickSize(h),
					m = this.mark,
					u = !m,
					E = c.x;
				c = c.y;
				var t = v(d[h + "Width"], !g && b.isXAxis ? 1 : 0);
				d = d[h + "Color"];
				e && (b.opposite && (e[0] = -e[0]), u && (this.mark = m = a.path().addClass("highcharts-" + (g ? g + "-" : "") + "tick").add(b.axisGroup), b.chart.styledMode || m.attr({ stroke: d, "stroke-width": t })),
					m[u ? "attr" : "animate"]({ d: this.getMarkPath(E, c, e[0], m.strokeWidth() * l, b.horiz, a), opacity: n }))
			},
			renderLabel: function(c, n, l, b) {
				var d = this.axis,
					a = d.horiz,
					g = d.options,
					h = this.label,
					e = g.labels,
					m = e.step;
				d = v(this.tickmarkOffset, d.tickmarkOffset);
				var u = !0,
					E = c.x;
				c = c.y;
				h && G(E) && (h.xy = c = this.getLabelPosition(E, c, h, a, e, d, b, m), this.isFirst && !this.isLast && !v(g.showFirstLabel, 1) || this.isLast && !this.isFirst && !v(g.showLastLabel, 1) ? u = !1 : !a || e.step || e.rotation || n || 0 === l || this.handleOverflow(c), m && b % m && (u = !1), u && G(c.y) ?
					(c.opacity = l, h[this.isNewLabel ? "attr" : "animate"](c), this.isNewLabel = !1) : (h.attr("y", -9999), this.isNewLabel = !0))
			},
			render: function(r, n, l) { var b = this.axis,
					d = b.horiz,
					a = this.pos,
					g = v(this.tickmarkOffset, b.tickmarkOffset);
				a = this.getPosition(d, a, g, n);
				g = a.x; var h = a.y;
				b = d && g === b.pos + b.len || !d && h === b.pos ? -1 : 1;
				l = v(l, 1);
				this.isActive = !0;
				this.renderGridLine(n, l, b);
				this.renderMark(a, l, b);
				this.renderLabel(a, n, l, r);
				this.isNew = !1;
				c.fireEvent(this, "afterRender") },
			destroy: function() { z(this, this.axis) }
		}
	});
	M(J, "parts/Axis.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.isArray,
			F = p.isNumber,
			z = p.isString,
			r = p.objectEach,
			K = p.splat,
			v = c.addEvent,
			D = c.animObject,
			w = c.arrayMax,
			n = c.arrayMin,
			l = c.color,
			b = c.correctFloat,
			d = c.defaultOptions,
			a = c.deg2rad,
			g = c.destroyObjectProperties,
			h = c.extend,
			e = c.fireEvent,
			m = c.format,
			u = c.getMagnitude,
			E = c.merge,
			t = c.normalizeTickInterval,
			x = c.pick,
			k = c.removeEvent,
			A = c.seriesTypes,
			B = c.syncTimeout,
			H = c.Tick;
		p = function() { this.init.apply(this, arguments) };
		c.extend(p.prototype, {
			defaultOptions: {
				dateTimeLabelFormats: { millisecond: { main: "%H:%M:%S.%L", range: !1 }, second: { main: "%H:%M:%S", range: !1 }, minute: { main: "%H:%M", range: !1 }, hour: { main: "%H:%M", range: !1 }, day: { main: "%e. %b" }, week: { main: "%e. %b" }, month: { main: "%b '%y" }, year: { main: "%Y" } },
				endOnTick: !1,
				labels: { enabled: !0, indentation: 10, x: 0, style: { color: "#666666", cursor: "default", fontSize: "11px" } },
				maxPadding: .01,
				minorTickLength: 2,
				minorTickPosition: "outside",
				minPadding: .01,
				showEmpty: !0,
				startOfWeek: 1,
				startOnTick: !1,
				tickLength: 10,
				tickPixelInterval: 100,
				tickmarkPlacement: "between",
				tickPosition: "outside",
				title: { align: "middle", style: { color: "#666666" } },
				type: "linear",
				minorGridLineColor: "#f2f2f2",
				minorGridLineWidth: 1,
				minorTickColor: "#999999",
				lineColor: "#ccd6eb",
				lineWidth: 1,
				gridLineColor: "#e6e6e6",
				tickColor: "#ccd6eb"
			},
			defaultYAxisOptions: {
				endOnTick: !0,
				maxPadding: .05,
				minPadding: .05,
				tickPixelInterval: 72,
				showLastLabel: !0,
				labels: { x: -8 },
				startOnTick: !0,
				title: { rotation: 270, text: "Values" },
				stackLabels: {
					allowOverlap: !1,
					enabled: !1,
					crop: !0,
					overflow: "justify",
					formatter: function() {
						return c.numberFormat(this.total, -1)
					},
					style: { color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast" }
				},
				gridLineWidth: 1,
				lineWidth: 0
			},
			defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270 } },
			defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90 } },
			defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } },
			defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } },
			init: function(a, b) {
				var f = b.isX,
					q = this;
				q.chart = a;
				q.horiz = a.inverted && !q.isZAxis ? !f : f;
				q.isXAxis =
					f;
				q.coll = q.coll || (f ? "xAxis" : "yAxis");
				e(this, "init", { userOptions: b });
				q.opposite = b.opposite;
				q.side = b.side || (q.horiz ? q.opposite ? 0 : 2 : q.opposite ? 1 : 3);
				q.setOptions(b);
				var d = this.options,
					k = d.type;
				q.labelFormatter = d.labels.formatter || q.defaultLabelFormatter;
				q.userOptions = b;
				q.minPixelPadding = 0;
				q.reversed = d.reversed;
				q.visible = !1 !== d.visible;
				q.zoomEnabled = !1 !== d.zoomEnabled;
				q.hasNames = "category" === k || !0 === d.categories;
				q.categories = d.categories || q.hasNames;
				q.names || (q.names = [], q.names.keys = {});
				q.plotLinesAndBandsGroups = {};
				q.isLog = "logarithmic" === k;
				q.isDatetimeAxis = "datetime" === k;
				q.positiveValuesOnly = q.isLog && !q.allowNegativeLog;
				q.isLinked = y(d.linkedTo);
				q.ticks = {};
				q.labelEdge = [];
				q.minorTicks = {};
				q.plotLinesAndBands = [];
				q.alternateBands = {};
				q.len = 0;
				q.minRange = q.userMinRange = d.minRange || d.maxZoom;
				q.range = d.range;
				q.offset = d.offset || 0;
				q.stacks = {};
				q.oldStacks = {};
				q.stacksTouched = 0;
				q.max = null;
				q.min = null;
				q.crosshair = x(d.crosshair, K(a.options.tooltip.crosshairs)[f ? 0 : 1], !1);
				b = q.options.events; - 1 === a.axes.indexOf(q) && (f ? a.axes.splice(a.xAxis.length,
					0, q) : a.axes.push(q), a[q.coll].push(q));
				q.series = q.series || [];
				a.inverted && !q.isZAxis && f && void 0 === q.reversed && (q.reversed = !0);
				r(b, function(a, b) { c.isFunction(a) && v(q, b, a) });
				q.lin2log = d.linearToLogConverter || q.lin2log;
				q.isLog && (q.val2lin = q.log2lin, q.lin2val = q.lin2log);
				e(this, "afterInit")
			},
			setOptions: function(a) {
				this.options = E(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side],
					E(d[this.coll], a));
				e(this, "afterSetOptions", { userOptions: a })
			},
			defaultLabelFormatter: function() {
				var a = this.axis,
					b = this.value,
					e = a.chart.time,
					k = a.categories,
					g = this.dateTimeLabelFormat,
					h = d.lang,
					B = h.numericSymbols;
				h = h.numericSymbolMagnitude || 1E3;
				var A = B && B.length,
					t = a.options.labels.format;
				a = a.isLog ? Math.abs(b) : a.tickInterval;
				if(t) var u = m(t, this, e);
				else if(k) u = b;
				else if(g) u = e.dateFormat(g, b);
				else if(A && 1E3 <= a)
					for(; A-- && void 0 === u;) e = Math.pow(h, A + 1), a >= e && 0 === 10 * b % e && null !== B[A] && 0 !== b && (u = c.numberFormat(b /
						e, -1) + B[A]);
				void 0 === u && (u = 1E4 <= Math.abs(b) ? c.numberFormat(b, -1) : c.numberFormat(b, -1, void 0, ""));
				return u
			},
			getSeriesExtremes: function() {
				var a = this,
					b = a.chart,
					d;
				e(this, "getSeriesExtremes", null, function() {
					a.hasVisibleSeries = !1;
					a.dataMin = a.dataMax = a.threshold = null;
					a.softThreshold = !a.isXAxis;
					a.buildStacks && a.buildStacks();
					a.series.forEach(function(f) {
						if(f.visible || !b.options.chart.ignoreHiddenSeries) {
							var q = f.options,
								e = q.threshold;
							a.hasVisibleSeries = !0;
							a.positiveValuesOnly && 0 >= e && (e = null);
							if(a.isXAxis) {
								if(q =
									f.xData, q.length) { d = f.getXExtremes(q); var c = d.min; var k = d.max;
									F(c) || c instanceof Date || (q = q.filter(F), d = f.getXExtremes(q), c = d.min, k = d.max);
									q.length && (a.dataMin = Math.min(x(a.dataMin, c), c), a.dataMax = Math.max(x(a.dataMax, k), k)) }
							} else if(f.getExtremes(), k = f.dataMax, c = f.dataMin, y(c) && y(k) && (a.dataMin = Math.min(x(a.dataMin, c), c), a.dataMax = Math.max(x(a.dataMax, k), k)), y(e) && (a.threshold = e), !q.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
						}
					})
				});
				e(this, "afterGetSeriesExtremes")
			},
			translate: function(a,
				b, d, e, c, k) { var f = this.linkedParent || this,
					q = 1,
					g = 0,
					h = e ? f.oldTransA : f.transA;
				e = e ? f.oldMin : f.min; var m = f.minPixelPadding;
				c = (f.isOrdinal || f.isBroken || f.isLog && c) && f.lin2val;
				h || (h = f.transA);
				d && (q *= -1, g = f.len);
				f.reversed && (q *= -1, g -= q * (f.sector || f.len));
				b ? (a = (a * q + g - m) / h + e, c && (a = f.lin2val(a))) : (c && (a = f.val2lin(a)), a = F(e) ? q * (a - e) * h + g + q * m + (F(k) ? h * k : 0) : void 0); return a },
			toPixels: function(a, b) { return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos) },
			toValue: function(a, b) {
				return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
			},
			getPlotLinePath: function(a) {
				var b = this,
					q = b.chart,
					d = b.left,
					c = b.top,
					k = a.old,
					g = a.value,
					h = a.translatedValue,
					m = a.lineWidth,
					B = a.force,
					A, t, u, H, n = k && q.oldChartHeight || q.chartHeight,
					l = k && q.oldChartWidth || q.chartWidth,
					E, r = b.transB,
					w = function(a, b, f) { if("pass" !== B && a < b || a > f) B ? a = Math.min(Math.max(b, a), f) : E = !0; return a };
				a = { value: g, lineWidth: m, old: k, force: B, acrossPanes: a.acrossPanes, translatedValue: h };
				e(this, "getPlotLinePath", a, function(a) {
					h = x(h, b.translate(g, null, null, k));
					h = Math.min(Math.max(-1E5,
						h), 1E5);
					A = u = Math.round(h + r);
					t = H = Math.round(n - h - r);
					F(h) ? b.horiz ? (t = c, H = n - b.bottom, A = u = w(A, d, d + b.width)) : (A = d, u = l - b.right, t = H = w(t, c, c + b.height)) : (E = !0, B = !1);
					a.path = E && !B ? null : q.renderer.crispLine(["M", A, t, "L", u, H], m || 1)
				});
				return a.path
			},
			getLinearTickPositions: function(a, f, d) { var q = b(Math.floor(f / a) * a);
				d = b(Math.ceil(d / a) * a); var e = [],
					c;
				b(q + a) === q && (c = 20); if(this.single) return [f]; for(f = q; f <= d;) { e.push(f);
					f = b(f + a, c); if(f === k) break; var k = f } return e },
			getMinorTickInterval: function() {
				var a = this.options;
				return !0 ===
					a.minorTicks ? x(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
			},
			getMinorTickPositions: function() {
				var a = this,
					b = a.options,
					d = a.tickPositions,
					e = a.minorTickInterval,
					c = [],
					k = a.pointRangePadding || 0,
					g = a.min - k;
				k = a.max + k;
				var h = k - g;
				if(h && h / e < a.len / 3)
					if(a.isLog) this.paddedTicks.forEach(function(b, f, d) { f && c.push.apply(c, a.getLogTickPositions(e, d[f - 1], d[f], !0)) });
					else if(a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) c = c.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), g, k, b.startOfWeek));
				else
					for(b = g + (d[0] - g) % e; b <= k && b !== c[0]; b += e) c.push(b);
				0 !== c.length && a.trimTicks(c);
				return c
			},
			adjustForMinRange: function() {
				var a = this.options,
					b = this.min,
					d = this.max,
					e, c, k, g, h;
				this.isXAxis && void 0 === this.minRange && !this.isLog && (y(a.min) || y(a.max) ? this.minRange = null : (this.series.forEach(function(a) { g = a.xData; for(c = h = a.xIncrement ? 1 : g.length - 1; 0 < c; c--)
						if(k = g[c] - g[c - 1], void 0 === e || k < e) e = k }), this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
				if(d - b < this.minRange) {
					var m = this.dataMax - this.dataMin >= this.minRange;
					var B = this.minRange;
					var A = (B - d + b) / 2;
					A = [b - A, x(a.min, b - A)];
					m && (A[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin);
					b = w(A);
					d = [b + B, x(a.max, b + B)];
					m && (d[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax);
					d = n(d);
					d - b < B && (A[0] = d - B, A[1] = x(a.min, d - B), b = w(A))
				}
				this.min = b;
				this.max = d
			},
			getClosest: function() { var a;
				this.categories ? a = 1 : this.series.forEach(function(b) { var f = b.closestPointRange,
						d = b.visible || !b.chart.options.chart.ignoreHiddenSeries;!b.noSharedTooltip && y(f) && d && (a = y(a) ? Math.min(a, f) : f) }); return a },
			nameToX: function(a) { var b = G(this.categories),
					d = b ? this.categories : this.names,
					e = a.options.x;
				a.series.requireSorting = !1;
				y(e) || (e = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? d.indexOf(a.name) : x(d.keys[a.name], -1)); if(-1 === e) { if(!b) var q = d.length } else q = e;
				void 0 !== q && (this.names[q] = a.name, this.names.keys[a.name] = q); return q },
			updateNames: function() {
				var a = this,
					b = this.names;
				0 < b.length && (Object.keys(b.keys).forEach(function(a) { delete b.keys[a] }), b.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function(b) { b.xIncrement = null; if(!b.points || b.isDirtyData) a.max = Math.max(a.max, b.xData.length - 1), b.processData(), b.generatePoints();
					b.data.forEach(function(f, d) { if(f && f.options && void 0 !== f.name) { var e = a.nameToX(f);
							void 0 !== e && e !== f.x && (f.x = e, b.xData[d] = e) } }) }))
			},
			setAxisTranslation: function(a) {
				var b = this,
					d = b.max - b.min,
					q = b.axisPointRange || 0,
					c = 0,
					k = 0,
					g = b.linkedParent,
					h = !!b.categories,
					m = b.transA,
					B = b.isXAxis;
				if(B || h || q) {
					var t = b.getClosest();
					g ? (c = g.minPointOffset, k = g.pointRangePadding) : b.series.forEach(function(a) {
						var f =
							h ? 1 : B ? x(a.options.pointRange, t, 0) : b.axisPointRange || 0,
							d = a.options.pointPlacement;
						q = Math.max(q, f);
						if(!b.single || h) a = A.xrange && a instanceof A.xrange ? !B : B, c = Math.max(c, a && z(d) ? 0 : f / 2), k = Math.max(k, a && "on" === d ? 0 : f)
					});
					g = b.ordinalSlope && t ? b.ordinalSlope / t : 1;
					b.minPointOffset = c *= g;
					b.pointRangePadding = k *= g;
					b.pointRange = Math.min(q, d);
					B && (b.closestPointRange = t)
				}
				a && (b.oldTransA = m);
				b.translationSlope = b.transA = m = b.staticScale || b.len / (d + k || 1);
				b.transB = b.horiz ? b.left : b.bottom;
				b.minPixelPadding = m * c;
				e(this, "afterSetAxisTranslation")
			},
			minFromRange: function() { return this.max - this.range },
			setTickInterval: function(a) {
				var f = this,
					d = f.chart,
					q = f.options,
					k = f.isLog,
					g = f.isDatetimeAxis,
					h = f.isXAxis,
					m = f.isLinked,
					B = q.maxPadding,
					A = q.minPadding,
					H = q.tickInterval,
					n = q.tickPixelInterval,
					l = f.categories,
					E = F(f.threshold) ? f.threshold : null,
					r = f.softThreshold;
				g || l || m || this.getTickAmount();
				var w = x(f.userMin, q.min);
				var v = x(f.userMax, q.max);
				if(m) {
					f.linkedParent = d[f.coll][q.linkedTo];
					var z = f.linkedParent.getExtremes();
					f.min = x(z.min, z.dataMin);
					f.max = x(z.max, z.dataMax);
					q.type !== f.linkedParent.options.type && c.error(11, 1, d)
				} else { if(!r && y(E))
						if(f.dataMin >= E) z = E, A = 0;
						else if(f.dataMax <= E) { var p = E;
						B = 0 } f.min = x(w, z, f.dataMin);
					f.max = x(v, p, f.dataMax) } k && (f.positiveValuesOnly && !a && 0 >= Math.min(f.min, x(f.dataMin, f.min)) && c.error(10, 1, d), f.min = b(f.log2lin(f.min), 15), f.max = b(f.log2lin(f.max), 15));
				f.range && y(f.max) && (f.userMin = f.min = w = Math.max(f.dataMin, f.minFromRange()), f.userMax = v = f.max, f.range = null);
				e(f, "foundExtremes");
				f.beforePadding && f.beforePadding();
				f.adjustForMinRange();
				!(l || f.axisPointRange || f.usePercentage || m) && y(f.min) && y(f.max) && (d = f.max - f.min) && (!y(w) && A && (f.min -= d * A), !y(v) && B && (f.max += d * B));
				F(q.softMin) && !F(f.userMin) && q.softMin < f.min && (f.min = w = q.softMin);
				F(q.softMax) && !F(f.userMax) && q.softMax > f.max && (f.max = v = q.softMax);
				F(q.floor) && (f.min = Math.min(Math.max(f.min, q.floor), Number.MAX_VALUE));
				F(q.ceiling) && (f.max = Math.max(Math.min(f.max, q.ceiling), x(f.userMax, -Number.MAX_VALUE)));
				r && y(f.dataMin) && (E = E || 0, !y(w) && f.min < E && f.dataMin >= E ? f.min = f.options.minRange ? Math.min(E,
					f.max - f.minRange) : E : !y(v) && f.max > E && f.dataMax <= E && (f.max = f.options.minRange ? Math.max(E, f.min + f.minRange) : E));
				f.tickInterval = f.min === f.max || void 0 === f.min || void 0 === f.max ? 1 : m && !H && n === f.linkedParent.options.tickPixelInterval ? H = f.linkedParent.tickInterval : x(H, this.tickAmount ? (f.max - f.min) / Math.max(this.tickAmount - 1, 1) : void 0, l ? 1 : (f.max - f.min) * n / Math.max(f.len, n));
				h && !a && f.series.forEach(function(a) { a.processData(f.min !== f.oldMin || f.max !== f.oldMax) });
				f.setAxisTranslation(!0);
				f.beforeSetTickPositions &&
					f.beforeSetTickPositions();
				f.postProcessTickInterval && (f.tickInterval = f.postProcessTickInterval(f.tickInterval));
				f.pointRange && !H && (f.tickInterval = Math.max(f.pointRange, f.tickInterval));
				a = x(q.minTickInterval, f.isDatetimeAxis && f.closestPointRange);
				!H && f.tickInterval < a && (f.tickInterval = a);
				g || k || H || (f.tickInterval = t(f.tickInterval, null, u(f.tickInterval), x(q.allowDecimals, !(.5 < f.tickInterval && 5 > f.tickInterval && 1E3 < f.max && 9999 > f.max)), !!this.tickAmount));
				this.tickAmount || (f.tickInterval = f.unsquish());
				this.setTickPositions()
			},
			setTickPositions: function() {
				var a = this.options,
					b = a.tickPositions;
				var d = this.getMinorTickInterval();
				var k = a.tickPositioner,
					g = a.startOnTick,
					h = a.endOnTick;
				this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
				this.minorTickInterval = "auto" === d && this.tickInterval ? this.tickInterval / 5 : d;
				this.single = this.min === this.max && y(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
				this.tickPositions = d = b && b.slice();
				!d && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (d = [this.min, this.max], c.error(19, !1, this.chart)) : d = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), d.length > this.len && (d = [d[0], d.pop()], d[0] ===
					d[1] && (d.length = 1)), this.tickPositions = d, k && (k = k.apply(this, [this.min, this.max]))) && (this.tickPositions = d = k);
				this.paddedTicks = d.slice(0);
				this.trimTicks(d, g, h);
				this.isLinked || (this.single && 2 > d.length && !this.categories && (this.min -= .5, this.max += .5), b || k || this.adjustTickAmount());
				e(this, "afterSetTickPositions")
			},
			trimTicks: function(a, b, d) {
				var f = a[0],
					q = a[a.length - 1],
					c = this.minPointOffset || 0;
				e(this, "trimTicks");
				if(!this.isLinked) {
					if(b && -Infinity !== f) this.min = f;
					else
						for(; this.min - c > a[0];) a.shift();
					if(d) this.max =
						q;
					else
						for(; this.max + c < a[a.length - 1];) a.pop();
					0 === a.length && y(f) && !this.options.tickPositions && a.push((q + f) / 2)
				}
			},
			alignToOthers: function() { var a = {},
					b, d = this.options;!1 === this.chart.options.chart.alignTicks || !1 === d.alignTicks || !1 === d.startOnTick || !1 === d.endOnTick || this.isLog || this.chart[this.coll].forEach(function(d) { var f = d.options;
					f = [d.horiz ? f.left : f.top, f.width, f.height, f.pane].join();
					d.series.length && (a[f] ? b = !0 : a[f] = 1) }); return b },
			getTickAmount: function() {
				var a = this.options,
					b = a.tickAmount,
					d = a.tickPixelInterval;
				!y(a.tickInterval) && this.len < d && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
				!b && this.alignToOthers() && (b = Math.ceil(this.len / d) + 1);
				4 > b && (this.finalTickAmt = b, b = 5);
				this.tickAmount = b
			},
			adjustTickAmount: function() {
				var a = this.options,
					d = this.tickInterval,
					e = this.tickPositions,
					c = this.tickAmount,
					k = this.finalTickAmt,
					g = e && e.length,
					h = x(this.threshold, this.softThreshold ? 0 : null),
					m;
				if(this.hasData()) {
					if(g < c) {
						for(m = this.min; e.length < c;) e.length % 2 || m === h ? e.push(b(e[e.length - 1] + d)) : e.unshift(b(e[0] -
							d));
						this.transA *= (g - 1) / (c - 1);
						this.min = a.startOnTick ? e[0] : Math.min(this.min, e[0]);
						this.max = a.endOnTick ? e[e.length - 1] : Math.max(this.max, e[e.length - 1])
					} else g > c && (this.tickInterval *= 2, this.setTickPositions());
					if(y(k)) { for(d = a = e.length; d--;)(3 === k && 1 === d % 2 || 2 >= k && 0 < d && d < a - 1) && e.splice(d, 1);
						this.finalTickAmt = void 0 }
				}
			},
			setScale: function() {
				var a = this.series.some(function(a) { return a.isDirtyData || a.isDirty || a.xAxis.isDirty }),
					b;
				this.oldMin = this.min;
				this.oldMax = this.max;
				this.oldAxisLength = this.len;
				this.setAxisSize();
				(b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
				e(this, "afterSetScale")
			},
			setExtremes: function(a, b, d, c, k) {
				var f = this,
					q = f.chart;
				d = x(d, !0);
				f.series.forEach(function(a) { delete a.kdTree });
				k = h(k, { min: a, max: b });
				e(f, "setExtremes", k, function() { f.userMin = a;
					f.userMax = b;
					f.eventArgs = k;
					d && q.redraw(c) })
			},
			zoom: function(a, b) {
				var d = this.dataMin,
					f = this.dataMax,
					c = this.options,
					q = Math.min(d, x(c.min, d)),
					k = Math.max(f, x(c.max, f));
				a = { newMin: a, newMax: b };
				e(this, "zoom", a, function(a) {
					var b = a.newMin,
						e = a.newMax;
					if(b !== this.min || e !== this.max) this.allowZoomOutside || (y(d) && (b < q && (b = q), b > k && (b = k)), y(f) && (e < q && (e = q), e > k && (e = k))), this.displayBtn = void 0 !==
						b || void 0 !== e, this.setExtremes(b, e, !1, void 0, { trigger: "zoom" });
					a.zoomed = !0
				});
				return a.zoomed
			},
			setAxisSize: function() {
				var a = this.chart,
					b = this.options,
					d = b.offsets || [0, 0, 0, 0],
					e = this.horiz,
					k = this.width = Math.round(c.relativeLength(x(b.width, a.plotWidth - d[3] + d[1]), a.plotWidth)),
					g = this.height = Math.round(c.relativeLength(x(b.height, a.plotHeight - d[0] + d[2]), a.plotHeight)),
					h = this.top = Math.round(c.relativeLength(x(b.top, a.plotTop + d[0]), a.plotHeight, a.plotTop));
				b = this.left = Math.round(c.relativeLength(x(b.left,
					a.plotLeft + d[3]), a.plotWidth, a.plotLeft));
				this.bottom = a.chartHeight - g - h;
				this.right = a.chartWidth - k - b;
				this.len = Math.max(e ? k : g, 0);
				this.pos = e ? b : h
			},
			getExtremes: function() { var a = this.isLog; return { min: a ? b(this.lin2log(this.min)) : this.min, max: a ? b(this.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax } },
			getThreshold: function(a) {
				var b = this.isLog,
					d = b ? this.lin2log(this.min) : this.min;
				b = b ? this.lin2log(this.max) : this.max;
				null === a || -Infinity === a ? a = d : Infinity ===
					a ? a = b : d > a ? a = d : b < a && (a = b);
				return this.translate(a, 0, 1, 0, 1)
			},
			autoLabelAlign: function(a) { var b = (x(a, 0) - 90 * this.side + 720) % 360;
				a = { align: "center" };
				e(this, "autoLabelAlign", a, function(a) { 15 < b && 165 > b ? a.align = "right" : 195 < b && 345 > b && (a.align = "left") }); return a.align },
			tickSize: function(a) { var b = this.options,
					d = b[a + "Length"],
					c = x(b[a + "Width"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0); if(c && d) { "inside" === b[a + "Position"] && (d = -d); var k = [d, c] } a = { tickSize: k };
				e(this, "afterTickSize", a); return a.tickSize },
			labelMetrics: function() {
				var a =
					this.tickPositions && this.tickPositions[0] || 0;
				return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
			},
			unsquish: function() {
				var d = this.options.labels,
					f = this.horiz,
					e = this.tickInterval,
					c = e,
					k = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / e),
					g, h = d.rotation,
					m = this.labelMetrics(),
					B, A = Number.MAX_VALUE,
					t, u = this.max - this.min,
					H = function(a) {
						var d = a / (k || 1);
						d = 1 < d ? Math.ceil(d) : 1;
						d * e > u && Infinity !== a && Infinity !== k && (d = Math.ceil(u /
							e));
						return b(d * e)
					};
				f ? (t = !d.staggerLines && !d.step && (y(h) ? [h] : k < x(d.autoRotationLimit, 80) && d.autoRotation)) && t.forEach(function(b) { if(b === h || b && -90 <= b && 90 >= b) { B = H(Math.abs(m.h / Math.sin(a * b))); var d = B + Math.abs(b / 360);
						d < A && (A = d, g = b, c = B) } }) : d.step || (c = H(m.h));
				this.autoRotation = t;
				this.labelRotation = x(g, h);
				return c
			},
			getSlotWidth: function(a) {
				var b = this.chart,
					d = this.horiz,
					e = this.options.labels,
					c = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
					k = b.margin[3];
				return a && a.slotWidth || d && 2 > (e.step ||
					0) && !e.rotation && (this.staggerLines || 1) * this.len / c || !d && (e.style && parseInt(e.style.width, 10) || k && k - b.spacing[3] || .33 * b.chartWidth)
			},
			renderUnsquish: function() {
				var a = this.chart,
					b = a.renderer,
					d = this.tickPositions,
					e = this.ticks,
					c = this.options.labels,
					k = c && c.style || {},
					g = this.horiz,
					h = this.getSlotWidth(),
					m = Math.max(1, Math.round(h - 2 * (c.padding || 5))),
					B = {},
					A = this.labelMetrics(),
					t = c.style && c.style.textOverflow,
					u = 0;
				z(c.rotation) || (B.rotation = c.rotation || 0);
				d.forEach(function(a) {
					(a = e[a]) && a.label && a.label.textPxLength >
						u && (u = a.label.textPxLength)
				});
				this.maxLabelLength = u;
				if(this.autoRotation) u > m && u > A.h ? B.rotation = this.labelRotation : this.labelRotation = 0;
				else if(h) { var H = m; if(!t) { var n = "clip"; for(m = d.length; !g && m--;) { var x = d[m]; if(x = e[x].label) x.styles && "ellipsis" === x.styles.textOverflow ? x.css({ textOverflow: "clip" }) : x.textPxLength > h && x.css({ width: h + "px" }), x.getBBox().height > this.len / d.length - (A.h - A.f) && (x.specificTextOverflow = "ellipsis") } } } B.rotation && (H = u > .5 * a.chartHeight ? .33 * a.chartHeight : u, t || (n = "ellipsis"));
				if(this.labelAlign =
					c.align || this.autoLabelAlign(this.labelRotation)) B.align = this.labelAlign;
				d.forEach(function(a) { var b = (a = e[a]) && a.label,
						d = k.width,
						f = {};
					b && (b.attr(B), a.shortenLabel ? a.shortenLabel() : H && !d && "nowrap" !== k.whiteSpace && (H < b.textPxLength || "SPAN" === b.element.tagName) ? (f.width = H, t || (f.textOverflow = b.specificTextOverflow || n), b.css(f)) : b.styles && b.styles.width && !f.width && !d && b.css({ width: null }), delete b.specificTextOverflow, a.rotation = B.rotation) }, this);
				this.tickRotCorr = b.rotCorr(A.b, this.labelRotation || 0, 0 !==
					this.side)
			},
			hasData: function() { return this.series.some(function(a) { return a.hasData() }) || this.options.showEmpty && y(this.min) && y(this.max) },
			addTitle: function(a) {
				var b = this.chart.renderer,
					d = this.horiz,
					e = this.opposite,
					c = this.options.title,
					k, g = this.chart.styledMode;
				this.axisTitle || ((k = c.textAlign) || (k = (d ? { low: "left", middle: "center", high: "right" } : { low: e ? "right" : "left", middle: "center", high: e ? "left" : "right" })[c.align]), this.axisTitle = b.text(c.text, 0, 0, c.useHTML).attr({ zIndex: 7, rotation: c.rotation || 0, align: k }).addClass("highcharts-axis-title"),
					g || this.axisTitle.css(E(c.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
				g || c.style.width || this.isRadial || this.axisTitle.css({ width: this.len });
				this.axisTitle[a ? "show" : "hide"](a)
			},
			generateTick: function(a) { var b = this.ticks;
				b[a] ? b[a].addLabel() : b[a] = new H(this, a) },
			getOffset: function() {
				var a = this,
					b = a.chart,
					d = b.renderer,
					c = a.options,
					k = a.tickPositions,
					g = a.ticks,
					h = a.horiz,
					m = a.side,
					B = b.inverted && !a.isZAxis ? [1, 0, 3, 2][m] : m,
					A, t = 0,
					u = 0,
					H = c.title,
					n = c.labels,
					l = 0,
					E = b.axisOffset;
				b = b.clipOffset;
				var w = [-1, 1, 1, -1][m],
					z = c.className,
					v = a.axisParent;
				var p = a.hasData();
				a.showAxis = A = p || x(c.showEmpty, !0);
				a.staggerLines = a.horiz && n.staggerLines;
				a.axisGroup || (a.gridGroup = d.g("grid").attr({ zIndex: c.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (z || "")).add(v), a.axisGroup = d.g("axis").attr({ zIndex: c.zIndex || 2 }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (z || "")).add(v), a.labelGroup = d.g("axis-labels").attr({ zIndex: n.zIndex || 7 }).addClass("highcharts-" + a.coll.toLowerCase() +
					"-labels " + (z || "")).add(v));
				p || a.isLinked ? (k.forEach(function(b, d) { a.generateTick(b, d) }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === m || 2 === m || { 1: "left", 3: "right" }[m] === a.labelAlign, x(n.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && k.forEach(function(a) { l = Math.max(g[a].getLabelSize(), l) }), a.staggerLines && (l *= a.staggerLines), a.labelOffset = l * (a.opposite ? -1 : 1)) : r(g, function(a, b) { a.destroy();
					delete g[b] });
				if(H && H.text && !1 !== H.enabled && (a.addTitle(A), A && !1 !== H.reserveSpace)) {
					a.titleOffset =
						t = a.axisTitle.getBBox()[h ? "height" : "width"];
					var K = H.offset;
					u = y(K) ? 0 : x(H.margin, h ? 5 : 10)
				}
				a.renderLine();
				a.offset = w * x(c.offset, E[m] ? E[m] + (c.margin || 0) : 0);
				a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };
				d = 0 === m ? -a.labelMetrics().h : 2 === m ? a.tickRotCorr.y : 0;
				u = Math.abs(l) + u;
				l && (u = u - d + w * (h ? x(n.y, a.tickRotCorr.y + 8 * w) : n.x));
				a.axisTitleMargin = x(K, u);
				a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(g, k));
				h = this.tickSize("tick");
				E[m] = Math.max(E[m], a.axisTitleMargin + t + w * a.offset, u, k && k.length && h ? h[0] +
					w * a.offset : 0);
				c = c.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
				b[B] = Math.max(b[B], c);
				e(this, "afterGetOffset")
			},
			getLinePath: function(a) { var b = this.chart,
					d = this.opposite,
					e = this.offset,
					c = this.horiz,
					k = this.left + (d ? this.width : 0) + e;
				e = b.chartHeight - this.bottom - (d ? this.height : 0) + e;
				d && (a *= -1); return b.renderer.crispLine(["M", c ? this.left : k, c ? e : this.top, "L", c ? b.chartWidth - this.right : k, c ? e : b.chartHeight - this.bottom], a) },
			renderLine: function() {
				this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
					this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }))
			},
			getTitlePosition: function() {
				var a = this.horiz,
					b = this.left,
					d = this.top,
					c = this.len,
					k = this.options.title,
					g = a ? b : d,
					h = this.opposite,
					m = this.offset,
					B = k.x || 0,
					A = k.y || 0,
					t = this.axisTitle,
					u = this.chart.renderer.fontMetrics(k.style && k.style.fontSize, t);
				t = Math.max(t.getBBox(null, 0).height - u.h - 1, 0);
				c = { low: g + (a ? 0 : c), middle: g + c / 2, high: g + (a ? c : 0) }[k.align];
				b = (a ? d + this.height : b) + (a ? 1 : -1) * (h ? -1 : 1) * this.axisTitleMargin + [-t, t, u.f, -t][this.side];
				a = { x: a ? c + B : b + (h ? this.width : 0) + m + B, y: a ? b + A - (h ? this.height : 0) + m : c + A };
				e(this, "afterGetTitlePosition", { titlePosition: a });
				return a
			},
			renderMinorTick: function(a) { var b = this.chart.hasRendered && F(this.oldMin),
					d = this.minorTicks;
				d[a] || (d[a] = new H(this, a, "minor"));
				b && d[a].isNew && d[a].render(null, !0);
				d[a].render(null, !1, 1) },
			renderTick: function(a, b) {
				var d = this.isLinked,
					e = this.ticks,
					c = this.chart.hasRendered && F(this.oldMin);
				if(!d || a >= this.min && a <= this.max) e[a] || (e[a] = new H(this, a)), c && e[a].isNew &&
					e[a].render(b, !0, -1), e[a].render(b)
			},
			render: function() {
				var a = this,
					b = a.chart,
					d = a.options,
					k = a.isLog,
					g = a.isLinked,
					h = a.tickPositions,
					m = a.axisTitle,
					A = a.ticks,
					t = a.minorTicks,
					u = a.alternateBands,
					n = d.stackLabels,
					x = d.alternateGridColor,
					l = a.tickmarkOffset,
					E = a.axisLine,
					w = a.showAxis,
					z = D(b.renderer.globalAnimation),
					v, p;
				a.labelEdge.length = 0;
				a.overlap = !1;
				[A, t, u].forEach(function(a) { r(a, function(a) { a.isActive = !1 }) });
				if(a.hasData() || g) a.minorTickInterval && !a.categories && a.getMinorTickPositions().forEach(function(b) { a.renderMinorTick(b) }),
					h.length && (h.forEach(function(b, d) { a.renderTick(b, d) }), l && (0 === a.min || a.single) && (A[-1] || (A[-1] = new H(a, -1, null, !0)), A[-1].render(-1))), x && h.forEach(function(d, e) { p = void 0 !== h[e + 1] ? h[e + 1] + l : a.max - l;
						0 === e % 2 && d < a.max && p <= a.max + (b.polar ? -l : l) && (u[d] || (u[d] = new c.PlotLineOrBand(a)), v = d + l, u[d].options = { from: k ? a.lin2log(v) : v, to: k ? a.lin2log(p) : p, color: x }, u[d].render(), u[d].isActive = !0) }), a._addedPlotLB || ((d.plotLines || []).concat(d.plotBands || []).forEach(function(b) { a.addPlotBandOrLine(b) }), a._addedPlotLB = !0);
				[A, t, u].forEach(function(a) { var d, e = [],
						c = z.duration;
					r(a, function(a, b) { a.isActive || (a.render(b, !1, 0), a.isActive = !1, e.push(b)) });
					B(function() { for(d = e.length; d--;) a[e[d]] && !a[e[d]].isActive && (a[e[d]].destroy(), delete a[e[d]]) }, a !== u && b.hasRendered && c ? c : 0) });
				E && (E[E.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(E.strokeWidth()) }), E.isPlaced = !0, E[w ? "show" : "hide"](w));
				m && w && (d = a.getTitlePosition(), F(d.y) ? (m[m.isNew ? "attr" : "animate"](d), m.isNew = !1) : (m.attr("y", -9999), m.isNew = !0));
				n && n.enabled && a.renderStackTotals();
				a.isDirty = !1;
				e(this, "afterRender")
			},
			redraw: function() { this.visible && (this.render(), this.plotLinesAndBands.forEach(function(a) { a.render() }));
				this.series.forEach(function(a) { a.isDirty = !0 }) },
			keepProps: "extKey hcEvents names series userMax userMin".split(" "),
			destroy: function(a) {
				var b = this,
					d = b.stacks,
					c = b.plotLinesAndBands,
					h;
				e(this, "destroy", { keepEvents: a });
				a || k(b);
				r(d, function(a, b) { g(a);
					d[b] = null });
				[b.ticks, b.minorTicks, b.alternateBands].forEach(function(a) { g(a) });
				if(c)
					for(a = c.length; a--;) c[a].destroy();
				"stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a) { b[a] && (b[a] = b[a].destroy()) });
				for(h in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[h] = b.plotLinesAndBandsGroups[h].destroy();
				r(b, function(a, d) {-1 === b.keepProps.indexOf(d) && delete b[d] })
			},
			drawCrosshair: function(a, b) {
				var d, c = this.crosshair,
					k = x(c.snap, !0),
					f, g = this.cross;
				e(this, "drawCrosshair", { e: a, point: b });
				a || (a = this.cross && this.cross.e);
				if(this.crosshair && !1 !== (y(b) || !k)) {
					k ? y(b) &&
						(f = x(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : f = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
					y(f) && (d = this.getPlotLinePath({ value: b && (this.isXAxis ? b.x : x(b.stackY, b.y)), translatedValue: f }) || null);
					if(!y(d)) { this.hideCrosshair(); return } k = this.categories && !this.isRadial;
					g || (this.cross = g = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (k ? "category " : "thin ") + c.className).attr({ zIndex: x(c.zIndex, 2) }).add(), this.chart.styledMode || (g.attr({
						stroke: c.color ||
							(k ? l("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
						"stroke-width": x(c.width, 1)
					}).css({ "pointer-events": "none" }), c.dashStyle && g.attr({ dashstyle: c.dashStyle })));
					g.show().attr({ d: d });
					k && !c.width && g.attr({ "stroke-width": this.transA });
					this.cross.e = a
				} else this.hideCrosshair();
				e(this, "afterDrawCrosshair", { e: a, point: b })
			},
			hideCrosshair: function() { this.cross && this.cross.hide();
				e(this, "afterHideCrosshair") }
		});
		return c.Axis = p
	});
	M(J, "parts/DateTimeAxis.js", [J["parts/Globals.js"]], function(c) {
		var p = c.Axis,
			y = c.getMagnitude,
			G = c.normalizeTickInterval,
			F = c.timeUnits;
		p.prototype.getTimeTicks = function() { return this.chart.time.getTimeTicks.apply(this.chart.time, arguments) };
		p.prototype.normalizeTimeTickInterval = function(c, r) {
			var z = r || [
				["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
				["second", [1, 2, 5, 10, 15, 30]],
				["minute", [1, 2, 5, 10, 15, 30]],
				["hour", [1, 2, 3, 4, 6, 8, 12]],
				["day", [1, 2]],
				["week", [1, 2]],
				["month", [1, 2, 3, 4, 6]],
				["year", null]
			];
			r = z[z.length - 1];
			var v = F[r[0]],
				p = r[1],
				w;
			for(w = 0; w < z.length && !(r = z[w], v = F[r[0]], p = r[1], z[w + 1] && c <= (v *
					p[p.length - 1] + F[z[w + 1][0]]) / 2); w++);
			v === F.year && c < 5 * v && (p = [1, 2, 5]);
			c = G(c / v, p, "year" === r[0] ? Math.max(y(c / v), 1) : 1);
			return { unitRange: v, count: c, unitName: r[0] }
		}
	});
	M(J, "parts/LogarithmicAxis.js", [J["parts/Globals.js"]], function(c) {
		var p = c.Axis,
			y = c.getMagnitude,
			G = c.normalizeTickInterval,
			F = c.pick;
		p.prototype.getLogTickPositions = function(c, r, p, v) {
			var z = this.options,
				w = this.len,
				n = [];
			v || (this._minorAutoInterval = null);
			if(.5 <= c) c = Math.round(c), n = this.getLinearTickPositions(c, r, p);
			else if(.08 <= c) {
				w = Math.floor(r);
				var l, b;
				for(z = .3 < c ? [1, 2, 4] : .15 < c ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; w < p + 1 && !b; w++) { var d = z.length; for(l = 0; l < d && !b; l++) { var a = this.log2lin(this.lin2log(w) * z[l]);
						a > r && (!v || g <= p) && void 0 !== g && n.push(g);
						g > p && (b = !0); var g = a } }
			} else r = this.lin2log(r), p = this.lin2log(p), c = v ? this.getMinorTickInterval() : z.tickInterval, c = F("auto" === c ? null : c, this._minorAutoInterval, z.tickPixelInterval / (v ? 5 : 1) * (p - r) / ((v ? w / this.tickPositions.length : w) || 1)), c = G(c, null, y(c)), n = this.getLinearTickPositions(c, r, p).map(this.log2lin), v ||
				(this._minorAutoInterval = c / 5);
			v || (this.tickInterval = c);
			return n
		};
		p.prototype.log2lin = function(c) { return Math.log(c) / Math.LN10 };
		p.prototype.lin2log = function(c) { return Math.pow(10, c) }
	});
	M(J, "parts/PlotLineOrBand.js", [J["parts/Globals.js"], J["parts/Axis.js"], J["parts/Utilities.js"]], function(c, p, y) {
		var G = y.defined,
			F = y.erase,
			z = y.objectEach,
			r = c.arrayMax,
			K = c.arrayMin,
			v = c.destroyObjectProperties,
			D = c.merge,
			w = c.pick;
		c.PlotLineOrBand = function(c, l) { this.axis = c;
			l && (this.options = l, this.id = l.id) };
		c.PlotLineOrBand.prototype = {
			render: function() {
				c.fireEvent(this, "render");
				var n = this,
					l = n.axis,
					b = l.horiz,
					d = n.options,
					a = d.label,
					g = n.label,
					h = d.to,
					e = d.from,
					m = d.value,
					u = G(e) && G(h),
					E = G(m),
					t = n.svgElem,
					x = !t,
					k = [],
					A = d.color,
					B = w(d.zIndex, 0),
					H = d.events;
				k = { "class": "highcharts-plot-" + (u ? "band " : "line ") + (d.className || "") };
				var q = {},
					f = l.chart.renderer,
					C = u ? "bands" : "lines";
				l.isLog && (e = l.log2lin(e), h = l.log2lin(h), m = l.log2lin(m));
				l.chart.styledMode || (E ? (k.stroke = A || "#999999", k["stroke-width"] = w(d.width, 1), d.dashStyle && (k.dashstyle = d.dashStyle)) :
					u && (k.fill = A || "#e6ebf5", d.borderWidth && (k.stroke = d.borderColor, k["stroke-width"] = d.borderWidth)));
				q.zIndex = B;
				C += "-" + B;
				(A = l.plotLinesAndBandsGroups[C]) || (l.plotLinesAndBandsGroups[C] = A = f.g("plot-" + C).attr(q).add());
				x && (n.svgElem = t = f.path().attr(k).add(A));
				if(E) k = l.getPlotLinePath({ value: m, lineWidth: t.strokeWidth(), acrossPanes: d.acrossPanes });
				else if(u) k = l.getPlotBandPath(e, h, d);
				else return;
				(x || !t.d) && k && k.length ? (t.attr({ d: k }), H && z(H, function(a, b) { t.on(b, function(a) { H[b].apply(n, [a]) }) })) : t && (k ? (t.show(!0),
					t.animate({ d: k })) : t.d && (t.hide(), g && (n.label = g = g.destroy())));
				a && (G(a.text) || G(a.formatter)) && k && k.length && 0 < l.width && 0 < l.height && !k.isFlat ? (a = D({ align: b && u && "center", x: b ? !u && 4 : 10, verticalAlign: !b && u && "middle", y: b ? u ? 16 : 10 : u ? 6 : -4, rotation: b && !u && 90 }, a), this.renderLabel(a, k, u, B)) : g && g.hide();
				return n
			},
			renderLabel: function(c, l, b, d) {
				var a = this.label,
					g = this.axis.chart.renderer;
				a || (a = { align: c.textAlign || c.align, rotation: c.rotation, "class": "highcharts-plot-" + (b ? "band" : "line") + "-label " + (c.className || "") },
					a.zIndex = d, d = this.getLabelText(c), this.label = a = g.text(d, 0, 0, c.useHTML).attr(a).add(), this.axis.chart.styledMode || a.css(c.style));
				g = l.xBounds || [l[1], l[4], b ? l[6] : l[1]];
				l = l.yBounds || [l[2], l[5], b ? l[7] : l[2]];
				b = K(g);
				d = K(l);
				a.align(c, !1, { x: b, y: d, width: r(g) - b, height: r(l) - d });
				a.show(!0)
			},
			getLabelText: function(c) { return G(c.formatter) ? c.formatter.call(this) : c.text },
			destroy: function() { F(this.axis.plotLinesAndBands, this);
				delete this.axis;
				v(this) }
		};
		c.extend(p.prototype, {
			getPlotBandPath: function(c, l) {
				var b = this.getPlotLinePath({
						value: l,
						force: !0,
						acrossPanes: this.options.acrossPanes
					}),
					d = this.getPlotLinePath({ value: c, force: !0, acrossPanes: this.options.acrossPanes }),
					a = [],
					g = this.horiz,
					h = 1;
				c = c < this.min && l < this.min || c > this.max && l > this.max;
				if(d && b) { if(c) { var e = d.toString() === b.toString();
						h = 0 } for(c = 0; c < d.length; c += 6) g && b[c + 1] === d[c + 1] ? (b[c + 1] += h, b[c + 4] += h) : g || b[c + 2] !== d[c + 2] || (b[c + 2] += h, b[c + 5] += h), a.push("M", d[c + 1], d[c + 2], "L", d[c + 4], d[c + 5], b[c + 4], b[c + 5], b[c + 1], b[c + 2], "z"), a.isFlat = e }
				return a
			},
			addPlotBand: function(c) {
				return this.addPlotBandOrLine(c,
					"plotBands")
			},
			addPlotLine: function(c) { return this.addPlotBandOrLine(c, "plotLines") },
			addPlotBandOrLine: function(n, l) { var b = (new c.PlotLineOrBand(this, n)).render(),
					d = this.userOptions;
				b && (l && (d[l] = d[l] || [], d[l].push(n)), this.plotLinesAndBands.push(b)); return b },
			removePlotBandOrLine: function(c) {
				for(var l = this.plotLinesAndBands, b = this.options, d = this.userOptions, a = l.length; a--;) l[a].id === c && l[a].destroy();
				[b.plotLines || [], d.plotLines || [], b.plotBands || [], d.plotBands || []].forEach(function(b) {
					for(a = b.length; a--;) b[a].id ===
						c && F(b, b[a])
				})
			},
			removePlotBand: function(c) { this.removePlotBandOrLine(c) },
			removePlotLine: function(c) { this.removePlotBandOrLine(c) }
		})
	});
	M(J, "parts/Tooltip.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.isNumber,
			F = p.isString,
			z = p.splat;
		"";
		var r = c.doc,
			K = c.extend,
			v = c.format,
			D = c.merge,
			w = c.pick,
			n = c.syncTimeout,
			l = c.timeUnits;
		c.Tooltip = function() { this.init.apply(this, arguments) };
		c.Tooltip.prototype = {
			init: function(b, d) {
				this.chart = b;
				this.options = d;
				this.crosshairs = [];
				this.now = { x: 0, y: 0 };
				this.isHidden = !0;
				this.split = d.split && !b.inverted;
				this.shared = d.shared || this.split;
				this.outside = w(d.outside, !(!b.scrollablePixelsX && !b.scrollablePixelsY)) && !this.split
			},
			cleanSplit: function(b) { this.chart.series.forEach(function(d) { var a = d && d.tt;
					a && (!a.isActive || b ? d.tt = a.destroy() : a.isActive = !1) }) },
			applyFilter: function() {
				var b = this.chart;
				b.renderer.definition({
					tagName: "filter",
					id: "drop-shadow-" + b.index,
					opacity: .5,
					children: [{ tagName: "feGaussianBlur", "in": "SourceAlpha", stdDeviation: 1 }, {
						tagName: "feOffset",
						dx: 1,
						dy: 1
					}, { tagName: "feComponentTransfer", children: [{ tagName: "feFuncA", type: "linear", slope: .3 }] }, { tagName: "feMerge", children: [{ tagName: "feMergeNode" }, { tagName: "feMergeNode", "in": "SourceGraphic" }] }]
				});
				b.renderer.definition({ tagName: "style", textContent: ".highcharts-tooltip-" + b.index + "{filter:url(#drop-shadow-" + b.index + ")}" })
			},
			getLabel: function() {
				var b = this,
					d = this.chart.renderer,
					a = this.chart.styledMode,
					g = this.options,
					h = "tooltip" + (y(g.className) ? " " + g.className : ""),
					e;
				if(!this.label) {
					this.outside && (this.container =
						e = c.doc.createElement("div"), e.className = "highcharts-tooltip-container", c.css(e, { position: "absolute", top: "1px", pointerEvents: g.style && g.style.pointerEvents, zIndex: 3 }), c.doc.body.appendChild(e), this.renderer = d = new c.Renderer(e, 0, 0));
					this.split ? this.label = d.g(h) : (this.label = d.label("", 0, 0, g.shape || "callout", null, null, g.useHTML, null, h).attr({ padding: g.padding, r: g.borderRadius }), a || this.label.attr({ fill: g.backgroundColor, "stroke-width": g.borderWidth }).css(g.style).shadow(g.shadow));
					a && (this.applyFilter(),
						this.label.addClass("highcharts-tooltip-" + this.chart.index));
					if(this.outside) { var m = { x: this.label.xSetter, y: this.label.ySetter };
						this.label.xSetter = function(a, d) { m[d].call(this.label, b.distance);
							e.style.left = a + "px" };
						this.label.ySetter = function(a, d) { m[d].call(this.label, b.distance);
							e.style.top = a + "px" } } this.label.attr({ zIndex: 8 }).add()
				}
				return this.label
			},
			update: function(b) { this.destroy();
				D(!0, this.chart.options.tooltip.userOptions, b);
				this.init(this.chart, D(!0, this.options, b)) },
			destroy: function() {
				this.label &&
					(this.label = this.label.destroy());
				this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
				this.renderer && (this.renderer = this.renderer.destroy(), c.discardElement(this.container));
				c.clearTimeout(this.hideTimer);
				c.clearTimeout(this.tooltipTimeout)
			},
			move: function(b, d, a, g) {
				var h = this,
					e = h.now,
					m = !1 !== h.options.animation && !h.isHidden && (1 < Math.abs(b - e.x) || 1 < Math.abs(d - e.y)),
					u = h.followPointer || 1 < h.len;
				K(e, {
					x: m ? (2 * e.x + b) / 3 : b,
					y: m ? (e.y + d) / 2 : d,
					anchorX: u ? void 0 : m ? (2 * e.anchorX + a) / 3 : a,
					anchorY: u ?
						void 0 : m ? (e.anchorY + g) / 2 : g
				});
				h.getLabel().attr(e);
				m && (c.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() { h && h.move(b, d, a, g) }, 32))
			},
			hide: function(b) { var d = this;
				c.clearTimeout(this.hideTimer);
				b = w(b, this.options.hideDelay, 500);
				this.isHidden || (this.hideTimer = n(function() { d.getLabel()[b ? "fadeOut" : "hide"]();
					d.isHidden = !0 }, b)) },
			getAnchor: function(b, d) {
				var a = this.chart,
					c = a.pointer,
					h = a.inverted,
					e = a.plotTop,
					m = a.plotLeft,
					u = 0,
					l = 0,
					t, x;
				b = z(b);
				this.followPointer && d ? (void 0 === d.chartX &&
					(d = c.normalize(d)), b = [d.chartX - a.plotLeft, d.chartY - e]) : b[0].tooltipPos ? b = b[0].tooltipPos : (b.forEach(function(a) { t = a.series.yAxis;
					x = a.series.xAxis;
					u += a.plotX + (!h && x ? x.left - m : 0);
					l += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!h && t ? t.top - e : 0) }), u /= b.length, l /= b.length, b = [h ? a.plotWidth - l : u, this.shared && !h && 1 < b.length && d ? d.chartY - e : h ? a.plotHeight - u : l]);
				return b.map(Math.round)
			},
			getPosition: function(b, d, a) {
				var c = this.chart,
					h = this.distance,
					e = {},
					m = c.inverted && a.h || 0,
					u, l = this.outside,
					t = l ? r.documentElement.clientWidth -
					2 * h : c.chartWidth,
					x = l ? Math.max(r.body.scrollHeight, r.documentElement.scrollHeight, r.body.offsetHeight, r.documentElement.offsetHeight, r.documentElement.clientHeight) : c.chartHeight,
					k = c.pointer.chartPosition,
					A = c.containerScaling,
					B = function(a) { return A ? a * A.scaleX : a },
					H = function(a) { return A ? a * A.scaleY : a },
					q = function(e) {
						var f = "x" === e;
						return [e, f ? t : x, f ? b : d].concat(l ? [f ? B(b) : H(d), f ? k.left - h + B(a.plotX + c.plotLeft) : k.top - h + H(a.plotY + c.plotTop), 0, f ? t : x] : [f ? b : d, f ? a.plotX + c.plotLeft : a.plotY + c.plotTop, f ? c.plotLeft :
							c.plotTop, f ? c.plotLeft + c.plotWidth : c.plotTop + c.plotHeight
						])
					},
					f = q("y"),
					n = q("x"),
					N = !this.followPointer && w(a.ttBelow, !c.inverted === !!a.negative),
					v = function(a, b, d, c, f, k, g) { var q = "y" === a ? H(h) : B(h),
							A = (d - c) / 2,
							t = c < f - h,
							u = f + h + c < b,
							x = f - q - d + A;
						f = f + q - A; if(N && u) e[a] = f;
						else if(!N && t) e[a] = x;
						else if(t) e[a] = Math.min(g - c, 0 > x - m ? x : x - m);
						else if(u) e[a] = Math.max(k, f + m + d > b ? f : f + m);
						else return !1 },
					p = function(a, b, d, c, f) { var k;
						f < h || f > b - h ? k = !1 : e[a] = f < d / 2 ? 1 : f > b - c / 2 ? b - c - 2 : f - d / 2; return k },
					z = function(a) { var b = f;
						f = n;
						n = b;
						u = a },
					L = function() {
						!1 !==
							v.apply(0, f) ? !1 !== p.apply(0, n) || u || (z(!0), L()) : u ? e.x = e.y = 0 : (z(!0), L())
					};
				(c.inverted || 1 < this.len) && z();
				L();
				return e
			},
			defaultFormatter: function(b) { var d = this.points || z(this); var a = [b.tooltipFooterHeaderFormatter(d[0])];
				a = a.concat(b.bodyFormatter(d));
				a.push(b.tooltipFooterHeaderFormatter(d[0], !0)); return a },
			refresh: function(b, d) {
				var a = this.chart,
					g = this.options,
					h = b,
					e = {},
					m = [];
				var u = g.formatter || this.defaultFormatter;
				e = this.shared;
				var l = a.styledMode;
				if(g.enabled) {
					c.clearTimeout(this.hideTimer);
					this.followPointer =
						z(h)[0].series.tooltipOptions.followPointer;
					var t = this.getAnchor(h, d);
					d = t[0];
					var x = t[1];
					!e || h.series && h.series.noSharedTooltip ? e = h.getLabelConfig() : (a.pointer.applyInactiveState(h), h.forEach(function(a) { a.setState("hover");
						m.push(a.getLabelConfig()) }), e = { x: h[0].category, y: h[0].y }, e.points = m, h = h[0]);
					this.len = m.length;
					u = u.call(e, this);
					e = h.series;
					this.distance = w(e.tooltipOptions.distance, 16);
					!1 === u ? this.hide() : (a = this.getLabel(), this.isHidden && a.attr({ opacity: 1 }).show(), this.split ? this.renderSplit(u,
						z(b)) : (g.style.width && !l || a.css({ width: this.chart.spacingBox.width }), a.attr({ text: u && u.join ? u.join("") : u }), a.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + w(h.colorIndex, e.colorIndex)), l || a.attr({ stroke: g.borderColor || h.color || e.color || "#666666" }), this.updatePosition({ plotX: d, plotY: x, negative: h.negative, ttBelow: h.ttBelow, h: t[2] || 0 })), this.isHidden = !1);
					c.fireEvent(this, "refresh")
				}
			},
			renderSplit: function(b, d) {
				var a = this,
					g = [],
					h = this.chart,
					e = h.renderer,
					m = !0,
					u = this.options,
					l = 0,
					t, x =
					this.getLabel(),
					k = h.plotTop;
				F(b) && (b = [!1, b]);
				b.slice(0, d.length + 1).forEach(function(b, c) {
					if(!1 !== b && "" !== b) {
						c = d[c - 1] || { isHeader: !0, plotX: d[0].plotX, plotY: h.plotHeight };
						var B = c.series || a,
							q = B.tt,
							f = c.series || {},
							A = "highcharts-color-" + w(c.colorIndex, f.colorIndex, "none");
						q || (q = { padding: u.padding, r: u.borderRadius }, h.styledMode || (q.fill = u.backgroundColor, q["stroke-width"] = u.borderWidth), B.tt = q = e.label(null, null, null, (c.isHeader ? u.headerShape : u.shape) || "callout", null, null, u.useHTML).addClass("highcharts-tooltip-box " +
							A).attr(q).add(x));
						q.isActive = !0;
						q.attr({ text: b });
						h.styledMode || q.css(u.style).shadow(u.shadow).attr({ stroke: u.borderColor || c.color || f.color || "#333333" });
						b = q.getBBox();
						A = b.width + q.strokeWidth();
						c.isHeader ? (l = b.height, h.xAxis[0].opposite && (t = !0, k -= l), b = Math.max(0, Math.min(c.plotX + h.plotLeft - A / 2, h.chartWidth + (h.scrollablePixelsX ? h.scrollablePixelsX - h.marginRight : 0) - A))) : b = c.plotX + h.plotLeft - w(u.distance, 16) - A;
						0 > b && (m = !1);
						c.isHeader ? f = t ? -l : h.plotHeight + l : (f = f.yAxis, f = f.pos - k + Math.max(0, Math.min(c.plotY ||
							0, f.len)));
						g.push({ target: f, rank: c.isHeader ? 1 : 0, size: B.tt.getBBox().height + 1, point: c, x: b, tt: q })
					}
				});
				this.cleanSplit();
				u.positioner && g.forEach(function(b) { var d = u.positioner.call(a, b.tt.getBBox().width, b.size, b.point);
					b.x = d.x;
					b.align = 0;
					b.target = d.y;
					b.rank = w(d.rank, b.rank) });
				c.distribute(g, h.plotHeight + l);
				g.forEach(function(b) {
					var d = b.point,
						c = d.series,
						e = c && c.yAxis;
					b.tt.attr({
						visibility: void 0 === b.pos ? "hidden" : "inherit",
						x: m || d.isHeader || u.positioner ? b.x : d.plotX + h.plotLeft + a.distance,
						y: b.pos + k,
						anchorX: d.isHeader ?
							d.plotX + h.plotLeft : d.plotX + c.xAxis.pos,
						anchorY: d.isHeader ? h.plotTop + h.plotHeight / 2 : e.pos + Math.max(0, Math.min(d.plotY, e.len))
					})
				})
			},
			updatePosition: function(b) {
				var d = this.chart,
					a = this.getLabel(),
					g = (this.options.positioner || this.getPosition).call(this, a.width, a.height, b),
					h = b.plotX + d.plotLeft;
				b = b.plotY + d.plotTop;
				if(this.outside) {
					var e = (this.options.borderWidth || 0) + 2 * this.distance;
					this.renderer.setSize(a.width + e, a.height + e, !1);
					if(a = d.containerScaling) c.css(this.container, {
						transform: "scale(" + a.scaleX + ", " +
							a.scaleY + ")"
					}), h *= a.scaleX, b *= a.scaleY;
					h += d.pointer.chartPosition.left - g.x;
					b += d.pointer.chartPosition.top - g.y
				}
				this.move(Math.round(g.x), Math.round(g.y || 0), h, b)
			},
			getDateFormat: function(b, d, a, c) {
				var g = this.chart.time,
					e = g.dateFormat("%m-%d %H:%M:%S.%L", d),
					m = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
					u = "millisecond";
				for(n in l) {
					if(b === l.week && +g.dateFormat("%w", d) === a && "00:00:00.000" === e.substr(6)) { var n = "week"; break }
					if(l[n] > b) { n = u; break }
					if(m[n] && e.substr(m[n]) !== "01-01 00:00:00.000".substr(m[n])) break;
					"week" !== n && (u = n)
				}
				if(n) var t = g.resolveDTLFormat(c[n]).main;
				return t
			},
			getXDateFormat: function(b, d, a) { d = d.dateTimeLabelFormats; var c = a && a.closestPointRange; return(c ? this.getDateFormat(c, b.x, a.options.startOfWeek, d) : d.day) || d.year },
			tooltipFooterHeaderFormatter: function(b, d) {
				var a = d ? "footer" : "header",
					g = b.series,
					h = g.tooltipOptions,
					e = h.xDateFormat,
					m = g.xAxis,
					u = m && "datetime" === m.options.type && G(b.key),
					l = h[a + "Format"];
				d = { isFooter: d, labelConfig: b };
				c.fireEvent(this, "headerFormatter", d, function(a) {
					u && !e && (e =
						this.getXDateFormat(b, h, m));
					u && e && (b.point && b.point.tooltipDateKeys || ["key"]).forEach(function(a) { l = l.replace("{point." + a + "}", "{point." + a + ":" + e + "}") });
					g.chart.styledMode && (l = this.styledModeFormat(l));
					a.text = v(l, { point: b, series: g }, this.chart.time)
				});
				return d.text
			},
			bodyFormatter: function(b) { return b.map(function(b) { var a = b.series.tooltipOptions; return(a[(b.point.formatPrefix || "point") + "Formatter"] || b.point.tooltipFormatter).call(b.point, a[(b.point.formatPrefix || "point") + "Format"] || "") }) },
			styledModeFormat: function(b) {
				return b.replace('style="font-size: 10px"',
					'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
			}
		}
	});
	M(J, "parts/Pointer.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.isNumber,
			F = p.isObject,
			z = p.objectEach,
			r = p.splat,
			K = c.addEvent,
			v = c.attr,
			D = c.charts,
			w = c.color,
			n = c.css,
			l = c.extend,
			b = c.find,
			d = c.fireEvent,
			a = c.offset,
			g = c.pick,
			h = c.Tooltip;
		c.Pointer = function(a, b) { this.init(a, b) };
		c.Pointer.prototype = {
			init: function(a, b) {
				this.options = b;
				this.chart =
					a;
				this.runChartClick = b.chart.events && !!b.chart.events.click;
				this.pinchDown = [];
				this.lastValidTouch = {};
				h && (a.tooltip = new h(a, b.tooltip), this.followTouchMove = g(b.tooltip.followTouchMove, !0));
				this.setDOMEvents()
			},
			zoomOption: function(a) { var b = this.chart,
					d = b.options.chart,
					c = d.zoomType || "";
				b = b.inverted; /touch/.test(a.type) && (c = g(d.pinchType, c));
				this.zoomX = a = /x/.test(c);
				this.zoomY = c = /y/.test(c);
				this.zoomHor = a && !b || c && b;
				this.zoomVert = c && !b || a && b;
				this.hasZoom = a || c },
			normalize: function(b, d) {
				var c = b.touches ? b.touches.length ?
					b.touches.item(0) : b.changedTouches[0] : b;
				d || (this.chartPosition = d = a(this.chart.container));
				var e = c.pageX - d.left;
				d = c.pageY - d.top;
				if(c = this.chart.containerScaling) e /= c.scaleX, d /= c.scaleY;
				return l(b, { chartX: Math.round(e), chartY: Math.round(d) })
			},
			getCoordinates: function(a) { var b = { xAxis: [], yAxis: [] };
				this.chart.axes.forEach(function(d) { b[d.isXAxis ? "xAxis" : "yAxis"].push({ axis: d, value: d.toValue(a[d.horiz ? "chartX" : "chartY"]) }) }); return b },
			findNearestKDPoint: function(a, b, d) {
				var c;
				a.forEach(function(a) {
					var e = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
					a = a.searchPoint(d, e);
					if((e = F(a, !0)) && !(e = !F(c, !0))) { e = c.distX - a.distX; var k = c.dist - a.dist,
							g = (a.series.group && a.series.group.zIndex) - (c.series.group && c.series.group.zIndex);
						e = 0 < (0 !== e && b ? e : 0 !== k ? k : 0 !== g ? g : c.series.index > a.series.index ? -1 : 1) } e && (c = a)
				});
				return c
			},
			getPointFromEvent: function(a) { a = a.target; for(var b; a && !b;) b = a.point, a = a.parentNode; return b },
			getChartCoordinatesFromPoint: function(a, b) {
				var d = a.series,
					c = d.xAxis;
				d = d.yAxis;
				var e = g(a.clientX, a.plotX),
					h = a.shapeArgs;
				if(c && d) return b ? { chartX: c.len + c.pos - e, chartY: d.len + d.pos - a.plotY } : { chartX: e + c.pos, chartY: a.plotY + d.pos };
				if(h && h.x && h.y) return { chartX: h.x, chartY: h.y }
			},
			getHoverData: function(a, d, c, h, t, x) {
				var e, m = [];
				h = !(!h || !a);
				var B = d && !d.stickyTracking ? [d] : c.filter(function(a) { return a.visible && !(!t && a.directTouch) && g(a.options.enableMouseTracking, !0) && a.stickyTracking });
				d = (e = h ? a : this.findNearestKDPoint(B, t, x)) && e.series;
				e && (t && !d.noSharedTooltip ? (B = c.filter(function(a) {
					return a.visible &&
						!(!t && a.directTouch) && g(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
				}), B.forEach(function(a) { var d = b(a.points, function(a) { return a.x === e.x && !a.isNull });
					F(d) && (a.chart.isBoosting && (d = a.getPoint(d)), m.push(d)) })) : m.push(e));
				return { hoverPoint: e, hoverSeries: d, hoverPoints: m }
			},
			runPointActions: function(a, b) {
				var d = this.chart,
					e = d.tooltip && d.tooltip.options.enabled ? d.tooltip : void 0,
					h = e ? e.shared : !1,
					m = b || d.hoverPoint,
					k = m && m.series || d.hoverSeries;
				k = this.getHoverData(m, k, d.series, "touchmove" !== a.type &&
					(!!b || k && k.directTouch && this.isDirectTouch), h, a);
				m = k.hoverPoint;
				var A = k.hoverPoints;
				b = (k = k.hoverSeries) && k.tooltipOptions.followPointer;
				h = h && k && !k.noSharedTooltip;
				if(m && (m !== d.hoverPoint || e && e.isHidden)) {
					(d.hoverPoints || []).forEach(function(a) {-1 === A.indexOf(a) && a.setState() });
					if(d.hoverSeries !== k) k.onMouseOver();
					this.applyInactiveState(A);
					(A || []).forEach(function(a) { a.setState("hover") });
					d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut");
					if(!m.series) return;
					m.firePointEvent("mouseOver");
					d.hoverPoints =
						A;
					d.hoverPoint = m;
					e && e.refresh(h ? A : m, a)
				} else b && e && !e.isHidden && (m = e.getAnchor([{}], a), e.updatePosition({ plotX: m[0], plotY: m[1] }));
				this.unDocMouseMove || (this.unDocMouseMove = K(d.container.ownerDocument, "mousemove", function(a) { var b = D[c.hoverChartIndex]; if(b) b.pointer.onDocumentMouseMove(a) }));
				d.axes.forEach(function(b) { var d = g(b.crosshair.snap, !0),
						e = d ? c.find(A, function(a) { return a.series[b.coll] === b }) : void 0;
					e || !d ? b.drawCrosshair(a, e) : b.hideCrosshair() })
			},
			applyInactiveState: function(a) {
				var b = [],
					d;
				(a || []).forEach(function(a) { d = a.series;
					b.push(d);
					d.linkedParent && b.push(d.linkedParent);
					d.linkedSeries && (b = b.concat(d.linkedSeries));
					d.navigatorSeries && b.push(d.navigatorSeries) });
				this.chart.series.forEach(function(a) {-1 === b.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive") })
			},
			reset: function(a, b) {
				var d = this.chart,
					c = d.hoverSeries,
					e = d.hoverPoint,
					g = d.hoverPoints,
					k = d.tooltip,
					h = k && k.shared ? g : e;
				a && h && r(h).forEach(function(b) {
					b.series.isCartesian && void 0 ===
						b.plotX && (a = !1)
				});
				if(a) k && h && r(h).length && (k.refresh(h), k.shared && g ? g.forEach(function(a) { a.setState(a.state, !0);
					a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a)) }) : e && (e.setState(e.state, !0), d.axes.forEach(function(a) { a.crosshair && a.drawCrosshair(null, e) })));
				else {
					if(e) e.onMouseOut();
					g && g.forEach(function(a) { a.setState() });
					if(c) c.onMouseOut();
					k && k.hide(b);
					this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
					d.axes.forEach(function(a) { a.hideCrosshair() });
					this.hoverX = d.hoverPoints = d.hoverPoint = null
				}
			},
			scaleGroups: function(a, b) { var d = this.chart,
					c;
				d.series.forEach(function(e) { c = a || e.getPlotBox();
					e.xAxis && e.xAxis.zoomEnabled && e.group && (e.group.attr(c), e.markerGroup && (e.markerGroup.attr(c), e.markerGroup.clip(b ? d.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(c)) });
				d.clipRect.attr(b || d.clipBox) },
			dragStart: function(a) {
				var b = this.chart;
				b.mouseIsDown = a.type;
				b.cancelClick = !1;
				b.mouseDownX = this.mouseDownX =
					a.chartX;
				b.mouseDownY = this.mouseDownY = a.chartY
			},
			drag: function(a) {
				var b = this.chart,
					d = b.options.chart,
					c = a.chartX,
					e = a.chartY,
					g = this.zoomHor,
					k = this.zoomVert,
					h = b.plotLeft,
					B = b.plotTop,
					H = b.plotWidth,
					q = b.plotHeight,
					f = this.selectionMarker,
					l = this.mouseDownX,
					n = this.mouseDownY,
					r = d.panKey && a[d.panKey + "Key"];
				if(!f || !f.touch)
					if(c < h ? c = h : c > h + H && (c = h + H), e < B ? e = B : e > B + q && (e = B + q), this.hasDragged = Math.sqrt(Math.pow(l - c, 2) + Math.pow(n - e, 2)), 10 < this.hasDragged) {
						var v = b.isInsidePlot(l - h, n - B);
						b.hasCartesianSeries && (this.zoomX ||
							this.zoomY) && v && !r && !f && (this.selectionMarker = f = b.renderer.rect(h, B, g ? 1 : H, k ? 1 : q, 0).attr({ "class": "highcharts-selection-marker", zIndex: 7 }).add(), b.styledMode || f.attr({ fill: d.selectionMarkerFill || w("#335cad").setOpacity(.25).get() }));
						f && g && (c -= l, f.attr({ width: Math.abs(c), x: (0 < c ? 0 : c) + l }));
						f && k && (c = e - n, f.attr({ height: Math.abs(c), y: (0 < c ? 0 : c) + n }));
						v && !f && d.panning && b.pan(a, d.panning)
					}
			},
			drop: function(a) {
				var b = this,
					c = this.chart,
					e = this.hasPinched;
				if(this.selectionMarker) {
					var g = { originalEvent: a, xAxis: [], yAxis: [] },
						h = this.selectionMarker,
						k = h.attr ? h.attr("x") : h.x,
						A = h.attr ? h.attr("y") : h.y,
						B = h.attr ? h.attr("width") : h.width,
						H = h.attr ? h.attr("height") : h.height,
						q;
					if(this.hasDragged || e) c.axes.forEach(function(d) { if(d.zoomEnabled && y(d.min) && (e || b[{ xAxis: "zoomX", yAxis: "zoomY" }[d.coll]])) { var c = d.horiz,
								f = "touchend" === a.type ? d.minPixelPadding : 0,
								h = d.toValue((c ? k : A) + f);
							c = d.toValue((c ? k + B : A + H) - f);
							g[d.coll].push({ axis: d, min: Math.min(h, c), max: Math.max(h, c) });
							q = !0 } }), q && d(c, "selection", g, function(a) {
						c.zoom(l(a, e ? { animation: !1 } :
							null))
					});
					G(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
					e && this.scaleGroups()
				}
				c && G(c.index) && (n(c.container, { cursor: c._cursor }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
			},
			onContainerMouseDown: function(a) { a = this.normalize(a);
				2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a)) },
			onDocumentMouseUp: function(a) { D[c.hoverChartIndex] && D[c.hoverChartIndex].pointer.drop(a) },
			onDocumentMouseMove: function(a) {
				var b =
					this.chart,
					d = this.chartPosition;
				a = this.normalize(a, d);
				!d || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
			},
			onContainerMouseLeave: function(a) { var b = D[c.hoverChartIndex];
				b && (a.relatedTarget || a.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null) },
			onContainerMouseMove: function(a) {
				var b = this.chart;
				y(c.hoverChartIndex) && D[c.hoverChartIndex] && D[c.hoverChartIndex].mouseIsDown || (c.hoverChartIndex = b.index);
				a = this.normalize(a);
				a.preventDefault ||
					(a.returnValue = !1);
				"mousedown" === b.mouseIsDown && this.drag(a);
				!this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || b.openMenu || this.runPointActions(a)
			},
			inClass: function(a, b) { for(var d; a;) { if(d = v(a, "class")) { if(-1 !== d.indexOf(b)) return !0; if(-1 !== d.indexOf("highcharts-container")) return !1 } a = a.parentNode } },
			onTrackerMouseOut: function(a) {
				var b = this.chart.hoverSeries;
				a = a.relatedTarget || a.toElement;
				this.isDirectTouch = !1;
				if(!(!b || !a || b.stickyTracking || this.inClass(a,
						"highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
			},
			onContainerClick: function(a) { var b = this.chart,
					c = b.hoverPoint,
					e = b.plotLeft,
					g = b.plotTop;
				a = this.normalize(a);
				b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (d(c.series, "click", l(a, { point: c })), b.hoverPoint && c.firePointEvent("click", a)) : (l(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - g) && d(b, "click", a))) },
			setDOMEvents: function() {
				var a = this,
					b = a.chart.container,
					d = b.ownerDocument;
				b.onmousedown = function(b) { a.onContainerMouseDown(b) };
				b.onmousemove = function(b) { a.onContainerMouseMove(b) };
				b.onclick = function(b) { a.onContainerClick(b) };
				this.unbindContainerMouseLeave = K(b, "mouseleave", a.onContainerMouseLeave);
				c.unbindDocumentMouseUp || (c.unbindDocumentMouseUp = K(d, "mouseup", a.onDocumentMouseUp));
				c.hasTouch && (K(b, "touchstart", function(b) { a.onContainerTouchStart(b) }), K(b, "touchmove", function(b) { a.onContainerTouchMove(b) }), c.unbindDocumentTouchEnd || (c.unbindDocumentTouchEnd =
					K(d, "touchend", a.onDocumentTouchEnd)))
			},
			destroy: function() { var a = this;
				a.unDocMouseMove && a.unDocMouseMove();
				this.unbindContainerMouseLeave();
				c.chartCount || (c.unbindDocumentMouseUp && (c.unbindDocumentMouseUp = c.unbindDocumentMouseUp()), c.unbindDocumentTouchEnd && (c.unbindDocumentTouchEnd = c.unbindDocumentTouchEnd()));
				clearInterval(a.tooltipTimeout);
				z(a, function(b, d) { a[d] = null }) }
		}
	});
	M(J, "parts/TouchPointer.js", [J["parts/Globals.js"]], function(c) {
		var p = c.charts,
			y = c.extend,
			G = c.noop,
			F = c.pick;
		y(c.Pointer.prototype, {
			pinchTranslate: function(c, r, p, v, y, w) { this.zoomHor && this.pinchTranslateDirection(!0, c, r, p, v, y, w);
				this.zoomVert && this.pinchTranslateDirection(!1, c, r, p, v, y, w) },
			pinchTranslateDirection: function(c, r, p, v, y, w, n, l) {
				var b = this.chart,
					d = c ? "x" : "y",
					a = c ? "X" : "Y",
					g = "chart" + a,
					h = c ? "width" : "height",
					e = b["plot" + (c ? "Left" : "Top")],
					m, u, E = l || 1,
					t = b.inverted,
					x = b.bounds[c ? "h" : "v"],
					k = 1 === r.length,
					A = r[0][g],
					B = p[0][g],
					H = !k && r[1][g],
					q = !k && p[1][g];
				p = function() {
					!k && 20 < Math.abs(A - H) && (E = l || Math.abs(B - q) / Math.abs(A - H));
					u = (e - B) / E + A;
					m = b["plot" + (c ? "Width" : "Height")] / E
				};
				p();
				r = u;
				if(r < x.min) { r = x.min; var f = !0 } else r + m > x.max && (r = x.max - m, f = !0);
				f ? (B -= .8 * (B - n[d][0]), k || (q -= .8 * (q - n[d][1])), p()) : n[d] = [B, q];
				t || (w[d] = u - e, w[h] = m);
				w = t ? 1 / E : E;
				y[h] = m;
				y[d] = r;
				v[t ? c ? "scaleY" : "scaleX" : "scale" + a] = E;
				v["translate" + a] = w * e + (B - w * A)
			},
			pinch: function(c) {
				var r = this,
					p = r.chart,
					v = r.pinchDown,
					z = c.touches,
					w = z.length,
					n = r.lastValidTouch,
					l = r.hasZoom,
					b = r.selectionMarker,
					d = {},
					a = 1 === w && (r.inClass(c.target, "highcharts-tracker") && p.runTrackerClick || r.runChartClick),
					g = {};
				1 < w && (r.initiated = !0);
				l && r.initiated && !a && c.preventDefault();
				[].map.call(z, function(a) { return r.normalize(a) });
				"touchstart" === c.type ? ([].forEach.call(z, function(a, b) { v[b] = { chartX: a.chartX, chartY: a.chartY } }), n.x = [v[0].chartX, v[1] && v[1].chartX], n.y = [v[0].chartY, v[1] && v[1].chartY], p.axes.forEach(function(a) {
					if(a.zoomEnabled) {
						var b = p.bounds[a.horiz ? "h" : "v"],
							d = a.minPixelPadding,
							c = a.toPixels(Math.min(F(a.options.min, a.dataMin), a.dataMin)),
							g = a.toPixels(Math.max(F(a.options.max, a.dataMax), a.dataMax)),
							h = Math.max(c,
								g);
						b.min = Math.min(a.pos, Math.min(c, g) - d);
						b.max = Math.max(a.pos + a.len, h + d)
					}
				}), r.res = !0) : r.followTouchMove && 1 === w ? this.runPointActions(r.normalize(c)) : v.length && (b || (r.selectionMarker = b = y({ destroy: G, touch: !0 }, p.plotBox)), r.pinchTranslate(v, z, d, b, g, n), r.hasPinched = l, r.scaleGroups(d, g), r.res && (r.res = !1, this.reset(!1, 0)))
			},
			touch: function(p, r) {
				var z = this.chart,
					v;
				if(z.index !== c.hoverChartIndex) this.onContainerMouseLeave({ relatedTarget: !0 });
				c.hoverChartIndex = z.index;
				if(1 === p.touches.length)
					if(p = this.normalize(p),
						(v = z.isInsidePlot(p.chartX - z.plotLeft, p.chartY - z.plotTop)) && !z.openMenu) { r && this.runPointActions(p); if("touchmove" === p.type) { r = this.pinchDown; var y = r[0] ? 4 <= Math.sqrt(Math.pow(r[0].chartX - p.chartX, 2) + Math.pow(r[0].chartY - p.chartY, 2)) : !1 } F(y, !0) && this.pinch(p) } else r && this.reset();
				else 2 === p.touches.length && this.pinch(p)
			},
			onContainerTouchStart: function(c) { this.zoomOption(c);
				this.touch(c, !0) },
			onContainerTouchMove: function(c) { this.touch(c) },
			onDocumentTouchEnd: function(z) { p[c.hoverChartIndex] && p[c.hoverChartIndex].pointer.drop(z) }
		})
	});
	M(J, "parts/MSPointer.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.objectEach,
			G = c.addEvent,
			F = c.charts,
			z = c.css,
			r = c.doc;
		p = c.extend;
		var K = c.noop,
			v = c.Pointer,
			D = c.removeEvent,
			w = c.win,
			n = c.wrap;
		if(!c.hasTouch && (w.PointerEvent || w.MSPointerEvent)) {
			var l = {},
				b = !!w.PointerEvent,
				d = function() { var a = [];
					a.item = function(a) { return this[a] };
					y(l, function(b) { a.push({ pageX: b.pageX, pageY: b.pageY, target: b.target }) }); return a },
				a = function(a, b, e, m) {
					"touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH ||
						!F[c.hoverChartIndex] || (m(a), m = F[c.hoverChartIndex].pointer, m[b]({ type: e, target: a.currentTarget, preventDefault: K, touches: d() }))
				};
			p(v.prototype, {
				onContainerPointerDown: function(b) { a(b, "onContainerTouchStart", "touchstart", function(a) { l[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget } }) },
				onContainerPointerMove: function(b) { a(b, "onContainerTouchMove", "touchmove", function(a) { l[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };
						l[a.pointerId].target || (l[a.pointerId].target = a.currentTarget) }) },
				onDocumentPointerUp: function(b) {
					a(b,
						"onDocumentTouchEnd", "touchend",
						function(a) { delete l[a.pointerId] })
				},
				batchMSEvents: function(a) { a(this.chart.container, b ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
					a(this.chart.container, b ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
					a(r, b ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp) }
			});
			n(v.prototype, "init", function(a, b, d) { a.call(this, b, d);
				this.hasZoom && z(b.container, { "-ms-touch-action": "none", "touch-action": "none" }) });
			n(v.prototype, "setDOMEvents", function(a) {
				a.apply(this);
				(this.hasZoom || this.followTouchMove) && this.batchMSEvents(G)
			});
			n(v.prototype, "destroy", function(a) { this.batchMSEvents(D);
				a.call(this) })
		}
	});
	M(J, "parts/Legend.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.isNumber,
			F = c.addEvent,
			z = c.css,
			r = c.discardElement,
			K = c.fireEvent;
		p = c.isFirefox;
		var v = c.marginNames,
			D = c.merge,
			w = c.pick,
			n = c.setAnimation,
			l = c.stableSort,
			b = c.win,
			d = c.wrap;
		c.Legend = function(a, b) { this.init(a, b) };
		c.Legend.prototype = {
			init: function(a, b) {
				this.chart = a;
				this.setOptions(b);
				b.enabled && (this.render(), F(this.chart, "endResize", function() { this.legend.positionCheckboxes() }), this.proximate ? this.unchartrender = F(this.chart, "render", function() { this.legend.proximatePositions();
					this.legend.positionItems() }) : this.unchartrender && this.unchartrender())
			},
			setOptions: function(a) {
				var b = w(a.padding, 8);
				this.options = a;
				this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = D(this.itemStyle, a.itemHiddenStyle));
				this.itemMarginTop = a.itemMarginTop || 0;
				this.padding = b;
				this.initialItemY =
					b - 5;
				this.symbolWidth = w(a.symbolWidth, 16);
				this.pages = [];
				this.proximate = "proximate" === a.layout && !this.chart.inverted
			},
			update: function(a, b) { var d = this.chart;
				this.setOptions(D(!0, this.options, a));
				this.destroy();
				d.isDirtyLegend = d.isDirtyBox = !0;
				w(b, !0) && d.redraw();
				K(this, "afterUpdate") },
			colorizeItem: function(a, b) {
				a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
				if(!this.chart.styledMode) {
					var d = this.options,
						c = a.legendItem,
						g = a.legendLine,
						l = a.legendSymbol,
						n = this.itemHiddenStyle.color;
					d = b ? d.itemStyle.color : n;
					var t = b ? a.color || n : n,
						x = a.options && a.options.marker,
						k = { fill: t };
					c && c.css({ fill: d, color: d });
					g && g.attr({ stroke: t });
					l && (x && l.isMarker && (k = a.pointAttribs(), b || (k.stroke = k.fill = n)), l.attr(k))
				}
				K(this, "afterColorizeItem", { item: a, visible: b })
			},
			positionItems: function() { this.allItems.forEach(this.positionItem, this);
				this.chart.isResizing || this.positionCheckboxes() },
			positionItem: function(a) {
				var b = this.options,
					d = b.symbolPadding;
				b = !b.rtl;
				var c = a._legendItemPos,
					m = c[0];
				c = c[1];
				var l = a.checkbox;
				if((a = a.legendGroup) && a.element) a[y(a.translateY) ? "animate" : "attr"]({ translateX: b ? m : this.legendWidth - m - 2 * d - 4, translateY: c });
				l && (l.x = m, l.y = c)
			},
			destroyItem: function(a) { var b = a.checkbox;
				["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function(b) { a[b] && (a[b] = a[b].destroy()) });
				b && r(a.checkbox) },
			destroy: function() {
				function a(a) { this[a] && (this[a] = this[a].destroy()) } this.getAllItems().forEach(function(b) {
					["legendItem", "legendGroup"].forEach(a, b) });
				"clipRect up down pager nav box title group".split(" ").forEach(a,
					this);
				this.display = null
			},
			positionCheckboxes: function() { var a = this.group && this.group.alignAttr,
					b = this.clipHeight || this.legendHeight,
					d = this.titleHeight; if(a) { var c = a.translateY;
					this.allItems.forEach(function(e) { var g = e.checkbox; if(g) { var h = c + d + g.y + (this.scrollOffset || 0) + 3;
							z(g, { left: a.translateX + e.checkboxOffset + g.x - 20 + "px", top: h + "px", display: this.proximate || h > c - 6 && h < c + b - 6 ? "" : "none" }) } }, this) } },
			renderTitle: function() {
				var a = this.options,
					b = this.padding,
					d = a.title,
					c = 0;
				d.text && (this.title || (this.title = this.chart.renderer.label(d.text,
					b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(d.style), this.title.add(this.group)), d.width || this.title.css({ width: this.maxLegendWidth + "px" }), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: c }));
				this.titleHeight = c
			},
			setText: function(a) { var b = this.options;
				a.legendItem.attr({ text: b.labelFormat ? c.format(b.labelFormat, a, this.chart.time) : b.labelFormatter.call(a) }) },
			renderItem: function(a) {
				var b = this.chart,
					d = b.renderer,
					c = this.options,
					m = this.symbolWidth,
					l = c.symbolPadding,
					n = this.itemStyle,
					t = this.itemHiddenStyle,
					x = "horizontal" === c.layout ? w(c.itemDistance, 20) : 0,
					k = !c.rtl,
					A = a.legendItem,
					B = !a.series,
					H = !B && a.series.drawLegendSymbol ? a.series : a,
					q = H.options;
				q = this.createCheckboxForItem && q && q.showCheckbox;
				x = m + l + x + (q ? 20 : 0);
				var f = c.useHTML,
					C = a.options.className;
				A || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + H.type + "-series highcharts-color-" + a.colorIndex + (C ? " " + C : "") + (B ? " highcharts-series-" + a.index :
					"")).attr({ zIndex: 1 }).add(this.scrollGroup), a.legendItem = A = d.text("", k ? m + l : -l, this.baseline || 0, f), b.styledMode || A.css(D(a.visible ? n : t)), A.attr({ align: k ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (this.fontMetrics = d.fontMetrics(b.styledMode ? 12 : n.fontSize, A), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, A.attr("y", this.baseline)), this.symbolHeight = c.symbolHeight || this.fontMetrics.f, H.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, A, f));
				q && !a.checkbox && this.createCheckboxForItem(a);
				this.colorizeItem(a, a.visible);
				!b.styledMode && n.width || A.css({ width: (c.itemWidth || this.widthOption || b.spacingBox.width) - x });
				this.setText(a);
				b = A.getBBox();
				a.itemWidth = a.checkboxOffset = c.itemWidth || a.legendItemWidth || b.width + x;
				this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
				this.totalItemWidth += a.itemWidth;
				this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
			},
			layoutItem: function(a) {
				var b = this.options,
					d = this.padding,
					c = "horizontal" === b.layout,
					m = a.itemHeight,
					l = b.itemMarginBottom || 0,
					n = this.itemMarginTop,
					t = c ? w(b.itemDistance, 20) : 0,
					x = this.maxLegendWidth;
				b = b.alignColumns && this.totalItemWidth > x ? this.maxItemWidth : a.itemWidth;
				c && this.itemX - d + b > x && (this.itemX = d, this.lastLineHeight && (this.itemY += n + this.lastLineHeight + l), this.lastLineHeight = 0);
				this.lastItemY = n + this.itemY + l;
				this.lastLineHeight = Math.max(m, this.lastLineHeight);
				a._legendItemPos = [this.itemX, this.itemY];
				c ? this.itemX += b : (this.itemY += n + m + l, this.lastLineHeight = m);
				this.offsetWidth = this.widthOption || Math.max((c ?
					this.itemX - d - (a.checkbox ? 0 : t) : b) + d, this.offsetWidth)
			},
			getAllItems: function() { var a = [];
				this.chart.series.forEach(function(b) { var d = b && b.options;
					b && w(d.showInLegend, y(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === d.legendType ? b.data : b))) });
				K(this, "afterGetAllItems", { allItems: a }); return a },
			getAlignment: function() { var a = this.options; return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0) },
			adjustMargins: function(a, b) {
				var d =
					this.chart,
					c = this.options,
					g = this.getAlignment(),
					l = d.options.title.margin,
					n = void 0 !== l ? d.titleOffset[0] + l : 0,
					t = void 0 !== l ? d.titleOffset[2] + l : 0;
				g && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(e, k) { e.test(g) && !y(a[k]) && (d[v[k]] = Math.max(d[v[k]], d.legend[(k + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][k] * c[k % 2 ? "x" : "y"] + w(c.margin, 12) + b[k] + (0 === k && (0 === d.titleOffset[0] ? 0 : n)) + (2 === k && (0 === d.titleOffset[2] ? 0 : t)))) })
			},
			proximatePositions: function() {
				var a = this.chart,
					b = [],
					d = "left" === this.options.align;
				this.allItems.forEach(function(e) { var g = d; if(e.yAxis && e.points) { e.xAxis.options.reversed && (g = !g); var h = c.find(g ? e.points : e.points.slice(0).reverse(), function(a) { return G(a.plotY) });
						g = e.legendGroup.getBBox().height; var l = e.yAxis.top - a.plotTop;
						e.visible ? (h = h ? h.plotY : e.yAxis.height, h += l - .3 * g) : h = l + e.yAxis.height;
						b.push({ target: h, size: g, item: e }) } }, this);
				c.distribute(b, a.plotHeight);
				b.forEach(function(b) { b.item._legendItemPos[1] = a.plotTop - a.spacing[0] + b.pos })
			},
			render: function() {
				var a =
					this.chart,
					b = a.renderer,
					d = this.group,
					e, m = this.box,
					n = this.options,
					w = this.padding;
				this.itemX = w;
				this.itemY = this.initialItemY;
				this.lastItemY = this.offsetWidth = 0;
				this.widthOption = c.relativeLength(n.width, a.spacingBox.width - w);
				var t = a.spacingBox.width - 2 * w - n.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (t /= 2);
				this.maxLegendWidth = this.widthOption || t;
				d || (this.group = d = b.g("legend").attr({ zIndex: 7 }).add(), this.contentGroup = b.g().attr({ zIndex: 1 }).add(d), this.scrollGroup = b.g().add(this.contentGroup));
				this.renderTitle();
				t = this.getAllItems();
				l(t, function(a, b) { return(a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0) });
				n.reversed && t.reverse();
				this.allItems = t;
				this.display = e = !!t.length;
				this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
				t.forEach(this.renderItem, this);
				t.forEach(this.layoutItem, this);
				t = (this.widthOption || this.offsetWidth) + w;
				var x = this.lastItemY + this.lastLineHeight + this.titleHeight;
				x = this.handleOverflow(x);
				x += w;
				m || (this.box = m = b.rect().addClass("highcharts-legend-box").attr({ r: n.borderRadius }).add(d),
					m.isNew = !0);
				a.styledMode || m.attr({ stroke: n.borderColor, "stroke-width": n.borderWidth || 0, fill: n.backgroundColor || "none" }).shadow(n.shadow);
				0 < t && 0 < x && (m[m.isNew ? "attr" : "animate"](m.crisp.call({}, { x: 0, y: 0, width: t, height: x }, m.strokeWidth())), m.isNew = !1);
				m[e ? "show" : "hide"]();
				a.styledMode && "none" === d.getStyle("display") && (t = x = 0);
				this.legendWidth = t;
				this.legendHeight = x;
				e && (b = a.options.title.margin, m = a.spacingBox, w = m.y, /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0] ? w += a.titleOffset[0] + b : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
					0 < a.titleOffset[2] && (w -= a.titleOffset[2] + b), w !== m.y && (m = D(m, { y: w })), d.align(D(n, { width: t, height: x, verticalAlign: this.proximate ? "top" : n.verticalAlign }), !0, m));
				this.proximate || this.positionItems();
				K(this, "afterRender")
			},
			handleOverflow: function(a) {
				var b = this,
					d = this.chart,
					c = d.renderer,
					m = this.options,
					l = m.y,
					n = this.padding;
				l = d.spacingBox.height + ("top" === m.verticalAlign ? -l : l) - n;
				var t = m.maxHeight,
					x, k = this.clipRect,
					A = m.navigation,
					B = w(A.animation, !0),
					H = A.arrowSize || 12,
					q = this.nav,
					f = this.pages,
					C, r = this.allItems,
					p = function(a) { "number" === typeof a ? k.attr({ height: a }) : k && (b.clipRect = k.destroy(), b.contentGroup.clip());
						b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + n + "px,9999px," + (n + a) + "px,0)" : "auto") },
					v = function(a) { b[a] = c.circle(0, 0, 1.3 * H).translate(H / 2, H / 2).add(q);
						d.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)"); return b[a] };
				"horizontal" !== m.layout || "middle" === m.verticalAlign || m.floating || (l /= 2);
				t && (l = Math.min(l, t));
				f.length = 0;
				a > l && !1 !== A.enabled ? (this.clipHeight = x = Math.max(l - 20 - this.titleHeight -
					n, 0), this.currentPage = w(this.currentPage, 1), this.fullHeight = a, r.forEach(function(a, b) { var d = a._legendItemPos[1],
						c = Math.round(a.legendItem.getBBox().height),
						k = f.length; if(!k || d - f[k - 1] > x && (C || d) !== f[k - 1]) f.push(C || d), k++;
					a.pageIx = k - 1;
					C && (r[b - 1].pageIx = k - 1);
					b === r.length - 1 && d + c - f[k - 1] > x && d !== C && (f.push(d), a.pageIx = k);
					d !== C && (C = d) }), k || (k = b.clipRect = c.clipRect(0, n, 9999, 0), b.contentGroup.clip(k)), p(x), q || (this.nav = q = c.g().attr({ zIndex: 1 }).add(this.group), this.up = c.symbol("triangle", 0, 0, H, H).add(q), v("upTracker").on("click",
					function() { b.scroll(-1, B) }), this.pager = c.text("", 15, 10).addClass("highcharts-legend-navigation"), d.styledMode || this.pager.css(A.style), this.pager.add(q), this.down = c.symbol("triangle-down", 0, 0, H, H).add(q), v("downTracker").on("click", function() { b.scroll(1, B) })), b.scroll(0), a = l) : q && (p(), this.nav = q.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0);
				return a
			},
			scroll: function(a, b) {
				var d = this.pages,
					c = d.length,
					g = this.currentPage + a;
				a = this.clipHeight;
				var l = this.options.navigation,
					w = this.pager,
					t = this.padding;
				g > c && (g = c);
				0 < g && (void 0 !== b && n(b, this.chart), this.nav.attr({ translateX: t, translateY: a + this.padding + 7 + this.titleHeight, visibility: "visible" }), [this.up, this.upTracker].forEach(function(a) { a.attr({ "class": 1 === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }) }), w.attr({ text: g + "/" + c }), [this.down, this.downTracker].forEach(function(a) { a.attr({ x: 18 + this.pager.getBBox().width, "class": g === c ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }) }, this), this.chart.styledMode ||
					(this.up.attr({ fill: 1 === g ? l.inactiveColor : l.activeColor }), this.upTracker.css({ cursor: 1 === g ? "default" : "pointer" }), this.down.attr({ fill: g === c ? l.inactiveColor : l.activeColor }), this.downTracker.css({ cursor: g === c ? "default" : "pointer" })), this.scrollOffset = -d[g - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = g, this.positionCheckboxes())
			}
		};
		c.LegendSymbolMixin = {
			drawRectangle: function(a, b) {
				var d = a.symbolHeight,
					c = a.options.squareSymbol;
				b.legendSymbol = this.chart.renderer.rect(c ?
					(a.symbolWidth - d) / 2 : 0, a.baseline - d + 1, c ? d : a.symbolWidth, d, w(a.options.symbolRadius, d / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(b.legendGroup)
			},
			drawLineMarker: function(a) {
				var b = this.options,
					d = b.marker,
					c = a.symbolWidth,
					m = a.symbolHeight,
					l = m / 2,
					n = this.chart.renderer,
					t = this.legendGroup;
				a = a.baseline - Math.round(.3 * a.fontMetrics.b);
				var x = {};
				this.chart.styledMode || (x = { "stroke-width": b.lineWidth || 0 }, b.dashStyle && (x.dashstyle = b.dashStyle));
				this.legendLine = n.path(["M", 0, a, "L", c, a]).addClass("highcharts-graph").attr(x).add(t);
				d && !1 !== d.enabled && c && (b = Math.min(w(d.radius, l), l), 0 === this.symbol.indexOf("url") && (d = D(d, { width: m, height: m }), b = 0), this.legendSymbol = d = n.symbol(this.symbol, c / 2 - b, a - b, 2 * b, 2 * b, d).addClass("highcharts-point").add(t), d.isMarker = !0)
			}
		};
		(/Trident\/7\.0/.test(b.navigator && b.navigator.userAgent) || p) && d(c.Legend.prototype, "positionItem", function(a, b) { var d = this,
				c = function() { b._legendItemPos && a.call(d, b) };
			c();
			d.bubbleLegend || setTimeout(c) })
	});
	M(J, "parts/Chart.js", [J["parts/Globals.js"], J["parts/Utilities.js"]],
		function(c, p) {
			var y = p.defined,
				G = p.erase,
				F = p.isArray,
				z = p.isNumber,
				r = p.isObject,
				K = p.isString,
				v = p.objectEach,
				D = p.pInt,
				w = p.splat,
				n = c.addEvent,
				l = c.animate,
				b = c.animObject,
				d = c.attr,
				a = c.doc,
				g = c.Axis,
				h = c.createElement,
				e = c.defaultOptions,
				m = c.discardElement,
				u = c.charts,
				E = c.css,
				t = c.extend,
				x = c.find,
				k = c.fireEvent,
				A = c.Legend,
				B = c.marginNames,
				H = c.merge,
				q = c.Pointer,
				f = c.pick,
				C = c.removeEvent,
				N = c.seriesTypes,
				T = c.syncTimeout,
				R = c.win,
				S = c.Chart = function() { this.getArgs.apply(this, arguments) };
			c.chart = function(a, b, d) {
				return new S(a,
					b, d)
			};
			t(S.prototype, {
				callbacks: [],
				getArgs: function() { var a = [].slice.call(arguments); if(K(a[0]) || a[0].nodeName) this.renderTo = a.shift();
					this.init(a[0], a[1]) },
				init: function(a, b) {
					var d, f = a.series,
						g = a.plotOptions || {};
					k(this, "init", { args: arguments }, function() {
						a.series = null;
						d = H(e, a);
						v(d.plotOptions, function(a, b) { r(a) && (a.tooltip = g[b] && H(g[b].tooltip) || void 0) });
						d.tooltip.userOptions = a.chart && a.chart.forExport && a.tooltip.userOptions || a.tooltip;
						d.series = a.series = f;
						this.userOptions = a;
						var h = d.chart,
							q = h.events;
						this.margin = [];
						this.spacing = [];
						this.bounds = { h: {}, v: {} };
						this.labelCollectors = [];
						this.callback = b;
						this.isResizing = 0;
						this.options = d;
						this.axes = [];
						this.series = [];
						this.time = a.time && Object.keys(a.time).length ? new c.Time(a.time) : c.time;
						this.styledMode = h.styledMode;
						this.hasCartesianSeries = h.showAxes;
						var B = this;
						B.index = u.length;
						u.push(B);
						c.chartCount++;
						q && v(q, function(a, b) { c.isFunction(a) && n(B, b, a) });
						B.xAxis = [];
						B.yAxis = [];
						B.pointCount = B.colorCounter = B.symbolCounter = 0;
						k(B, "afterInit");
						B.firstRender()
					})
				},
				initSeries: function(a) {
					var b =
						this.options.chart;
					(b = N[a.type || b.type || b.defaultSeriesType]) || c.error(17, !0, this);
					b = new b;
					b.init(this, a);
					return b
				},
				orderSeries: function(a) { var b = this.series; for(a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName()) },
				isInsidePlot: function(a, b, d) { var c = d ? b : a;
					a = d ? a : b; return 0 <= c && c <= this.plotWidth && 0 <= a && a <= this.plotHeight },
				redraw: function(a) {
					k(this, "beforeRedraw");
					var b = this.axes,
						d = this.series,
						f = this.pointer,
						e = this.legend,
						g = this.userOptions.legend,
						h = this.isDirtyLegend,
						q = this.hasCartesianSeries,
						B = this.isDirtyBox,
						A = this.renderer,
						m = A.isHidden(),
						l = [];
					this.setResponsive && this.setResponsive(!1);
					c.setAnimation(a, this);
					m && this.temporaryDisplay();
					this.layOutTitles();
					for(a = d.length; a--;) { var n = d[a]; if(n.options.stacking) { var H = !0; if(n.isDirty) { var x = !0; break } } }
					if(x)
						for(a = d.length; a--;) n = d[a], n.options.stacking && (n.isDirty = !0);
					d.forEach(function(a) { a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), h = !0) : g && (g.labelFormatter || g.labelFormat) && (h = !0));
						a.isDirtyData && k(a, "updatedData") });
					h && e && e.options.enabled && (e.render(), this.isDirtyLegend = !1);
					H && this.getStacks();
					q && b.forEach(function(a) { a.updateNames();
						a.setScale() });
					this.getMargins();
					q && (b.forEach(function(a) { a.isDirty && (B = !0) }), b.forEach(function(a) { var b = a.min + "," + a.max;
						a.extKey !== b && (a.extKey = b, l.push(function() { k(a, "afterSetExtremes", t(a.eventArgs, a.getExtremes()));
							delete a.eventArgs }));
						(B || H) && a.redraw() }));
					B && this.drawChartBox();
					k(this, "predraw");
					d.forEach(function(a) {
						(B || a.isDirty) && a.visible && a.redraw();
						a.isDirtyData = !1
					});
					f && f.reset(!0);
					A.draw();
					k(this, "redraw");
					k(this, "render");
					m && this.temporaryDisplay(!0);
					l.forEach(function(a) { a.call() })
				},
				get: function(a) {
					function b(b) { return b.id === a || b.options && b.options.id === a } var d = this.series,
						c; var f = x(this.axes, b) || x(this.series, b); for(c = 0; !f && c < d.length; c++) f = x(d[c].points || [], b); return f },
				getAxes: function() {
					var a = this,
						b = this.options,
						d = b.xAxis = w(b.xAxis || {});
					b = b.yAxis = w(b.yAxis || {});
					k(this, "getAxes");
					d.forEach(function(a, b) { a.index = b;
						a.isX = !0 });
					b.forEach(function(a, b) {
						a.index =
							b
					});
					d.concat(b).forEach(function(b) { new g(a, b) });
					k(this, "afterGetAxes")
				},
				getSelectedPoints: function() { var a = [];
					this.series.forEach(function(b) { a = a.concat((b[b.hasGroupedData ? "points" : "data"] || []).filter(function(a) { return f(a.selectedStaging, a.selected) })) }); return a },
				getSelectedSeries: function() { return this.series.filter(function(a) { return a.selected }) },
				setTitle: function(a, b, d) {
					var c = this,
						f = c.options,
						k = c.styledMode;
					var e = f.title = H(!k && { style: { color: "#333333", fontSize: f.isStock ? "16px" : "18px" } }, f.title,
						a);
					f = f.subtitle = H(!k && { style: { color: "#666666" } }, f.subtitle, b);
					[
						["title", a, e],
						["subtitle", b, f]
					].forEach(function(a, b) { var d = a[0],
							f = c[d],
							e = a[1];
						a = a[2];
						f && e && (c[d] = f = f.destroy());
						a && !f && (c[d] = c.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + d, zIndex: a.zIndex || 4 }).add(), c[d].update = function(a) { c.setTitle(!b && a, b && a) }, k || c[d].css(a.style)) });
					c.layOutTitles(d)
				},
				layOutTitles: function(a) {
					var b = [0, 0, 0],
						d = this.renderer,
						c = this.spacingBox;
					["title", "subtitle"].forEach(function(a) {
						var f =
							this[a],
							k = this.options[a],
							e = "title" === a ? -3 : k.verticalAlign ? 0 : b[0] + 2;
						a = "subtitle" === a && "bottom" === k.verticalAlign;
						if(f) { if(!this.styledMode) var g = k.style.fontSize;
							g = d.fontMetrics(g, f).b;
							f.css({ width: (k.width || c.width + k.widthAdjust) + "px" }); var h = f.getBBox(k.useHTML).height;
							f.align(t({ y: a ? g : e + g, height: h }, k), !1, "spacingBox");
							k.floating || (k.verticalAlign ? a && (b[2] = h) : b[0] = Math.ceil(b[0] + h)) }
					}, this);
					var k = !this.titleOffset || this.titleOffset.join(",") !== b.join(",");
					this.titleOffset = b;
					!this.isDirtyBox && k &&
						(this.isDirtyBox = this.isDirtyLegend = k, this.hasRendered && f(a, !0) && this.isDirtyBox && this.redraw())
				},
				getChartSize: function() { var a = this.options.chart,
						b = a.width;
					a = a.height; var d = this.renderTo;
					y(b) || (this.containerWidth = c.getStyle(d, "width"));
					y(a) || (this.containerHeight = c.getStyle(d, "height"));
					this.chartWidth = Math.max(0, b || this.containerWidth || 600);
					this.chartHeight = Math.max(0, c.relativeLength(a, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400)) },
				temporaryDisplay: function(b) {
					var d = this.renderTo;
					if(b)
						for(; d && d.style;) d.hcOrigStyle && (c.css(d, d.hcOrigStyle), delete d.hcOrigStyle), d.hcOrigDetached && (a.body.removeChild(d), d.hcOrigDetached = !1), d = d.parentNode;
					else
						for(; d && d.style;) {
							a.body.contains(d) || d.parentNode || (d.hcOrigDetached = !0, a.body.appendChild(d));
							if("none" === c.getStyle(d, "display", !1) || d.hcOricDetached) d.hcOrigStyle = { display: d.style.display, height: d.style.height, overflow: d.style.overflow }, b = { display: "block", overflow: "hidden" }, d !== this.renderTo && (b.height = 0), c.css(d, b), d.offsetWidth ||
								d.style.setProperty("display", "block", "important");
							d = d.parentNode;
							if(d === a.body) break
						}
				},
				setClassName: function(a) { this.container.className = "highcharts-container " + (a || "") },
				getContainer: function() {
					var b = this.options,
						f = b.chart;
					var e = this.renderTo;
					var g = c.uniqueKey(),
						q, B;
					e || (this.renderTo = e = f.renderTo);
					K(e) && (this.renderTo = e = a.getElementById(e));
					e || c.error(13, !0, this);
					var A = D(d(e, "data-highcharts-chart"));
					z(A) && u[A] && u[A].hasRendered && u[A].destroy();
					d(e, "data-highcharts-chart", this.index);
					e.innerHTML =
						"";
					f.skipClone || e.offsetWidth || this.temporaryDisplay();
					this.getChartSize();
					A = this.chartWidth;
					var m = this.chartHeight;
					E(e, { overflow: "hidden" });
					this.styledMode || (q = t({ position: "relative", overflow: "hidden", width: A + "px", height: m + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)" }, f.style));
					this.container = e = h("div", { id: g }, q, e);
					this._cursor = e.style.cursor;
					this.renderer = new(c[f.renderer] || c.Renderer)(e, A, m, null, f.forExport, b.exporting && b.exporting.allowHTML,
						this.styledMode);
					this.setClassName(f.className);
					if(this.styledMode)
						for(B in b.defs) this.renderer.definition(b.defs[B]);
					else this.renderer.setStyle(f.style);
					this.renderer.chartIndex = this.index;
					k(this, "afterGetContainer")
				},
				getMargins: function(a) {
					var b = this.spacing,
						d = this.margin,
						c = this.titleOffset;
					this.resetMargins();
					c[0] && !y(d[0]) && (this.plotTop = Math.max(this.plotTop, c[0] + this.options.title.margin + b[0]));
					c[2] && !y(d[2]) && (this.marginBottom = Math.max(this.marginBottom, c[2] + this.options.title.margin + b[2]));
					this.legend && this.legend.display && this.legend.adjustMargins(d, b);
					k(this, "getMargins");
					a || this.getAxisMargins()
				},
				getAxisMargins: function() { var a = this,
						b = a.axisOffset = [0, 0, 0, 0],
						d = a.margin;
					a.hasCartesianSeries && a.axes.forEach(function(a) { a.visible && a.getOffset() });
					B.forEach(function(c, f) { y(d[f]) || (a[c] += b[f]) });
					a.setChartSize() },
				reflow: function(b) {
					var d = this,
						f = d.options.chart,
						k = d.renderTo,
						e = y(f.width) && y(f.height),
						g = f.width || c.getStyle(k, "width");
					f = f.height || c.getStyle(k, "height");
					k = b ? b.target : R;
					if(!e &&
						!d.isPrinting && g && f && (k === R || k === a)) { if(g !== d.containerWidth || f !== d.containerHeight) c.clearTimeout(d.reflowTimeout), d.reflowTimeout = T(function() { d.container && d.setSize(void 0, void 0, !1) }, b ? 100 : 0);
						d.containerWidth = g;
						d.containerHeight = f }
				},
				setReflow: function(a) { var b = this;!1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = n(R, "resize", function(a) { b.reflow(a) }), n(this, "destroy", this.unbindReflow)) },
				setSize: function(a, d, f) {
					var e = this,
						g = e.renderer;
					e.isResizing += 1;
					c.setAnimation(f, e);
					e.oldChartHeight = e.chartHeight;
					e.oldChartWidth = e.chartWidth;
					void 0 !== a && (e.options.chart.width = a);
					void 0 !== d && (e.options.chart.height = d);
					e.getChartSize();
					if(!e.styledMode) { var h = g.globalAnimation;
						(h ? l : E)(e.container, { width: e.chartWidth + "px", height: e.chartHeight + "px" }, h) } e.setChartSize(!0);
					g.setSize(e.chartWidth, e.chartHeight, f);
					e.axes.forEach(function(a) { a.isDirty = !0;
						a.setScale() });
					e.isDirtyLegend = !0;
					e.isDirtyBox = !0;
					e.layOutTitles();
					e.getMargins();
					e.redraw(f);
					e.oldChartHeight =
						null;
					k(e, "resize");
					T(function() { e && k(e, "endResize", null, function() {--e.isResizing }) }, b(h).duration)
				},
				setChartSize: function(a) {
					var b = this.inverted,
						d = this.renderer,
						c = this.chartWidth,
						f = this.chartHeight,
						e = this.options.chart,
						g = this.spacing,
						h = this.clipOffset,
						q, B, A, m;
					this.plotLeft = q = Math.round(this.plotLeft);
					this.plotTop = B = Math.round(this.plotTop);
					this.plotWidth = A = Math.max(0, Math.round(c - q - this.marginRight));
					this.plotHeight = m = Math.max(0, Math.round(f - B - this.marginBottom));
					this.plotSizeX = b ? m : A;
					this.plotSizeY =
						b ? A : m;
					this.plotBorderWidth = e.plotBorderWidth || 0;
					this.spacingBox = d.spacingBox = { x: g[3], y: g[0], width: c - g[3] - g[1], height: f - g[0] - g[2] };
					this.plotBox = d.plotBox = { x: q, y: B, width: A, height: m };
					c = 2 * Math.floor(this.plotBorderWidth / 2);
					b = Math.ceil(Math.max(c, h[3]) / 2);
					d = Math.ceil(Math.max(c, h[0]) / 2);
					this.clipBox = { x: b, y: d, width: Math.floor(this.plotSizeX - Math.max(c, h[1]) / 2 - b), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(c, h[2]) / 2 - d)) };
					a || this.axes.forEach(function(a) { a.setAxisSize();
						a.setAxisTranslation() });
					k(this, "afterSetChartSize", { skipAxes: a })
				},
				resetMargins: function() { k(this, "resetMargins"); var a = this,
						b = a.options.chart;
					["margin", "spacing"].forEach(function(d) { var c = b[d],
							k = r(c) ? c : [c, c, c, c];
						["Top", "Right", "Bottom", "Left"].forEach(function(c, e) { a[d][e] = f(b[d + c], k[e]) }) });
					B.forEach(function(b, d) { a[b] = f(a.margin[d], a.spacing[d]) });
					a.axisOffset = [0, 0, 0, 0];
					a.clipOffset = [0, 0, 0, 0] },
				drawChartBox: function() {
					var a = this.options.chart,
						b = this.renderer,
						d = this.chartWidth,
						c = this.chartHeight,
						f = this.chartBackground,
						e = this.plotBackground,
						g = this.plotBorder,
						h = this.styledMode,
						q = this.plotBGImage,
						B = a.backgroundColor,
						A = a.plotBackgroundColor,
						m = a.plotBackgroundImage,
						l, t = this.plotLeft,
						n = this.plotTop,
						H = this.plotWidth,
						x = this.plotHeight,
						C = this.plotBox,
						u = this.clipRect,
						w = this.clipBox,
						r = "animate";
					f || (this.chartBackground = f = b.rect().addClass("highcharts-background").add(), r = "attr");
					if(h) var p = l = f.strokeWidth();
					else {
						p = a.borderWidth || 0;
						l = p + (a.shadow ? 8 : 0);
						B = { fill: B || "none" };
						if(p || f["stroke-width"]) B.stroke = a.borderColor, B["stroke-width"] =
							p;
						f.attr(B).shadow(a.shadow)
					}
					f[r]({ x: l / 2, y: l / 2, width: d - l - p % 2, height: c - l - p % 2, r: a.borderRadius });
					r = "animate";
					e || (r = "attr", this.plotBackground = e = b.rect().addClass("highcharts-plot-background").add());
					e[r](C);
					h || (e.attr({ fill: A || "none" }).shadow(a.plotShadow), m && (q ? q.animate(C) : this.plotBGImage = b.image(m, t, n, H, x).add()));
					u ? u.animate({ width: w.width, height: w.height }) : this.clipRect = b.clipRect(w);
					r = "animate";
					g || (r = "attr", this.plotBorder = g = b.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());
					h || g.attr({ stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none" });
					g[r](g.crisp({ x: t, y: n, width: H, height: x }, -g.strokeWidth()));
					this.isDirtyBox = !1;
					k(this, "afterDrawChartBox")
				},
				propFromSeries: function() { var a = this,
						b = a.options.chart,
						d, c = a.options.series,
						f, k;
					["inverted", "angular", "polar"].forEach(function(e) { d = N[b.type || b.defaultSeriesType];
						k = b[e] || d && d.prototype[e]; for(f = c && c.length; !k && f--;)(d = N[c[f].type]) && d.prototype[e] && (k = !0);
						a[e] = k }) },
				linkSeries: function() {
					var a = this,
						b = a.series;
					b.forEach(function(a) { a.linkedSeries.length = 0 });
					b.forEach(function(b) { var d = b.options.linkedTo;
						K(d) && (d = ":previous" === d ? a.series[b.index - 1] : a.get(d)) && d.linkedParent !== b && (d.linkedSeries.push(b), b.linkedParent = d, b.visible = f(b.options.visible, d.options.visible, b.visible)) });
					k(this, "afterLinkSeries")
				},
				renderSeries: function() { this.series.forEach(function(a) { a.translate();
						a.render() }) },
				renderLabels: function() {
					var a = this,
						b = a.options.labels;
					b.items && b.items.forEach(function(d) {
						var c = t(b.style, d.style),
							f = D(c.left) + a.plotLeft,
							k = D(c.top) + a.plotTop + 12;
						delete c.left;
						delete c.top;
						a.renderer.text(d.html, f, k).attr({ zIndex: 2 }).css(c).add()
					})
				},
				render: function() {
					var a = this.axes,
						b = this.renderer,
						d = this.options,
						c = 0;
					this.setTitle();
					this.legend = new A(this, d.legend);
					this.getStacks && this.getStacks();
					this.getMargins(!0);
					this.setChartSize();
					d = this.plotWidth;
					a.some(function(a) { if(a.horiz && a.visible && a.options.labels.enabled && a.series.length) return c = 21, !0 });
					var f = this.plotHeight = Math.max(this.plotHeight - c, 0);
					a.forEach(function(a) { a.setScale() });
					this.getAxisMargins();
					var k = 1.1 < d / this.plotWidth;
					var e = 1.05 < f / this.plotHeight;
					if(k || e) a.forEach(function(a) {
						(a.horiz && k || !a.horiz && e) && a.setTickInterval(!0) }), this.getMargins();
					this.drawChartBox();
					this.hasCartesianSeries && a.forEach(function(a) { a.visible && a.render() });
					this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add());
					this.renderSeries();
					this.renderLabels();
					this.addCredits();
					this.setResponsive && this.setResponsive();
					this.updateContainerScaling();
					this.hasRendered = !0
				},
				addCredits: function(a) {
					var b =
						this;
					a = H(!0, this.options.credits, a);
					a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() { a.href && (R.location.href = a.href) }).attr({ align: a.position.align, zIndex: 8 }), b.styledMode || this.credits.css(a.style), this.credits.add().align(a.position), this.credits.update = function(a) { b.credits = b.credits.destroy();
						b.addCredits(a) })
				},
				updateContainerScaling: function() {
					var a = this.container;
					if(a.offsetWidth && a.offsetHeight &&
						a.getBoundingClientRect) { var b = a.getBoundingClientRect(),
							d = b.width / a.offsetWidth;
						a = b.height / a.offsetHeight;
						1 !== d || 1 !== a ? this.containerScaling = { scaleX: d, scaleY: a } : delete this.containerScaling }
				},
				destroy: function() {
					var a = this,
						b = a.axes,
						d = a.series,
						f = a.container,
						e, g = f && f.parentNode;
					k(a, "destroy");
					a.renderer.forExport ? G(u, a) : u[a.index] = void 0;
					c.chartCount--;
					a.renderTo.removeAttribute("data-highcharts-chart");
					C(a);
					for(e = b.length; e--;) b[e] = b[e].destroy();
					this.scroller && this.scroller.destroy && this.scroller.destroy();
					for(e = d.length; e--;) d[e] = d[e].destroy();
					"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(b) { var d = a[b];
						d && d.destroy && (a[b] = d.destroy()) });
					f && (f.innerHTML = "", C(f), g && m(f));
					v(a, function(b, d) { delete a[d] })
				},
				firstRender: function() {
					var a = this,
						b = a.options;
					if(!a.isReadyToRender || a.isReadyToRender()) {
						a.getContainer();
						a.resetMargins();
						a.setChartSize();
						a.propFromSeries();
						a.getAxes();
						(F(b.series) ? b.series : []).forEach(function(b) { a.initSeries(b) });
						a.linkSeries();
						k(a, "beforeRender");
						q && (a.pointer = new q(a, b));
						a.render();
						if(!a.renderer.imgCount && a.onload) a.onload();
						a.temporaryDisplay(!0)
					}
				},
				onload: function() { this.callbacks.concat([this.callback]).forEach(function(a) { a && void 0 !== this.index && a.apply(this, [this]) }, this);
					k(this, "load");
					k(this, "render");
					y(this.index) && this.setReflow(this.options.chart.reflow);
					this.onload = null }
			})
		});
	M(J, "parts/ScrollablePlotArea.js", [J["parts/Globals.js"]],
		function(c) {
			var p = c.addEvent,
				y = c.Chart;
			"";
			p(y, "afterSetChartSize", function(p) {
				var y = this.options.chart.scrollablePlotArea,
					z = y && y.minWidth;
				y = y && y.minHeight;
				if(!this.renderer.forExport) {
					if(z) { if(this.scrollablePixelsX = z = Math.max(0, z - this.chartWidth)) { this.plotWidth += z;
							this.inverted ? (this.clipBox.height += z, this.plotBox.height += z) : (this.clipBox.width += z, this.plotBox.width += z); var r = { 1: { name: "right", value: z } } } } else y && (this.scrollablePixelsY = z = Math.max(0, y - this.chartHeight)) && (this.plotHeight += z, this.inverted ?
						(this.clipBox.width += z, this.plotBox.width += z) : (this.clipBox.height += z, this.plotBox.height += z), r = { 2: { name: "bottom", value: z } });
					r && !p.skipAxes && this.axes.forEach(function(p) { r[p.side] ? p.getPlotLinePath = function() { var v = r[p.side].name,
								z = this[v];
							this[v] = z - r[p.side].value; var w = c.Axis.prototype.getPlotLinePath.apply(this, arguments);
							this[v] = z; return w } : (p.setAxisSize(), p.setAxisTranslation()) })
				}
			});
			p(y, "render", function() {
				this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(),
					this.applyFixed()) : this.fixedDiv && this.applyFixed()
			});
			y.prototype.setUpScrolling = function() {
				var p = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" };
				this.scrollablePixelsX && (p.overflowX = "auto");
				this.scrollablePixelsY && (p.overflowY = "auto");
				this.scrollingContainer = c.createElement("div", { className: "highcharts-scrolling" }, p, this.renderTo);
				this.innerContainer = c.createElement("div", { className: "highcharts-inner-container" }, null, this.scrollingContainer);
				this.innerContainer.appendChild(this.container);
				this.setUpScrolling = null
			};
			y.prototype.moveFixedElements = function() {
				var c = this.container,
					p = this.fixedRenderer,
					z = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-reset-zoom .highcharts-subtitle .highcharts-title .highcharts-legend-checkbox".split(" "),
					r;
				this.scrollablePixelsX && !this.inverted ? r = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? r = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? r = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted &&
					(r = ".highcharts-yaxis");
				z.push(r, r + "-labels");
				z.forEach(function(r) {
					[].forEach.call(c.querySelectorAll(r), function(c) {
						(c.namespaceURI === p.SVG_NS ? p.box : p.box.parentNode).appendChild(c);
						c.style.pointerEvents = "auto" }) })
			};
			y.prototype.applyFixed = function() {
				var y, F = !this.fixedDiv,
					z = this.options.chart.scrollablePlotArea;
				F ? (this.fixedDiv = c.createElement("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: 2 }, null, !0), this.renderTo.insertBefore(this.fixedDiv,
					this.renderTo.firstChild), this.renderTo.style.overflow = "visible", this.fixedRenderer = y = new c.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight), this.scrollableMask = y.path().attr({ fill: c.color(this.options.chart.backgroundColor || "#fff").setOpacity(c.pick(z.opacity, .85)).get(), zIndex: -1 }).addClass("highcharts-scrollable-mask").add(), this.moveFixedElements(), p(this, "afterShowResetZoom", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
				y = this.chartWidth + (this.scrollablePixelsX ||
					0);
				var r = this.chartHeight + (this.scrollablePixelsY || 0);
				c.stop(this.container);
				this.container.style.width = y + "px";
				this.container.style.height = r + "px";
				this.renderer.boxWrapper.attr({ width: y, height: r, viewBox: [0, 0, y, r].join(" ") });
				this.chartBackground.attr({ width: y, height: r });
				this.scrollablePixelsY && (this.scrollingContainer.style.height = this.chartHeight + "px");
				F && (z.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * z.scrollPositionX), z.scrollPositionY && (this.scrollingContainer.scrollTop =
					this.scrollablePixelsY * z.scrollPositionY));
				r = this.axisOffset;
				F = this.plotTop - r[0] - 1;
				z = this.plotLeft - r[3] - 1;
				y = this.plotTop + this.plotHeight + r[2] + 1;
				r = this.plotLeft + this.plotWidth + r[1] + 1;
				var K = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
					v = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
				F = this.scrollablePixelsX ? ["M", 0, F, "L", this.plotLeft - 1, F, "L", this.plotLeft - 1, y, "L", 0, y, "Z", "M", K, F, "L", this.chartWidth, F, "L", this.chartWidth, y, "L", K, y, "Z"] : this.scrollablePixelsY ? ["M", z, 0, "L", z, this.plotTop -
					1, "L", r, this.plotTop - 1, "L", r, 0, "Z", "M", z, v, "L", z, this.chartHeight, "L", r, this.chartHeight, "L", r, v, "Z"
				] : ["M", 0, 0];
				"adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({ d: F })
			}
		});
	M(J, "parts/Point.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.erase,
			F = p.isArray,
			z = p.isNumber,
			r = p.isObject,
			K, v = c.extend,
			D = c.fireEvent,
			w = c.format,
			n = c.pick,
			l = c.uniqueKey,
			b = c.removeEvent;
		c.Point = K = function() {};
		c.Point.prototype = {
			init: function(b, a, c) {
				this.series = b;
				this.applyOptions(a,
					c);
				this.id = y(this.id) ? this.id : l();
				this.resolveColor();
				b.chart.pointCount++;
				D(this, "afterInit");
				return this
			},
			resolveColor: function() {
				var b = this.series;
				var a = b.chart.options.chart.colorCount;
				var c = b.chart.styledMode;
				c || this.options.color || (this.color = b.color);
				b.options.colorByPoint ? (c || (a = b.options.colors || b.chart.options.colors, this.color = this.color || a[b.colorCounter], a = a.length), c = b.colorCounter, b.colorCounter++, b.colorCounter === a && (b.colorCounter = 0)) : c = b.colorIndex;
				this.colorIndex = n(this.colorIndex,
					c)
			},
			applyOptions: function(b, a) {
				var d = this.series,
					c = d.options.pointValKey || d.pointValKey;
				b = K.prototype.optionsToObject.call(this, b);
				v(this, b);
				this.options = this.options ? v(this.options, b) : b;
				b.group && delete this.group;
				b.dataLabels && delete this.dataLabels;
				c && (this.y = this[c]);
				this.formatPrefix = (this.isNull = n(this.isValid && !this.isValid(), null === this.x || !z(this.y))) ? "null" : "point";
				this.selected && (this.state = "select");
				"name" in this && void 0 === a && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
				void 0 ===
					this.x && d && (this.x = void 0 === a ? d.autoIncrement(this) : a);
				return this
			},
			setNestedProperty: function(b, a, c) { c.split(".").reduce(function(b, d, c, g) { b[d] = g.length - 1 === c ? a : r(b[d], !0) ? b[d] : {}; return b[d] }, b); return b },
			optionsToObject: function(b) {
				var a = {},
					d = this.series,
					h = d.options.keys,
					e = h || d.pointArrayMap || ["y"],
					m = e.length,
					l = 0,
					n = 0;
				if(z(b) || null === b) a[e[0]] = b;
				else if(F(b))
					for(!h && b.length > m && (d = typeof b[0], "string" === d ? a.name = b[0] : "number" === d && (a.x = b[0]), l++); n < m;) h && void 0 === b[l] || (0 < e[n].indexOf(".") ? c.Point.prototype.setNestedProperty(a,
						b[l], e[n]) : a[e[n]] = b[l]), l++, n++;
				else "object" === typeof b && (a = b, b.dataLabels && (d._hasPointLabels = !0), b.marker && (d._hasPointMarkers = !0));
				return a
			},
			getClassName: function() {
				return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative",
					"") : "")
			},
			getZone: function() { var b = this.series,
					a = b.zones;
				b = b.zoneAxis || "y"; var c = 0,
					h; for(h = a[c]; this[b] >= h.value;) h = a[++c];
				this.nonZonedColor || (this.nonZonedColor = this.color);
				this.color = h && h.color && !this.options.color ? h.color : this.nonZonedColor; return h },
			destroy: function() {
				var d = this.series.chart,
					a = d.hoverPoints,
					c;
				d.pointCount--;
				a && (this.setState(), G(a, this), a.length || (d.hoverPoints = null));
				if(this === d.hoverPoint) this.onMouseOut();
				if(this.graphic || this.dataLabel || this.dataLabels) b(this), this.destroyElements();
				this.legendItem && d.legend.destroyItem(this);
				for(c in this) this[c] = null
			},
			destroyElements: function(b) { var a = this,
					d = [],
					c;
				b = b || { graphic: 1, dataLabel: 1 };
				b.graphic && d.push("graphic", "shadowGroup");
				b.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector"); for(c = d.length; c--;) { var e = d[c];
					a[e] && (a[e] = a[e].destroy()) }["dataLabel", "connector"].forEach(function(d) { var c = d + "s";
					b[d] && a[c] && (a[c].forEach(function(a) { a.element && a.destroy() }), delete a[c]) }) },
			getLabelConfig: function() {
				return {
					x: this.category,
					y: this.y,
					color: this.color,
					colorIndex: this.colorIndex,
					key: this.name || this.category,
					series: this.series,
					point: this,
					percentage: this.percentage,
					total: this.total || this.stackTotal
				}
			},
			tooltipFormatter: function(b) {
				var a = this.series,
					d = a.tooltipOptions,
					c = n(d.valueDecimals, ""),
					e = d.valuePrefix || "",
					m = d.valueSuffix || "";
				a.chart.styledMode && (b = a.chart.tooltip.styledModeFormat(b));
				(a.pointArrayMap || ["y"]).forEach(function(a) {
					a = "{point." + a;
					if(e || m) b = b.replace(RegExp(a + "}", "g"), e + a + "}" + m);
					b = b.replace(RegExp(a + "}", "g"), a + ":,." +
						c + "f}")
				});
				return w(b, { point: this, series: this.series }, a.chart.time)
			},
			firePointEvent: function(b, a, c) { var d = this,
					e = this.series.options;
				(e.point.events[b] || d.options && d.options.events && d.options.events[b]) && this.importEvents(); "click" === b && e.allowPointSelect && (c = function(a) { d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey) });
				D(this, b, a, c) },
			visible: !0
		}
	});
	M(J, "parts/Series.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.erase,
			F = p.isArray,
			z = p.isNumber,
			r = p.isString,
			K = p.objectEach,
			v = p.splat,
			D = c.addEvent,
			w = c.animObject,
			n = c.arrayMax,
			l = c.arrayMin,
			b = c.correctFloat,
			d = c.defaultOptions,
			a = c.defaultPlotOptions,
			g = c.extend,
			h = c.fireEvent,
			e = c.merge,
			m = c.pick,
			u = c.removeEvent,
			E = c.SVGElement,
			t = c.syncTimeout,
			x = c.win;
		c.Series = c.seriesType("line", null, {
			lineWidth: 2,
			allowPointSelect: !1,
			showCheckbox: !1,
			animation: { duration: 1E3 },
			events: {},
			marker: {
				lineWidth: 0,
				lineColor: "#ffffff",
				enabledThreshold: 2,
				radius: 4,
				states: {
					normal: { animation: !0 },
					hover: {
						animation: { duration: 50 },
						enabled: !0,
						radiusPlus: 2,
						lineWidthPlus: 1
					},
					select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 }
				}
			},
			point: { events: {} },
			dataLabels: { align: "center", formatter: function() { return null === this.y ? "" : c.numberFormat(this.y, -1) }, padding: 5, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 },
			cropThreshold: 300,
			opacity: 1,
			pointRange: 0,
			softThreshold: !0,
			states: {
				normal: { animation: !0 },
				hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25 } },
				select: { animation: { duration: 0 } },
				inactive: { animation: { duration: 50 }, opacity: .2 }
			},
			stickyTracking: !0,
			turboThreshold: 1E3,
			findNearestPointBy: "x"
		}, {
			axisTypes: ["xAxis", "yAxis"],
			coll: "series",
			colorCounter: 0,
			cropShoulder: 1,
			directTouch: !1,
			isCartesian: !0,
			parallelArrays: ["x", "y"],
			pointClass: c.Point,
			requireSorting: !0,
			sorted: !0,
			init: function(a, b) {
				h(this, "init", { options: b });
				var d = this,
					e = a.series,
					k;
				this.eventOptions = this.eventOptions || {};
				d.chart = a;
				d.options = b = d.setOptions(b);
				d.linkedSeries = [];
				d.bindAxes();
				g(d, {
					name: b.name,
					state: "",
					visible: !1 !==
						b.visible,
					selected: !0 === b.selected
				});
				var f = b.events;
				K(f, function(a, b) { c.isFunction(a) && d.eventOptions[b] !== a && (c.isFunction(d.eventOptions[b]) && u(d, b, d.eventOptions[b]), d.eventOptions[b] = a, D(d, b, a)) });
				if(f && f.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
				d.getColor();
				d.getSymbol();
				d.parallelArrays.forEach(function(a) { d[a + "Data"] || (d[a + "Data"] = []) });
				d.points || d.data || d.setData(b.data, !1);
				d.isCartesian && (a.hasCartesianSeries = !0);
				e.length && (k = e[e.length -
					1]);
				d._i = m(k && k._i, -1) + 1;
				a.orderSeries(this.insert(e));
				h(this, "afterInit")
			},
			insert: function(a) { var b = this.options.index,
					d; if(z(b)) { for(d = a.length; d--;)
						if(b >= m(a[d].options.index, a[d]._i)) { a.splice(d + 1, 0, this); break } - 1 === d && a.unshift(this);
					d += 1 } else a.push(this); return m(d, a.length - 1) },
			bindAxes: function() {
				var a = this,
					b = a.options,
					d = a.chart,
					e;
				h(this, "bindAxes", null, function() {
					(a.axisTypes || []).forEach(function(k) {
						d[k].forEach(function(d) {
							e = d.options;
							if(b[k] === e.index || void 0 !== b[k] && b[k] === e.id || void 0 ===
								b[k] && 0 === e.index) a.insert(d.series), a[k] = d, d.isDirty = !0
						});
						a[k] || a.optionalAxis === k || c.error(18, !0, d)
					})
				})
			},
			updateParallelArrays: function(a, b) { var d = a.series,
					c = arguments,
					e = z(b) ? function(c) { var f = "y" === c && d.toYData ? d.toYData(a) : a[c];
						d[c + "Data"][b] = f } : function(a) { Array.prototype[b].apply(d[a + "Data"], Array.prototype.slice.call(c, 2)) };
				d.parallelArrays.forEach(e) },
			hasData: function() { return this.visible && void 0 !== this.dataMax && void 0 !== this.dataMin || this.visible && this.yData && 0 < this.yData.length },
			autoIncrement: function() {
				var a =
					this.options,
					b = this.xIncrement,
					d, c = a.pointIntervalUnit,
					e = this.chart.time;
				b = m(b, a.pointStart, 0);
				this.pointInterval = d = m(this.pointInterval, a.pointInterval, 1);
				c && (a = new e.Date(b), "day" === c ? e.set("Date", a, e.get("Date", a) + d) : "month" === c ? e.set("Month", a, e.get("Month", a) + d) : "year" === c && e.set("FullYear", a, e.get("FullYear", a) + d), d = a.getTime() - b);
				this.xIncrement = b + d;
				return b
			},
			setOptions: function(a) {
				var b = this.chart,
					c = b.options,
					k = c.plotOptions,
					g = b.userOptions || {};
				a = e(a);
				b = b.styledMode;
				var f = { plotOptions: k, userOptions: a };
				h(this, "setOptions", f);
				var l = f.plotOptions[this.type],
					n = g.plotOptions || {};
				this.userOptions = f.userOptions;
				g = e(l, k.series, g.plotOptions && g.plotOptions[this.type], a);
				this.tooltipOptions = e(d.tooltip, d.plotOptions.series && d.plotOptions.series.tooltip, d.plotOptions[this.type].tooltip, c.tooltip.userOptions, k.series && k.series.tooltip, k[this.type].tooltip, a.tooltip);
				this.stickyTracking = m(a.stickyTracking, n[this.type] && n[this.type].stickyTracking, n.series && n.series.stickyTracking, this.tooltipOptions.shared &&
					!this.noSharedTooltip ? !0 : g.stickyTracking);
				null === l.marker && delete g.marker;
				this.zoneAxis = g.zoneAxis;
				c = this.zones = (g.zones || []).slice();
				!g.negativeColor && !g.negativeFillColor || g.zones || (k = { value: g[this.zoneAxis + "Threshold"] || g.threshold || 0, className: "highcharts-negative" }, b || (k.color = g.negativeColor, k.fillColor = g.negativeFillColor), c.push(k));
				c.length && y(c[c.length - 1].value) && c.push(b ? {} : { color: this.color, fillColor: this.fillColor });
				h(this, "afterSetOptions", { options: g });
				return g
			},
			getName: function() {
				return m(this.options.name,
					"Series " + (this.index + 1))
			},
			getCyclic: function(a, b, d) { var c = this.chart,
					e = this.userOptions,
					f = a + "Index",
					k = a + "Counter",
					g = d ? d.length : m(c.options.chart[a + "Count"], c[a + "Count"]); if(!b) { var h = m(e[f], e["_" + f]);
					y(h) || (c.series.length || (c[k] = 0), e["_" + f] = h = c[k] % g, c[k] += 1);
					d && (b = d[h]) } void 0 !== h && (this[f] = h);
				this[a] = b },
			getColor: function() { this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || a[this.type].color, this.chart.options.colors) },
			getSymbol: function() { this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols) },
			findPointIndex: function(a, b) { var d = a.id;
				a = a.x; var c = this.points,
					e; if(d) { var f = (d = this.chart.get(d)) && d.index;
					void 0 !== f && (e = !0) } void 0 === f && z(a) && (f = this.xData.indexOf(a, b)); - 1 !== f && void 0 !== f && this.cropped && (f = f >= this.cropStart ? f - this.cropStart : f);!e && c[f] && c[f].touched && (f = void 0); return f },
			drawLegendSymbol: c.LegendSymbolMixin.drawLineMarker,
			updateData: function(a) {
				var b = this.options,
					d = this.points,
					c = [],
					e, f, k, g = this.requireSorting,
					h = a.length === d.length,
					m = !0;
				this.xIncrement = null;
				a.forEach(function(a, f) { var q = y(a) && this.pointClass.prototype.optionsToObject.call({ series: this }, a) || {}; var m = q.x; if(q.id || z(m))
						if(m = this.findPointIndex(q, k), -1 === m || void 0 === m ? c.push(a) : d[m] && a !== b.data[m] ? (d[m].update(a, !1, null, !1), d[m].touched = !0, g && (k = m + 1)) : d[m] && (d[m].touched = !0), !h || f !== m || this.hasDerivedData) e = !0 }, this);
				if(e)
					for(a = d.length; a--;)(f = d[a]) && !f.touched && f.remove(!1);
				else h ? a.forEach(function(a, b) {
					d[b].update &&
						a !== d[b].y && d[b].update(a, !1, null, !1)
				}) : m = !1;
				d.forEach(function(a) { a && (a.touched = !1) });
				if(!m) return !1;
				c.forEach(function(a) { this.addPoint(a, !1, null, null, !1) }, this);
				return !0
			},
			setData: function(a, b, d, e) {
				var k = this,
					f = k.points,
					g = f && f.length || 0,
					h, A = k.options,
					l = k.chart,
					B = null,
					n = k.xAxis,
					t = A.turboThreshold,
					H = this.xData,
					x = this.yData,
					u = (h = k.pointArrayMap) && h.length,
					w = A.keys,
					p = 0,
					v = 1,
					E;
				a = a || [];
				h = a.length;
				b = m(b, !0);
				!1 !== e && h && g && !k.cropped && !k.hasGroupedData && k.visible && !k.isSeriesBoosting && (E = this.updateData(a));
				if(!E) {
					k.xIncrement = null;
					k.colorCounter = 0;
					this.parallelArrays.forEach(function(a) { k[a + "Data"].length = 0 });
					if(t && h > t) { for(d = 0; null === B && d < h;) B = a[d], d++; if(z(B))
							for(d = 0; d < h; d++) H[d] = this.autoIncrement(), x[d] = a[d];
						else if(F(B))
							if(u)
								for(d = 0; d < h; d++) B = a[d], H[d] = B[0], x[d] = B.slice(1, u + 1);
							else
								for(w && (p = w.indexOf("x"), v = w.indexOf("y"), p = 0 <= p ? p : 0, v = 0 <= v ? v : 1), d = 0; d < h; d++) B = a[d], H[d] = B[p], x[d] = B[v];
						else c.error(12, !1, l) } else
						for(d = 0; d < h; d++) void 0 !== a[d] && (B = { series: k }, k.pointClass.prototype.applyOptions.apply(B, [a[d]]), k.updateParallelArrays(B, d));
					x && r(x[0]) && c.error(14, !0, l);
					k.data = [];
					k.options.data = k.userOptions.data = a;
					for(d = g; d--;) f[d] && f[d].destroy && f[d].destroy();
					n && (n.minRange = n.userMinRange);
					k.isDirty = l.isDirtyBox = !0;
					k.isDirtyData = !!f;
					d = !1
				}
				"point" === A.legendType && (this.processData(), this.generatePoints());
				b && l.redraw(d)
			},
			processData: function(a) {
				var b = this.xData,
					d = this.yData,
					e = b.length;
				var k = 0;
				var f = this.xAxis,
					g = this.options;
				var h = g.cropThreshold;
				var m = this.getExtremesFromAll || g.getExtremesFromAll,
					l = this.isCartesian;
				g = f && f.val2lin;
				var n = f && f.isLog,
					t = this.requireSorting;
				if(l && !this.isDirty && !f.isDirty && !this.yAxis.isDirty && !a) return !1;
				if(f) { a = f.getExtremes(); var x = a.min; var u = a.max }
				if(l && this.sorted && !m && (!h || e > h || this.forceCrop))
					if(b[e - 1] < x || b[0] > u) b = [], d = [];
					else if(this.yData && (b[0] < x || b[e - 1] > u)) { k = this.cropData(this.xData, this.yData, x, u);
					b = k.xData;
					d = k.yData;
					k = k.start; var w = !0 }
				for(h = b.length || 1; --h;)
					if(e = n ? g(b[h]) - g(b[h - 1]) : b[h] - b[h - 1], 0 < e && (void 0 === p || e < p)) var p = e;
					else 0 > e && t && (c.error(15, !1, this.chart), t = !1);
				this.cropped = w;
				this.cropStart = k;
				this.processedXData = b;
				this.processedYData = d;
				this.closestPointRange = this.basePointRange = p
			},
			cropData: function(a, b, d, c, e) { var f = a.length,
					k = 0,
					g = f,
					h;
				e = m(e, this.cropShoulder); for(h = 0; h < f; h++)
					if(a[h] >= d) { k = Math.max(0, h - e); break }
				for(d = h; d < f; d++)
					if(a[d] > c) { g = d + e; break }
				return { xData: a.slice(k, g), yData: b.slice(k, g), start: k, end: g } },
			generatePoints: function() {
				var a = this.options,
					b = a.data,
					d = this.data,
					c, e = this.processedXData,
					f = this.processedYData,
					m = this.pointClass,
					l = e.length,
					n = this.cropStart || 0,
					t = this.hasGroupedData;
				a = a.keys;
				var x = [],
					u;
				d || t || (d = [], d.length = b.length, d = this.data = d);
				a && t && (this.options.keys = !1);
				for(u = 0; u < l; u++) { var w = n + u; if(t) { var p = (new m).init(this, [e[u]].concat(v(f[u])));
						p.dataGroup = this.groupMap[u];
						p.dataGroup.options && (p.options = p.dataGroup.options, g(p, p.dataGroup.options), delete p.dataLabels) } else(p = d[w]) || void 0 === b[w] || (d[w] = p = (new m).init(this, b[w], e[u]));
					p && (p.index = w, x[u] = p) } this.options.keys = a;
				if(d && (l !== (c = d.length) || t))
					for(u = 0; u <
						c; u++) u !== n || t || (u += l), d[u] && (d[u].destroyElements(), d[u].plotX = void 0);
				this.data = d;
				this.points = x;
				h(this, "afterGeneratePoints")
			},
			getXExtremes: function(a) { return { min: l(a), max: n(a) } },
			getExtremes: function(a) {
				var b = this.yAxis,
					d = this.processedXData,
					c = [],
					e = 0;
				var f = this.xAxis.getExtremes();
				var k = f.min,
					g = f.max,
					m = this.requireSorting ? this.cropShoulder : 0,
					t;
				a = a || this.stackedYData || this.processedYData || [];
				f = a.length;
				for(t = 0; t < f; t++) {
					var x = d[t];
					var u = a[t];
					var p = (z(u) || F(u)) && (!b.positiveValuesOnly || u.length || 0 <
						u);
					x = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[t + m] || x) >= k && (d[t - m] || x) <= g;
					if(p && x)
						if(p = u.length)
							for(; p--;) z(u[p]) && (c[e++] = u[p]);
						else c[e++] = u
				}
				this.dataMin = l(c);
				this.dataMax = n(c);
				h(this, "afterGetExtremes")
			},
			translate: function() {
				this.processedXData || this.processData();
				this.generatePoints();
				var a = this.options,
					d = a.stacking,
					c = this.xAxis,
					e = c.categories,
					g = this.yAxis,
					f = this.points,
					l = f.length,
					t = !!this.modifyValue,
					n, x = this.pointPlacementToXValue(),
					u = z(x),
					p = a.threshold,
					w = a.startFromThreshold ?
					p : 0,
					r, v = this.zoneAxis || "y",
					E = Number.MAX_VALUE;
				for(n = 0; n < l; n++) {
					var D = f[n],
						K = D.x;
					var G = D.y;
					var J = D.low,
						M = d && g.stacks[(this.negStacks && G < (w ? 0 : p) ? "-" : "") + this.stackKey];
					g.positiveValuesOnly && null !== G && 0 >= G && (D.isNull = !0);
					D.plotX = r = b(Math.min(Math.max(-1E5, c.translate(K, 0, 0, 0, 1, x, "flags" === this.type)), 1E5));
					if(d && this.visible && M && M[K]) { var X = this.getStackIndicator(X, K, this.index); if(!D.isNull) { var O = M[K]; var Y = O.points[X.key] } } F(Y) && (J = Y[0], G = Y[1], J === w && X.key === M[K].base && (J = m(z(p) && p, g.min)), g.positiveValuesOnly &&
						0 >= J && (J = null), D.total = D.stackTotal = O.total, D.percentage = O.total && D.y / O.total * 100, D.stackY = G, O.setOffset(this.pointXOffset || 0, this.barW || 0));
					D.yBottom = y(J) ? Math.min(Math.max(-1E5, g.translate(J, 0, 1, 0, 1)), 1E5) : null;
					t && (G = this.modifyValue(G, D));
					D.plotY = G = "number" === typeof G && Infinity !== G ? Math.min(Math.max(-1E5, g.translate(G, 0, 1, 0, 1)), 1E5) : void 0;
					D.isInside = void 0 !== G && 0 <= G && G <= g.len && 0 <= r && r <= c.len;
					D.clientX = u ? b(c.translate(K, 0, 0, 0, 1, x)) : r;
					D.negative = D[v] < (a[v + "Threshold"] || p || 0);
					D.category = e && void 0 !==
						e[D.x] ? e[D.x] : D.x;
					if(!D.isNull) { void 0 !== Z && (E = Math.min(E, Math.abs(r - Z))); var Z = r } D.zone = this.zones.length && D.getZone()
				}
				this.closestPointRangePx = E;
				h(this, "afterTranslate")
			},
			getValidPoints: function(a, b, d) { var c = this.chart; return(a || this.points || []).filter(function(a) { return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : d || !a.isNull }) },
			getClipBox: function(a, b) {
				var d = this.options,
					c = this.chart,
					e = c.inverted,
					f = this.xAxis,
					k = f && this.yAxis;
				a && !1 === d.clip && k ? a = e ? {
					y: -c.chartWidth + k.len + k.pos,
					height: c.chartWidth,
					width: c.chartHeight,
					x: -c.chartHeight + f.len + f.pos
				} : { y: -k.pos, height: c.chartHeight, width: c.chartWidth, x: -f.pos } : (a = this.clipBox || c.clipBox, b && (a.width = c.plotSizeX, a.x = 0));
				return b ? { width: a.width, x: a.x } : a
			},
			setClip: function(a) {
				var b = this.chart,
					d = this.options,
					c = b.renderer,
					e = b.inverted,
					f = this.clipBox,
					k = this.getClipBox(a),
					g = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, k.height, d.xAxis, d.yAxis].join(),
					h = b[g],
					m = b[g + "m"];
				h || (a && (k.width = 0, e && (k.x = b.plotSizeX + (!1 !== d.clip ? 0 : b.plotTop)), b[g + "m"] =
					m = c.clipRect(e ? b.plotSizeX + 99 : -99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[g] = h = c.clipRect(k), h.count = { length: 0 });
				a && !h.count[this.index] && (h.count[this.index] = !0, h.count.length += 1);
				if(!1 !== d.clip || a) this.group.clip(a || f ? h : b.clipRect), this.markerGroup.clip(m), this.sharedClipKey = g;
				a || (h.count[this.index] && (delete h.count[this.index], --h.count.length), 0 === h.count.length && g && b[g] && (f || (b[g] = b[g].destroy()), b[g + "m"] && (b[g + "m"] = b[g + "m"].destroy())))
			},
			animate: function(a) {
				var b = this.chart,
					d = w(this.options.animation);
				if(a) this.setClip(d);
				else { var c = this.sharedClipKey;
					a = b[c]; var e = this.getClipBox(d, !0);
					a && a.animate(e, d);
					b[c + "m"] && b[c + "m"].animate({ width: e.width + 99, x: e.x - (b.inverted ? 0 : 99) }, d);
					this.animate = null }
			},
			afterAnimate: function() { this.setClip();
				h(this, "afterAnimate");
				this.finishedAnimating = !0 },
			drawPoints: function() {
				var a = this.points,
					b = this.chart,
					d, c = this.options.marker,
					e = this[this.specialGroup] || this.markerGroup;
				var f = this.xAxis;
				var g = m(c.enabled, !f || f.isRadial ? !0 : null, this.closestPointRangePx >=
					c.enabledThreshold * c.radius);
				if(!1 !== c.enabled || this._hasPointMarkers)
					for(f = 0; f < a.length; f++) {
						var h = a[f];
						var l = (d = h.graphic) ? "animate" : "attr";
						var t = h.marker || {};
						var n = !!h.marker;
						var x = g && void 0 === t.enabled || t.enabled;
						var u = !1 !== h.isInside;
						if(x && !h.isNull) {
							x = m(t.symbol, this.symbol);
							var p = this.markerAttribs(h, h.selected && "select");
							d ? d[u ? "show" : "hide"](u).animate(p) : u && (0 < p.width || h.hasImage) && (h.graphic = d = b.renderer.symbol(x, p.x, p.y, p.width, p.height, n ? t : c).add(e));
							if(d && !b.styledMode) d[l](this.pointAttribs(h,
								h.selected && "select"));
							d && d.addClass(h.getClassName(), !0)
						} else d && (h.graphic = d.destroy())
					}
			},
			markerAttribs: function(a, b) { var d = this.options.marker,
					c = a.marker || {},
					e = c.symbol || d.symbol,
					f = m(c.radius, d.radius);
				b && (d = d.states[b], b = c.states && c.states[b], f = m(b && b.radius, d && d.radius, f + (d && d.radiusPlus || 0)));
				a.hasImage = e && 0 === e.indexOf("url");
				a.hasImage && (f = 0);
				a = { x: Math.floor(a.plotX) - f, y: a.plotY - f };
				f && (a.width = a.height = 2 * f); return a },
			pointAttribs: function(a, b) {
				var d = this.options.marker,
					c = a && a.options,
					e = c &&
					c.marker || {},
					f = this.color,
					k = c && c.color,
					g = a && a.color;
				c = m(e.lineWidth, d.lineWidth);
				var h = a && a.zone && a.zone.color;
				a = 1;
				f = k || h || g || f;
				k = e.fillColor || d.fillColor || f;
				f = e.lineColor || d.lineColor || f;
				b = b || "normal";
				d = d.states[b];
				b = e.states && e.states[b] || {};
				c = m(b.lineWidth, d.lineWidth, c + m(b.lineWidthPlus, d.lineWidthPlus, 0));
				k = b.fillColor || d.fillColor || k;
				f = b.lineColor || d.lineColor || f;
				a = m(b.opacity, d.opacity, a);
				return { stroke: f, "stroke-width": c, fill: k, opacity: a }
			},
			destroy: function(a) {
				var b = this,
					d = b.chart,
					e = /AppleWebKit\/533/.test(x.navigator.userAgent),
					k, f, g = b.data || [],
					m, l;
				h(b, "destroy");
				a || u(b);
				(b.axisTypes || []).forEach(function(a) {
					(l = b[a]) && l.series && (G(l.series, b), l.isDirty = l.forceRedraw = !0) });
				b.legendItem && b.chart.legend.destroyItem(b);
				for(f = g.length; f--;)(m = g[f]) && m.destroy && m.destroy();
				b.points = null;
				c.clearTimeout(b.animationTimeout);
				K(b, function(a, b) { a instanceof E && !a.survive && (k = e && "group" === b ? "hide" : "destroy", a[k]()) });
				d.hoverSeries === b && (d.hoverSeries = null);
				G(d.series, b);
				d.orderSeries();
				K(b, function(d, c) { a && "hcEvents" === c || delete b[c] })
			},
			getGraphPath: function(a, b, d) {
				var c = this,
					e = c.options,
					f = e.step,
					k, g = [],
					h = [],
					m;
				a = a || c.points;
				(k = a.reversed) && a.reverse();
				(f = { right: 1, center: 2 }[f] || f && 3) && k && (f = 4 - f);
				!e.connectNulls || b || d || (a = this.getValidPoints(a));
				a.forEach(function(k, q) {
					var l = k.plotX,
						t = k.plotY,
						n = a[q - 1];
					(k.leftCliff || n && n.rightCliff) && !d && (m = !0);
					k.isNull && !y(b) && 0 < q ? m = !e.connectNulls : k.isNull && !b ? m = !0 : (0 === q || m ? q = ["M", k.plotX, k.plotY] : c.getPointSpline ? q = c.getPointSpline(a, k, q) : f ? (q = 1 === f ? ["L", n.plotX, t] : 2 === f ? ["L", (n.plotX + l) / 2, n.plotY,
						"L", (n.plotX + l) / 2, t
					] : ["L", l, n.plotY], q.push("L", l, t)) : q = ["L", l, t], h.push(k.x), f && (h.push(k.x), 2 === f && h.push(k.x)), g.push.apply(g, q), m = !1)
				});
				g.xMap = h;
				return c.graphPath = g
			},
			drawGraph: function() {
				var a = this,
					b = this.options,
					d = (this.gappedPath || this.getGraphPath).call(this),
					c = this.chart.styledMode,
					e = [
						["graph", "highcharts-graph"]
					];
				c || e[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle);
				e = a.getZonesGraphs(e);
				e.forEach(function(e, k) {
					var f = e[0],
						g = a[f],
						h = g ? "animate" : "attr";
					g ? (g.endX = a.preventGraphAnimation ?
						null : d.xMap, g.animate({ d: d })) : d.length && (a[f] = g = a.chart.renderer.path(d).addClass(e[1]).attr({ zIndex: 1 }).add(a.group));
					g && !c && (f = { stroke: e[2], "stroke-width": b.lineWidth, fill: a.fillGraph && a.color || "none" }, e[3] ? f.dashstyle = e[3] : "square" !== b.linecap && (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), g[h](f).shadow(2 > k && b.shadow));
					g && (g.startX = d.xMap, g.isArea = d.isArea)
				})
			},
			getZonesGraphs: function(a) {
				this.zones.forEach(function(b, d) {
					d = ["zone-graph-" + d, "highcharts-graph highcharts-zone-graph-" + d + " " + (b.className ||
						"")];
					this.chart.styledMode || d.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
					a.push(d)
				}, this);
				return a
			},
			applyZones: function() {
				var a = this,
					b = this.chart,
					d = b.renderer,
					c = this.zones,
					e, f, g = this.clips || [],
					h, l = this.graph,
					t = this.area,
					n = Math.max(b.chartWidth, b.chartHeight),
					x = this[(this.zoneAxis || "y") + "Axis"],
					u = b.inverted,
					p, w, r, v = !1;
				if(c.length && (l || t) && x && void 0 !== x.min) {
					var E = x.reversed;
					var y = x.horiz;
					l && !this.showLine && l.hide();
					t && t.hide();
					var z = x.getExtremes();
					c.forEach(function(c, k) {
						e = E ? y ?
							b.plotWidth : 0 : y ? 0 : x.toPixels(z.min) || 0;
						e = Math.min(Math.max(m(f, e), 0), n);
						f = Math.min(Math.max(Math.round(x.toPixels(m(c.value, z.max), !0) || 0), 0), n);
						v && (e = f = x.toPixels(z.max));
						p = Math.abs(e - f);
						w = Math.min(e, f);
						r = Math.max(e, f);
						x.isXAxis ? (h = { x: u ? r : w, y: 0, width: p, height: n }, y || (h.x = b.plotHeight - h.x)) : (h = { x: 0, y: u ? r : w, width: n, height: p }, y && (h.y = b.plotWidth - h.y));
						u && d.isVML && (h = x.isXAxis ? { x: 0, y: E ? w : r, height: h.width, width: b.chartWidth } : { x: h.y - b.plotLeft - b.spacingBox.x, y: 0, width: h.height, height: b.chartHeight });
						g[k] ?
							g[k].animate(h) : g[k] = d.clipRect(h);
						l && a["zone-graph-" + k].clip(g[k]);
						t && a["zone-area-" + k].clip(g[k]);
						v = c.value > z.max;
						a.resetZones && 0 === f && (f = void 0)
					});
					this.clips = g
				} else a.visible && (l && l.show(!0), t && t.show(!0))
			},
			invertGroups: function(a) {
				function b() {
					["group", "markerGroup"].forEach(function(b) { d[b] && (c.renderer.isVML && d[b].attr({ width: d.yAxis.len, height: d.xAxis.len }), d[b].width = d.yAxis.len, d[b].height = d.xAxis.len, d[b].invert(a)) }) }
				var d = this,
					c = d.chart;
				if(d.xAxis) {
					var e = D(c, "resize", b);
					D(d, "destroy",
						e);
					b(a);
					d.invertGroups = b
				}
			},
			plotGroup: function(a, b, d, c, e) { var f = this[a],
					k = !f;
				k && (this[a] = f = this.chart.renderer.g().attr({ zIndex: c || .1 }).add(e));
				f.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (y(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
				f.attr({ visibility: d })[k ? "attr" : "animate"](this.getPlotBox()); return f },
			getPlotBox: function() {
				var a = this.chart,
					b = this.xAxis,
					d = this.yAxis;
				a.inverted && (b = d, d = this.xAxis);
				return { translateX: b ? b.left : a.plotLeft, translateY: d ? d.top : a.plotTop, scaleX: 1, scaleY: 1 }
			},
			render: function() {
				var a = this,
					b = a.chart,
					d = a.options,
					c = !!a.animate && b.renderer.isSVG && w(d.animation).duration,
					e = a.visible ? "inherit" : "hidden",
					f = d.zIndex,
					g = a.hasRendered,
					m = b.seriesGroup,
					l = b.inverted;
				h(this, "render");
				var n = a.plotGroup("group", "series", e, f, m);
				a.markerGroup = a.plotGroup("markerGroup", "markers", e, f, m);
				c && a.animate(!0);
				n.inverted = a.isCartesian || a.invertable ?
					l : !1;
				a.drawGraph && (a.drawGraph(), a.applyZones());
				a.visible && a.drawPoints();
				a.drawDataLabels && a.drawDataLabels();
				a.redrawPoints && a.redrawPoints();
				a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
				a.invertGroups(l);
				!1 === d.clip || a.sharedClipKey || g || n.clip(b.clipRect);
				c && a.animate();
				g || (a.animationTimeout = t(function() { a.afterAnimate() }, c));
				a.isDirty = !1;
				a.hasRendered = !0;
				h(a, "afterRender")
			},
			redraw: function() {
				var a = this.chart,
					b = this.isDirty || this.isDirtyData,
					d = this.group,
					c = this.xAxis,
					e =
					this.yAxis;
				d && (a.inverted && d.attr({ width: a.plotWidth, height: a.plotHeight }), d.animate({ translateX: m(c && c.left, a.plotLeft), translateY: m(e && e.top, a.plotTop) }));
				this.translate();
				this.render();
				b && delete this.kdTree
			},
			kdAxisArray: ["clientX", "plotY"],
			searchPoint: function(a, b) { var d = this.xAxis,
					c = this.yAxis,
					e = this.chart.inverted; return this.searchKDTree({ clientX: e ? d.len - a.chartY + d.pos : a.chartX - d.pos, plotY: e ? c.len - a.chartX + c.pos : a.chartY - c.pos }, b, a) },
			buildKDTree: function(a) {
				function b(a, c, e) {
					var f;
					if(f = a && a.length) {
						var g =
							d.kdAxisArray[c % e];
						a.sort(function(a, b) { return a[g] - b[g] });
						f = Math.floor(f / 2);
						return { point: a[f], left: b(a.slice(0, f), c + 1, e), right: b(a.slice(f + 1), c + 1, e) }
					}
				}
				this.buildingKdTree = !0;
				var d = this,
					c = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
				delete d.kdTree;
				t(function() { d.kdTree = b(d.getValidPoints(null, !d.directTouch), c, c);
					d.buildingKdTree = !1 }, d.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
			},
			searchKDTree: function(a, b, d) {
				function c(a, b, d, h) {
					var m = b.point,
						l = e.kdAxisArray[d % h],
						q = m;
					var t = y(a[f]) && y(m[f]) ? Math.pow(a[f] -
						m[f], 2) : null;
					var n = y(a[g]) && y(m[g]) ? Math.pow(a[g] - m[g], 2) : null;
					n = (t || 0) + (n || 0);
					m.dist = y(n) ? Math.sqrt(n) : Number.MAX_VALUE;
					m.distX = y(t) ? Math.sqrt(t) : Number.MAX_VALUE;
					l = a[l] - m[l];
					n = 0 > l ? "left" : "right";
					t = 0 > l ? "right" : "left";
					b[n] && (n = c(a, b[n], d + 1, h), q = n[k] < q[k] ? n : m);
					b[t] && Math.sqrt(l * l) < q[k] && (a = c(a, b[t], d + 1, h), q = a[k] < q[k] ? a : q);
					return q
				}
				var e = this,
					f = this.kdAxisArray[0],
					g = this.kdAxisArray[1],
					k = b ? "distX" : "dist";
				b = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
				this.kdTree || this.buildingKdTree || this.buildKDTree(d);
				if(this.kdTree) return c(a, this.kdTree, b, b)
			},
			pointPlacementToXValue: function() { var a = this.options.pointPlacement; "between" === a && (a = .5);
				z(a) && (a *= m(this.options.pointRange || this.xAxis.pointRange)); return a }
		});
		""
	});
	M(J, "parts/Stacking.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.objectEach;
		p = c.Axis;
		var F = c.Chart,
			z = c.correctFloat,
			r = c.destroyObjectProperties,
			K = c.format,
			v = c.pick,
			D = c.Series;
		c.StackItem = function(c, n, l, b, d) {
			var a = c.chart.inverted;
			this.axis = c;
			this.isNegative =
				l;
			this.options = n = n || {};
			this.x = b;
			this.total = null;
			this.points = {};
			this.stack = d;
			this.rightCliff = this.leftCliff = 0;
			this.alignOptions = { align: n.align || (a ? l ? "left" : "right" : "center"), verticalAlign: n.verticalAlign || (a ? "middle" : l ? "bottom" : "top"), y: n.y, x: n.x };
			this.textAlign = n.textAlign || (a ? l ? "right" : "left" : "center")
		};
		c.StackItem.prototype = {
			destroy: function() { r(this, this.axis) },
			render: function(c) {
				var n = this.axis.chart,
					l = this.options,
					b = l.format;
				b = b ? K(b, this, n.time) : l.formatter.call(this);
				this.label ? this.label.attr({
					text: b,
					visibility: "hidden"
				}) : (this.label = n.renderer.label(b, null, null, l.shape, null, null, l.useHTML, !1, "stack-labels"), b = { text: b, align: this.textAlign, rotation: l.rotation, padding: v(l.padding, 0), visibility: "hidden" }, this.label.attr(b), n.styledMode || this.label.css(l.style), this.label.added || this.label.add(c));
				this.label.labelrank = n.plotHeight
			},
			setOffset: function(c, n, l, b) {
				var d = this.axis,
					a = d.chart;
				b = d.translate(d.usePercentage ? 100 : b ? b : this.total, 0, 0, 0, 1);
				l = d.translate(l ? l : 0);
				l = y(b) && Math.abs(b - l);
				c = a.xAxis[0].translate(this.x) +
					c;
				d = y(b) && this.getStackBox(a, this, c, b, n, l, d);
				n = this.label;
				c = this.isNegative;
				b = "justify" === v(this.options.overflow, "justify");
				if(n && d) {
					var g = n.getBBox(),
						h = a.inverted ? c ? g.width : 0 : g.width / 2,
						e = a.inverted ? g.height / 2 : c ? -4 : g.height + 4;
					n.align(this.alignOptions, null, d);
					l = n.alignAttr;
					n.show();
					l.y -= e;
					b && (l.x -= h, D.prototype.justifyDataLabel.call(this.axis, n, this.alignOptions, l, g, d), l.x += h);
					n.alignAttr = l;
					n.attr({ x: l.x, y: l.y });
					v(!b && this.options.crop, !0) && ((a = a.isInsidePlot(n.alignAttr.x - g.width / 2, n.alignAttr.y) &&
						a.isInsidePlot(n.alignAttr.x + (a.inverted ? c ? -g.width : g.width : g.width / 2), n.alignAttr.y + g.height)) || n.hide())
				}
			},
			getStackBox: function(c, n, l, b, d, a, g) { var h = n.axis.reversed,
					e = c.inverted;
				c = g.height + g.pos - (e ? c.plotLeft : c.plotTop);
				n = n.isNegative && !h || !n.isNegative && h; return { x: e ? n ? b : b - a : l, y: e ? c - l - d : n ? c - b - a : c - b, width: e ? a : d, height: e ? d : a } }
		};
		F.prototype.getStacks = function() {
			var c = this,
				n = c.inverted;
			c.yAxis.forEach(function(c) { c.stacks && c.hasVisibleSeries && (c.oldStacks = c.stacks) });
			c.series.forEach(function(l) {
				var b =
					l.xAxis && l.xAxis.options || {};
				!l.options.stacking || !0 !== l.visible && !1 !== c.options.chart.ignoreHiddenSeries || (l.stackKey = [l.type, v(l.options.stack, ""), n ? b.top : b.left, n ? b.height : b.width].join())
			})
		};
		p.prototype.buildStacks = function() { var c = this.series,
				n = v(this.options.reversedStacks, !0),
				l = c.length,
				b; if(!this.isXAxis) { this.usePercentage = !1; for(b = l; b--;) c[n ? b : l - b - 1].setStackedPoints(); for(b = 0; b < l; b++) c[b].modifyStacks() } };
		p.prototype.renderStackTotals = function() {
			var c = this.chart,
				n = c.renderer,
				l = this.stacks,
				b = this.stackTotalGroup;
			b || (this.stackTotalGroup = b = n.g("stack-labels").attr({ visibility: "visible", zIndex: 6 }).add());
			b.translate(c.plotLeft, c.plotTop);
			G(l, function(d) { G(d, function(a) { a.render(b) }) })
		};
		p.prototype.resetStacks = function() { var c = this,
				n = c.stacks;
			c.isXAxis || G(n, function(l) { G(l, function(b, d) { b.touched < c.stacksTouched ? (b.destroy(), delete l[d]) : (b.total = null, b.cumulative = null) }) }) };
		p.prototype.cleanStacks = function() {
			if(!this.isXAxis) {
				if(this.oldStacks) var c = this.stacks = this.oldStacks;
				G(c, function(c) {
					G(c,
						function(c) { c.cumulative = c.total })
				})
			}
		};
		D.prototype.setStackedPoints = function() {
			if(this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
				var p = this.processedXData,
					n = this.processedYData,
					l = [],
					b = n.length,
					d = this.options,
					a = d.threshold,
					g = v(d.startFromThreshold && a, 0),
					h = d.stack;
				d = d.stacking;
				var e = this.stackKey,
					m = "-" + e,
					u = this.negStacks,
					r = this.yAxis,
					t = r.stacks,
					x = r.oldStacks,
					k, A;
				r.stacksTouched += 1;
				for(A = 0; A < b; A++) {
					var B = p[A];
					var H = n[A];
					var q = this.getStackIndicator(q, B,
						this.index);
					var f = q.key;
					var C = (k = u && H < (g ? 0 : a)) ? m : e;
					t[C] || (t[C] = {});
					t[C][B] || (x[C] && x[C][B] ? (t[C][B] = x[C][B], t[C][B].total = null) : t[C][B] = new c.StackItem(r, r.options.stackLabels, k, B, h));
					C = t[C][B];
					null !== H ? (C.points[f] = C.points[this.index] = [v(C.cumulative, g)], y(C.cumulative) || (C.base = f), C.touched = r.stacksTouched, 0 < q.index && !1 === this.singleStacks && (C.points[f][0] = C.points[this.index + "," + B + ",0"][0])) : C.points[f] = C.points[this.index] = null;
					"percent" === d ? (k = k ? e : m, u && t[k] && t[k][B] ? (k = t[k][B], C.total = k.total =
						Math.max(k.total, C.total) + Math.abs(H) || 0) : C.total = z(C.total + (Math.abs(H) || 0))) : C.total = z(C.total + (H || 0));
					C.cumulative = v(C.cumulative, g) + (H || 0);
					null !== H && (C.points[f].push(C.cumulative), l[A] = C.cumulative)
				}
				"percent" === d && (r.usePercentage = !0);
				this.stackedYData = l;
				r.oldStacks = {}
			}
		};
		D.prototype.modifyStacks = function() {
			var c = this,
				n = c.stackKey,
				l = c.yAxis.stacks,
				b = c.processedXData,
				d, a = c.options.stacking;
			c[a + "Stacker"] && [n, "-" + n].forEach(function(g) {
				for(var h = b.length, e, m; h--;)
					if(e = b[h], d = c.getStackIndicator(d,
							e, c.index, g), m = (e = l[g] && l[g][e]) && e.points[d.key]) c[a + "Stacker"](m, e, h)
			})
		};
		D.prototype.percentStacker = function(c, n, l) { n = n.total ? 100 / n.total : 0;
			c[0] = z(c[0] * n);
			c[1] = z(c[1] * n);
			this.stackedYData[l] = c[1] };
		D.prototype.getStackIndicator = function(c, n, l, b) {!y(c) || c.x !== n || b && c.key !== b ? c = { x: n, index: 0, key: b } : c.index++;
			c.key = [l, n, c.index].join(); return c }
	});
	M(J, "parts/Dynamics.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.erase,
			F = p.isArray,
			z = p.isNumber,
			r = p.isObject,
			K = p.isString,
			v = p.objectEach,
			D = p.splat,
			w = c.addEvent,
			n = c.animate,
			l = c.Axis;
		p = c.Chart;
		var b = c.createElement,
			d = c.css,
			a = c.extend,
			g = c.fireEvent,
			h = c.merge,
			e = c.pick,
			m = c.Point,
			u = c.Series,
			E = c.seriesTypes,
			t = c.setAnimation;
		c.cleanRecursively = function(a, b) { var d = {};
			v(a, function(e, g) { if(r(a[g], !0) && !a.nodeType && b[g]) e = c.cleanRecursively(a[g], b[g]), Object.keys(e).length && (d[g] = e);
				else if(r(a[g]) || a[g] !== b[g]) d[g] = a[g] }); return d };
		a(p.prototype, {
			addSeries: function(a, b, d) {
				var c, k = this;
				a && (b = e(b, !0), g(k, "addSeries", { options: a },
					function() { c = k.initSeries(a);
						k.isDirtyLegend = !0;
						k.linkSeries();
						g(k, "afterAddSeries", { series: c });
						b && k.redraw(d) }));
				return c
			},
			addAxis: function(a, b, d, c) { var g = b ? "xAxis" : "yAxis",
					k = this.options;
				a = h(a, { index: this[g].length, isX: b });
				b = new l(this, a);
				k[g] = D(k[g] || {});
				k[g].push(a);
				e(d, !0) && this.redraw(c); return b },
			showLoading: function(c) {
				var g = this,
					h = g.options,
					m = g.loadingDiv,
					l = h.loading,
					q = function() { m && d(m, { left: g.plotLeft + "px", top: g.plotTop + "px", width: g.plotWidth + "px", height: g.plotHeight + "px" }) };
				m || (g.loadingDiv =
					m = b("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, g.container), g.loadingSpan = b("span", { className: "highcharts-loading-inner" }, null, m), w(g, "redraw", q));
				m.className = "highcharts-loading";
				g.loadingSpan.innerHTML = e(c, h.lang.loading, "");
				g.styledMode || (d(m, a(l.style, { zIndex: 10 })), d(g.loadingSpan, l.labelStyle), g.loadingShown || (d(m, { opacity: 0, display: "" }), n(m, { opacity: l.style.opacity || .5 }, { duration: l.showDuration || 0 })));
				g.loadingShown = !0;
				q()
			},
			hideLoading: function() {
				var a = this.options,
					b = this.loadingDiv;
				b && (b.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || n(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function() { d(b, { display: "none" }) } }));
				this.loadingShown = !1
			},
			propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
			propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
			propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
			collectionsWithUpdate: "xAxis yAxis zAxis series colorAxis pane".split(" "),
			update: function(a, b, d, m) {
				var k = this,
					l = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle" },
					f, n, t, x = a.isResponsiveOptions,
					A = [];
				g(k, "update", { options: a });
				x || k.setResponsive(!1, !0);
				a = c.cleanRecursively(a, k.options);
				h(!0, k.userOptions, a);
				if(f = a.chart) {
					h(!0, k.options.chart, f);
					"className" in
					f && k.setClassName(f.className);
					"reflow" in f && k.setReflow(f.reflow);
					if("inverted" in f || "polar" in f || "type" in f) { k.propFromSeries(); var u = !0 }
					"alignTicks" in f && (u = !0);
					v(f, function(a, b) {-1 !== k.propsRequireUpdateSeries.indexOf("chart." + b) && (n = !0); - 1 !== k.propsRequireDirtyBox.indexOf(b) && (k.isDirtyBox = !0);
						x || -1 === k.propsRequireReflow.indexOf(b) || (t = !0) });
					!k.styledMode && "style" in f && k.renderer.setStyle(f.style)
				}!k.styledMode && a.colors && (this.options.colors = a.colors);
				a.plotOptions && h(!0, this.options.plotOptions,
					a.plotOptions);
				a.time && this.time === c.time && (this.time = new c.Time(a.time));
				v(a, function(a, b) { if(k[b] && "function" === typeof k[b].update) k[b].update(a, !1);
					else if("function" === typeof k[l[b]]) k[l[b]](a); "chart" !== b && -1 !== k.propsRequireUpdateSeries.indexOf(b) && (n = !0) });
				this.collectionsWithUpdate.forEach(function(b) {
					if(a[b]) {
						if("series" === b) { var c = [];
							k[b].forEach(function(a, b) { a.options.isInternal || c.push(e(a.options.index, b)) }) } D(a[b]).forEach(function(a, e) {
							(e = y(a.id) && k.get(a.id) || k[b][c ? c[e] : e]) && e.coll ===
								b && (e.update(a, !1), d && (e.touched = !0));
							!e && d && k.collectionsWithInit[b] && (k.collectionsWithInit[b][0].apply(k, [a].concat(k.collectionsWithInit[b][1] || []).concat([!1])).touched = !0)
						});
						d && k[b].forEach(function(a) { a.touched || a.options.isInternal ? delete a.touched : A.push(a) })
					}
				});
				A.forEach(function(a) { a.remove && a.remove(!1) });
				u && k.axes.forEach(function(a) { a.update({}, !1) });
				n && k.series.forEach(function(a) { a.update({}, !1) });
				a.loading && h(!0, k.options.loading, a.loading);
				u = f && f.width;
				f = f && f.height;
				K(f) && (f = c.relativeLength(f,
					u || k.chartWidth));
				t || z(u) && u !== k.chartWidth || z(f) && f !== k.chartHeight ? k.setSize(u, f, m) : e(b, !0) && k.redraw(m);
				g(k, "afterUpdate", { options: a, redraw: b, animation: m })
			},
			setSubtitle: function(a) { this.setTitle(void 0, a) }
		});
		p.prototype.collectionsWithInit = { xAxis: [p.prototype.addAxis, [!0]], yAxis: [p.prototype.addAxis, [!1]], series: [p.prototype.addSeries] };
		a(m.prototype, {
			update: function(a, b, d, c) {
				function g() {
					k.applyOptions(a);
					null === k.y && h && (k.graphic = h.destroy());
					r(a, !0) && (h && h.element && a && a.marker && void 0 !== a.marker.symbol &&
						(k.graphic = h.destroy()), a && a.dataLabels && k.dataLabel && (k.dataLabel = k.dataLabel.destroy()), k.connector && (k.connector = k.connector.destroy()));
					m = k.index;
					f.updateParallelArrays(k, m);
					n.data[m] = r(n.data[m], !0) || r(a, !0) ? k.options : e(a, n.data[m]);
					f.isDirty = f.isDirtyData = !0;
					!f.fixedBox && f.hasCartesianSeries && (l.isDirtyBox = !0);
					"point" === n.legendType && (l.isDirtyLegend = !0);
					b && l.redraw(d)
				}
				var k = this,
					f = k.series,
					h = k.graphic,
					m, l = f.chart,
					n = f.options;
				b = e(b, !0);
				!1 === c ? g() : k.firePointEvent("update", { options: a }, g)
			},
			remove: function(a,
				b) { this.series.removePoint(this.series.data.indexOf(this), a, b) }
		});
		a(u.prototype, {
			addPoint: function(a, b, d, c, h) {
				var k = this.options,
					f = this.data,
					m = this.chart,
					l = this.xAxis;
				l = l && l.hasNames && l.names;
				var n = k.data,
					t = this.xData,
					x;
				b = e(b, !0);
				var u = { series: this };
				this.pointClass.prototype.applyOptions.apply(u, [a]);
				var A = u.x;
				var p = t.length;
				if(this.requireSorting && A < t[p - 1])
					for(x = !0; p && t[p - 1] > A;) p--;
				this.updateParallelArrays(u, "splice", p, 0, 0);
				this.updateParallelArrays(u, p);
				l && u.name && (l[A] = u.name);
				n.splice(p, 0, a);
				x && (this.data.splice(p, 0, null), this.processData());
				"point" === k.legendType && this.generatePoints();
				d && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(u, "shift"), n.shift()));
				!1 !== h && g(this, "addPoint", { point: u });
				this.isDirtyData = this.isDirty = !0;
				b && m.redraw(c)
			},
			removePoint: function(a, b, d) {
				var c = this,
					g = c.data,
					k = g[a],
					f = c.points,
					h = c.chart,
					m = function() {
						f && f.length === g.length && f.splice(a, 1);
						g.splice(a, 1);
						c.options.data.splice(a, 1);
						c.updateParallelArrays(k || { series: c }, "splice", a, 1);
						k &&
							k.destroy();
						c.isDirty = !0;
						c.isDirtyData = !0;
						b && h.redraw()
					};
				t(d, h);
				b = e(b, !0);
				k ? k.firePointEvent("remove", null, m) : m()
			},
			remove: function(a, b, d, c) {
				function k() { h.destroy(c);
					h.remove = null;
					f.isDirtyLegend = f.isDirtyBox = !0;
					f.linkSeries();
					e(a, !0) && f.redraw(b) } var h = this,
					f = h.chart;!1 !== d ? g(h, "remove", null, k) : k() },
			update: function(b, d) {
				b = c.cleanRecursively(b, this.userOptions);
				g(this, "update", { options: b });
				var k = this,
					m = k.chart,
					l = k.userOptions,
					n = k.initialType || k.type,
					f = b.type || l.type || m.options.chart.type,
					t = !(this.hasDerivedData ||
						b.dataGrouping || f && f !== this.type || void 0 !== b.pointStart || b.pointInterval || b.pointIntervalUnit || b.keys),
					u = E[n].prototype,
					x, p = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"],
					r = ["eventOptions", "navigatorSeries", "baseSeries"],
					v = k.finishedAnimating && { animation: !1 },
					w = {};
				t && (r.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== b.visible && r.push("area", "graph"), k.parallelArrays.forEach(function(a) {
					r.push(a +
						"Data")
				}), b.data && this.setData(b.data, !1));
				b = h(l, v, { index: void 0 === l.index ? k.index : l.index, pointStart: e(l.pointStart, k.xData[0]) }, !t && { data: k.options.data }, b);
				t && b.data && (b.data = k.options.data);
				r = p.concat(r);
				r.forEach(function(a) { r[a] = k[a];
					delete k[a] });
				k.remove(!1, null, !1, !0);
				for(x in u) k[x] = void 0;
				E[f || n] ? a(k, E[f || n].prototype) : c.error(17, !0, m);
				r.forEach(function(a) { k[a] = r[a] });
				k.init(m, b);
				if(t && this.points) {
					var y = k.options;
					!1 === y.visible ? (w.graphic = 1, w.dataLabel = 1) : k._hasPointLabels || (f = y.marker,
						u = y.dataLabels, f && (!1 === f.enabled || "symbol" in f) && (w.graphic = 1), u && !1 === u.enabled && (w.dataLabel = 1));
					this.points.forEach(function(a) { a && a.series && (a.resolveColor(), Object.keys(w).length && a.destroyElements(w), !1 === y.showInLegend && a.legendItem && m.legend.destroyItem(a)) }, this)
				}
				b.zIndex !== l.zIndex && p.forEach(function(a) { k[a] && k[a].attr({ zIndex: b.zIndex }) });
				k.initialType = n;
				m.linkSeries();
				g(this, "afterUpdate");
				e(d, !0) && m.redraw(t ? void 0 : !1)
			},
			setName: function(a) {
				this.name = this.options.name = this.userOptions.name =
					a;
				this.chart.isDirtyLegend = !0
			}
		});
		a(l.prototype, {
			update: function(b, d) { var c = this.chart,
					g = b && b.events || {};
				b = h(this.userOptions, b);
				c.options[this.coll].indexOf && (c.options[this.coll][c.options[this.coll].indexOf(this.userOptions)] = b);
				v(c.options[this.coll].events, function(a, b) { "undefined" === typeof g[b] && (g[b] = void 0) });
				this.destroy(!0);
				this.init(c, a(b, { events: g }));
				c.isDirtyBox = !0;
				e(d, !0) && c.redraw() },
			remove: function(a) {
				for(var b = this.chart, d = this.coll, c = this.series, g = c.length; g--;) c[g] && c[g].remove(!1);
				G(b.axes, this);
				G(b[d], this);
				F(b.options[d]) ? b.options[d].splice(this.options.index, 1) : delete b.options[d];
				b[d].forEach(function(a, b) { a.options.index = a.userOptions.index = b });
				this.destroy();
				b.isDirtyBox = !0;
				e(a, !0) && b.redraw()
			},
			setTitle: function(a, b) { this.update({ title: a }, b) },
			setCategories: function(a, b) { this.update({ categories: a }, b) }
		})
	});
	M(J, "parts/AreaSeries.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.objectEach,
			G = c.color,
			F = c.pick,
			z = c.Series;
		p = c.seriesType;
		p("area", "line", { softThreshold: !1, threshold: 0 }, {
			singleStacks: !1,
			getStackPoints: function(c) {
				var p = [],
					r = [],
					z = this.xAxis,
					w = this.yAxis,
					n = w.stacks[this.stackKey],
					l = {},
					b = this.index,
					d = w.series,
					a = d.length,
					g = F(w.options.reversedStacks, !0) ? 1 : -1,
					h;
				c = c || this.points;
				if(this.options.stacking) {
					for(h = 0; h < c.length; h++) c[h].leftNull = c[h].rightNull = null, l[c[h].x] = c[h];
					y(n, function(a, b) { null !== a.total && r.push(b) });
					r.sort(function(a, b) { return a - b });
					var e = d.map(function(a) { return a.visible });
					r.forEach(function(d, c) {
						var m = 0,
							t, u;
						if(l[d] &&
							!l[d].isNull) p.push(l[d]), [-1, 1].forEach(function(k) { var m = 1 === k ? "rightNull" : "leftNull",
								p = 0,
								x = n[r[c + k]]; if(x)
								for(h = b; 0 <= h && h < a;) t = x.points[h], t || (h === b ? l[d][m] = !0 : e[h] && (u = n[d].points[h]) && (p -= u[1] - u[0])), h += g;
							l[d][1 === k ? "rightCliff" : "leftCliff"] = p });
						else { for(h = b; 0 <= h && h < a;) { if(t = n[d].points[h]) { m = t[1]; break } h += g } m = w.translate(m, 0, 1, 0, 1);
							p.push({ isNull: !0, plotX: z.translate(d, 0, 0, 0, 1), x: d, plotY: m, yBottom: m }) }
					})
				}
				return p
			},
			getGraphPath: function(p) {
				var r = z.prototype.getGraphPath,
					v = this.options,
					y = v.stacking,
					w = this.yAxis,
					n, l = [],
					b = [],
					d = this.index,
					a = w.stacks[this.stackKey],
					g = v.threshold,
					h = Math.round(w.getThreshold(v.threshold));
				v = c.pick(v.connectNulls, "percent" === y);
				var e = function(c, e, k) { var m = p[c];
					c = y && a[m.x].points[d]; var n = m[k + "Null"] || 0;
					k = m[k + "Cliff"] || 0;
					m = !0; if(k || n) { var t = (n ? c[0] : c[1]) + k; var q = c[0] + k;
						m = !!n } else !y && p[e] && p[e].isNull && (t = q = g);
					void 0 !== t && (b.push({ plotX: u, plotY: null === t ? h : w.getThreshold(t), isNull: m, isCliff: !0 }), l.push({ plotX: u, plotY: null === q ? h : w.getThreshold(q), doCurve: !1 })) };
				p = p || this.points;
				y && (p = this.getStackPoints(p));
				for(n = 0; n < p.length; n++) { var m = p[n].isNull; var u = F(p[n].rectPlotX, p[n].plotX); var E = F(p[n].yBottom, h); if(!m || v) v || e(n, n - 1, "left"), m && !y && v || (b.push(p[n]), l.push({ x: n, plotX: u, plotY: E })), v || e(n, n + 1, "right") } n = r.call(this, b, !0, !0);
				l.reversed = !0;
				m = r.call(this, l, !0, !0);
				m.length && (m[0] = "L");
				m = n.concat(m);
				r = r.call(this, b, !1, v);
				m.xMap = n.xMap;
				this.areaPath = m;
				return r
			},
			drawGraph: function() {
				this.areaPath = [];
				z.prototype.drawGraph.apply(this);
				var c = this,
					p = this.areaPath,
					v = this.options,
					y = [
						["area", "highcharts-area", this.color, v.fillColor]
					];
				this.zones.forEach(function(p, n) { y.push(["zone-area-" + n, "highcharts-area highcharts-zone-area-" + n + " " + p.className, p.color || c.color, p.fillColor || v.fillColor]) });
				y.forEach(function(r) {
					var n = r[0],
						l = c[n],
						b = l ? "animate" : "attr",
						d = {};
					l ? (l.endX = c.preventGraphAnimation ? null : p.xMap, l.animate({ d: p })) : (d.zIndex = 0, l = c[n] = c.chart.renderer.path(p).addClass(r[1]).add(c.group), l.isArea = !0);
					c.chart.styledMode || (d.fill = F(r[3], G(r[2]).setOpacity(F(v.fillOpacity, .75)).get()));
					l[b](d);
					l.startX = p.xMap;
					l.shiftUnit = v.step ? 2 : 1
				})
			},
			drawLegendSymbol: c.LegendSymbolMixin.drawRectangle
		});
		""
	});
	M(J, "parts/SplineSeries.js", [J["parts/Globals.js"]], function(c) {
		var p = c.pick;
		c = c.seriesType;
		c("spline", "line", {}, {
			getPointSpline: function(c, G, F) {
				var y = G.plotX,
					r = G.plotY,
					K = c[F - 1];
				F = c[F + 1];
				if(K && !K.isNull && !1 !== K.doCurve && !G.isCliff && F && !F.isNull && !1 !== F.doCurve && !G.isCliff) {
					c = K.plotY;
					var v = F.plotX;
					F = F.plotY;
					var D = 0;
					var w = (1.5 * y + K.plotX) / 2.5;
					var n = (1.5 * r + c) / 2.5;
					v = (1.5 * y + v) / 2.5;
					var l = (1.5 * r + F) /
						2.5;
					v !== w && (D = (l - n) * (v - y) / (v - w) + r - l);
					n += D;
					l += D;
					n > c && n > r ? (n = Math.max(c, r), l = 2 * r - n) : n < c && n < r && (n = Math.min(c, r), l = 2 * r - n);
					l > F && l > r ? (l = Math.max(F, r), n = 2 * r - l) : l < F && l < r && (l = Math.min(F, r), n = 2 * r - l);
					G.rightContX = v;
					G.rightContY = l
				}
				G = ["C", p(K.rightContX, K.plotX), p(K.rightContY, K.plotY), p(w, y), p(n, r), y, r];
				K.rightContX = K.rightContY = null;
				return G
			}
		});
		""
	});
	M(J, "parts/AreaSplineSeries.js", [J["parts/Globals.js"]], function(c) {
		var p = c.seriesTypes.area.prototype,
			y = c.seriesType;
		y("areaspline", "spline", c.defaultPlotOptions.area, { getStackPoints: p.getStackPoints, getGraphPath: p.getGraphPath, drawGraph: p.drawGraph, drawLegendSymbol: c.LegendSymbolMixin.drawRectangle });
		""
	});
	M(J, "parts/ColumnSeries.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.isNumber,
			F = c.animObject,
			z = c.color,
			r = c.extend,
			K = c.merge,
			v = c.pick,
			D = c.Series;
		p = c.seriesType;
		var w = c.svg;
		p("column", "line", {
			borderRadius: 0,
			crisp: !0,
			groupPadding: .2,
			marker: null,
			pointPadding: .1,
			minPointLength: 0,
			cropThreshold: 50,
			pointRange: null,
			states: {
				hover: {
					halo: !1,
					brightness: .1
				},
				select: { color: "#cccccc", borderColor: "#000000" }
			},
			dataLabels: { align: null, verticalAlign: null, y: null },
			softThreshold: !1,
			startFromThreshold: !0,
			stickyTracking: !1,
			tooltip: { distance: 6 },
			threshold: 0,
			borderColor: "#ffffff"
		}, {
			cropShoulder: 0,
			directTouch: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			negStacks: !0,
			init: function() { D.prototype.init.apply(this, arguments); var c = this,
					l = c.chart;
				l.hasRendered && l.series.forEach(function(b) { b.type === c.type && (b.isDirty = !0) }) },
			getColumnMetrics: function() {
				var c =
					this,
					l = c.options,
					b = c.xAxis,
					d = c.yAxis,
					a = b.options.reversedStacks;
				a = b.reversed && !a || !b.reversed && a;
				var g, h = {},
					e = 0;
				!1 === l.grouping ? e = 1 : c.chart.series.forEach(function(a) { var b = a.yAxis,
						k = a.options; if(a.type === c.type && (a.visible || !c.chart.options.chart.ignoreHiddenSeries) && d.len === b.len && d.pos === b.pos) { if(k.stacking) { g = a.stackKey;
							void 0 === h[g] && (h[g] = e++); var m = h[g] } else !1 !== k.grouping && (m = e++);
						a.columnIndex = m } });
				var m = Math.min(Math.abs(b.transA) * (b.ordinalSlope || l.pointRange || b.closestPointRange || b.tickInterval ||
						1), b.len),
					u = m * l.groupPadding,
					p = (m - 2 * u) / (e || 1);
				l = Math.min(l.maxPointWidth || b.len, v(l.pointWidth, p * (1 - 2 * l.pointPadding)));
				c.columnMetrics = { width: l, offset: (p - l) / 2 + (u + ((c.columnIndex || 0) + (a ? 1 : 0)) * p - m / 2) * (a ? -1 : 1) };
				return c.columnMetrics
			},
			crispCol: function(c, l, b, d) {
				var a = this.chart,
					g = this.borderWidth,
					h = -(g % 2 ? .5 : 0);
				g = g % 2 ? .5 : 1;
				a.inverted && a.renderer.isVML && (g += 1);
				this.options.crisp && (b = Math.round(c + b) + h, c = Math.round(c) + h, b -= c);
				d = Math.round(l + d) + g;
				h = .5 >= Math.abs(l) && .5 < d;
				l = Math.round(l) + g;
				d -= l;
				h && d && (--l,
					d += 1);
				return { x: c, y: l, width: b, height: d }
			},
			translate: function() {
				var c = this,
					l = c.chart,
					b = c.options,
					d = c.dense = 2 > c.closestPointRange * c.xAxis.transA;
				d = c.borderWidth = v(b.borderWidth, d ? 0 : 1);
				var a = c.yAxis,
					g = b.threshold,
					h = c.translatedThreshold = a.getThreshold(g),
					e = v(b.minPointLength, 5),
					m = c.getColumnMetrics(),
					p = m.width,
					r = c.barW = Math.max(p, 1 + 2 * d),
					t = c.pointXOffset = m.offset,
					x = c.dataMin,
					k = c.dataMax;
				l.inverted && (h -= .5);
				b.pointPadding && (r = Math.ceil(r));
				D.prototype.translate.apply(c);
				c.points.forEach(function(b) {
					var d =
						v(b.yBottom, h),
						m = 999 + Math.abs(d),
						n = p;
					m = Math.min(Math.max(-m, b.plotY), a.len + m);
					var f = b.plotX + t,
						u = r,
						A = Math.min(m, d),
						w = Math.max(m, d) - A;
					if(e && Math.abs(w) < e) { w = e; var z = !a.reversed && !b.negative || a.reversed && b.negative;
						b.y === g && c.dataMax <= g && a.min < g && x !== k && (z = !z);
						A = Math.abs(A - h) > e ? d - e : h - (z ? e : 0) } y(b.options.pointWidth) && (n = u = Math.ceil(b.options.pointWidth), f -= Math.round((n - p) / 2));
					b.barX = f;
					b.pointWidth = n;
					b.tooltipPos = l.inverted ? [a.len + a.pos - l.plotLeft - m, c.xAxis.len - f - u / 2, w] : [f + u / 2, m + a.pos - l.plotTop, w];
					b.shapeType =
						c.pointClass.prototype.shapeType || "rect";
					b.shapeArgs = c.crispCol.apply(c, b.isNull ? [f, h, u, 0] : [f, A, u, w])
				})
			},
			getSymbol: c.noop,
			drawLegendSymbol: c.LegendSymbolMixin.drawRectangle,
			drawGraph: function() { this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data") },
			pointAttribs: function(c, l) {
				var b = this.options,
					d = this.pointAttrToOptions || {};
				var a = d.stroke || "borderColor";
				var g = d["stroke-width"] || "borderWidth",
					h = c && c.color || this.color,
					e = c && c[a] || b[a] || this.color || h,
					m = c && c[g] || b[g] || this[g] || 0;
				d = c &&
					c.options.dashStyle || b.dashStyle;
				var n = v(b.opacity, 1);
				if(c && this.zones.length) { var p = c.getZone();
					h = c.options.color || p && (p.color || c.nonZonedColor) || this.color;
					p && (e = p.borderColor || e, d = p.dashStyle || d, m = p.borderWidth || m) } l && (c = K(b.states[l], c.options.states && c.options.states[l] || {}), l = c.brightness, h = c.color || void 0 !== l && z(h).brighten(c.brightness).get() || h, e = c[a] || e, m = c[g] || m, d = c.dashStyle || d, n = v(c.opacity, n));
				a = { fill: h, stroke: e, "stroke-width": m, opacity: n };
				d && (a.dashstyle = d);
				return a
			},
			drawPoints: function() {
				var c =
					this,
					l = this.chart,
					b = c.options,
					d = l.renderer,
					a = b.animationLimit || 250,
					g;
				c.points.forEach(function(h) {
					var e = h.graphic,
						m = e && l.pointCount < a ? "animate" : "attr";
					if(G(h.plotY) && null !== h.y) {
						g = h.shapeArgs;
						e && e.element.nodeName !== h.shapeType && (e = e.destroy());
						if(e) e[m](K(g));
						else h.graphic = e = d[h.shapeType](g).add(h.group || c.group);
						if(b.borderRadius) e[m]({ r: b.borderRadius });
						l.styledMode || e[m](c.pointAttribs(h, h.selected && "select")).shadow(!1 !== h.allowShadow && b.shadow, null, b.stacking && !b.borderRadius);
						e.addClass(h.getClassName(), !0)
					} else e && (h.graphic = e.destroy())
				})
			},
			animate: function(c) { var l = this,
					b = this.yAxis,
					d = l.options,
					a = this.chart.inverted,
					g = {},
					h = a ? "translateX" : "translateY"; if(w)
					if(c) g.scaleY = .001, c = Math.min(b.pos + b.len, Math.max(b.pos, b.toPixels(d.threshold))), a ? g.translateX = c - b.len : g.translateY = c, l.clipBox && l.setClip(), l.group.attr(g);
					else { var e = l.group.attr(h);
						l.group.animate({ scaleY: 1 }, r(F(l.options.animation), { step: function(a, d) { g[h] = e + d.pos * (b.pos - e);
								l.group.attr(g) } }));
						l.animate = null } },
			remove: function() {
				var c = this,
					l = c.chart;
				l.hasRendered && l.series.forEach(function(b) { b.type === c.type && (b.isDirty = !0) });
				D.prototype.remove.apply(c, arguments)
			}
		});
		""
	});
	M(J, "parts/BarSeries.js", [J["parts/Globals.js"]], function(c) { c = c.seriesType;
		c("bar", "column", null, { inverted: !0 }); "" });
	M(J, "parts/ScatterSeries.js", [J["parts/Globals.js"]], function(c) {
		var p = c.Series,
			y = c.seriesType;
		y("scatter", "line", {
			lineWidth: 0,
			findNearestPointBy: "xy",
			jitter: { x: 0, y: 0 },
			marker: { enabled: !0 },
			tooltip: {
				headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
				pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
			}
		}, {
			sorted: !1,
			requireSorting: !1,
			noSharedTooltip: !0,
			trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
			takeOrdinalPosition: !1,
			drawGraph: function() { this.options.lineWidth && p.prototype.drawGraph.call(this) },
			applyJitter: function() {
				var c = this,
					p = this.options.jitter,
					y = this.points.length;
				p && this.points.forEach(function(r, z) {
					["x", "y"].forEach(function(v, D) {
						var w = "plot" + v.toUpperCase();
						if(p[v] && !r.isNull) {
							var n = c[v + "Axis"];
							var l = p[v] * n.transA;
							if(n && !n.isLog) { var b = Math.max(0, r[w] - l);
								n = Math.min(n.len, r[w] + l);
								D = 1E4 * Math.sin(z + D * y);
								r[w] = b + (n - b) * (D - Math.floor(D)); "x" === v && (r.clientX = r.plotX) }
						}
					})
				})
			}
		});
		c.addEvent(p, "afterTranslate", function() { this.applyJitter && this.applyJitter() });
		""
	});
	M(J, "mixins/centered-series.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.isNumber,
			G = c.deg2rad,
			F = c.pick,
			z = c.relativeLength;
		c.CenteredSeriesMixin = {
			getCenter: function() {
				var c = this.options,
					p = this.chart,
					v = 2 * (c.slicedOffset || 0),
					y = p.plotWidth -
					2 * v;
				p = p.plotHeight - 2 * v;
				var w = c.center;
				w = [F(w[0], "50%"), F(w[1], "50%"), c.size || "100%", c.innerSize || 0];
				var n = Math.min(y, p),
					l;
				for(l = 0; 4 > l; ++l) { var b = w[l];
					c = 2 > l || 2 === l && /%$/.test(b);
					w[l] = z(b, [y, p, n, w[2]][l]) + (c ? v : 0) } w[3] > w[2] && (w[3] = w[2]);
				return w
			},
			getStartAndEndRadians: function(c, p) { c = y(c) ? c : 0;
				p = y(p) && p > c && 360 > p - c ? p : c + 360; return { start: G * (c + -90), end: G * (p + -90) } }
		}
	});
	M(J, "parts/PieSeries.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.isNumber,
			F = c.addEvent;
		p = c.CenteredSeriesMixin;
		var z = p.getStartAndEndRadians,
			r = c.merge,
			K = c.noop,
			v = c.pick,
			D = c.Point,
			w = c.Series,
			n = c.seriesType,
			l = c.setAnimation;
		n("pie", "line", {
			center: [null, null],
			clip: !1,
			colorByPoint: !0,
			dataLabels: { allowOverlap: !0, connectorPadding: 5, distance: 30, enabled: !0, formatter: function() { return this.point.isNull ? void 0 : this.point.name }, softConnector: !0, x: 0, connectorShape: "fixedOffset", crookDistance: "70%" },
			ignoreHiddenPoint: !0,
			inactiveOtherPoints: !0,
			legendType: "point",
			marker: null,
			size: null,
			showInLegend: !1,
			slicedOffset: 10,
			stickyTracking: !1,
			tooltip: { followPointer: !0 },
			borderColor: "#ffffff",
			borderWidth: 1,
			states: { hover: { brightness: .1 } }
		}, {
			isCartesian: !1,
			requireSorting: !1,
			directTouch: !0,
			noSharedTooltip: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			axisTypes: [],
			pointAttribs: c.seriesTypes.column.prototype.pointAttribs,
			animate: function(b) {
				var d = this,
					a = d.points,
					c = d.startAngleRad;
				b || (a.forEach(function(a) { var b = a.graphic,
							g = a.shapeArgs;
						b && (b.attr({ r: a.startR || d.center[3] / 2, start: c, end: c }), b.animate({ r: g.r, start: g.start, end: g.end }, d.options.animation)) }),
					d.animate = null)
			},
			hasData: function() { return !!this.processedXData.length },
			updateTotals: function() { var b, d = 0,
					a = this.points,
					c = a.length,
					h = this.options.ignoreHiddenPoint; for(b = 0; b < c; b++) { var e = a[b];
					d += h && !e.visible ? 0 : e.isNull ? 0 : e.y } this.total = d; for(b = 0; b < c; b++) e = a[b], e.percentage = 0 < d && (e.visible || !h) ? e.y / d * 100 : 0, e.total = d },
			generatePoints: function() { w.prototype.generatePoints.call(this);
				this.updateTotals() },
			getX: function(b, d, a) {
				var c = this.center,
					h = this.radii ? this.radii[a.index] : c[2] / 2;
				return c[0] + (d ? -1 :
					1) * Math.cos(Math.asin(Math.max(Math.min((b - c[1]) / (h + a.labelDistance), 1), -1))) * (h + a.labelDistance) + (0 < a.labelDistance ? (d ? -1 : 1) * this.options.dataLabels.padding : 0)
			},
			translate: function(b) {
				this.generatePoints();
				var d = 0,
					a = this.options,
					g = a.slicedOffset,
					h = g + (a.borderWidth || 0),
					e = z(a.startAngle, a.endAngle),
					m = this.startAngleRad = e.start;
				e = (this.endAngleRad = e.end) - m;
				var l = this.points,
					n = a.dataLabels.distance;
				a = a.ignoreHiddenPoint;
				var t, p = l.length;
				b || (this.center = b = this.getCenter());
				for(t = 0; t < p; t++) {
					var k = l[t];
					var A = m + d * e;
					if(!a || k.visible) d += k.percentage / 100;
					var r = m + d * e;
					k.shapeType = "arc";
					k.shapeArgs = { x: b[0], y: b[1], r: b[2] / 2, innerR: b[3] / 2, start: Math.round(1E3 * A) / 1E3, end: Math.round(1E3 * r) / 1E3 };
					k.labelDistance = v(k.options.dataLabels && k.options.dataLabels.distance, n);
					k.labelDistance = c.relativeLength(k.labelDistance, k.shapeArgs.r);
					this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, k.labelDistance);
					r = (r + A) / 2;
					r > 1.5 * Math.PI ? r -= 2 * Math.PI : r < -Math.PI / 2 && (r += 2 * Math.PI);
					k.slicedTranslation = {
						translateX: Math.round(Math.cos(r) *
							g),
						translateY: Math.round(Math.sin(r) * g)
					};
					var w = Math.cos(r) * b[2] / 2;
					var q = Math.sin(r) * b[2] / 2;
					k.tooltipPos = [b[0] + .7 * w, b[1] + .7 * q];
					k.half = r < -Math.PI / 2 || r > Math.PI / 2 ? 1 : 0;
					k.angle = r;
					A = Math.min(h, k.labelDistance / 5);
					k.labelPosition = { natural: { x: b[0] + w + Math.cos(r) * k.labelDistance, y: b[1] + q + Math.sin(r) * k.labelDistance }, "final": {}, alignment: 0 > k.labelDistance ? "center" : k.half ? "right" : "left", connectorPosition: { breakAt: { x: b[0] + w + Math.cos(r) * A, y: b[1] + q + Math.sin(r) * A }, touchingSliceAt: { x: b[0] + w, y: b[1] + q } } }
				}
			},
			drawGraph: null,
			redrawPoints: function() {
				var b = this,
					d = b.chart,
					a = d.renderer,
					c, h, e, m, l = b.options.shadow;
				!l || b.shadowGroup || d.styledMode || (b.shadowGroup = a.g("shadow").attr({ zIndex: -1 }).add(b.group));
				b.points.forEach(function(g) {
					var t = {};
					h = g.graphic;
					if(!g.isNull && h) {
						m = g.shapeArgs;
						c = g.getTranslate();
						if(!d.styledMode) { var n = g.shadowGroup;
							l && !n && (n = g.shadowGroup = a.g("shadow").add(b.shadowGroup));
							n && n.attr(c);
							e = b.pointAttribs(g, g.selected && "select") } g.delayedRendering ? (h.setRadialReference(b.center).attr(m).attr(c), d.styledMode ||
							h.attr(e).attr({ "stroke-linejoin": "round" }).shadow(l, n), g.delayedRendering = !1) : (h.setRadialReference(b.center), d.styledMode || r(!0, t, e), r(!0, t, m, c), h.animate(t));
						h.attr({ visibility: g.visible ? "inherit" : "hidden" });
						h.addClass(g.getClassName())
					} else h && (g.graphic = h.destroy())
				})
			},
			drawPoints: function() { var b = this.chart.renderer;
				this.points.forEach(function(c) { c.graphic || (c.graphic = b[c.shapeType](c.shapeArgs).add(c.series.group), c.delayedRendering = !0) }) },
			searchPoint: K,
			sortByAngle: function(b, c) {
				b.sort(function(a,
					b) { return void 0 !== a.angle && (b.angle - a.angle) * c })
			},
			drawLegendSymbol: c.LegendSymbolMixin.drawRectangle,
			getCenter: p.getCenter,
			getSymbol: K
		}, {
			init: function() { D.prototype.init.apply(this, arguments); var b = this;
				b.name = v(b.name, "Slice"); var c = function(a) { b.slice("select" === a.type) };
				F(b, "select", c);
				F(b, "unselect", c); return b },
			isValid: function() { return G(this.y) && 0 <= this.y },
			setVisible: function(b, c) {
				var a = this,
					d = a.series,
					h = d.chart,
					e = d.options.ignoreHiddenPoint;
				c = v(c, e);
				b !== a.visible && (a.visible = a.options.visible =
					b = void 0 === b ? !a.visible : b, d.options.data[d.data.indexOf(a)] = a.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function(c) { if(a[c]) a[c][b ? "show" : "hide"](!0) }), a.legendItem && h.legend.colorizeItem(a, b), b || "hover" !== a.state || a.setState(""), e && (d.isDirty = !0), c && h.redraw())
			},
			slice: function(b, c, a) {
				var d = this.series;
				l(a, d.chart);
				v(c, !0);
				this.sliced = this.options.sliced = y(b) ? b : !this.sliced;
				d.options.data[d.data.indexOf(this)] = this.options;
				this.graphic.animate(this.getTranslate());
				this.shadowGroup &&
					this.shadowGroup.animate(this.getTranslate())
			},
			getTranslate: function() { return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 } },
			haloPath: function(b) { var c = this.shapeArgs; return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + b, c.r + b, { innerR: c.r - 1, start: c.start, end: c.end }) },
			connectorShapes: {
				fixedOffset: function(b, c, a) {
					var d = c.breakAt;
					c = c.touchingSliceAt;
					return ["M", b.x, b.y].concat(a.softConnector ? ["C", b.x + ("left" === b.alignment ? -5 : 5), b.y, 2 * d.x - c.x, 2 * d.y -
						c.y, d.x, d.y
					] : ["L", d.x, d.y]).concat(["L", c.x, c.y])
				},
				straight: function(b, c) { c = c.touchingSliceAt; return ["M", b.x, b.y, "L", c.x, c.y] },
				crookedLine: function(b, d, a) { d = d.touchingSliceAt; var g = this.series,
						h = g.center[0],
						e = g.chart.plotWidth,
						m = g.chart.plotLeft;
					g = b.alignment; var l = this.shapeArgs.r;
					a = c.relativeLength(a.crookDistance, 1);
					a = "left" === g ? h + l + (e + m - h - l) * (1 - a) : m + (h - l) * a;
					h = ["L", a, b.y]; if("left" === g ? a > b.x || a < d.x : a < b.x || a > d.x) h = []; return ["M", b.x, b.y].concat(h).concat(["L", d.x, d.y]) }
			},
			getConnectorPath: function() {
				var b =
					this.labelPosition,
					c = this.series.options.dataLabels,
					a = c.connectorShape,
					g = this.connectorShapes;
				g[a] && (a = g[a]);
				return a.call(this, { x: b.final.x, y: b.final.y, alignment: b.alignment }, b.connectorPosition, c)
			}
		});
		""
	});
	M(J, "parts/DataLabels.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.isArray,
			F = p.objectEach,
			z = p.splat,
			r = c.arrayMax,
			K = c.extend,
			v = c.format,
			D = c.merge;
		p = c.noop;
		var w = c.pick,
			n = c.relativeLength,
			l = c.Series,
			b = c.seriesTypes,
			d = c.stableSort;
		c.distribute = function(a, b,
			h) {
			function e(a, b) { return a.target - b.target }
			var g, l = !0,
				n = a,
				t = [];
			var p = 0;
			var k = n.reducedLen || b;
			for(g = a.length; g--;) p += a[g].size;
			if(p > k) { d(a, function(a, b) { return(b.rank || 0) - (a.rank || 0) }); for(p = g = 0; p <= k;) p += a[g].size, g++;
				t = a.splice(g - 1, a.length) } d(a, e);
			for(a = a.map(function(a) { return { size: a.size, targets: [a.target], align: w(a.align, .5) } }); l;) {
				for(g = a.length; g--;) l = a[g], p = (Math.min.apply(0, l.targets) + Math.max.apply(0, l.targets)) / 2, l.pos = Math.min(Math.max(0, p - l.size * l.align), b - l.size);
				g = a.length;
				for(l = !1; g--;) 0 <
					g && a[g - 1].pos + a[g - 1].size > a[g].pos && (a[g - 1].size += a[g].size, a[g - 1].targets = a[g - 1].targets.concat(a[g].targets), a[g - 1].align = .5, a[g - 1].pos + a[g - 1].size > b && (a[g - 1].pos = b - a[g - 1].size), a.splice(g, 1), l = !0)
			}
			n.push.apply(n, t);
			g = 0;
			a.some(function(a) { var d = 0; if(a.targets.some(function() { n[g].pos = a.pos + d; if(Math.abs(n[g].pos - n[g].target) > h) return n.slice(0, g + 1).forEach(function(a) { delete a.pos }), n.reducedLen = (n.reducedLen || b) - .1 * b, n.reducedLen > .1 * b && c.distribute(n, b, h), !0;
						d += n[g].size;
						g++ })) return !0 });
			d(n, e)
		};
		l.prototype.drawDataLabels = function() {
			function a(a, b) { var c = b.filter; return c ? (b = c.operator, a = a[c.property], c = c.value, ">" === b && a > c || "<" === b && a < c || ">=" === b && a >= c || "<=" === b && a <= c || "==" === b && a == c || "===" === b && a === c ? !0 : !1) : !0 }

			function b(a, b) { var c = [],
					d; if(G(a) && !G(b)) c = a.map(function(a) { return D(a, b) });
				else if(G(b) && !G(a)) c = b.map(function(b) { return D(a, b) });
				else if(G(a) || G(b))
					for(d = Math.max(a.length, b.length); d--;) c[d] = D(a[d], b[d]);
				else c = D(a, b); return c }
			var d = this,
				e = d.chart,
				l = d.options,
				n = l.dataLabels,
				p = d.points,
				t, r = d.hasRendered || 0,
				k = c.animObject(l.animation).duration,
				A = Math.min(k, 200),
				B = !e.renderer.forExport && w(n.defer, 0 < A),
				H = e.renderer;
			n = b(b(e.options.plotOptions && e.options.plotOptions.series && e.options.plotOptions.series.dataLabels, e.options.plotOptions && e.options.plotOptions[d.type] && e.options.plotOptions[d.type].dataLabels), n);
			c.fireEvent(this, "drawDataLabels");
			if(G(n) || n.enabled || d._hasPointLabels) {
				var q = d.plotGroup("dataLabelsGroup", "data-labels", B && !r ? "hidden" : "inherit", n.zIndex || 6);
				B &&
					(q.attr({ opacity: +r }), r || setTimeout(function() { var a = d.dataLabelsGroup;
						a && (d.visible && q.show(!0), a[l.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: A })) }, k - A));
				p.forEach(function(c) {
					t = z(b(n, c.dlOptions || c.options && c.options.dataLabels));
					t.forEach(function(b, f) {
						var g = b.enabled && (!c.isNull || c.dataLabelOnNull) && a(c, b),
							k = c.dataLabels ? c.dataLabels[f] : c.dataLabel,
							h = c.connectors ? c.connectors[f] : c.connector,
							m = w(b.distance, c.labelDistance),
							t = !k;
						if(g) {
							var n = c.getLabelConfig();
							var p = w(b[c.formatPrefix + "Format"],
								b.format);
							n = y(p) ? v(p, n, e.time) : (b[c.formatPrefix + "Formatter"] || b.formatter).call(n, b);
							p = b.style;
							var u = b.rotation;
							e.styledMode || (p.color = w(b.color, p.color, d.color, "#000000"), "contrast" === p.color && (c.contrastColor = H.getContrast(c.color || d.color), p.color = !y(m) && b.inside || 0 > m || l.stacking ? c.contrastColor : "#000000"), l.cursor && (p.cursor = l.cursor));
							var r = { r: b.borderRadius || 0, rotation: u, padding: b.padding, zIndex: 1 };
							e.styledMode || (r.fill = b.backgroundColor, r.stroke = b.borderColor, r["stroke-width"] = b.borderWidth);
							F(r, function(a, b) { void 0 === a && delete r[b] })
						}!k || g && y(n) ? g && y(n) && (k ? r.text = n : (c.dataLabels = c.dataLabels || [], k = c.dataLabels[f] = u ? H.text(n, 0, -9999).addClass("highcharts-data-label") : H.label(n, 0, -9999, b.shape, null, null, b.useHTML, null, "data-label"), f || (c.dataLabel = k), k.addClass(" highcharts-data-label-color-" + c.colorIndex + " " + (b.className || "") + (b.useHTML ? " highcharts-tracker" : ""))), k.options = b, k.attr(r), e.styledMode || k.css(p).shadow(b.shadow), k.added || k.add(q), b.textPath && !b.useHTML && k.setTextPath(c.getDataLabelPath &&
							c.getDataLabelPath(k) || c.graphic, b.textPath), d.alignDataLabel(c, k, b, null, t)) : (c.dataLabel = c.dataLabel && c.dataLabel.destroy(), c.dataLabels && (1 === c.dataLabels.length ? delete c.dataLabels : delete c.dataLabels[f]), f || delete c.dataLabel, h && (c.connector = c.connector.destroy(), c.connectors && (1 === c.connectors.length ? delete c.connectors : delete c.connectors[f])))
					})
				})
			}
			c.fireEvent(this, "afterDrawDataLabels")
		};
		l.prototype.alignDataLabel = function(a, b, c, d, l) {
			var e = this.chart,
				g = this.isCartesian && e.inverted,
				h = w(a.dlBox &&
					a.dlBox.centerX, a.plotX, -9999),
				m = w(a.plotY, -9999),
				k = b.getBBox(),
				n = c.rotation,
				p = c.align,
				r = this.visible && (a.series.forceDL || e.isInsidePlot(h, Math.round(m), g) || d && e.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g)),
				q = "justify" === w(c.overflow, "justify");
			if(r) {
				var f = e.renderer.fontMetrics(e.styledMode ? void 0 : c.style.fontSize, b).b;
				d = K({ x: g ? this.yAxis.len - m : h, y: Math.round(g ? this.xAxis.len - h : m), width: 0, height: 0 }, d);
				K(c, { width: k.width, height: k.height });
				n ? (q = !1, h = e.renderer.rotCorr(f, n), h = {
					x: d.x + c.x + d.width / 2 + h.x,
					y: d.y + c.y + { top: 0, middle: .5, bottom: 1 }[c.verticalAlign] * d.height
				}, b[l ? "attr" : "animate"](h).attr({ align: p }), m = (n + 720) % 360, m = 180 < m && 360 > m, "left" === p ? h.y -= m ? k.height : 0 : "center" === p ? (h.x -= k.width / 2, h.y -= k.height / 2) : "right" === p && (h.x -= k.width, h.y -= m ? 0 : k.height), b.placed = !0, b.alignAttr = h) : (b.align(c, null, d), h = b.alignAttr);
				q && 0 <= d.height ? this.justifyDataLabel(b, c, h, k, d, l) : w(c.crop, !0) && (r = e.isInsidePlot(h.x, h.y) && e.isInsidePlot(h.x + k.width, h.y + k.height));
				if(c.shape && !n) b[l ? "attr" : "animate"]({
					anchorX: g ? e.plotWidth -
						a.plotY : a.plotX,
					anchorY: g ? e.plotHeight - a.plotX : a.plotY
				})
			}
			r || (b.hide(!0), b.placed = !1)
		};
		l.prototype.justifyDataLabel = function(a, b, c, d, l, n) {
			var e = this.chart,
				g = b.align,
				h = b.verticalAlign,
				k = a.box ? 0 : a.padding || 0;
			var m = c.x + k;
			if(0 > m) { "right" === g ? (b.align = "left", b.inside = !0) : b.x = -m; var p = !0 } m = c.x + d.width - k;
			m > e.plotWidth && ("left" === g ? (b.align = "right", b.inside = !0) : b.x = e.plotWidth - m, p = !0);
			m = c.y + k;
			0 > m && ("bottom" === h ? (b.verticalAlign = "top", b.inside = !0) : b.y = -m, p = !0);
			m = c.y + d.height - k;
			m > e.plotHeight && ("top" === h ? (b.verticalAlign =
				"bottom", b.inside = !0) : b.y = e.plotHeight - m, p = !0);
			p && (a.placed = !n, a.align(b, null, l));
			return p
		};
		b.pie && (b.pie.prototype.dataLabelPositioners = {
			radialDistributionY: function(a) { return a.top + a.distributeBox.pos },
			radialDistributionX: function(a, b, c, d) { return a.getX(c < b.top + 2 || c > b.bottom - 2 ? d : c, b.half, b) },
			justify: function(a, b, c) { return c[0] + (a.half ? -1 : 1) * (b + a.labelDistance) },
			alignToPlotEdges: function(a, b, c, d) { a = a.getBBox().width; return b ? a + d : c - a - d },
			alignToConnectors: function(a, b, c, d) {
				var e = 0,
					g;
				a.forEach(function(a) {
					g =
						a.dataLabel.getBBox().width;
					g > e && (e = g)
				});
				return b ? e + d : c - e - d
			}
		}, b.pie.prototype.drawDataLabels = function() {
			var a = this,
				b = a.data,
				d, e = a.chart,
				m = a.options.dataLabels,
				n = m.connectorPadding,
				p, t = e.plotWidth,
				x = e.plotHeight,
				k = e.plotLeft,
				A = Math.round(e.chartWidth / 3),
				v, z = a.center,
				q = z[2] / 2,
				f = z[1],
				C, F, K, G, J = [
					[],
					[]
				],
				L, I, M, Q, O = [0, 0, 0, 0],
				U = a.dataLabelPositioners,
				W;
			a.visible && (m.enabled || a._hasPointLabels) && (b.forEach(function(a) {
				a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({ width: "auto" }).css({
					width: "auto",
					textOverflow: "clip"
				}), a.dataLabel.shortened = !1)
			}), l.prototype.drawDataLabels.apply(a), b.forEach(function(a) { a.dataLabel && (a.visible ? (J[a.half].push(a), a.dataLabel._pos = null, !y(m.style.width) && !y(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > A && (a.dataLabel.css({ width: .7 * A }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels)) }), J.forEach(function(b, g) {
				var h = b.length,
					l = [],
					p;
				if(h) {
					a.sortByAngle(b, g - .5);
					if(0 < a.maxLabelDistance) { var r = Math.max(0, f - q - a.maxLabelDistance); var u = Math.min(f + q + a.maxLabelDistance, e.plotHeight);
						b.forEach(function(a) { 0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, f - q - a.labelDistance), a.bottom = Math.min(f + q + a.labelDistance, e.plotHeight), p = a.dataLabel.getBBox().height || 21, a.distributeBox = { target: a.labelPosition.natural.y - a.top + p / 2, size: p, rank: a.y }, l.push(a.distributeBox)) });
						r = u + p - r;
						c.distribute(l, r, r / 5) }
					for(Q = 0; Q < h; Q++) {
						d = b[Q];
						K = d.labelPosition;
						C = d.dataLabel;
						M = !1 === d.visible ? "hidden" : "inherit";
						I = r = K.natural.y;
						l && y(d.distributeBox) && (void 0 === d.distributeBox.pos ? M = "hidden" : (G = d.distributeBox.size, I = U.radialDistributionY(d)));
						delete d.positionIndex;
						if(m.justify) L = U.justify(d, q, z);
						else switch(m.alignTo) {
							case "connectors":
								L = U.alignToConnectors(b, g, t, k); break;
							case "plotEdges":
								L = U.alignToPlotEdges(C, g, t, k); break;
							default:
								L = U.radialDistributionX(a, d, I, r) } C._attr = { visibility: M, align: K.alignment };
						C._pos = {
							x: L + m.x + ({ left: n, right: -n }[K.alignment] || 0),
							y: I + m.y - 10
						};
						K.final.x = L;
						K.final.y = I;
						w(m.crop, !0) && (F = C.getBBox().width, r = null, L - F < n && 1 === g ? (r = Math.round(F - L + n), O[3] = Math.max(r, O[3])) : L + F > t - n && 0 === g && (r = Math.round(L + F - t + n), O[1] = Math.max(r, O[1])), 0 > I - G / 2 ? O[0] = Math.max(Math.round(-I + G / 2), O[0]) : I + G / 2 > x && (O[2] = Math.max(Math.round(I + G / 2 - x), O[2])), C.sideOverflow = r)
					}
				}
			}), 0 === r(O) || this.verifyDataLabelOverflow(O)) && (this.placeDataLabels(), this.points.forEach(function(b) {
				W = D(m, b.options.dataLabels);
				if(p = w(W.connectorWidth, 1)) {
					var c;
					v = b.connector;
					if((C = b.dataLabel) &&
						C._pos && b.visible && 0 < b.labelDistance) { M = C._attr.visibility; if(c = !v) b.connector = v = e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + b.colorIndex + (b.className ? " " + b.className : "")).add(a.dataLabelsGroup), e.styledMode || v.attr({ "stroke-width": p, stroke: W.connectorColor || b.color || "#666666" });
						v[c ? "attr" : "animate"]({ d: b.getConnectorPath() });
						v.attr("visibility", M) } else v && (b.connector = v.destroy())
				}
			}))
		}, b.pie.prototype.placeDataLabels = function() {
			this.points.forEach(function(a) {
				var b =
					a.dataLabel,
					c;
				b && a.visible && ((c = b._pos) ? (b.sideOverflow && (b._attr.width = Math.max(b.getBBox().width - b.sideOverflow, 0), b.css({ width: b._attr.width + "px", textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis" }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](c), b.moved = !0) : b && b.attr({ y: -9999 }));
				delete a.distributeBox
			}, this)
		}, b.pie.prototype.alignDataLabel = p, b.pie.prototype.verifyDataLabelOverflow = function(a) {
			var b = this.center,
				c = this.options,
				d = c.center,
				l = c.minSize || 80,
				p = null !==
				c.size;
			if(!p) { if(null !== d[0]) var r = Math.max(b[2] - Math.max(a[1], a[3]), l);
				else r = Math.max(b[2] - a[1] - a[3], l), b[0] += (a[3] - a[1]) / 2;
				null !== d[1] ? r = Math.max(Math.min(r, b[2] - Math.max(a[0], a[2])), l) : (r = Math.max(Math.min(r, b[2] - a[0] - a[2]), l), b[1] += (a[0] - a[2]) / 2);
				r < b[2] ? (b[2] = r, b[3] = Math.min(n(c.innerSize || 0, r), r), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : p = !0 }
			return p
		});
		b.column && (b.column.prototype.alignDataLabel = function(a, b, c, d, m) {
			var e = this.chart.inverted,
				g = a.series,
				h = a.dlBox || a.shapeArgs,
				n = w(a.below, a.plotY > w(this.translatedThreshold, g.yAxis.len)),
				k = w(c.inside, !!this.options.stacking);
			h && (d = D(h), 0 > d.y && (d.height += d.y, d.y = 0), h = d.y + d.height - g.yAxis.len, 0 < h && (d.height -= h), e && (d = { x: g.yAxis.len - d.y - d.height, y: g.xAxis.len - d.x - d.width, width: d.height, height: d.width }), k || (e ? (d.x += n ? 0 : d.width, d.width = 0) : (d.y += n ? d.height : 0, d.height = 0)));
			c.align = w(c.align, !e || k ? "center" : n ? "right" : "left");
			c.verticalAlign = w(c.verticalAlign, e || k ? "middle" : n ? "top" : "bottom");
			l.prototype.alignDataLabel.call(this, a,
				b, c, d, m);
			c.inside && a.contrastColor && b.css({ color: a.contrastColor })
		})
	});
	M(J, "modules/overlapping-datalabels.src.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.isArray,
			G = p.objectEach;
		p = c.Chart;
		var F = c.pick,
			z = c.addEvent,
			r = c.fireEvent;
		z(p, "render", function() {
			var c = [];
			(this.labelCollectors || []).forEach(function(p) { c = c.concat(p()) });
			(this.yAxis || []).forEach(function(p) { p.options.stackLabels && !p.options.stackLabels.allowOverlap && G(p.stacks, function(p) { G(p, function(p) { c.push(p.label) }) }) });
			(this.series || []).forEach(function(p) { var r = p.options.dataLabels;
				p.visible && (!1 !== r.enabled || p._hasPointLabels) && p.points.forEach(function(p) { p.visible && (y(p.dataLabels) ? p.dataLabels : p.dataLabel ? [p.dataLabel] : []).forEach(function(n) { var l = n.options;
						n.labelrank = F(l.labelrank, p.labelrank, p.shapeArgs && p.shapeArgs.height);
						l.allowOverlap || c.push(n) }) }) });
			this.hideOverlappingLabels(c)
		});
		p.prototype.hideOverlappingLabels = function(c) {
			var p = this,
				y = c.length,
				w = p.renderer,
				n, l, b;
			var d = function(a) {
				var b = a.box ?
					0 : a.padding || 0;
				var c = 0;
				if(a && (!a.alignAttr || a.placed)) { var d = a.alignAttr || { x: a.attr("x"), y: a.attr("y") }; var g = a.parentGroup;
					a.width || (c = a.getBBox(), a.width = c.width, a.height = c.height, c = w.fontMetrics(null, a.element).h); return { x: d.x + (g.translateX || 0) + b, y: d.y + (g.translateY || 0) + b - c, width: a.width - 2 * b, height: a.height - 2 * b } }
			};
			for(l = 0; l < y; l++)
				if(n = c[l]) n.oldOpacity = n.opacity, n.newOpacity = 1, n.absoluteBox = d(n);
			c.sort(function(a, b) { return(b.labelrank || 0) - (a.labelrank || 0) });
			for(l = 0; l < y; l++) {
				var a = (d = c[l]) && d.absoluteBox;
				for(n = l + 1; n < y; ++n) { var g = (b = c[n]) && b.absoluteBox;!a || !g || d === b || 0 === d.newOpacity || 0 === b.newOpacity || g.x > a.x + a.width || g.x + g.width < a.x || g.y > a.y + a.height || g.y + g.height < a.y || ((d.labelrank < b.labelrank ? d : b).newOpacity = 0) }
			}
			c.forEach(function(a) { var b; if(a) { var c = a.newOpacity;
					a.oldOpacity !== c && (a.alignAttr && a.placed ? (c ? a.show(!0) : b = function() { a.hide(!0);
						a.placed = !1 }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b), r(p, "afterHideOverlappingLabels")) : a.attr({ opacity: c }));
					a.isOld = !0 } })
		}
	});
	M(J, "parts/Interaction.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.defined,
			G = p.isArray,
			F = p.isObject,
			z = p.objectEach,
			r = c.addEvent;
		p = c.Chart;
		var K = c.createElement,
			v = c.css,
			D = c.defaultOptions,
			w = c.defaultPlotOptions,
			n = c.extend,
			l = c.fireEvent,
			b = c.hasTouch,
			d = c.Legend,
			a = c.merge,
			g = c.pick,
			h = c.Point,
			e = c.Series,
			m = c.seriesTypes,
			u = c.svg;
		var E = c.TrackerMixin = {
			drawTrackerPoint: function() {
				var a = this,
					c = a.chart,
					d = c.pointer,
					e = function(a) {
						var b = d.getPointFromEvent(a);
						void 0 !== b && (d.isDirectTouch = !0, b.onMouseOver(a))
					},
					g;
				a.points.forEach(function(a) { g = G(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
					a.graphic && (a.graphic.element.point = a);
					g.forEach(function(b) { b.div ? b.div.point = a : b.element.point = a }) });
				a._hasTracking || (a.trackerGroups.forEach(function(g) { if(a[g]) { a[g].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function(a) { d.onTrackerMouseOut(a) }); if(b) a[g].on("touchstart", e);!c.styledMode && a.options.cursor && a[g].css(v).css({ cursor: a.options.cursor }) } }), a._hasTracking = !0);
				l(this, "afterDrawTracker")
			},
			drawTrackerGraph: function() {
				var a = this,
					c = a.options,
					d = c.trackByArea,
					e = [].concat(d ? a.areaPath : a.graphPath),
					g = e.length,
					h = a.chart,
					m = h.pointer,
					f = h.renderer,
					n = h.options.tooltip.snap,
					p = a.tracker,
					r, w = function() { if(h.hoverSeries !== a) a.onMouseOver() },
					v = "rgba(192,192,192," + (u ? .0001 : .002) + ")";
				if(g && !d)
					for(r = g + 1; r--;) "M" === e[r] && e.splice(r + 1, 0, e[r + 1] - n, e[r + 2], "L"), (r && "M" === e[r] || r === g) && e.splice(r, 0, "L", e[r - 2] + n, e[r - 1]);
				p ? p.attr({ d: e }) : a.graph && (a.tracker = f.path(e).attr({
					visibility: a.visible ?
						"visible" : "hidden",
					zIndex: 2
				}).addClass(d ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), h.styledMode || a.tracker.attr({ "stroke-linejoin": "round", stroke: v, fill: d ? v : "none", "stroke-width": a.graph.strokeWidth() + (d ? 0 : 2 * n) }), [a.tracker, a.markerGroup].forEach(function(a) { a.addClass("highcharts-tracker").on("mouseover", w).on("mouseout", function(a) { m.onTrackerMouseOut(a) });
					c.cursor && !h.styledMode && a.css({ cursor: c.cursor }); if(b) a.on("touchstart", w) }));
				l(this, "afterDrawTracker")
			}
		};
		m.column &&
			(m.column.prototype.drawTracker = E.drawTrackerPoint);
		m.pie && (m.pie.prototype.drawTracker = E.drawTrackerPoint);
		m.scatter && (m.scatter.prototype.drawTracker = E.drawTrackerPoint);
		n(d.prototype, {
			setItemEvents: function(b, c, d) {
				var e = this,
					g = e.chart.renderer.boxWrapper,
					k = b instanceof h,
					m = "highcharts-legend-" + (k ? "point" : "series") + "-active",
					f = e.chart.styledMode;
				(d ? c : b.legendGroup).on("mouseover", function() {
					b.visible && e.allItems.forEach(function(a) { b !== a && a.setState("inactive", !k) });
					b.setState("hover");
					b.visible &&
						g.addClass(m);
					f || c.css(e.options.itemHoverStyle)
				}).on("mouseout", function() { e.chart.styledMode || c.css(a(b.visible ? e.itemStyle : e.itemHiddenStyle));
					e.allItems.forEach(function(a) { b !== a && a.setState("", !k) });
					g.removeClass(m);
					b.setState() }).on("click", function(a) {
					var c = function() { b.setVisible && b.setVisible();
						e.allItems.forEach(function(a) { b !== a && a.setState(b.visible ? "inactive" : "", !k) }) };
					g.removeClass(m);
					a = { browserEvent: a };
					b.firePointEvent ? b.firePointEvent("legendItemClick", a, c) : l(b, "legendItemClick", a,
						c)
				})
			},
			createCheckboxForItem: function(a) { a.checkbox = K("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container);
				r(a.checkbox, "click", function(b) { l(a.series || a, "checkboxClick", { checked: b.target.checked, item: a }, function() { a.select() }) }) }
		});
		n(p.prototype, {
			showResetZoom: function() {
				function a() { b.zoomOut() }
				var b = this,
					c = D.lang,
					d = b.options.chart.resetZoomButton,
					e = d.theme,
					g = e.states,
					h = "chart" === d.relativeTo ||
					"spaceBox" === d.relativeTo ? null : "plotBox";
				l(this, "beforeShowResetZoom", null, function() { b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, e, g && g.hover).attr({ align: d.position.align, title: c.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(d.position, !1, h) });
				l(this, "afterShowResetZoom")
			},
			zoomOut: function() { l(this, "selection", { resetSelection: !0 }, this.zoom) },
			zoom: function(a) {
				var b = this,
					c, d = b.pointer,
					e = !1,
					h = b.inverted ? d.mouseDownX : d.mouseDownY;
				!a || a.resetSelection ? (b.axes.forEach(function(a) {
					c =
						a.zoom()
				}), d.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function(a) { var f = a.axis,
						g = b.inverted ? f.left : f.top,
						k = b.inverted ? g + f.width : g + f.height,
						l = f.isXAxis,
						m = !1; if(!l && h >= g && h <= k || l || !y(h)) m = !0;
					d[l ? "zoomX" : "zoomY"] && m && (c = f.zoom(a.min, a.max), f.displayBtn && (e = !0)) });
				var l = b.resetZoomButton;
				e && !l ? b.showResetZoom() : !e && F(l) && (b.resetZoomButton = l.destroy());
				c && b.redraw(g(b.options.chart.animation, a && a.animation, 100 > b.pointCount))
			},
			pan: function(a, b) {
				var c = this,
					d = c.hoverPoints,
					e;
				l(this, "pan", { originalEvent: a },
					function() {
						d && d.forEach(function(a) { a.setState() });
						("xy" === b ? [1, 0] : [1]).forEach(function(b) {
							b = c[b ? "xAxis" : "yAxis"][0];
							var d = b.horiz,
								f = a[d ? "chartX" : "chartY"];
							d = d ? "mouseDownX" : "mouseDownY";
							var g = c[d],
								k = (b.pointRange || 0) / 2,
								h = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1,
								l = b.getExtremes(),
								m = b.toValue(g - f, !0) + k * h;
							h = b.toValue(g + b.len - f, !0) - k * h;
							var n = h < m;
							g = n ? h : m;
							m = n ? m : h;
							h = Math.min(l.dataMin, k ? l.min : b.toValue(b.toPixels(l.min) - b.minPixelPadding));
							k = Math.max(l.dataMax, k ? l.max : b.toValue(b.toPixels(l.max) +
								b.minPixelPadding));
							n = h - g;
							0 < n && (m += n, g = h);
							n = m - k;
							0 < n && (m = k, g -= n);
							b.series.length && g !== l.min && m !== l.max && (b.setExtremes(g, m, !1, !1, { trigger: "pan" }), e = !0);
							c[d] = f
						});
						e && c.redraw(!1);
						v(c.container, { cursor: "move" })
					})
			}
		});
		n(h.prototype, {
			select: function(a, b) {
				var c = this,
					d = c.series,
					e = d.chart;
				this.selectedStaging = a = g(a, !c.selected);
				c.firePointEvent(a ? "select" : "unselect", { accumulate: b }, function() {
					c.selected = c.options.selected = a;
					d.options.data[d.data.indexOf(c)] = c.options;
					c.setState(a && "select");
					b || e.getSelectedPoints().forEach(function(a) {
						var b =
							a.series;
						a.selected && a !== c && (a.selected = a.options.selected = !1, b.options.data[b.data.indexOf(a)] = a.options, a.setState(e.hoverPoints && b.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
					})
				});
				delete this.selectedStaging
			},
			onMouseOver: function(a) { var b = this.series.chart,
					c = b.pointer;
				a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
				c.runPointActions(a, this) },
			onMouseOut: function() {
				var a = this.series.chart;
				this.firePointEvent("mouseOut");
				this.series.options.inactiveOtherPoints ||
					(a.hoverPoints || []).forEach(function(a) { a.setState() });
				a.hoverPoints = a.hoverPoint = null
			},
			importEvents: function() { if(!this.hasImportedEvents) { var b = this,
						d = a(b.series.options.point, b.options).events;
					b.events = d;
					z(d, function(a, d) { c.isFunction(a) && r(b, d, a) });
					this.hasImportedEvents = !0 } },
			setState: function(a, b) {
				var c = this.series,
					d = this.state,
					e = c.options.states[a || "normal"] || {},
					h = w[c.type].marker && c.options.marker,
					m = h && !1 === h.enabled,
					f = h && h.states && h.states[a || "normal"] || {},
					p = !1 === f.enabled,
					r = c.stateMarkerGraphic,
					t = this.marker || {},
					u = c.chart,
					x = c.halo,
					v, y = h && c.markerAttribs;
				a = a || "";
				if(!(a === this.state && !b || this.selected && "select" !== a || !1 === e.enabled || a && (p || m && !1 === f.enabled) || a && t.states && t.states[a] && !1 === t.states[a].enabled)) {
					this.state = a;
					y && (v = c.markerAttribs(this, a));
					if(this.graphic) {
						d && this.graphic.removeClass("highcharts-point-" + d);
						a && this.graphic.addClass("highcharts-point-" + a);
						if(!u.styledMode) {
							var z = c.pointAttribs(this, a);
							var D = g(u.options.chart.animation, e.animation);
							c.options.inactiveOtherPoints &&
								((this.dataLabels || []).forEach(function(a) { a && a.animate({ opacity: z.opacity }, D) }), this.connector && this.connector.animate({ opacity: z.opacity }, D));
							this.graphic.animate(z, D)
						}
						v && this.graphic.animate(v, g(u.options.chart.animation, f.animation, h.animation));
						r && r.hide()
					} else {
						if(a && f) {
							d = t.symbol || c.symbol;
							r && r.currentSymbol !== d && (r = r.destroy());
							if(r) r[b ? "animate" : "attr"]({ x: v.x, y: v.y });
							else d && (c.stateMarkerGraphic = r = u.renderer.symbol(d, v.x, v.y, v.width, v.height).add(c.markerGroup), r.currentSymbol = d);
							!u.styledMode &&
								r && r.attr(c.pointAttribs(this, a))
						}
						r && (r[a && this.isInside ? "show" : "hide"](), r.element.point = this)
					}
					a = e.halo;
					e = (r = this.graphic || r) && r.visibility || "inherit";
					a && a.size && "hidden" !== e ? (x || (c.halo = x = u.renderer.path().add(r.parentGroup)), x.show()[b ? "animate" : "attr"]({ d: this.haloPath(a.size) }), x.attr({ "class": "highcharts-halo highcharts-color-" + g(this.colorIndex, c.colorIndex) + (this.className ? " " + this.className : ""), visibility: e, zIndex: -1 }), x.point = this, u.styledMode || x.attr(n({ fill: this.color || c.color, "fill-opacity": a.opacity },
						a.attributes))) : x && x.point && x.point.haloPath && x.animate({ d: x.point.haloPath(0) }, null, x.hide);
					l(this, "afterSetState")
				}
			},
			haloPath: function(a) { return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a) }
		});
		n(e.prototype, {
			onMouseOver: function() { var a = this.chart,
					b = a.hoverSeries; if(b && b !== this) b.onMouseOut();
				this.options.events.mouseOver && l(this, "mouseOver");
				this.setState("hover");
				a.hoverSeries = this },
			onMouseOut: function() {
				var a = this.options,
					b = this.chart,
					c = b.tooltip,
					d =
					b.hoverPoint;
				b.hoverSeries = null;
				if(d) d.onMouseOut();
				this && a.events.mouseOut && l(this, "mouseOut");
				!c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
				b.series.forEach(function(a) { a.setState("", !0) })
			},
			setState: function(a, b) {
				var c = this,
					d = c.options,
					e = c.graph,
					h = d.inactiveOtherPoints,
					l = d.states,
					f = d.lineWidth,
					m = d.opacity,
					n = g(l[a || "normal"] && l[a || "normal"].animation, c.chart.options.chart.animation);
				d = 0;
				a = a || "";
				if(c.state !== a && ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function(b) {
						b &&
							(c.state && b.removeClass("highcharts-series-" + c.state), a && b.addClass("highcharts-series-" + a))
					}), c.state = a, !c.chart.styledMode)) { if(l[a] && !1 === l[a].enabled) return;
					a && (f = l[a].lineWidth || f + (l[a].lineWidthPlus || 0), m = g(l[a].opacity, m)); if(e && !e.dashstyle)
						for(l = { "stroke-width": f }, e.animate(l, n); c["zone-graph-" + d];) c["zone-graph-" + d].attr(l), d += 1;
					h || [c.group, c.markerGroup, c.dataLabelsGroup, c.labelBySeries].forEach(function(a) { a && a.animate({ opacity: m }, n) }) } b && h && c.points && c.setAllPointsToState(a)
			},
			setAllPointsToState: function(a) {
				this.points.forEach(function(b) {
					b.setState &&
						b.setState(a)
				})
			},
			setVisible: function(a, b) {
				var c = this,
					d = c.chart,
					e = c.legendItem,
					g = d.options.chart.ignoreHiddenSeries,
					h = c.visible;
				var f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !h : a) ? "show" : "hide";
				["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(a) { if(c[a]) c[a][f]() });
				if(d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
				e && d.legend.colorizeItem(c, a);
				c.isDirty = !0;
				c.options.stacking && d.series.forEach(function(a) {
					a.options.stacking &&
						a.visible && (a.isDirty = !0)
				});
				c.linkedSeries.forEach(function(b) { b.setVisible(a, !1) });
				g && (d.isDirtyBox = !0);
				l(c, f);
				!1 !== b && d.redraw()
			},
			show: function() { this.setVisible(!0) },
			hide: function() { this.setVisible(!1) },
			select: function(a) { this.selected = a = this.options.selected = void 0 === a ? !this.selected : a;
				this.checkbox && (this.checkbox.checked = a);
				l(this, a ? "select" : "unselect") },
			drawTracker: E.drawTrackerGraph
		})
	});
	M(J, "parts/Responsive.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = p.isArray,
			G = p.isObject,
			F = p.objectEach,
			z = p.splat;
		p = c.Chart;
		var r = c.pick;
		p.prototype.setResponsive = function(p, r) {
			var v = this.options.responsive,
				w = [],
				n = this.currentResponsive;
			!r && v && v.rules && v.rules.forEach(function(l) { void 0 === l._id && (l._id = c.uniqueKey());
				this.matchResponsiveRule(l, w) }, this);
			r = c.merge.apply(0, w.map(function(l) { return c.find(v.rules, function(b) { return b._id === l }).chartOptions }));
			r.isResponsiveOptions = !0;
			w = w.toString() || void 0;
			w !== (n && n.ruleIds) && (n && this.update(n.undoOptions, p, !0), w ? (n = this.currentOptions(r),
				n.isResponsiveOptions = !0, this.currentResponsive = { ruleIds: w, mergedOptions: r, undoOptions: n }, this.update(r, p, !0)) : this.currentResponsive = void 0)
		};
		p.prototype.matchResponsiveRule = function(c, p) { var v = c.condition;
			(v.callback || function() { return this.chartWidth <= r(v.maxWidth, Number.MAX_VALUE) && this.chartHeight <= r(v.maxHeight, Number.MAX_VALUE) && this.chartWidth >= r(v.minWidth, 0) && this.chartHeight >= r(v.minHeight, 0) }).call(this) && p.push(c._id) };
		p.prototype.currentOptions = function(c) {
			function p(c, l, b, d) {
				var a;
				F(c, function(c, h) { if(!d && -1 < r.collectionsWithUpdate.indexOf(h))
						for(c = z(c), b[h] = [], a = 0; a < c.length; a++) l[h][a] && (b[h][a] = {}, p(c[a], l[h][a], b[h][a], d + 1));
					else G(c) ? (b[h] = y(c) ? [] : {}, p(c, l[h] || {}, b[h], d + 1)) : b[h] = void 0 === l[h] ? null : l[h] })
			}
			var r = this,
				w = {};
			p(c, this.options, w, 0);
			return w
		}
	});
	M(J, "masters/highcharts.src.js", [J["parts/Globals.js"], J["parts/Utilities.js"]], function(c, p) {
		var y = c.extend;
		y(c, {
			defined: p.defined,
			erase: p.erase,
			isArray: p.isArray,
			isClass: p.isClass,
			isDOMElement: p.isDOMElement,
			isNumber: p.isNumber,
			isObject: p.isObject,
			isString: p.isString,
			objectEach: p.objectEach,
			pInt: p.pInt,
			splat: p.splat
		});
		return c
	});
	J["masters/highcharts.src.js"]._modules = J;
	return J["masters/highcharts.src.js"]
});
//# sourceMappingURL=highcharts.js.map