/** File : /skins/UnivAngers-v2/resources/assets/js/hs.core.js */

document_currentScript = (function () { a = document.createElement('script'); a.src = 'https://www.univ-angers.fr/skins/UnivAngers-v2/resources/assets/js/hs.core.js'; return a; })(); try {
    (function ($) {
        $.HSCore = {
            init: function () { $(document).ready(function (e) { $('[data-toggle\x3d"tooltip"]').tooltip(); if ($("[data-bg-img-src]").length) $.HSCore.helpers.bgImage($("[data-bg-img-src]")); $.HSCore.helpers.extendjQuery(); $.HSCore.helpers.detectIE(); $.HSCore.helpers.bootstrapNavOptions.init() }); $(window).on("load", function (e) { }) }, components: {}, helpers: {
                Math: {
                    getRandomValueFromRange: function (startPoint, endPoint, fixed) {
                        var fixedInner = fixed ? fixed : false; Math.random(); return fixedInner ? Math.random() *
                            (endPoint - startPoint) + startPoint : Math.floor(Math.random() * (endPoint - startPoint + 1)) + startPoint
                    }
                }, bgImage: function (collection) { if (!collection || !collection.length) return; return collection.each(function (i, el) { var $el = $(el), bgImageSrc = $el.data("bg-img-src"); if (bgImageSrc) $el.css("background-image", "url(" + bgImageSrc + ")") }) }, extendjQuery: function () {
                    $.fn.extend({
                        imagesLoaded: function () {
                            var $imgs = this.find('img[src!\x3d""]'); if (!$imgs.length) return $.Deferred().resolve().promise(); var dfds = []; $imgs.each(function () {
                                var dfd =
                                    $.Deferred(); dfds.push(dfd); var img = new Image; img.onload = function () { dfd.resolve() }; img.onerror = function () { dfd.resolve() }; img.src = this.src
                            }); return $.when.apply($, dfds)
                        }
                    })
                }, detectIE: function () {
                    var ua = window.navigator.userAgent; var trident = ua.indexOf("Trident/"); if (trident > 0) { var rv = ua.indexOf("rv:"); var ieV = parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10); document.querySelector("body").className += " IE" } var edge = ua.indexOf("Edge/"); if (edge > 0) {
                        var ieV = parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)),
                            10); document.querySelector("body").className += " IE"
                    } return false
                }, bootstrapNavOptions: {
                    init: function () { this.mobileHideOnScroll() }, mobileHideOnScroll: function () {
                        var $collection = $(".navbar"); if (!$collection.length) return; var $w = $(window), breakpointsMap = { "sm": 576, "md": 768, "lg": 992, "xl": 1200 }; $("body").on("click.HSMobileHideOnScroll", ".navbar-toggler", function (e) { var $navbar = $(this).closest(".navbar"); if ($navbar.length) $navbar.data("mobile-menu-scroll-position", $w.scrollTop()); e.preventDefault() }); $w.on("scroll.HSMobileHideOnScroll",
                            function (e) {
                                $collection.each(function (i, el) {
                                    var $this = $(el), $toggler, $nav, offset, $hamburgers, breakpoint; if ($this.hasClass("navbar-expand-xl")) breakpoint = breakpointsMap["xl"]; else if ($this.hasClass("navbar-expand-lg")) breakpoint = breakpointsMap["lg"]; else if ($this.hasClass("navbar-expand-md")) breakpoint = breakpointsMap["md"]; else if ($this.hasClass("navbar-expand-xs")) breakpoint = breakpointsMap["xs"]; if ($w.width() > breakpoint) return; $toggler = $this.find(".navbar-toggler"); $nav = $this.find(".navbar-collapse");
                                    if (!$nav.data("mobile-scroll-hide")) return; if ($nav.length) { offset = $this.data("mobile-menu-scroll-position"); if (Math.abs($w.scrollTop() - offset) > 40 && $nav.hasClass("show")) { $toggler.trigger("click"); $hamburgers = $toggler.find(".is-active"); if ($hamburgers.length) $hamburgers.removeClass("is-active") } }
                                })
                            })
                    }
                }
            }, settings: { rtl: false }
        }; $.HSCore.init()
    })(jQuery);
} catch (e) { console.error("/skins/UnivAngers-v2/resources/assets/js/hs.core.js\n", e) }

