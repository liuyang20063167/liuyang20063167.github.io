BINGO929 = {staticURI:'http://bingo929.qiniudn.com/'};
function Bingo() {}
Bingo.prototype = {
	_lastScroll: 0,
	_pptSelectors: "section.scroll_listen",
	screenWidth: 1440,
	preloadFiles: {
		s1024: ["imgs/ink_dots_close_1024.png", "imgs/ink_dots_far_1024.png", "imgs/print_blue_1024.png", "imgs/print_blue_one_1024.png", "imgs/print_purple_1024.png", "imgs/print_red_1024.png", "imgs/person_1024.png", "imgs/skills_1024.png", "imgs/print_yellow_1024.png", "imgs/bg_1024.jpg"],
		s1440: ["imgs/ink_dots_close_1440.png", "imgs/ink_dots_far_1440.png", "imgs/print_blue_1440.png", "imgs/print_blue_one_1440.png", "imgs/print_purple_1440.png", "imgs/print_red_1440.png", "imgs/person_1440.png", "imgs/skills_1440.png", "imgs/print_yellow_1440.png", "imgs/bg_1440.jpg"],
		s1920: ["imgs/ink_dots_close_1920.png", "imgs/ink_dots_far_1920.png", "imgs/print_blue_1920.png", "imgs/print_blue_one_1920.png", "imgs/print_purple_1920.png", "imgs/print_red_1920.png", "imgs/person_1920.png", "imgs/skills_1920.png", "imgs/print_yellow_1920.png", "imgs/bg_1920.jpg"]
	},
	init: function() {
		this.bindEvents(), this.preload()
	},
	bindEvents: function() {
		var a = this,
			b = $(this._pptSelectors);
		b.each(function() {
			$(this).on("ppt", function() {
				a.elePPT($(this))
			})
		}), $(window).on("scroll", function() {
			a.scrollPersective(), a.lastScroll = $(this).scrollTop()
		}), $("nav a.scroll").on("click", function(a) {
			var b = $(this).attr("href"),
				c = $(b),
				d = c.offset().top;
			$("html, body").animate({
				scrollTop: d
			}, 1e3), a.preventDefault()
		})
	},
	preload: function() {
		var a = $(".loading"),
			b = screen.availWidth,
			c = this,
			d = c.preloadFiles,
			e = [];
		b > 1440 ? (e = d.s1920, b = 1920) : 1024 >= b ? (e = d.s1024, b = 1024) : (e = d.s1440, b = 1440), this.screenWidth = b, new Preload({
			fileArr: e,
			oneLoaded: function() {
				var b = this.percent;
				a.css("width", b + "%"), 100 === b && c.loadComplete()
			}
		})
	},
	loadComplete: function() {
		var a = $("header"),
			b = $(".loading_bar"),
			c = $(".logo"),
			d = 80,
			e = $(window).height(),
			f = d / e * 100 + "%",
			g = this;
		$("body").addClass("s" + this.screenWidth), a.css("height", f), b.css("opacity", 0), c.css("margin", "-35px 0 0 -76px"), setTimeout(function() {
			$("body").removeClass("loading"), a.css("height", ""), b.css("opacity", ""), c.css("margin", ""), g.initPerpective()
		}, 1500)
	},
	initPerpective: function() {
		$("#about_bingo").perpectiveMouse({
			selectors: [".draw"],
			maxRange: 100,
			timeStep: 25
		})
	},
	scrollPersective: function() {
		var a = $.scrollAt(this._pptSelectors, 10);
		if ("top" !== a[0]) for (var b in a) a[b].trigger("ppt")
	},
	elePPT: function(a) {
		var b = $(window).scrollTop() - (this.lastScroll || 0),
			c = a.find(".ppt");
		c.each(function() {
			var a = $(this),
				c = parseFloat(a.css("top")),
				d = parseFloat(a.data("perpective-scroll"));
			a.css("top", c + b * d)
		})
	}
}, $(function() {
	var a = new Bingo;
	a.init()
});
var Preload = function(a) {
		this.fileArr = a.fileArr || [], this.completeCB = a.loadComplete, this.loadedCB = a.oneLoaded, this.init()
	};