/** File : /skins/UnivAngers-v2/resources/assets/js/components/hs.header.js */
document_currentScript = (function () { a = document.createElement('script'); a.src = 'https://www.univ-angers.fr/skins/UnivAngers-v2/resources/assets/js/components/hs.header.js'; return a; })(); try {
    (function ($) {
        $.HSCore.components.HSHeader = {
            _baseConfig: { headerFixMoment: 0, headerFixEffect: "slide", breakpointsMap: { "md": 768, "sm": 576, "lg": 992, "xl": 1200 } }, init: function (element) {
                if (!element || element.length !== 1 || element.data("HSHeader")) return; var self = this; this.element = element; this.config = $.extend(true, {}, this._baseConfig, element.data()); this.observers = this._detectObservers(); this.fixMediaDifference(this.element); this.element.data("HSHeader", new HSHeader(this.element, this.config, this.observers)); $(window).on("scroll.uHeader",
                    function (e) { element.data("HSHeader").notify() }).on("resize.uHeader", function (e) { if (self.resizeTimeOutId) clearTimeout(self.resizeTimeOutId); self.resizeTimeOutId = setTimeout(function () { element.data("HSHeader").checkViewport().update() }, 100) }).trigger("scroll.uHeader"); return this.element
            }, _detectObservers: function () {
                if (!this.element || !this.element.length) return; var observers = { "xs": [], "sm": [], "md": [], "lg": [], "xl": [] }; if (this.element.hasClass("u-header--has-hidden-element")) observers["xs"].push(new HSHeaderHasHiddenElement(this.element));
                if (this.element.hasClass("u-header--sticky-top")) { if (this.element.hasClass("u-header--show-hide")) observers["xs"].push(new HSHeaderMomentShowHideObserver(this.element)); else if (this.element.hasClass("u-header--toggle-section")) observers["xs"].push(new HSHeaderHideSectionObserver(this.element)); if (this.element.hasClass("u-header--change-logo")) observers["xs"].push(new HSHeaderChangeLogoObserver(this.element)); if (this.element.hasClass("u-header--change-appearance")) observers["xs"].push(new HSHeaderChangeAppearanceObserver(this.element)) } if (this.element.hasClass("u-header--floating")) observers["xs"].push(new HSHeaderFloatingObserver(this.element));
                if (this.element.hasClass("u-header--invulnerable")) observers["xs"].push(new HSHeaderWithoutBehaviorObserver(this.element)); if (this.element.hasClass("u-header--sticky-bottom")) { if (this.element.hasClass("u-header--change-appearance")) observers["xs"].push(new HSHeaderChangeAppearanceObserver(this.element)); if (this.element.hasClass("u-header--change-logo")) observers["xs"].push(new HSHeaderChangeLogoObserver(this.element)) } if (this.element.hasClass("u-header--abs-top") || this.element.hasClass("u-header--static")) {
                    if (this.element.hasClass("u-header--show-hide")) observers["xs"].push(new HSHeaderShowHideObserver(this.element));
                    if (this.element.hasClass("u-header--change-logo")) observers["xs"].push(new HSHeaderChangeLogoObserver(this.element)); if (this.element.hasClass("u-header--change-appearance")) observers["xs"].push(new HSHeaderChangeAppearanceObserver(this.element))
                } if (this.element.hasClass("u-header--abs-bottom") || this.element.hasClass("u-header--abs-top-2nd-screen")) {
                    observers["xs"].push(new HSHeaderStickObserver(this.element)); if (this.element.hasClass("u-header--change-appearance")) observers["xs"].push(new HSHeaderChangeAppearanceObserver(this.element,
                        { fixPointSelf: true })); if (this.element.hasClass("u-header--change-logo")) observers["xs"].push(new HSHeaderChangeLogoObserver(this.element, { fixPointSelf: true }))
                } if (this.element.hasClass("u-header--has-hidden-element--sm")) observers["sm"].push(new HSHeaderHasHiddenElement(this.element)); if (this.element.hasClass("u-header--sticky-top--sm")) {
                    if (this.element.hasClass("u-header--show-hide--sm")) observers["sm"].push(new HSHeaderMomentShowHideObserver(this.element)); else if (this.element.hasClass("u-header--toggle-section--sm")) observers["sm"].push(new HSHeaderHideSectionObserver(this.element));
                    if (this.element.hasClass("u-header--change-logo--sm")) observers["sm"].push(new HSHeaderChangeLogoObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--sm")) observers["sm"].push(new HSHeaderChangeAppearanceObserver(this.element))
                } if (this.element.hasClass("u-header--floating--sm")) observers["sm"].push(new HSHeaderFloatingObserver(this.element)); if (this.element.hasClass("u-header--invulnerable--sm")) observers["sm"].push(new HSHeaderWithoutBehaviorObserver(this.element)); if (this.element.hasClass("u-header--sticky-bottom--sm")) {
                    if (this.element.hasClass("u-header--change-appearance--sm")) observers["sm"].push(new HSHeaderChangeAppearanceObserver(this.element));
                    if (this.element.hasClass("u-header--change-logo--sm")) observers["sm"].push(new HSHeaderChangeLogoObserver(this.element))
                } if (this.element.hasClass("u-header--abs-top--sm") || this.element.hasClass("u-header--static--sm")) { if (this.element.hasClass("u-header--show-hide--sm")) observers["sm"].push(new HSHeaderShowHideObserver(this.element)); if (this.element.hasClass("u-header--change-logo--sm")) observers["sm"].push(new HSHeaderChangeLogoObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--sm")) observers["sm"].push(new HSHeaderChangeAppearanceObserver(this.element)) } if (this.element.hasClass("u-header--abs-bottom--sm") ||
                    this.element.hasClass("u-header--abs-top-2nd-screen--sm")) { observers["sm"].push(new HSHeaderStickObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--sm")) observers["sm"].push(new HSHeaderChangeAppearanceObserver(this.element, { fixPointSelf: true })); if (this.element.hasClass("u-header--change-logo--sm")) observers["sm"].push(new HSHeaderChangeLogoObserver(this.element, { fixPointSelf: true })) } if (this.element.hasClass("u-header--has-hidden-element--md")) observers["md"].push(new HSHeaderHasHiddenElement(this.element));
                if (this.element.hasClass("u-header--sticky-top--md")) { if (this.element.hasClass("u-header--show-hide--md")) observers["md"].push(new HSHeaderMomentShowHideObserver(this.element)); else if (this.element.hasClass("u-header--toggle-section--md")) observers["md"].push(new HSHeaderHideSectionObserver(this.element)); if (this.element.hasClass("u-header--change-logo--md")) observers["md"].push(new HSHeaderChangeLogoObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--md")) observers["md"].push(new HSHeaderChangeAppearanceObserver(this.element)) } if (this.element.hasClass("u-header--floating--md")) observers["md"].push(new HSHeaderFloatingObserver(this.element));
                if (this.element.hasClass("u-header--invulnerable--md")) observers["md"].push(new HSHeaderWithoutBehaviorObserver(this.element)); if (this.element.hasClass("u-header--sticky-bottom--md")) { if (this.element.hasClass("u-header--change-appearance--md")) observers["md"].push(new HSHeaderChangeAppearanceObserver(this.element)); if (this.element.hasClass("u-header--change-logo--md")) observers["md"].push(new HSHeaderChangeLogoObserver(this.element)) } if (this.element.hasClass("u-header--abs-top--md") || this.element.hasClass("u-header--static--md")) {
                    if (this.element.hasClass("u-header--show-hide--md")) observers["md"].push(new HSHeaderShowHideObserver(this.element));
                    if (this.element.hasClass("u-header--change-logo--md")) observers["md"].push(new HSHeaderChangeLogoObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--md")) observers["md"].push(new HSHeaderChangeAppearanceObserver(this.element))
                } if (this.element.hasClass("u-header--abs-bottom--md") || this.element.hasClass("u-header--abs-top-2nd-screen--md")) {
                    observers["md"].push(new HSHeaderStickObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--md")) observers["md"].push(new HSHeaderChangeAppearanceObserver(this.element,
                        { fixPointSelf: true })); if (this.element.hasClass("u-header--change-logo--md")) observers["md"].push(new HSHeaderChangeLogoObserver(this.element, { fixPointSelf: true }))
                } if (this.element.hasClass("u-header--has-hidden-element--lg")) observers["lg"].push(new HSHeaderHasHiddenElement(this.element)); if (this.element.hasClass("u-header--sticky-top--lg")) {
                    if (this.element.hasClass("u-header--show-hide--lg")) observers["lg"].push(new HSHeaderMomentShowHideObserver(this.element)); else if (this.element.hasClass("u-header--toggle-section--lg")) observers["lg"].push(new HSHeaderHideSectionObserver(this.element));
                    if (this.element.hasClass("u-header--change-logo--lg")) observers["lg"].push(new HSHeaderChangeLogoObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--lg")) observers["lg"].push(new HSHeaderChangeAppearanceObserver(this.element))
                } if (this.element.hasClass("u-header--floating--lg")) observers["lg"].push(new HSHeaderFloatingObserver(this.element)); if (this.element.hasClass("u-header--invulnerable--lg")) observers["lg"].push(new HSHeaderWithoutBehaviorObserver(this.element)); if (this.element.hasClass("u-header--sticky-bottom--lg")) {
                    if (this.element.hasClass("u-header--change-appearance--lg")) observers["lg"].push(new HSHeaderChangeAppearanceObserver(this.element));
                    if (this.element.hasClass("u-header--change-logo--lg")) observers["lg"].push(new HSHeaderChangeLogoObserver(this.element))
                } if (this.element.hasClass("u-header--abs-top--lg") || this.element.hasClass("u-header--static--lg")) { if (this.element.hasClass("u-header--show-hide--lg")) observers["lg"].push(new HSHeaderShowHideObserver(this.element)); if (this.element.hasClass("u-header--change-logo--lg")) observers["lg"].push(new HSHeaderChangeLogoObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--lg")) observers["lg"].push(new HSHeaderChangeAppearanceObserver(this.element)) } if (this.element.hasClass("u-header--abs-bottom--lg") ||
                    this.element.hasClass("u-header--abs-top-2nd-screen--lg")) { observers["lg"].push(new HSHeaderStickObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--lg")) observers["lg"].push(new HSHeaderChangeAppearanceObserver(this.element, { fixPointSelf: true })); if (this.element.hasClass("u-header--change-logo--lg")) observers["lg"].push(new HSHeaderChangeLogoObserver(this.element, { fixPointSelf: true })) } if (this.element.hasClass("u-header--has-hidden-element--xl")) observers["xl"].push(new HSHeaderHasHiddenElement(this.element));
                if (this.element.hasClass("u-header--sticky-top--xl")) { if (this.element.hasClass("u-header--show-hide--xl")) observers["xl"].push(new HSHeaderMomentShowHideObserver(this.element)); else if (this.element.hasClass("u-header--toggle-section--xl")) observers["xl"].push(new HSHeaderHideSectionObserver(this.element)); if (this.element.hasClass("u-header--change-logo--xl")) observers["xl"].push(new HSHeaderChangeLogoObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--xl")) observers["xl"].push(new HSHeaderChangeAppearanceObserver(this.element)) } if (this.element.hasClass("u-header--floating--xl")) observers["xl"].push(new HSHeaderFloatingObserver(this.element));
                if (this.element.hasClass("u-header--invulnerable--xl")) observers["xl"].push(new HSHeaderWithoutBehaviorObserver(this.element)); if (this.element.hasClass("u-header--sticky-bottom--xl")) { if (this.element.hasClass("u-header--change-appearance--xl")) observers["xl"].push(new HSHeaderChangeAppearanceObserver(this.element)); if (this.element.hasClass("u-header--change-logo--xl")) observers["xl"].push(new HSHeaderChangeLogoObserver(this.element)) } if (this.element.hasClass("u-header--abs-top--xl") || this.element.hasClass("u-header--static--xl")) {
                    if (this.element.hasClass("u-header--show-hide--xl")) observers["xl"].push(new HSHeaderShowHideObserver(this.element));
                    if (this.element.hasClass("u-header--change-logo--xl")) observers["xl"].push(new HSHeaderChangeLogoObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--xl")) observers["xl"].push(new HSHeaderChangeAppearanceObserver(this.element))
                } if (this.element.hasClass("u-header--abs-bottom--xl") || this.element.hasClass("u-header--abs-top-2nd-screen--xl")) {
                    observers["xl"].push(new HSHeaderStickObserver(this.element)); if (this.element.hasClass("u-header--change-appearance--xl")) observers["xl"].push(new HSHeaderChangeAppearanceObserver(this.element,
                        { fixPointSelf: true })); if (this.element.hasClass("u-header--change-logo--xl")) observers["xl"].push(new HSHeaderChangeLogoObserver(this.element, { fixPointSelf: true }))
                } return observers
            }, fixMediaDifference: function (element) {
                if (!element || !element.length || !element.filter('[class*\x3d"u-header--side"]').length) return; var toggleable; if (element.hasClass("u-header--side-left--xl") || element.hasClass("u-header--side-right--xl")) { toggleable = element.find(".navbar-expand-xl"); if (toggleable.length) toggleable.removeClass("navbar-expand-xl").addClass("navbar-expand-lg") } else if (element.hasClass("u-header--side-left--lg") ||
                    element.hasClass("u-header--side-right--lg")) { toggleable = element.find(".navbar-expand-lg"); if (toggleable.length) toggleable.removeClass("navbar-expand-lg").addClass("navbar-expand-md") } else if (element.hasClass("u-header--side-left--md") || element.hasClass("u-header--side-right--md")) { toggleable = element.find(".navbar-expand-md"); if (toggleable.length) toggleable.removeClass("navbar-expand-md").addClass("navbar-expand-sm") } else if (element.hasClass("u-header--side-left--sm") || element.hasClass("u-header--side-right--sm")) {
                        toggleable =
                            element.find(".navbar-expand-sm"); if (toggleable.length) toggleable.removeClass("navbar-expand-sm").addClass("navbar-expand")
                    }
            }
        }; function HSHeader(element, config, observers) { if (!element || !element.length) return; this.element = element; this.config = config; this.observers = observers && $.isPlainObject(observers) ? observers : {}; this.viewport = "xs"; this.checkViewport() } HSHeader.prototype.checkViewport = function () {
            var $w = $(window); if ($w.width() > this.config.breakpointsMap["sm"] && this.observers["sm"].length) {
                this.prevViewport =
                    this.viewport; this.viewport = "sm"; return this
            } if ($w.width() > this.config.breakpointsMap["md"] && this.observers["md"].length) { this.prevViewport = this.viewport; this.viewport = "md"; return this } if ($w.width() > this.config.breakpointsMap["lg"] && this.observers["lg"].length) { this.prevViewport = this.viewport; this.viewport = "lg"; return this } if ($w.width() > this.config.breakpointsMap["xl"] && this.observers["xl"].length) { this.prevViewport = this.viewport; this.viewport = "xl"; return this } if (this.prevViewport) this.prevViewport =
                this.viewport; this.viewport = "xs"; return this
        }; HSHeader.prototype.notify = function () { if (this.prevViewport) { this.observers[this.prevViewport].forEach(function (observer) { observer.destroy() }); this.prevViewport = null } this.observers[this.viewport].forEach(function (observer) { observer.check() }); return this }; HSHeader.prototype.update = function () {
            for (var viewport in this.observers) this.observers[viewport].forEach(function (observer) { observer.destroy() }); this.prevViewport = null; this.observers[this.viewport].forEach(function (observer) { observer.reinit() });
            return this
        }; function HSAbstractObserver(element) { if (!element || !element.length) return; this.element = element; this.defaultState = true; this.reinit = function () { this.destroy().init().check() }; return true } function HSHeaderStickObserver(element) { if (!HSAbstractObserver.call(this, element)) return; this.init() } HSHeaderStickObserver.prototype.init = function () { this.defaultState = true; this.offset = this.element.offset().top; return this }; HSHeaderStickObserver.prototype.destroy = function () { this.toDefaultState(); return this };
        HSHeaderStickObserver.prototype.check = function () { var $w = $(window), docScrolled = $w.scrollTop(); if (docScrolled > this.offset && this.defaultState) this.changeState(); else if (docScrolled < this.offset && !this.defaultState) this.toDefaultState(); return this }; HSHeaderStickObserver.prototype.changeState = function () { this.element.addClass("js-header-fix-moment"); this.defaultState = !this.defaultState; return this }; HSHeaderStickObserver.prototype.toDefaultState = function () {
            this.element.removeClass("js-header-fix-moment");
            this.defaultState = !this.defaultState; return this
        }; function HSHeaderMomentShowHideObserver(element) { if (!HSAbstractObserver.call(this, element)) return; this.init() } HSHeaderMomentShowHideObserver.prototype.init = function () {
            this.direction = "down"; this.delta = 0; this.defaultState = true; this.offset = isFinite(this.element.data("header-fix-moment")) && this.element.data("header-fix-moment") != 0 ? this.element.data("header-fix-moment") : 5; this.effect = this.element.data("header-fix-effect") ? this.element.data("header-fix-effect") :
                "show-hide"; return this
        }; HSHeaderMomentShowHideObserver.prototype.destroy = function () { this.toDefaultState(); return this }; HSHeaderMomentShowHideObserver.prototype.checkDirection = function () { if ($(window).scrollTop() > this.delta) this.direction = "down"; else this.direction = "up"; this.delta = $(window).scrollTop(); return this }; HSHeaderMomentShowHideObserver.prototype.toDefaultState = function () {
            switch (this.effect) {
                case "slide": this.element.removeClass("u-header--moved-up"); break; case "fade": this.element.removeClass("u-header--faded");
                    break; default: this.element.removeClass("u-header--invisible")
            }this.defaultState = !this.defaultState; return this
        }; HSHeaderMomentShowHideObserver.prototype.changeState = function () { switch (this.effect) { case "slide": this.element.addClass("u-header--moved-up"); break; case "fade": this.element.addClass("u-header--faded"); break; default: this.element.addClass("u-header--invisible") }this.defaultState = !this.defaultState; return this }; HSHeaderMomentShowHideObserver.prototype.check = function () {
            var docScrolled = $(window).scrollTop();
            this.checkDirection(); if (docScrolled >= this.offset && this.defaultState && this.direction == "down") this.changeState(); else if (!this.defaultState && this.direction == "up") this.toDefaultState(); return this
        }; function HSHeaderShowHideObserver(element) { if (!HSAbstractObserver.call(this, element)) return; this.init() } HSHeaderShowHideObserver.prototype.init = function () {
            if (!this.defaultState && $(window).scrollTop() > this.offset) return this; this.defaultState = true; this.transitionDuration = parseFloat(getComputedStyle(this.element.get(0))["transition-duration"],
                10) * 1E3; this.offset = isFinite(this.element.data("header-fix-moment")) && this.element.data("header-fix-moment") > this.element.outerHeight() ? this.element.data("header-fix-moment") : this.element.outerHeight() + 100; this.effect = this.element.data("header-fix-effect") ? this.element.data("header-fix-effect") : "show-hide"; return this
        }; HSHeaderShowHideObserver.prototype.destroy = function () {
            if (!this.defaultState && $(window).scrollTop() > this.offset) return this; this.element.removeClass("u-header--untransitioned"); this._removeCap();
            return this
        }; HSHeaderShowHideObserver.prototype._insertCap = function () { this.element.addClass("js-header-fix-moment u-header--untransitioned"); if (this.element.hasClass("u-header--static")) $("html").css("padding-top", this.element.outerHeight()); switch (this.effect) { case "fade": this.element.addClass("u-header--faded"); break; case "slide": this.element.addClass("u-header--moved-up"); break; default: this.element.addClass("u-header--invisible") }this.capInserted = true }; HSHeaderShowHideObserver.prototype._removeCap =
            function () { var self = this; this.element.removeClass("js-header-fix-moment"); if (this.element.hasClass("u-header--static")) $("html").css("padding-top", 0); if (this.removeCapTimeOutId) clearTimeout(this.removeCapTimeOutId); this.removeCapTimeOutId = setTimeout(function () { self.element.removeClass("u-header--moved-up u-header--faded u-header--invisible") }, 10); this.capInserted = false }; HSHeaderShowHideObserver.prototype.check = function () {
                var $w = $(window); if ($w.scrollTop() > this.element.outerHeight() && !this.capInserted) this._insertCap();
                else if ($w.scrollTop() <= this.element.outerHeight() && this.capInserted) this._removeCap(); if ($w.scrollTop() > this.offset && this.defaultState) this.changeState(); else if ($w.scrollTop() <= this.offset && !this.defaultState) this.toDefaultState()
            }; HSHeaderShowHideObserver.prototype.changeState = function () {
                this.element.removeClass("u-header--untransitioned"); if (this.animationTimeoutId) clearTimeout(this.animationTimeoutId); switch (this.effect) {
                    case "fade": this.element.removeClass("u-header--faded"); break; case "slide": this.element.removeClass("u-header--moved-up");
                        break; default: this.element.removeClass("u-header--invisible")
                }this.defaultState = !this.defaultState
            }; HSHeaderShowHideObserver.prototype.toDefaultState = function () {
                var self = this; this.animationTimeoutId = setTimeout(function () { self.element.addClass("u-header--untransitioned") }, this.transitionDuration); switch (this.effect) { case "fade": this.element.addClass("u-header--faded"); break; case "slide": this.element.addClass("u-header--moved-up"); break; default: this.element.addClass("u-header--invisible") }this.defaultState =
                    !this.defaultState
            }; function HSHeaderChangeLogoObserver(element, config) { if (!HSAbstractObserver.call(this, element)) return; this.config = { fixPointSelf: false }; if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config); this.init() } HSHeaderChangeLogoObserver.prototype.init = function () {
                if (this.element.hasClass("js-header-fix-moment")) { this.hasFixedClass = true; this.element.removeClass("js-header-fix-moment") } if (this.config.fixPointSelf) this.offset = this.element.offset().top; else this.offset =
                    isFinite(this.element.data("header-fix-moment")) ? this.element.data("header-fix-moment") : 0; if (this.hasFixedClass) { this.hasFixedClass = false; this.element.addClass("js-header-fix-moment") } this.imgs = this.element.find(".u-header__logo-img"); this.defaultState = true; this.mainLogo = this.imgs.filter(".u-header__logo-img--main"); this.additionalLogo = this.imgs.not(".u-header__logo-img--main"); if (!this.imgs.length) return this; return this
            }; HSHeaderChangeLogoObserver.prototype.destroy = function () {
                this.toDefaultState();
                return this
            }; HSHeaderChangeLogoObserver.prototype.check = function () { var $w = $(window); if (!this.imgs.length) return this; if ($w.scrollTop() > this.offset && this.defaultState) this.changeState(); else if ($w.scrollTop() <= this.offset && !this.defaultState) this.toDefaultState(); return this }; HSHeaderChangeLogoObserver.prototype.changeState = function () {
                if (this.mainLogo.length) this.mainLogo.removeClass("u-header__logo-img--main"); if (this.additionalLogo.length) this.additionalLogo.addClass("u-header__logo-img--main");
                this.defaultState = !this.defaultState; return this
            }; HSHeaderChangeLogoObserver.prototype.toDefaultState = function () { if (this.mainLogo.length) this.mainLogo.addClass("u-header__logo-img--main"); if (this.additionalLogo.length) this.additionalLogo.removeClass("u-header__logo-img--main"); this.defaultState = !this.defaultState; return this }; function HSHeaderHideSectionObserver(element) { if (!HSAbstractObserver.call(this, element)) return; this.init() } HSHeaderHideSectionObserver.prototype.init = function () {
                this.offset =
                    isFinite(this.element.data("header-fix-moment")) ? this.element.data("header-fix-moment") : 5; this.section = this.element.find(".u-header__section--hidden"); this.defaultState = true; this.sectionHeight = this.section.length ? this.section.outerHeight() : 0; return this
            }; HSHeaderHideSectionObserver.prototype.destroy = function () { if (this.section.length) this.element.css({ "margin-top": 0 }); return this }; HSHeaderHideSectionObserver.prototype.check = function () {
                if (!this.section.length) return this; var $w = $(window), docScrolled =
                    $w.scrollTop(); if (docScrolled > this.offset && this.defaultState) this.changeState(); else if (docScrolled <= this.offset && !this.defaultState) this.toDefaultState(); return this
            }; HSHeaderHideSectionObserver.prototype.changeState = function () { var self = this; this.element.stop().animate({ "margin-top": self.sectionHeight * -1 - 1 }); this.defaultState = !this.defaultState; return this }; HSHeaderHideSectionObserver.prototype.toDefaultState = function () {
                this.element.stop().animate({ "margin-top": 0 }); this.defaultState = !this.defaultState;
                return this
            }; function HSHeaderChangeAppearanceObserver(element, config) { if (!HSAbstractObserver.call(this, element)) return; this.config = { fixPointSelf: false }; if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config); this.init() } HSHeaderChangeAppearanceObserver.prototype.init = function () {
                if (this.element.hasClass("js-header-fix-moment")) { this.hasFixedClass = true; this.element.removeClass("js-header-fix-moment") } if (this.config.fixPointSelf) this.offset = this.element.offset().top; else this.offset =
                    isFinite(this.element.data("header-fix-moment")) ? this.element.data("header-fix-moment") : 5; if (this.hasFixedClass) { this.hasFixedClass = false; this.element.addClass("js-header-fix-moment") } this.sections = this.element.find("[data-header-fix-moment-classes]"); this.defaultState = true; return this
            }; HSHeaderChangeAppearanceObserver.prototype.destroy = function () { this.toDefaultState(); return this }; HSHeaderChangeAppearanceObserver.prototype.check = function () {
                if (!this.sections.length) return this; var $w = $(window), docScrolled =
                    $w.scrollTop(); if (docScrolled > this.offset && this.defaultState) this.changeState(); else if (docScrolled <= this.offset && !this.defaultState) this.toDefaultState(); return this
            }; HSHeaderChangeAppearanceObserver.prototype.changeState = function () {
                this.sections.each(function (i, el) { var $this = $(el), classes = $this.data("header-fix-moment-classes"), exclude = $this.data("header-fix-moment-exclude"); if (!classes && !exclude) return; $this.addClass(classes + " js-header-change-moment"); $this.removeClass(exclude) }); this.defaultState =
                    !this.defaultState; return this
            }; HSHeaderChangeAppearanceObserver.prototype.toDefaultState = function () { this.sections.each(function (i, el) { var $this = $(el), classes = $this.data("header-fix-moment-classes"), exclude = $this.data("header-fix-moment-exclude"); if (!classes && !exclude) return; $this.removeClass(classes + " js-header-change-moment"); $this.addClass(exclude) }); this.defaultState = !this.defaultState; return this }; function HSHeaderHasHiddenElement(element, config) {
                if (!HSAbstractObserver.call(this, element)) return;
                this.config = { animated: true }; if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config); this.init()
            } HSHeaderHasHiddenElement.prototype.init = function () { this.offset = isFinite(this.element.data("header-fix-moment")) ? this.element.data("header-fix-moment") : 5; this.elements = this.element.find(".u-header--hidden-element"); this.defaultState = true; return this }; HSHeaderHasHiddenElement.prototype.destroy = function () { this.toDefaultState(); return this }; HSHeaderHasHiddenElement.prototype.check =
                function () { if (!this.elements.length) return this; var $w = $(window), docScrolled = $w.scrollTop(); if (docScrolled > this.offset && this.defaultState) this.changeState(); else if (docScrolled <= this.offset && !this.defaultState) this.toDefaultState(); return this }; HSHeaderHasHiddenElement.prototype.changeState = function () { if (this.config.animated) this.elements.stop().slideUp(); else this.elements.hide(); this.defaultState = !this.defaultState; return this }; HSHeaderHasHiddenElement.prototype.toDefaultState = function () {
                    if (this.config.animated) this.elements.stop().slideDown();
                    else this.elements.show(); this.defaultState = !this.defaultState; return this
                }; function HSHeaderFloatingObserver(element, config) { if (!HSAbstractObserver.call(this, element)) return; this.config = config && $.isPlainObject(config) ? $.extend(true, {}, this.config, config) : {}; this.init() } HSHeaderFloatingObserver.prototype.init = function () { this.offset = this.element.offset().top; this.sections = this.element.find(".u-header__section"); this.defaultState = true; return this }; HSHeaderFloatingObserver.prototype.destroy = function () {
                    this.toDefaultState();
                    return this
                }; HSHeaderFloatingObserver.prototype.check = function () { var $w = $(window), docScrolled = $w.scrollTop(); if (docScrolled > this.offset && this.defaultState) this.changeState(); else if (docScrolled <= this.offset && !this.defaultState) this.toDefaultState(); return this }; HSHeaderFloatingObserver.prototype.changeState = function () {
                    this.element.addClass("js-header-fix-moment").addClass(this.element.data("header-fix-moment-classes")).removeClass(this.element.data("header-fix-moment-exclude")); if (this.sections.length) this.sections.each(function (i,
                        el) { var $section = $(el); $section.addClass($section.data("header-fix-moment-classes")).removeClass($section.data("header-fix-moment-exclude")) }); this.defaultState = !this.defaultState; return this
                }; HSHeaderFloatingObserver.prototype.toDefaultState = function () {
                    this.element.removeClass("js-header-fix-moment").removeClass(this.element.data("header-fix-moment-classes")).addClass(this.element.data("header-fix-moment-exclude")); if (this.sections.length) this.sections.each(function (i, el) { var $section = $(el); $section.removeClass($section.data("header-fix-moment-classes")).addClass($section.data("header-fix-moment-exclude")) });
                    this.defaultState = !this.defaultState; return this
                }; function HSHeaderWithoutBehaviorObserver(element) { if (!HSAbstractObserver.call(this, element)) return } HSHeaderWithoutBehaviorObserver.prototype.check = function () { return this }; HSHeaderWithoutBehaviorObserver.prototype.init = function () { return this }; HSHeaderWithoutBehaviorObserver.prototype.destroy = function () { return this }; HSHeaderWithoutBehaviorObserver.prototype.changeState = function () { return this }; HSHeaderWithoutBehaviorObserver.prototype.toDefaultState =
                    function () { return this }
    })(jQuery);
} catch (e) { console.error("/skins/UnivAngers-v2/resources/assets/js/components/hs.header.js\n", e) }

/** File : /skins/UnivAngers-v2/resources/assets/js/helpers/hs.hamburgers.js */
document_currentScript = (function () { a = document.createElement('script'); a.src = 'https://www.univ-angers.fr/skins/UnivAngers-v2/resources/assets/js/helpers/hs.hamburgers.js'; return a; })(); try {
    (function ($) {
        $.HSCore.helpers.HSHamburgers = {
            init: function (selector) {
                if (!selector || !$(selector).length) return; var hamburgers = $(selector), timeoutid; hamburgers.each(function (i, el) {
                    var $this = $(this); if ($this.closest("button").length) $this.closest("button").get(0).addEventListener("click", function (e) { var $self = $(this), $hamburger = $self.find(selector); if (timeoutid) clearTimeout(timeoutid); timeoutid = setTimeout(function () { $hamburger.toggleClass("is-active") }, 10); e.preventDefault() }, false); else $this.get(0).addEventListener("click",
                        function (e) { var $self = $(this); if (timeoutid) clearTimeout(timeoutid); timeoutid = setTimeout(function () { $self.toggleClass("is-active") }, 10); e.preventDefault() }, false)
                })
            }
        }
    })(jQuery);
} catch (e) { console.error("/skins/UnivAngers-v2/resources/assets/js/helpers/hs.hamburgers.js\n", e) }


/**
* Navigation component.
*
* @author Htmlstream
* @version 1.0
* @requires HSScrollBar component (hs.scrollbar.js v1.0.0)
*
*/
; (function ($) {
    'use strict';

    $.HSCore.components.HSNavigation = {

        /**
         * Base configuration of the component.
         *
         * @private
         */
        _baseConfig: {
            navigationOverlayClasses: '',
            navigationInitClasses: '',
            navigationInitBodyClasses: '',
            navigationPosition: 'right',
            activeClass: 'u-main-nav--overlay-opened',
            navigationBreakpoint: 768,
            breakpointsMap: {
                'sm': 576,
                'md': 768,
                'lg': 992,
                'xl': 1200
            },
            afterOpen: function () { },
            afterClose: function () { }
        },

        /**
         * Collection of all initialized items on the page.
         *
         * @private
         */
        _pageCollection: $(),

        /**
         * Initializtion of the navigation.
         *
         * @param {jQuery} collection
         * @param {Object} config
         *
         * @public
         * @return {jQuery}
         */
        init: function (collection, config) {

            var _self = this,
                $w = $(window);

            if (!collection || !collection.length) return $();

            config = config && $.isPlainObject(config) ? config : {};

            $w.on('resize.HSNavigation', function (e) {

                if (_self.resizeTimeoutId) clearTimeout(_self.resizeTimeoutId);

                _self.resizeTimeoutId = setTimeout(function () {

                    _self._pageCollection.each(function (i, el) {

                        var $this = $(el),
                            HSNavigation = $this.data('HSNavigation');

                        if ($w.width() > HSNavigation.config.breakpointsMap[HSNavigation.config.navigationBreakpoint] && HSNavigation.isInitialized()) {

                            HSNavigation.destroy();

                        }
                        else if ($w.width() <= HSNavigation.config.breakpointsMap[HSNavigation.config.navigationBreakpoint] && !HSNavigation.isInitialized()) {
                            HSNavigation.init();
                        }

                    });

                }, 50);

            });


            collection.each(function (i, el) {

                var $this = $(el),
                    itemConfig = $.extend(true, {}, _self._baseConfig, config, $this.data());

                if ($this.data('HSNavigation')) return;

                $this.data('HSNavigation', _self._factoryMethod($this, itemConfig));

                _self._pageCollection = _self._pageCollection.add($this);

            });


            _self._pageCollection.each(function (i, el) {

                var $this = $(el),
                    HSNavigation = $this.data('HSNavigation');

                if ($w.width() > HSNavigation.config.breakpointsMap[HSNavigation.config.navigationBreakpoint]) {

                    HSNavigation.destroy();

                }
                else if ($w.width() <= HSNavigation.config.breakpointsMap[HSNavigation.config.navigationBreakpoint]) {
                    HSNavigation.init();
                }
            });

            return collection;

        },

        /**
         * Returns certain object relative to class name.
         *
         * @param {jQuery} element
         * @param {Object} config
         *
         * @private
         * @return {HSNavigationOverlay|HSNavigationPush}
         */
        _factoryMethod: function (element, config) {

            if (element.filter('[class*="u-main-nav--overlay"]').length) {
                return new HSNavigationOverlay(element, config);
            }
            else if (element.filter('[class*="u-main-nav--push"]').length) {
                return new HSNavigationPush(element, config);
            }

        }

    };

    /**
     * Abstract class for all HSNavigation* objects.
     *
     * @param {jQuery} element
     * @param {Object} config
     *
     * @return {Boolean}
     */
    function HSNavigationAbstract(element, config) {

        /**
         * Contains current jQuery object.
         *
         * @public
         */
        this.element = element;

        /**
         * Contains body jQuery object.
         *
         * @public
         */
        this.body = $('body');

        /**
         * Contains configuration.
         *
         * @public
         */
        this.config = config;

        /**
         * Reinitialization of the HSNavigation* object.
         *
         * @public
         */
        this.reinit = function () {

            this.destroy().init();

        }
    };

    /**
     * HSNavigationOverlay.
     *
     * @param {jQuery} element
     * @param {Object} config
     *
     * @constructor
     */
    function HSNavigationOverlay(element, config) {

        var _self = this;

        // extends some functionality from abstract class
        HSNavigationAbstract.call(this, element, config);

        Object.defineProperties(this, {

            overlayClasses: {
                get: function () {
                    return 'u-main-nav__overlay ' + _self.config.navigationOverlayClasses
                }
            },

            bodyClasses: {
                get: function () {
                    return 'u-main-nav--overlay-' + _self.config.navigationPosition
                }
            },

            isOpened: {
                get: function () {
                    return _self.body.hasClass(_self.config.activeClass);
                }
            }

        });

    };


    /**
     * Initialization of the instance.
     *
     * @public
     */
    HSNavigationOverlay.prototype.init = function () {

        var _self = this;

        /**
         * Contains overlay object.
         *
         * @public
         */
        this.overlay = $('<div></div>', {
            class: _self.overlayClasses
        });

        if ($.HSCore.components.HSScrollBar) {

            setTimeout(function () {
                $.HSCore.components.HSScrollBar.init(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);

        }

        this.toggler = $('[data-target="#' + this.element.attr('id') + '"]');

        if (this.toggler && this.toggler.length) this.toggler.css('display', 'block');

        this.body.addClass(this.bodyClasses);
        this.element
            .addClass('u-main-nav--overlay')
            .append(this.overlay);

        setTimeout(function () {
            _self.element.addClass(_self.config.navigationInitClasses);
            _self.body.addClass(_self.config.navigationInitBodyClasses);

            _self.transitionDuration = parseFloat(getComputedStyle(_self.element.get(0)).transitionDuration, 10);


            if (_self.transitionDuration > 0) {

                _self.element.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function (e) {

                    // Old code
                    // if(_self.isOpened && (e.originalEvent.propertyName == 'right' || e.originalEvent.propertyName == 'left')) {
                    //   _self.config.afterOpen.call(_self.element, _self.overlay);
                    // }
                    // else if(!_self.isOpened && (e.originalEvent.propertyName == 'right' || e.originalEvent.propertyName == 'left')) {
                    //   _self.config.afterClose.call(_self.element, _self.overlay);
                    // }

                    // New code
                    if (_self.isOpened) {
                        _self.config.afterOpen.call(_self.element, _self.overlay);
                    }
                    else if (!_self.isOpened) {
                        _self.config.afterClose.call(_self.element, _self.overlay);
                    }

                    e.stopPropagation();
                    e.preventDefault();

                });

            }

        }, 50);

        this._bindEvents();


        this.isInit = true;

    };


    /**
     * Destroys the instance.
     *
     * @public
     */
    HSNavigationOverlay.prototype.destroy = function () {

        var _self = this;

        if (this.overlay) this.overlay.remove();

        if (this.toggler && this.toggler.length) this.toggler.hide();

        if ($.HSCore.components.HSScrollBar) {

            setTimeout(function () {
                $.HSCore.components.HSScrollBar.destroy(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);

        }

        setTimeout(function () {
            if (_self.transitionDuration && _self.transitionDuration > 0) {
                _self.element.off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend");
            }
        }, 50);

        this.body.removeClass(this.bodyClasses);
        this.element
            .removeClass('u-main-nav--overlay')
            .removeClass(this.config.navigationInitClasses);

        this.body.removeClass(this.bodyClasses).removeClass(this.config.navigationInitBodyClasses);

        this._unbindEvents();

        this.isInit = false;

    };

    /**
     * Binds necessary events.
     *
     * @private
     */
    HSNavigationOverlay.prototype._bindEvents = function () {

        var _self = this;

        if (this.toggler && this.toggler.length) {
            this.toggler.on('click.HSNavigation', function (e) {

                if (_self.isOpened) {
                    _self.close();
                }
                else {
                    _self.open();
                }

                e.preventDefault();

            });
        }

        this.overlay.on('click.HSNavigation', function (e) {
            _self.close();
        });

        $(document).on('keyup.HSNavigation', function (e) {
            if (e.keyCode == 27) {
                _self.close();
            }
        });

    };

    /**
     * Unbinds necessary events.
     *
     * @private
     */
    HSNavigationOverlay.prototype._unbindEvents = function () {

        if (this.toggler && this.toggler.length) {
            this.toggler.off('click.HSNavigation');
        }

        if (this.overlay && this.overlay.length) {
            this.overlay.off('click.HSNavigation');
        }

        $(document).off('keyup.HSNavigation');

    };


    /**
     * Shows the navigation.
     *
     * @public
     */
    HSNavigationOverlay.prototype.open = function () {

        this.body.addClass(this.config.activeClass);

        if (this.transitionDuration !== undefined && this.transitionDuration == 0) {
            this.config.afterOpen.call(this.element, this.overlay);
        }

    };

    /**
     * Hides the navigation.
     *
     * @public
     */
    HSNavigationOverlay.prototype.close = function () {

        var $this = this,
            hamburgers = $this.toggler && $this.toggler.length ? $this.toggler.find('.is-active') : $();

        if (hamburgers.length) hamburgers.removeClass('is-active');

        $this.body.removeClass($this.config.activeClass);

        // Old code
        // if(this.transitionDuration !== undefined && this.transitionDuration == 0) {
        //   this.config.afterClose.call(this.element, this.overlay);
        // }

        // New code
        $this.element.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function (e) {
            $this.toggler.attr('aria-expanded', false);
            $this.element.removeClass('collapse show');
        });

    };

    /**
     * Returns true if the navigation has been initialized.
     *
     * @public
     * @return {Boolean}
     */
    HSNavigationOverlay.prototype.isInitialized = function () {

        return this.isInit;

    };

    /**
     * HSNavigationPush.
     *
     * @param {jQuery} element
     * @param {Object} config
     *
     * @constructor
     */
    function HSNavigationPush(element, config) {

        var _self = this;

        // extends some functionality from abstract class
        HSNavigationAbstract.call(this, element, config);

        Object.defineProperties(this, {

            overlayClasses: {
                get: function () {
                    return 'u-main-nav__overlay ' + _self.config.navigationOverlayClasses
                }
            },

            bodyClasses: {
                get: function () {
                    return 'u-main-nav--push-' + _self.config.navigationPosition
                }
            },

            isOpened: {
                get: function () {
                    return _self.body.hasClass(_self.config.activeClass);
                }
            }

        });

        // this.init();

    };


    /**
     * Initialization of the instance.
     *
     * @public
     */
    HSNavigationPush.prototype.init = function () {

        var _self = this;

        /**
         * Contains overlay object.
         *
         * @public
         */
        this.overlay = $('<div></div>', {
            class: _self.overlayClasses
        });

        if ($.HSCore.components.HSScrollBar) {

            setTimeout(function () {
                $.HSCore.components.HSScrollBar.init(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);

        }

        this.toggler = $('[data-target="#' + this.element.attr('id') + '"]');

        if (this.toggler && this.toggler.length) this.toggler.css('display', 'block');

        this.body.addClass(this.bodyClasses);
        this.element
            .addClass('u-main-nav--push')
            .append(this.overlay);

        setTimeout(function () {
            _self.element.addClass(_self.config.navigationInitClasses);
            _self.body.addClass(_self.config.navigationInitBodyClasses);

            _self.transitionDuration = parseFloat(getComputedStyle(_self.element.get(0)).transitionDuration, 10);


            if (_self.transitionDuration > 0) {

                _self.element.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function (e) {

                    // Old code
                    // if(_self.isOpened && (e.originalEvent.propertyName == 'right' || e.originalEvent.propertyName == 'left')) {
                    //   _self.config.afterOpen.call(_self.element, _self.overlay);
                    // }
                    // else if(!_self.isOpened && (e.originalEvent.propertyName == 'right' || e.originalEvent.propertyName == 'left')) {
                    //   _self.config.afterClose.call(_self.element, _self.overlay);
                    // }

                    // New code
                    if (_self.isOpened) {
                        _self.config.afterOpen.call(_self.element, _self.overlay);
                    }
                    else if (!_self.isOpened) {
                        _self.config.afterClose.call(_self.element, _self.overlay);
                    }

                    e.stopPropagation();
                    e.preventDefault();

                });

            }

        }, 50);

        this._bindEvents();

        this.isInit = true;

    };


    /**
     * Destroys the instance.
     *
     * @public
     */
    HSNavigationPush.prototype.destroy = function () {

        var _self = this;

        if (this.overlay) this.overlay.remove();

        if (this.toggler && this.toggler.length) this.toggler.hide();

        if ($.HSCore.components.HSScrollBar) {

            setTimeout(function () {
                $.HSCore.components.HSScrollBar.destroy(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);

        }

        setTimeout(function () {
            if (_self.transitionDuration && _self.transitionDuration > 0) {
                _self.element.off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend");
            }
        }, 50);

        this.body.removeClass(this.bodyClasses).removeClass(this.config.navigationInitBodyClasses);
        this.element
            .removeClass('u-main-nav--push')
            .removeClass(this.config.navigationInitClasses);

        this._unbindEvents();

        this.isInit = false;

    };

    /**
     * Binds necessary events.
     *
     * @private
     */
    HSNavigationPush.prototype._bindEvents = function () {

        var _self = this;

        if (this.toggler && this.toggler.length) {
            this.toggler.on('click.HSNavigation', function (e) {

                if (_self.isOpened) {
                    _self.close();
                }
                else {
                    _self.open();
                }

                e.preventDefault();

            });
        }

        this.overlay.on('click.HSNavigation', function (e) {
            _self.close();
        });

        $(document).on('keyup.HSNavigation', function (e) {
            if (e.keyCode == 27) {
                _self.close();
            }
        });

    };

    /**
     * Unbinds necessary events.
     *
     * @private
     */
    HSNavigationPush.prototype._unbindEvents = function () {

        if (this.toggler && this.toggler.length) {
            this.toggler.off('click.HSNavigation');
        }

        if (this.overlay && this.overlay.length) {
            this.overlay.off('click.HSNavigation');
        }

        $(document).off('keyup.HSNavigation');

    };


    /**
     * Shows the navigation.
     *
     * @public
     */
    HSNavigationPush.prototype.open = function () {

        this.body.addClass(this.config.activeClass);

        if (this.transitionDuration !== undefined && this.transitionDuration == 0) {
            this.config.afterOpen.call(this.element, this.overlay);
        }

    };

    /**
     * Hides the navigation.
     *
     * @public
     */
    HSNavigationPush.prototype.close = function () {

        var hamburgers = this.toggler && this.toggler.length ? this.toggler.find('.is-active') : $();

        if (hamburgers.length) hamburgers.removeClass('is-active');

        this.body.removeClass(this.config.activeClass);

        if (this.transitionDuration !== undefined && this.transitionDuration == 0) {
            this.config.afterClose.call(this.element, this.overlay);
        }

    };

    /**
     * Returns true if the navigation has been initialized.
     *
     * @public
     * @return {Boolean}
     */
    HSNavigationPush.prototype.isInitialized = function () {

        return this.isInit;

    };


})(jQuery);

/** File : /skins/UnivAngers-v2/resources/assets/js/components/hs.popup.js */
document_currentScript = (function () { a = document.createElement('script'); a.src = 'https://www.univ-angers.fr/skins/UnivAngers-v2/resources/assets/js/components/hs.popup.js'; return a; })(); try {
    (function ($) {
        $.HSCore.components.HSPopup = {
            _baseConfig: {
                parentEl: "html", baseClass: "u-fancybox-theme", slideClass: "u-fancybox-slide", speed: 1E3, slideSpeedCoefficient: 1, infobar: false, fullScreen: true, thumbs: true, closeBtn: true, baseTpl: '\x3cdiv class\x3d"fancybox-container" role\x3d"dialog" tabindex\x3d"-1"\x3e' + '\x3cdiv class\x3d"fancybox-content"\x3e' + '\x3cdiv class\x3d"fancybox-bg"\x3e\x3c/div\x3e' + '\x3cdiv class\x3d"fancybox-controls" style\x3d"position: relative; z-index: 99999;"\x3e' + '\x3cdiv class\x3d"fancybox-infobar"\x3e' +
                    '\x3cdiv class\x3d"fancybox-infobar__body"\x3e' + "\x3cspan data-fancybox-index\x3e\x3c/span\x3e\x26nbsp;/\x26nbsp;\x3cspan data-fancybox-count\x3e\x3c/span\x3e" + "\x3c/div\x3e" + "\x3c/div\x3e" + '\x3cdiv class\x3d"fancybox-toolbar"\x3e{{BUTTONS}}\x3c/div\x3e' + "\x3c/div\x3e" + '\x3cdiv class\x3d"fancybox-slider-wrap"\x3e' + '\x3cbutton data-fancybox-prev class\x3d"fancybox-arrow fancybox-arrow--left" title\x3d"Previous"\x3e\x3c/button\x3e' + '\x3cbutton data-fancybox-next class\x3d"fancybox-arrow fancybox-arrow--right" title\x3d"Next"\x3e\x3c/button\x3e' +
                    '\x3cdiv class\x3d"fancybox-stage"\x3e\x3c/div\x3e' + "\x3c/div\x3e" + '\x3cdiv class\x3d"fancybox-caption-wrap"\x3e' + '\x3cdiv class\x3d"fancybox-caption"\x3e\x3c/div\x3e' + "\x3c/div\x3e" + "\x3c/div\x3e" + "\x3c/div\x3e", animationEffect: "fade"
            }, pageCollection: $(), init: function (selector, config) { if (!selector) return; var $collection = $(selector); if (!$collection.length) return; config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig; this.initPopup(selector, config) }, initPopup: function (el,
                conf) {
                var $fancybox = $(el); $fancybox.on("click", function () { var $this = $(this), animationDuration = $this.data("speed"), isGroup = $this.data("fancybox"), isInfinite = Boolean($this.data("is-infinite")), slideShowSpeed = $this.data("slideshow-speed"); $.fancybox.defaults.animationDuration = animationDuration; if (isInfinite == true) $.fancybox.defaults.loop = true; if (isGroup) { $.fancybox.defaults.transitionEffect = "slide"; $.fancybox.defaults.slideShow.speed = slideShowSpeed } }); $fancybox.fancybox($.extend(true, {}, conf, {
                    beforeShow: function (instance,
                        slide) {
                        var $fancyModal = $(instance.$refs.container), $fancyOverlay = $(instance.$refs.bg[0]), $fancySlide = $(instance.current.$slide), animateIn = instance.current.opts.$orig[0].dataset.animateIn, animateOut = instance.current.opts.$orig[0].dataset.animateOut, speed = instance.current.opts.$orig[0].dataset.speed, overlayBG = instance.current.opts.$orig[0].dataset.overlayBg, overlayBlurBG = instance.current.opts.$orig[0].dataset.overlayBlurBg; if (animateIn && $("body").hasClass("u-first-slide-init")) {
                            var $fancyPrevSlide =
                                $(instance.slides[instance.prevPos].$slide); $fancySlide.addClass("has-animation"); $fancyPrevSlide.addClass("animated " + animateOut); setTimeout(function () { $fancySlide.addClass("animated " + animateIn) }, speed / 2)
                        } else if (animateIn) { var $fancyPrevSlide = $(instance.slides[instance.prevPos].$slide); $fancySlide.addClass("has-animation"); $fancySlide.addClass("animated " + animateIn); $("body").addClass("u-first-slide-init") } if (speed) $fancyOverlay.css("transition-duration", speed + "ms"); else $fancyOverlay.css("transition-duration",
                            "1000ms"); if (overlayBG) $fancyOverlay.css("background-color", overlayBG); if (overlayBlurBG) $("body").addClass("g-blur-30")
                    }, beforeClose: function (instance, slide) { var $fancyModal = $(instance.$refs.container), $fancySlide = $(instance.current.$slide), animateIn = instance.current.opts.$orig[0].dataset.animateIn, animateOut = instance.current.opts.$orig[0].dataset.animateOut, overlayBlurBG = instance.current.opts.$orig[0].dataset.overlayBlurBg; if (animateOut) { $fancySlide.removeClass(animateIn).addClass(animateOut); $("body").removeClass("u-first-slide-init") } if (overlayBlurBG) $("body").removeClass("g-blur-30") }
                }))
            }
        }
    })(jQuery);
} catch (e) { console.error("/skins/UnivAngers-v2/resources/assets/js/components/hs.popup.js\n", e) }

/** File : /skins/UnivAngers-v2/resources/assets/js/components/hs.carousel.js */
document_currentScript = (function () { a = document.createElement('script'); a.src = 'https://www.univ-angers.fr/skins/UnivAngers-v2/resources/assets/js/components/hs.carousel.js'; return a; })(); try {
    (function ($) {
        $.HSCore.components.HSCarousel = {
            _baseConfig: { autoplay: false, infinite: true }, pageCollection: $(), init: function (selector, config) { this.collection = selector && $(selector).length ? $(selector) : $(); if (!$(selector).length) return; this.config = config && $.isPlainObject(config) ? $.extend({}, this._baseConfig, config) : this._baseConfig; this.config.itemSelector = selector; this.initCarousel(); return this.pageCollection }, initCarousel: function () {
                var $self = this, config = $self.config, collection = $self.pageCollection; this.collection.each(function (i,
                    el) {
                    var $this = $(el), id = $this.attr("id"), target = $this.data("nav-for"), isThumb = $this.data("is-thumbs"), arrowsClasses = $this.data("arrows-classes"), arrowLeftClasses = $this.data("arrow-left-classes"), arrowRightClasses = $this.data("arrow-right-classes"), pagiClasses = $this.data("pagi-classes"), pagiHelper = $this.data("pagi-helper"), $pagiIcons = $this.data("pagi-icons"), $prevMarkup = '\x3cdiv class\x3d"js-prev ' + arrowsClasses + " " + arrowLeftClasses + '"\x3e\x3c/div\x3e', $nextMarkup = '\x3cdiv class\x3d"js-next ' + arrowsClasses +
                        " " + arrowRightClasses + '"\x3e\x3c/div\x3e', setSlidesToShow = $this.data("slides-show"), setSlidesToScroll = $this.data("slides-scroll"), setAutoplay = $this.data("autoplay"), setAnimation = $this.data("animation"), setEasing = $this.data("easing"), setFade = $this.data("fade"), setSpeed = $this.data("speed"), setSlidesRows = $this.data("rows"), setCenterMode = $this.data("center-mode"), setCenterPadding = $this.data("center-padding"), setPauseOnHover = $this.data("pause-hover"), setVariableWidth = $this.data("variable-width"), setInitialSlide =
                            $this.data("initial-slide"), setVertical = $this.data("vertical"), setRtl = $this.data("rtl"), setInEffect = $this.data("in-effect"), setOutEffect = $this.data("out-effect"), setInfinite = $this.data("infinite"), setDataTitlePosition = $this.data("title-pos-inside"), setFocusOnSelect = $this.data("focus-on-select"), setLazyLoad = $this.data("lazy-load"), isAdaptiveHeight = $this.data("adaptive-height"), numberedPaging = $this.data("numbered-pagination"), setResponsive = JSON.parse(el.getAttribute("data-responsive")); if ($this.find("[data-slide-type]").length) $self.videoSupport($this);
                    $this.on("init", function (event, slick) { $(slick.$slides).css("height", "auto"); if (isThumb && setSlidesToShow >= $(slick.$slides).length) $this.addClass("slick-transform-off") }); if (setInEffect && setOutEffect) $this.on("init", function (event, slick) { $(slick.$slides).addClass("single-slide") }); if (pagiHelper) $this.on("init", function (event, slick) { var $pagination = $this.find(".js-pagination"); if (!$pagination.length) return; $pagination.append('\x3cspan class\x3d"u-dots-helper"\x3e\x3c/span\x3e') }); if (isThumb) $("#" + id).on("click",
                        ".slick-slide", function (e) { e.stopPropagation(); var i = $(this).data("slick-index"); if ($("#" + id).slick("slickCurrentSlide") !== i) $("#" + id).slick("slickGoTo", i) }); $this.on("init", function (event, slider) { var $pagination = $this.find(".js-pagination"); if (!$pagination.length) return; $($pagination[0].children[0]).addClass("slick-current") }); $this.on("init", function (event, slick) {
                            var slide = $(slick.$slides)[0], animatedElements = $(slide).find("[data-scs-animation-in]"); $(animatedElements).each(function () {
                                var animationIn =
                                    $(this).data("scs-animation-in"); $(this).addClass("animated " + animationIn).css("opacity", 1)
                            })
                        }); if (numberedPaging) $this.on("init", function (event, slick) { $(numberedPaging).text("1" + "/" + slick.slideCount) }); $this.slick({
                            autoplay: setAutoplay ? true : false, autoplaySpeed: setSpeed ? setSpeed : 3E3, cssEase: setAnimation ? setAnimation : "ease", easing: setEasing ? setEasing : "linear", fade: setFade ? true : false, infinite: setInfinite ? true : false, initialSlide: setInitialSlide ? setInitialSlide - 1 : 0, slidesToShow: setSlidesToShow ? setSlidesToShow :
                                1, slidesToScroll: setSlidesToScroll ? setSlidesToScroll : 1, centerMode: setCenterMode ? true : false, variableWidth: setVariableWidth ? true : false, pauseOnHover: setPauseOnHover ? true : false, rows: setSlidesRows ? setSlidesRows : 1, vertical: setVertical ? true : false, verticalSwiping: setVertical ? true : false, rtl: setRtl ? true : false, centerPadding: setCenterPadding ? setCenterPadding : 0, focusOnSelect: setFocusOnSelect ? true : false, lazyLoad: setLazyLoad ? setLazyLoad : false, asNavFor: target ? target : false, prevArrow: arrowsClasses ? $prevMarkup : false,
                            nextArrow: arrowsClasses ? $nextMarkup : false, dots: pagiClasses ? true : false, dotsClass: "js-pagination " + pagiClasses, adaptiveHeight: !!isAdaptiveHeight, customPaging: function (slider, i) {
                                var title = $(slider.$slides[i]).data("title"); if (title && $pagiIcons) return "\x3cspan\x3e" + title + "\x3c/span\x3e" + $pagiIcons; else if ($pagiIcons) return "\x3cspan\x3e\x3c/span\x3e" + $pagiIcons; else if (title && setDataTitlePosition) return "\x3cspan\x3e" + title + "\x3c/span\x3e"; else if (title && !setDataTitlePosition) return "\x3cspan\x3e\x3c/span\x3e" +
                                    '\x3cstrong class\x3d"u-dot-title"\x3e' + title + "\x3c/strong\x3e"; else return "\x3cspan\x3e\x3c/span\x3e"
                            }, responsive: setResponsive
                        }); $this.on("beforeChange", function (event, slider, currentSlide, nextSlide) {
                            var nxtSlide = $(slider.$slides)[nextSlide], slide = $(slider.$slides)[currentSlide], $pagination = $this.find(".js-pagination"), animatedElements = $(nxtSlide).find("[data-scs-animation-in]"), otherElements = $(slide).find("[data-scs-animation-in]"); $(otherElements).each(function () {
                                var animationIn = $(this).data("scs-animation-in");
                                $(this).removeClass("animated " + animationIn)
                            }); $(animatedElements).each(function () { $(this).css("opacity", 0) }); if (!$pagination.length) return; if (currentSlide > nextSlide) { $($pagination[0].children).removeClass("slick-active-right"); $($pagination[0].children[nextSlide]).addClass("slick-active-right") } else $($pagination[0].children).removeClass("slick-active-right"); $($pagination[0].children).removeClass("slick-current"); setTimeout(function () { $($pagination[0].children[nextSlide]).addClass("slick-current") },
                                .25)
                        }); if (numberedPaging) $this.on("beforeChange", function (event, slick, currentSlide, nextSlide) { var i = (nextSlide ? nextSlide : 0) + 1; $(numberedPaging).text(i + "/" + slick.slideCount) }); $this.on("afterChange", function (event, slick, currentSlide, nextSlide) {
                            var slide = $(slick.$slides)[currentSlide], animatedElements = $(slide).find("[data-scs-animation-in]"); $(animatedElements).each(function () {
                                var animationIn = $(this).data("scs-animation-in"), animationDelay = $(this).data("scs-animation-delay"), animationDuration = $(this).data("scs-animation-duration");
                                console.log(animationDuration); $(this).css({ "animation-delay": animationDelay + "ms", "animation-duration": animationDuration + "ms" }); $(this).addClass("animated " + animationIn).css("opacity", 1)
                            })
                        }); if (setInEffect && setOutEffect) {
                            $this.on("afterChange", function (event, slick, currentSlide, nextSlide) { $(slick.$slides).removeClass("animated set-position " + setInEffect + " " + setOutEffect) }); $this.on("beforeChange", function (event, slick, currentSlide) { $(slick.$slides[currentSlide]).addClass("animated " + setOutEffect) });
                            $this.on("setPosition", function (event, slick) { $(slick.$slides[slick.currentSlide]).addClass("animated set-position " + setInEffect) })
                        } collection = collection.add($this)
                })
            }, videoSupport: function (carousel) {
                if (!carousel.length) return; carousel.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                    var slideType = $(slick.$slides[currentSlide]).data("slide-type"), player = $(slick.$slides[currentSlide]).find("iframe").get(0), command; if (slideType == "vimeo") command = { "method": "pause", "value": "true" }; else if (slideType ==
                        "youtube") command = { "event": "command", "func": "pauseVideo" }; else return false; if (player != undefined) player.contentWindow.postMessage(JSON.stringify(command), "*")
                })
            }, initTextAnimation: function (carousel, textAnimationSelector) {
                if (!window.TextFx || !window.anime || !carousel.length) return; var $text = carousel.find(textAnimationSelector); if (!$text.length) return; $text.each(function (i, el) { var $this = $(el); if (!$this.data("TextFx")) $this.data("TextFx", new TextFx($this.get(0))) }); carousel.on("beforeChange", function (event,
                    slick, currentSlide, nextSlide) { var targets = slick.$slider.find(".slick-track").children(); var currentTarget = targets.eq(currentSlide), nextTarget = targets.eq(nextSlide); currentTarget = currentTarget.find(textAnimationSelector); nextTarget = nextTarget.find(textAnimationSelector); if (currentTarget.length) currentTarget.data("TextFx").hide(currentTarget.data("effect") ? currentTarget.data("effect") : "fx1"); if (nextTarget.length) nextTarget.data("TextFx").show(nextTarget.data("effect") ? nextTarget.data("effect") : "fx1") })
            }
        }
    })(jQuery);
} catch (e) { console.error("/skins/UnivAngers-v2/resources/assets/js/components/hs.carousel.js\n", e) }

/** File : /skins/UnivAngers-v2/resources/assets/js/components/hs.go-to.js */
document_currentScript = (function () { a = document.createElement('script'); a.src = 'https://www.univ-angers.fr/skins/UnivAngers-v2/resources/assets/js/components/hs.go-to.js'; return a; })(); try {
    (function ($) {
        $.HSCore.components.HSGoTo = {
            _baseConfig: {}, pageCollection: $(), init: function (selector, config) { this.collection = selector && $(selector).length ? $(selector) : $(); if (!$(selector).length) return; this.config = config && $.isPlainObject(config) ? $.extend({}, this._baseConfig, config) : this._baseConfig; this.config.itemSelector = selector; this.initGoTo(); return this.pageCollection }, initGoTo: function () {
                var $self = this, collection = $self.pageCollection; this.collection.each(function (i, el) {
                    var $this = $(el), $target = $this.data("target"),
                        type = $this.data("type"), showEffect = $this.data("show-effect"), hideEffect = $this.data("hide-effect"), position = JSON.parse(el.getAttribute("data-position")), compensation = $($this.data("compensation")).outerHeight(), offsetTop = $this.data("offset-top"), targetOffsetTop = function () { if (compensation) return $target ? $($target).offset().top - compensation : 0; else return $target ? $($target).offset().top : 0 }; if (type == "static") $this.css({ "display": "inline-block" }); else $this.addClass("animated").css({
                            "display": "inline-block",
                            "position": type, "opacity": 0
                        }); if (type == "fixed" || type == "absolute") $this.css(position); $this.on("click", function (e) { e.preventDefault(); $("html, body").stop().animate({ "scrollTop": targetOffsetTop() }, 800) }); if (!$this.data("offset-top") && !$this.hasClass("js-animation-was-fired") && type != "static") if ($this.offset().top <= $(window).height()) { $this.show(); setTimeout(function () { $this.addClass("js-animation-was-fired " + showEffect).css({ "opacity": "" }) }) } if (type != "static") {
                            $(window).on("scroll", function () {
                                if ($this.data("offset-top")) if ($(window).scrollTop() >=
                                    offsetTop && !$this.hasClass("js-animation-was-fired")) { $this.show(); setTimeout(function () { $this.addClass("js-animation-was-fired " + showEffect).css({ "opacity": "" }) }) } else { if ($(window).scrollTop() <= offsetTop && $this.hasClass("js-animation-was-fired")) { $this.removeClass("js-animation-was-fired " + showEffect); setTimeout(function () { $this.addClass(hideEffect).css({ "opacity": 0 }) }, 100); setTimeout(function () { $this.removeClass(hideEffect).hide() }, 400) } } else {
                                    var thisOffsetTop = $this.offset().top; if (!$this.hasClass("js-animation-was-fired")) if ($(window).scrollTop() >=
                                        thisOffsetTop - $(window).height()) { $this.show(); setTimeout(function () { $this.addClass("js-animation-was-fired " + showEffect).css({ "opacity": "" }) }) }
                                }
                            }); $(window).trigger("scroll")
                        } collection = collection.add($this)
                })
            }
        }
    })(jQuery);
} catch (e) { console.error("/skins/UnivAngers-v2/resources/assets/js/components/hs.go-to.js\n", e) }

/** File : /skins/UnivAngers-v2/resources/assets/js/components/hs.counter.js */
document_currentScript = (function () { a = document.createElement('script'); a.src = 'https://www.univ-angers.fr/skins/UnivAngers-v2/resources/assets/js/components/hs.counter.js'; return a; })(); try {
    (function ($) {
        $.HSCore.components.HSCounter = {
            _baseConfig: { bounds: -100, debounce: 10, time: 6E3, fps: 60, commaSeparated: false }, _pageCollection: $(), init: function (selector, config) { this.collection = $(selector) && $(selector).length ? $(selector) : $(); if (!this.collection.length) return; this.config = config && $.isPlainObject(config) ? $.extend({}, this._baseConfig, config) : this._baseConfig; this.config.itemSelector = selector; this.initCounters() }, initCounters: function () {
                var self = this; appear({
                    bounds: self.config["bounds"], debounce: self.config["debounce"],
                    init: function () { self.collection.each(function (i, el) { var $item = $(el), value = parseInt($item.text(), 10); $item.text("0").data("value", value); self._pageCollection = self._pageCollection.add($item) }) }, elements: function () { return document.querySelectorAll(self.config["itemSelector"]) }, appear: function (el) {
                        var $item = $(el), counter = 1, endValue = $item.data("value"), iterationValue = parseInt(endValue / (self.config["time"] / self.config["fps"]), 10), isCommaSeparated = $item.data("comma-separated"), isReduced = $item.data("reduce-thousands-to");
                        if (iterationValue == 0) iterationValue = 1; $item.data("intervalId", setInterval(function () {
                            if (isCommaSeparated) $item.text(self.getCommaSeparatedValue(counter += iterationValue)); else if (isReduced) $item.text(self.getCommaReducedValue(counter += iterationValue, isReduced)); else $item.text(counter += iterationValue); if (counter > endValue) {
                                clearInterval($item.data("intervalId")); if (isCommaSeparated) $item.text(self.getCommaSeparatedValue(endValue)); else if (isReduced) $item.text(self.getCommaReducedValue(endValue, isReduced));
                                else $item.text(endValue); return
                            }
                        }, self.config["time"] / self.config["fps"]))
                    }
                })
            }, getCommaReducedValue: function (value, additionalText) { return parseInt(value / 1E3, 10) + additionalText }, getCommaSeparatedValue: function (value) {
                value = new String(value); switch (value.length) {
                    case 4: return value.substr(0, 1) + "," + value.substr(1); break; case 5: return value.substr(0, 2) + "," + value.substr(2); break; case 6: return value.substr(0, 3) + "," + value.substr(3); break; case 7: value = value.substr(0, 1) + "," + value.substr(1); return value.substr(0,
                        5) + "," + value.substr(5); break; case 8: value = value.substr(0, 2) + "," + value.substr(2); return value.substr(0, 6) + "," + value.substr(6); break; case 9: value = value.substr(0, 3) + "," + value.substr(3); return value.substr(0, 7) + "," + value.substr(7); break; case 10: value = value.substr(0, 1) + "," + value.substr(1); value = value.substr(0, 5) + "," + value.substr(5); return value.substr(0, 9) + "," + value.substr(9); break; default: return value
                }
            }
        }
    })(jQuery);
} catch (e) { console.error("/skins/UnivAngers-v2/resources/assets/js/components/hs.counter.js\n", e) }

/** File : /skins/UnivAngers-v2/resources/js/custom.js */
document_currentScript = (function () { a = document.createElement('script'); a.src = 'https://www.univ-angers.fr/skins/UnivAngers-v2/resources/js/custom.js'; return a; })(); try {
    $(".carousel").carousel({ interval: false });
    $(document).on("ready", function () { $.HSCore.components.HSGoTo.init(".js-go-to"); $.HSCore.components.HSCarousel.init(".js-carousel"); $.HSCore.components.HSCounter.init('[class*\x3d"js-counter"]'); $.HSCore.components.HSNavigation.init($(".js-navigation"), { breakpointsMap: { "sm": 1E4, "md": 1E4, "lg": 1E4, "xl": 1E4 } }); $(".masonry-grid").imagesLoaded().then(function () { $(".masonry-grid").masonry({ columnWidth: ".masonry-grid-sizer", itemSelector: ".masonry-grid-item", percentPosition: true }) }); $.HSCore.components.HSPopup.init(".js-fancybox") });
    $(window).on("load", function () { $.HSCore.helpers.HSHamburgers.init(".hamburger") }); $(document).ready(function () { setHeader(); setCarouselHeight() }); $(window).resize(function () { setHeader(); setCarouselHeight() }); function setHeader() { $("body").addClass("position-relative"); $("header").addClass("position-absolute"); $("header").addClass("fixed--lg"); $("main").css("padding-top", $("header").height()) }
    function setCarouselHeight() { var windowWidth = $(window).width(); if (windowWidth >= 992) { var windowHeight = $(window).height(); var headerHeight = $("header").height(); var menuHeight = $("#content").height(); $("#carouselIndicators").height(windowHeight - headerHeight - menuHeight) } else $("#carouselIndicators").height("auto") }
    $(function () { $(window).scroll(function () { if ($(this).scrollTop() > 300) $(".u-fleche-scroll").fadeIn(); else $(".u-fleche-scroll").fadeOut() }); $(".u-fleche-scroll").click(function () { $("body,html").animate({ scrollTop: 0 }, 1600); return false }) });
} catch (e) { console.error("/skins/UnivAngers-v2/resources/js/custom.js\n", e) }