Preload.prototype = {
	defaultOpt: {
		fileArr: [],
		completeCB: function() {}
	},
	percent: 0,
	numLoaded: 0,
	num: 0,
	init: function() {
		this.num = this.fileArr.length, 0 !== this.num && this.request()
	},
	request: function() {
		for (var a = this.fileArr; a.length > 0;) {
			var b = a.pop();
			this.loadOne(b)
		}
	},
	loadOne: function(a) {
		var b = new Image,
			c = this,
			d = this.num,
			e = BINGO929 ? BINGO929.staticURI || "" : "";
		a = e + a, b.onload = function() {
			var b = c.numLoaded += 1;
			c.percent = parseInt(b / d * 100), c.loadedCB(a), b === c.num && c.complete()
		}, b.onerror = function() {
			console.log('============================Load file error!src="' + a + '"')
		}, b.src = a
	},
	complete: function() {}
}, $.fn.extend({
	perpectiveMouse: function() {
		function a() {
			l = {
				x: i.width() / 2,
				y: i.height() / 2
			}, f = d(), f && (i.on("mousemove", function(a) {
				e(a)
			}), i.on("mouseenter", function() {}), i.on("mouseleave", function() {}), f.on("move", function() {
				b.call(this)
			}))
		}
		function b() {
			var a = $(this),
				b = [a, a.data("posLeft"), a.data("posTop")];
			m.push(b), m.length > 1 || c()
		}
		function c() {
			if (m.length) {
				var a = m.shift();
				a[0].css({
					left: a[1],
					top: a[2]
				}), arguments.callee()
			}
		}
		function d() {
			for (var a, b = g.selectors, c = ""; b.length;) {
				c = b.pop();
				var d = i.find(c);
				d && (a = a ? a.add(d) : d)
			}
			return a.each(function() {
				var a = $(this);
				a.data("maxRange", Number(a.data("perpective-mouse")) * g.maxRange), a.data("posLeft", parseFloat(a.css("left"))), a.data("posTop", parseFloat(a.css("top")))
			}), a
		}
		function e(a) {
			var b = {
				x: a.offsetX || a.pageX - i.offset().left,
				y: a.offsetY || a.pageY - i.offset().top
			},
				c = {
					perX: (b.x - l.x) / j,
					perY: (b.y - l.y) / k
				};
			f.each(function() {
				var a = $(this),
					b = a.data("posLeft"),
					d = a.data("posTop"),
					e = a.data("maxRange"),
					f = c.perX * e,
					g = c.perY * e;
				a.data("posTop", d + g), a.data("posLeft", b + f)
			}), f.trigger("move", c), l = b
		}
		var f, g = "object" == typeof arguments[0] ? arguments[0] : {},
			h = {
				selectors: [],
				maxRange: 500,
				timeStep: 25
			},
			i = this,
			j = this.width(),
			k = this.height(),
			l = {
				x: 0,
				y: 0
			},
			m = [];
		g = $.extend(h, g), g.timeStep, a()
	}
}), jQuery.extend({
	scrollAt: function(a, b) {
		if (a) {
			var c = jQuery,
				d = c(a),
				e = c(window).height(),
				f = c(window).scrollTop(),
				g = f + e,
				h = [],
				i = [],
				b = b ? b : 200;
			if (0 === d.length) return [];
			d.each(function() {
				var a = c(this).offset().top,
					b = c(this).height();
				h.push({
					top: a,
					bottom: a + b,
					height: b
				})
			});
			for (var j = 0, k = h.length; k > j; j++)(g - h[j].top > b && h[j].top >= f || h[j].bottom - f > b && h[j].bottom <= g || h[j].top <= f && h[j].bottom >= g) && i.push(c(d[j]));
			return 0 === i.length && (h[0].top >= g - b ? i = ["top"] : h[h.length - 1].bottom <= f + b && (i = ["bottom"])), i
		}
	}
});