!function t(e, i, n) {
    function a(s, r) {
        if (!i[s]) {
            if (!e[s]) {
                var l = "function" == typeof require && require;
                if (!r && l)return l(s, !0);
                if (o)return o(s, !0);
                var d = new Error("Cannot find module '" + s + "'");
                throw d.code = "MODULE_NOT_FOUND", d
            }
            var c = i[s] = {exports: {}};
            e[s][0].call(c.exports, function (t) {
                var i = e[s][1][t];
                return a(i || t)
            }, c, c.exports, t, e, i, n)
        }
        return i[s].exports
    }

    for (var o = "function" == typeof require && require, s = 0; s < n.length; s++)a(n[s]);
    return a
}({
    1: [function (t, e, i) {
        t("../../../Themer/src/js/bootstrap"), t("../../../Themer/src/js/jquery.flexslider"), t("../../../Themer/src/js/jquery.lazyload"), function (t) {
            function e() {
                l.offset().top + l.outerHeight() > d.scrollTop() + d.height() ? (l.addClass("fixed"), l.find(".entry-bar-inner").css("width", t(".content").width())) : l.removeClass("fixed")
            }

            function i() {
                t(".bdshare_popup_box").length ? t(".bdshare_popup_box").addClass("j-share") : setTimeout(function () {
                    i()
                }, 3)
            }

            t(".home .j-lazy, .page-template-page-home .j-lazy").lazyload({
                threshold: -50,
                effect: "fadeIn"
            }), t(".content .j-lazy").lazyload({
                threshold: -50,
                effect: "fadeIn"
            }), t(".sidebar .j-lazy").lazyload({threshold: -50, effect: "fadeIn"});
            var n = t(".navbar-toggle").is(":hidden");
            t(window).resize(function () {
                n = t(".navbar-toggle").is(":hidden")
            }), t(".main-slider").flexslider({
                animation: "slide",
                pauseOnAction: !1,
                pauseOnHover: !0,
                touch: !0,
                useCSS: !1
            }), t(".navbar-search").on("click", ".j-navbar-search", function () {
                var e = t(this).parent();
                n ? e.hasClass("active") ? e.submit() : (e.addClass("active"), e.find(".navbar-search-input").focus()) : e.submit()
            }).on("keydown", ".navbar-search-input", function () {
                t(this).parent().removeClass("warning")
            }).on("submit", function () {
                var e = t(this);
                if ("" == t.trim(e.find(".navbar-search-input").val()))return e.addClass("warning"), e.find(".navbar-search-input").focus(), !1
            }), t(document).on("click", function (e) {
                0 == t(e.target).closest(".navbar-search").length && t(".navbar-search").removeClass("active warning")
            }), t("#j-reading").on("click", function () {
                t("body").addClass("reading").append('<div class="reading-back" id="j-reading-back"><i class="fa fa-reply"></i></div>')
            }), t("body").on("click", "#j-reading-back", function () {
                t("body").removeClass("reading"), t(this).remove()
            });
            var a = t("#j-user-wrap");
            a.length && t.ajax({
                type: "POST",
                url: wpcom_ajaxurl,
                data: {action: "wpcom_is_login"},
                dataType: "json",
                success: function (t) {
                    if (0 == t.result) {
                        var e = '<ul class="profile"> <li class="menu-item dropdown">                <a href="' + t.url + '">                ' + t.avatar + " " + t.display_name + '                </a>                <ul class="dropdown-menu">                <li><a href="' + t.url + '">个人中心</a></li>                <li><a href="' + (t.account ? t.account : t.url) + '">帐号设置</a></li>                <li><a href="' + (t.logout ? t.logout : t.url) + '">退出登录</a></li>                </ul>                </li>                </ul>';
                        a.html(e)
                    } else a.find(".login").addClass("cur")
                }
            }), t(".entry").on("click", ".btn-zan", function () {
                var e = t(this);
                if (!e.hasClass("liked")) {
                    var i = e.data("id");
                    t.ajax({
                        type: "POST",
                        url: wpcom_ajaxurl,
                        data: {action: "wpcom_like_it", id: i},
                        dataType: "json",
                        success: function (t) {
                            0 == t.result ? e.addClass("liked").find("span").html("(" + t.likes + ")") : -2 == t.result && e.addClass("liked")
                        }
                    })
                }
            }).on("click", ".j-heart", function () {
                var e = t(this), i = e.data("id");
                t.ajax({
                    type: "POST",
                    url: wpcom_ajaxurl,
                    data: {action: "wpcom_heart_it", id: i},
                    dataType: "json",
                    success: function (i) {
                        0 == i.result ? e.addClass("hearted").find("span").html(i.favorites) : 1 == i.result ? e.removeClass("hearted").find("span").html(i.favorites) : -1 == i.result && t("#login-modal").modal()
                    }
                })
            });
            var o = {};
            t(".header").on("mouseenter", ".dropdown", function () {
                if (n) {
                    var e = t(this);
                    clearTimeout(o[e.index()]), e.find("> .dropdown-menu").slideDown("fast")
                }
            }).on("mouseleave", ".dropdown", function () {
                if (n) {
                    var e = t(this);
                    o[e.index()] = setTimeout(function () {
                        e.find("> .dropdown-menu").slideUp("fast")
                    }, 200)
                }
            }), t("#commentform").on("submit", function () {
                var e = t(".comment-form-comment textarea"), i = 0, n = 0, a = t(this).find("input.required");
                if ("" == t.trim(e.val()) && (e.addClass("error").focus(), n = 1, i = 1), a.each(function (e, a) {
                        var o = t(a);
                        "" == t.trim(o.val()) && (o.addClass("error"), 0 == n && (o.focus(), n = 1), i = 1)
                    }), i)return !1
            }).on("keydown", ".required", function () {
                t(this).removeClass("error")
            }), t("#comments").on("click", ".comment-must-login,#must-submit,.comment-reply-login", function () {
                return t("#login-modal").modal(), !1
            }), t("body").on("click", ".navbar-toggle", function () {
                t("body").toggleClass("navbar-on")
            });
            var s, r;
            t(window).scroll(function () {
                t(window).scrollTop() > 100 ? t("#j-top").fadeIn("slow") : t("#j-top").fadeOut("slow")
            }), t("#j-top").click(function () {
                t("html, body").animate({scrollTop: 0}, "slow")
            }), t(".contact").hover(function () {
                clearTimeout(s), t(".wechat-wrap").hide(), t(".contact-wrap").show()
            }, function () {
                s = setTimeout(function () {
                    t(".contact-wrap").hide()
                }, 300)
            }), t(".wechat").hover(function () {
                clearTimeout(r), t(".contact-wrap").hide(), t(".wechat-wrap").show()
            }, function () {
                r = setTimeout(function () {
                    t(".wechat-wrap").hide()
                }, 300)
            }), t(".bds_more").hover(function () {
                t(this).hasClass("share") ? t(".bdshare_popup_box").length ? t(".bdshare_popup_box").addClass("j-share") : setTimeout(function () {
                    i()
                }, 15) : t(".bdshare_popup_box").removeClass("j-share")
            }, function () {
            });
            var l = t(".entry-bar");
            if (l.length) {
                var d = t(window);
                e(), d.scroll(function () {
                    e()
                })
            }
            window.setup_share = function () {
                t(document).on("click", ".a-box.share", function (e) {
                    e.preventDefault(), t(".at-svc-compact .at-icon-wrapper").trigger("click")
                })
            }, t("#j-newslist").on("click", ".tab", function () {
                var e = t(this), i = e.parent(), n = t(".tab-list");
                i.find(".tab").removeClass("active"), e.addClass("active"), n.removeClass("active"), n.eq(e.index()).addClass("active");
                var a = e.find("a").data("identifier");
                a && 1 != e.data("loaded") && (n.eq(e.index()).addClass("loading"), t.ajax({
                    type: "POST",
                    url: wpcom_ajaxurl,
                    data: {c: "project", action: "get_index_article", id: 'news', pageid: 1, 'token': 1, 'fields': 'thumb,note', 'cate': a},
                    dataType: "html",
                    success: function (i) {
                        if (n.eq(e.index()).removeClass("loading"), "0" == i){
                            n.eq(e.index()).html('<li class="item"><p style="text-align: center;color:#999;margin:10px 0;">暂无内容</p></li>');
                        }
                        else {
                            var a = t(i);
                            n.eq(e.index()).html(a), a.find(".j-lazy").lazyload({threshold: -50, effect: "fadeIn"})
                        }
                        e.data("loaded", 1)
                    },
                    error: function () {
                        n.eq(e.index()).html('<li class="item"><p style="text-align: center;color:#999;margin:10px 0;">加载失败，请稍后再试！</p></li>'), n.eq(e.index()).removeClass("loading")
                    }
                }))
            }), t(".article-list").on("click", ".load-more", function () {
                var e = t(this);
                if (!e.hasClass("disabled")) {
                    var n = e.data("page");
                    var cate = e.data("cate");
                    n = n ? n + 1 : 2, e.parent().addClass("loading"), t.ajax({
                        type: "POST",
                        url: wpcom_ajaxurl,
                        data: {c: "project", action: "get_index_article", id: 'news', pageid: n, 'token': 1, 'fields': 'thumb,note', 'cate': cate},
                        dataType: "html",
                        success: function (i) {
                            if ("0" == i)e.addClass("disabled").text("已经到底了"); else {
                                var a = t(i);
                                e.parent().before(a), a.find(".j-lazy").lazyload({
                                    threshold: -50,
                                    effect: "fadeIn"
                                }), e.data("page", n)
                            }
                            e.parent().removeClass("loading")
                        },
                        error: function () {
                            e.parent().removeClass("loading")
                        }
                    })
                }
            }), t(".special-wrap").on("click", ".load-more", function () {
                var e = t(this);
                if (!e.hasClass("disabled")) {
                    var i = e.data("page");
                    i = i ? i + 1 : 2, e.parent().addClass("loading"), t.ajax({
                        type: "POST",
                        url: wpcom_ajaxurl,
                        data: {action: "wpcom_load_special", page: i},
                        dataType: "html",
                        success: function (t) {
                            "0" == t ? e.addClass("disabled").text("已经到底了") : (e.closest(".special-wrap").find(".special-list").append(t), e.data("page", i)), e.parent().removeClass("loading")
                        },
                        error: function () {
                            e.parent().removeClass("loading")
                        }
                    })
                }
            }), window.baidu_map = function (t, e, i, n) {
                var a = new BMap.Map(t, {enableMapClick: !1}), o = new BMap.Point(i[0], i[1]), s = new BMap.Marker(o);
                if (a.centerAndZoom(o, 16), a.addOverlay(s), n && a.enableScrollWheelZoom(), a.setMapStyle({
                        styleJson: [{
                            featureType: "all",
                            elementType: "all",
                            stylers: {lightness: 30, saturation: -80}
                        }]
                    }), e) {
                    var r = new BMap.InfoWindow(e);
                    s.openInfoWindow(r), s.addEventListener("click", function () {
                        this.openInfoWindow(r)
                    })
                }
            }
        }(jQuery)
    }, {
        "../../../Themer/src/js/bootstrap": 2,
        "../../../Themer/src/js/jquery.flexslider": 3,
        "../../../Themer/src/js/jquery.lazyload": 4
    }], 2: [function (t, e, i) {
        if ("undefined" == typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");
        +function (t) {
            "use strict";
            var e = t.fn.jquery.split(" ")[0].split(".");
            if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
        }(jQuery), function (t) {
            "use strict";
            function e() {
                var t = document.createElement("bootstrap"), e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (var i in e)if (void 0 !== t.style[i])return {end: e[i]};
                return !1
            }

            t.fn.emulateTransitionEnd = function (e) {
                var i = !1, n = this;
                t(this).one("bsTransitionEnd", function () {
                    i = !0
                });
                var a = function () {
                    i || t(n).trigger(t.support.transition.end)
                };
                return setTimeout(a, e), this
            }, t(function () {
                t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
                    bindType: t.support.transition.end,
                    delegateType: t.support.transition.end,
                    handle: function (e) {
                        if (t(e.target).is(this))return e.handleObj.handler.apply(this, arguments)
                    }
                })
            })
        }(jQuery), function (t) {
            "use strict";
            function e(e) {
                return this.each(function () {
                    var i = t(this), a = i.data("bs.alert");
                    a || i.data("bs.alert", a = new n(this)), "string" == typeof e && a[e].call(i)
                })
            }

            var i = '[data-dismiss="alert"]', n = function (e) {
                t(e).on("click", i, this.close)
            };
            n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.prototype.close = function (e) {
                function i() {
                    s.detach().trigger("closed.bs.alert").remove()
                }

                var a = t(this), o = a.attr("data-target");
                o || (o = a.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
                var s = t("#" === o ? [] : o);
                e && e.preventDefault(), s.length || (s = a.closest(".alert")), s.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i())
            };
            var a = t.fn.alert;
            t.fn.alert = e, t.fn.alert.Constructor = n, t.fn.alert.noConflict = function () {
                return t.fn.alert = a, this
            }, t(document).on("click.bs.alert.data-api", i, n.prototype.close)
        }(jQuery), function (t) {
            "use strict";
            function e(e) {
                return this.each(function () {
                    var n = t(this), a = n.data("bs.button"), o = "object" == typeof e && e;
                    a || n.data("bs.button", a = new i(this, o)), "toggle" == e ? a.toggle() : e && a.setState(e)
                })
            }

            var i = function (e, n) {
                this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.isLoading = !1
            };
            i.VERSION = "3.3.7", i.DEFAULTS = {loadingText: "loading..."}, i.prototype.setState = function (e) {
                var i = "disabled", n = this.$element, a = n.is("input") ? "val" : "html", o = n.data();
                e += "Text", null == o.resetText && n.data("resetText", n[a]()), setTimeout(t.proxy(function () {
                    n[a](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, n.addClass(i).attr(i, i).prop(i, !0)) : this.isLoading && (this.isLoading = !1, n.removeClass(i).removeAttr(i).prop(i, !1))
                }, this), 0)
            }, i.prototype.toggle = function () {
                var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
                if (e.length) {
                    var i = this.$element.find("input");
                    "radio" == i.prop("type") ? (i.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), t && i.trigger("change")
                } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
            };
            var n = t.fn.button;
            t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function () {
                return t.fn.button = n, this
            }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (i) {
                var n = t(i.target).closest(".btn");
                e.call(n, "toggle"), t(i.target).is('input[type="radio"], input[type="checkbox"]') || (i.preventDefault(), n.is("input,button") ? n.trigger("focus") : n.find("input:visible,button:visible").first().trigger("focus"))
            }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
                t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
            })
        }(jQuery), function (t) {
            "use strict";
            function e(e) {
                return this.each(function () {
                    var n = t(this), a = n.data("bs.carousel"), o = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e), s = "string" == typeof e ? e : o.slide;
                    a || n.data("bs.carousel", a = new i(this, o)), "number" == typeof e ? a.to(e) : s ? a[s]() : o.interval && a.pause().cycle()
                })
            }

            var i = function (e, i) {
                this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
            };
            i.VERSION = "3.3.7", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
                interval: 5e3,
                pause: "hover",
                wrap: !0,
                keyboard: !0
            }, i.prototype.keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName)) {
                    switch (t.which) {
                        case 37:
                            this.prev();
                            break;
                        case 39:
                            this.next();
                            break;
                        default:
                            return
                    }
                    t.preventDefault()
                }
            }, i.prototype.cycle = function (e) {
                return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
            }, i.prototype.getItemIndex = function (t) {
                return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
            }, i.prototype.getItemForDirection = function (t, e) {
                var i = this.getItemIndex(e);
                if (("prev" == t && 0 === i || "next" == t && i == this.$items.length - 1) && !this.options.wrap)return e;
                var n = "prev" == t ? -1 : 1, a = (i + n) % this.$items.length;
                return this.$items.eq(a)
            }, i.prototype.to = function (t) {
                var e = this, i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
                if (!(t > this.$items.length - 1 || t < 0))return this.sliding ? this.$element.one("slid.bs.carousel", function () {
                    e.to(t)
                }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
            }, i.prototype.pause = function (e) {
                return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
            }, i.prototype.next = function () {
                if (!this.sliding)return this.slide("next")
            }, i.prototype.prev = function () {
                if (!this.sliding)return this.slide("prev")
            }, i.prototype.slide = function (e, n) {
                var a = this.$element.find(".item.active"), o = n || this.getItemForDirection(e, a), s = this.interval, r = "next" == e ? "left" : "right", l = this;
                if (o.hasClass("active"))return this.sliding = !1;
                var d = o[0], c = t.Event("slide.bs.carousel", {relatedTarget: d, direction: r});
                if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                    if (this.sliding = !0, s && this.pause(), this.$indicators.length) {
                        this.$indicators.find(".active").removeClass("active");
                        var u = t(this.$indicators.children()[this.getItemIndex(o)]);
                        u && u.addClass("active")
                    }
                    var p = t.Event("slid.bs.carousel", {relatedTarget: d, direction: r});
                    return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, a.addClass(r), o.addClass(r), a.one("bsTransitionEnd", function () {
                        o.removeClass([e, r].join(" ")).addClass("active"), a.removeClass(["active", r].join(" ")), l.sliding = !1, setTimeout(function () {
                            l.$element.trigger(p)
                        }, 0)
                    }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (a.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(p)), s && this.cycle(), this
                }
            };
            var n = t.fn.carousel;
            t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function () {
                return t.fn.carousel = n, this
            };
            var a = function (i) {
                var n, a = t(this), o = t(a.attr("data-target") || (n = a.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""));
                if (o.hasClass("carousel")) {
                    var s = t.extend({}, o.data(), a.data()), r = a.attr("data-slide-to");
                    r && (s.interval = !1), e.call(o, s), r && o.data("bs.carousel").to(r), i.preventDefault()
                }
            };
            t(document).on("click.bs.carousel.data-api", "[data-slide]", a).on("click.bs.carousel.data-api", "[data-slide-to]", a), t(window).on("load", function () {
                t('[data-ride="carousel"]').each(function () {
                    var i = t(this);
                    e.call(i, i.data())
                })
            })
        }(jQuery), function (t) {
            "use strict";
            function e(e) {
                var i, n = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
                return t(n)
            }

            function i(e) {
                return this.each(function () {
                    var i = t(this), a = i.data("bs.collapse"), o = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e);
                    !a && o.toggle && /show|hide/.test(e) && (o.toggle = !1), a || i.data("bs.collapse", a = new n(this, o)), "string" == typeof e && a[e]()
                })
            }

            var n = function (e, i) {
                this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
            };
            n.VERSION = "3.3.7", n.TRANSITION_DURATION = 350, n.DEFAULTS = {toggle: !0}, n.prototype.dimension = function () {
                return this.$element.hasClass("width") ? "width" : "height"
            }, n.prototype.show = function () {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var e, a = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                    if (!(a && a.length && (e = a.data("bs.collapse")) && e.transitioning)) {
                        var o = t.Event("show.bs.collapse");
                        if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                            a && a.length && (i.call(a, "hide"), e || a.data("bs.collapse", null));
                            var s = this.dimension();
                            this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                            var r = function () {
                                this.$element.removeClass("collapsing").addClass("collapse in")[s](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                            };
                            if (!t.support.transition)return r.call(this);
                            var l = t.camelCase(["scroll", s].join("-"));
                            this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(n.TRANSITION_DURATION)[s](this.$element[0][l])
                        }
                    }
                }
            }, n.prototype.hide = function () {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var e = t.Event("hide.bs.collapse");
                    if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                        var i = this.dimension();
                        this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                        var a = function () {
                            this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                        };
                        if (!t.support.transition)return a.call(this);
                        this.$element[i](0).one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(n.TRANSITION_DURATION)
                    }
                }
            }, n.prototype.toggle = function () {
                this[this.$element.hasClass("in") ? "hide" : "show"]()
            }, n.prototype.getParent = function () {
                return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (i, n) {
                    var a = t(n);
                    this.addAriaAndCollapsedClass(e(a), a)
                }, this)).end()
            }, n.prototype.addAriaAndCollapsedClass = function (t, e) {
                var i = t.hasClass("in");
                t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
            };
            var a = t.fn.collapse;
            t.fn.collapse = i, t.fn.collapse.Constructor = n, t.fn.collapse.noConflict = function () {
                return t.fn.collapse = a, this
            }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (n) {
                var a = t(this);
                a.attr("data-target") || n.preventDefault();
                var o = e(a), s = o.data("bs.collapse"), r = s ? "toggle" : a.data();
                i.call(o, r)
            })
        }(jQuery), function (t) {
            "use strict";
            function e(e) {
                var i = e.attr("data-target");
                i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
                var n = i && t(i);
                return n && n.length ? n : e.parent()
            }

            function i(i) {
                i && 3 === i.which || (t(a).remove(), t(o).each(function () {
                    var n = t(this), a = e(n), o = {relatedTarget: this};
                    a.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(a[0], i.target) || (a.trigger(i = t.Event("hide.bs.dropdown", o)), i.isDefaultPrevented() || (n.attr("aria-expanded", "false"), a.removeClass("open").trigger(t.Event("hidden.bs.dropdown", o)))))
                }))
            }

            function n(e) {
                return this.each(function () {
                    var i = t(this), n = i.data("bs.dropdown");
                    n || i.data("bs.dropdown", n = new s(this)), "string" == typeof e && n[e].call(i)
                })
            }

            var a = ".dropdown-backdrop", o = '[data-toggle="dropdown"]', s = function (e) {
                t(e).on("click.bs.dropdown", this.toggle)
            };
            s.VERSION = "3.3.7", s.prototype.toggle = function (n) {
                var a = t(this);
                if (!a.is(".disabled, :disabled")) {
                    var o = e(a), s = o.hasClass("open");
                    if (i(), !s) {
                        "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                        var r = {relatedTarget: this};
                        if (o.trigger(n = t.Event("show.bs.dropdown", r)), n.isDefaultPrevented())return;
                        a.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger(t.Event("shown.bs.dropdown", r))
                    }
                    return !1
                }
            }, s.prototype.keydown = function (i) {
                if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
                    var n = t(this);
                    if (i.preventDefault(), i.stopPropagation(), !n.is(".disabled, :disabled")) {
                        var a = e(n), s = a.hasClass("open");
                        if (!s && 27 != i.which || s && 27 == i.which)return 27 == i.which && a.find(o).trigger("focus"), n.trigger("click");
                        var r = a.find(".dropdown-menu li:not(.disabled):visible a");
                        if (r.length) {
                            var l = r.index(i.target);
                            38 == i.which && l > 0 && l--, 40 == i.which && l < r.length - 1 && l++, ~l || (l = 0), r.eq(l).trigger("focus")
                        }
                    }
                }
            };
            var r = t.fn.dropdown;
            t.fn.dropdown = n, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function () {
                return t.fn.dropdown = r, this
            }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
                t.stopPropagation()
            }).on("click.bs.dropdown.data-api", o, s.prototype.toggle).on("keydown.bs.dropdown.data-api", o, s.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", s.prototype.keydown)
        }(jQuery), function (t) {
            "use strict";
            function e(e, n) {
                return this.each(function () {
                    var a = t(this), o = a.data("bs.modal"), s = t.extend({}, i.DEFAULTS, a.data(), "object" == typeof e && e);
                    o || a.data("bs.modal", o = new i(this, s)), "string" == typeof e ? o[e](n) : s.show && o.show(n)
                })
            }

            var i = function (e, i) {
                this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
                    this.$element.trigger("loaded.bs.modal")
                }, this))
            };
            i.VERSION = "3.3.7", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
                backdrop: !0,
                keyboard: !0,
                show: !0
            }, i.prototype.toggle = function (t) {
                return this.isShown ? this.hide() : this.show(t)
            }, i.prototype.show = function (e) {
                var n = this, a = t.Event("show.bs.modal", {relatedTarget: e});
                this.$element.trigger(a), this.isShown || a.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
                    n.$element.one("mouseup.dismiss.bs.modal", function (e) {
                        t(e.target).is(n.$element) && (n.ignoreBackdropClick = !0)
                    })
                }), this.backdrop(function () {
                    var a = t.support.transition && n.$element.hasClass("fade");
                    n.$element.parent().length || n.$element.appendTo(n.$body), n.$element.show().scrollTop(0), n.adjustDialog(), a && n.$element[0].offsetWidth, n.$element.addClass("in"), n.enforceFocus();
                    var o = t.Event("shown.bs.modal", {relatedTarget: e});
                    a ? n.$dialog.one("bsTransitionEnd", function () {
                        n.$element.trigger("focus").trigger(o)
                    }).emulateTransitionEnd(i.TRANSITION_DURATION) : n.$element.trigger("focus").trigger(o)
                }))
            }, i.prototype.hide = function (e) {
                e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
            }, i.prototype.enforceFocus = function () {
                t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
                    document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
                }, this))
            }, i.prototype.escape = function () {
                this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
                    27 == t.which && this.hide()
                }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
            }, i.prototype.resize = function () {
                this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
            }, i.prototype.hideModal = function () {
                var t = this;
                this.$element.hide(), this.backdrop(function () {
                    t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
                })
            }, i.prototype.removeBackdrop = function () {
                this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
            }, i.prototype.backdrop = function (e) {
                var n = this, a = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var o = t.support.transition && a;
                    if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + a).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
                            if (this.ignoreBackdropClick)return void(this.ignoreBackdropClick = !1);
                            t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())
                        }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e)return;
                    o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
                } else if (!this.isShown && this.$backdrop) {
                    this.$backdrop.removeClass("in");
                    var s = function () {
                        n.removeBackdrop(), e && e()
                    };
                    t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", s).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : s()
                } else e && e()
            }, i.prototype.handleUpdate = function () {
                this.adjustDialog()
            }, i.prototype.adjustDialog = function () {
                var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
                this.$element.css({
                    paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
                    paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
                })
            }, i.prototype.resetAdjustments = function () {
                this.$element.css({paddingLeft: "", paddingRight: ""})
            }, i.prototype.checkScrollbar = function () {
                var t = window.innerWidth;
                if (!t) {
                    var e = document.documentElement.getBoundingClientRect();
                    t = e.right - Math.abs(e.left)
                }
                this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
            }, i.prototype.setScrollbar = function () {
                var t = parseInt(this.$body.css("padding-right") || 0, 10);
                this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
            }, i.prototype.resetScrollbar = function () {
                this.$body.css("padding-right", this.originalBodyPad)
            }, i.prototype.measureScrollbar = function () {
                var t = document.createElement("div");
                t.className = "modal-scrollbar-measure", this.$body.append(t);
                var e = t.offsetWidth - t.clientWidth;
                return this.$body[0].removeChild(t), e
            };
            var n = t.fn.modal;
            t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function () {
                return t.fn.modal = n, this
            }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
                var n = t(this), a = n.attr("href"), o = t(n.attr("data-target") || a && a.replace(/.*(?=#[^\s]+$)/, "")), s = o.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(a) && a}, o.data(), n.data());
                n.is("a") && i.preventDefault(), o.one("show.bs.modal", function (t) {
                    t.isDefaultPrevented() || o.one("hidden.bs.modal", function () {
                        n.is(":visible") && n.trigger("focus")
                    })
                }), e.call(o, s, this)
            })
        }(jQuery), function (t) {
            "use strict";
            function e(e) {
                return this.each(function () {
                    var n = t(this), a = n.data("bs.tooltip"), o = "object" == typeof e && e;
                    !a && /destroy|hide/.test(e) || (a || n.data("bs.tooltip", a = new i(this, o)), "string" == typeof e && a[e]())
                })
            }

            var i = function (t, e) {
                this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
            };
            i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
                animation: !0,
                placement: "top",
                selector: !1,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                container: !1,
                viewport: {selector: "body", padding: 0}
            }, i.prototype.init = function (e, i, n) {
                if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                        click: !1,
                        hover: !1,
                        focus: !1
                    }, this.$element[0] instanceof document.constructor && !this.options.selector)throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
                for (var a = this.options.trigger.split(" "), o = a.length; o--;) {
                    var s = a[o];
                    if ("click" == s)this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != s) {
                        var r = "hover" == s ? "mouseenter" : "focusin", l = "hover" == s ? "mouseleave" : "focusout";
                        this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                    }
                }
                this.options.selector ? this._options = t.extend({}, this.options, {
                    trigger: "manual",
                    selector: ""
                }) : this.fixTitle()
            }, i.prototype.getDefaults = function () {
                return i.DEFAULTS
            }, i.prototype.getOptions = function (e) {
                return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
                    show: e.delay,
                    hide: e.delay
                }), e
            }, i.prototype.getDelegateOptions = function () {
                var e = {}, i = this.getDefaults();
                return this._options && t.each(this._options, function (t, n) {
                    i[t] != n && (e[t] = n)
                }), e
            }, i.prototype.enter = function (e) {
                var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
                return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
                    "in" == i.hoverState && i.show()
                }, i.options.delay.show)) : i.show())
            }, i.prototype.isInStateTrue = function () {
                for (var t in this.inState)if (this.inState[t])return !0;
                return !1
            }, i.prototype.leave = function (e) {
                var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
                if (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), !i.isInStateTrue()) {
                    if (clearTimeout(i.timeout), i.hoverState = "out", !i.options.delay || !i.options.delay.hide)return i.hide();
                    i.timeout = setTimeout(function () {
                        "out" == i.hoverState && i.hide()
                    }, i.options.delay.hide)
                }
            }, i.prototype.show = function () {
                var e = t.Event("show.bs." + this.type);
                if (this.hasContent() && this.enabled) {
                    this.$element.trigger(e);
                    var n = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                    if (e.isDefaultPrevented() || !n)return;
                    var a = this, o = this.tip(), s = this.getUID(this.type);
                    this.setContent(), o.attr("id", s), this.$element.attr("aria-describedby", s), this.options.animation && o.addClass("fade");
                    var r = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement, l = /\s?auto?\s?/i, d = l.test(r);
                    d && (r = r.replace(l, "") || "top"), o.detach().css({
                        top: 0,
                        left: 0,
                        display: "block"
                    }).addClass(r).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
                    var c = this.getPosition(), u = o[0].offsetWidth, p = o[0].offsetHeight;
                    if (d) {
                        var h = r, f = this.getPosition(this.$viewport);
                        r = "bottom" == r && c.bottom + p > f.bottom ? "top" : "top" == r && c.top - p < f.top ? "bottom" : "right" == r && c.right + u > f.width ? "left" : "left" == r && c.left - u < f.left ? "right" : r,
                            o.removeClass(h).addClass(r)
                    }
                    var v = this.getCalculatedOffset(r, c, u, p);
                    this.applyPlacement(v, r);
                    var m = function () {
                        var t = a.hoverState;
                        a.$element.trigger("shown.bs." + a.type), a.hoverState = null, "out" == t && a.leave(a)
                    };
                    t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", m).emulateTransitionEnd(i.TRANSITION_DURATION) : m()
                }
            }, i.prototype.applyPlacement = function (e, i) {
                var n = this.tip(), a = n[0].offsetWidth, o = n[0].offsetHeight, s = parseInt(n.css("margin-top"), 10), r = parseInt(n.css("margin-left"), 10);
                isNaN(s) && (s = 0), isNaN(r) && (r = 0), e.top += s, e.left += r, t.offset.setOffset(n[0], t.extend({
                    using: function (t) {
                        n.css({top: Math.round(t.top), left: Math.round(t.left)})
                    }
                }, e), 0), n.addClass("in");
                var l = n[0].offsetWidth, d = n[0].offsetHeight;
                "top" == i && d != o && (e.top = e.top + o - d);
                var c = this.getViewportAdjustedDelta(i, e, l, d);
                c.left ? e.left += c.left : e.top += c.top;
                var u = /top|bottom/.test(i), p = u ? 2 * c.left - a + l : 2 * c.top - o + d, h = u ? "offsetWidth" : "offsetHeight";
                n.offset(e), this.replaceArrow(p, n[0][h], u)
            }, i.prototype.replaceArrow = function (t, e, i) {
                this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
            }, i.prototype.setContent = function () {
                var t = this.tip(), e = this.getTitle();
                t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
            }, i.prototype.hide = function (e) {
                function n() {
                    "in" != a.hoverState && o.detach(), a.$element && a.$element.removeAttr("aria-describedby").trigger("hidden.bs." + a.type), e && e()
                }

                var a = this, o = t(this.$tip), s = t.Event("hide.bs." + this.type);
                if (this.$element.trigger(s), !s.isDefaultPrevented())return o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n(), this.hoverState = null, this
            }, i.prototype.fixTitle = function () {
                var t = this.$element;
                (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
            }, i.prototype.hasContent = function () {
                return this.getTitle()
            }, i.prototype.getPosition = function (e) {
                e = e || this.$element;
                var i = e[0], n = "BODY" == i.tagName, a = i.getBoundingClientRect();
                null == a.width && (a = t.extend({}, a, {width: a.right - a.left, height: a.bottom - a.top}));
                var o = window.SVGElement && i instanceof window.SVGElement, s = n ? {
                    top: 0,
                    left: 0
                } : o ? null : e.offset(), r = {scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()}, l = n ? {
                    width: t(window).width(),
                    height: t(window).height()
                } : null;
                return t.extend({}, a, r, l, s)
            }, i.prototype.getCalculatedOffset = function (t, e, i, n) {
                return "bottom" == t ? {
                    top: e.top + e.height,
                    left: e.left + e.width / 2 - i / 2
                } : "top" == t ? {
                    top: e.top - n,
                    left: e.left + e.width / 2 - i / 2
                } : "left" == t ? {
                    top: e.top + e.height / 2 - n / 2,
                    left: e.left - i
                } : {top: e.top + e.height / 2 - n / 2, left: e.left + e.width}
            }, i.prototype.getViewportAdjustedDelta = function (t, e, i, n) {
                var a = {top: 0, left: 0};
                if (!this.$viewport)return a;
                var o = this.options.viewport && this.options.viewport.padding || 0, s = this.getPosition(this.$viewport);
                if (/right|left/.test(t)) {
                    var r = e.top - o - s.scroll, l = e.top + o - s.scroll + n;
                    r < s.top ? a.top = s.top - r : l > s.top + s.height && (a.top = s.top + s.height - l)
                } else {
                    var d = e.left - o, c = e.left + o + i;
                    d < s.left ? a.left = s.left - d : c > s.right && (a.left = s.left + s.width - c)
                }
                return a
            }, i.prototype.getTitle = function () {
                var t = this.$element, e = this.options;
                return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
            }, i.prototype.getUID = function (t) {
                do {
                    t += ~~(1e6 * Math.random())
                } while (document.getElementById(t));
                return t
            }, i.prototype.tip = function () {
                if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length))throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
                return this.$tip
            }, i.prototype.arrow = function () {
                return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
            }, i.prototype.enable = function () {
                this.enabled = !0
            }, i.prototype.disable = function () {
                this.enabled = !1
            }, i.prototype.toggleEnabled = function () {
                this.enabled = !this.enabled
            }, i.prototype.toggle = function (e) {
                var i = this;
                e && ((i = t(e.currentTarget).data("bs." + this.type)) || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
            }, i.prototype.destroy = function () {
                var t = this;
                clearTimeout(this.timeout), this.hide(function () {
                    t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
                })
            };
            var n = t.fn.tooltip;
            t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function () {
                return t.fn.tooltip = n, this
            }
        }(jQuery), function (t) {
            "use strict";
            function e(e) {
                return this.each(function () {
                    var n = t(this), a = n.data("bs.popover"), o = "object" == typeof e && e;
                    !a && /destroy|hide/.test(e) || (a || n.data("bs.popover", a = new i(this, o)), "string" == typeof e && a[e]())
                })
            }

            var i = function (t, e) {
                this.init("popover", t, e)
            };
            if (!t.fn.tooltip)throw new Error("Popover requires tooltip.js");
            i.VERSION = "3.3.7", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function () {
                return i.DEFAULTS
            }, i.prototype.setContent = function () {
                var t = this.tip(), e = this.getTitle(), i = this.getContent();
                t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
            }, i.prototype.hasContent = function () {
                return this.getTitle() || this.getContent()
            }, i.prototype.getContent = function () {
                var t = this.$element, e = this.options;
                return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
            }, i.prototype.arrow = function () {
                return this.$arrow = this.$arrow || this.tip().find(".arrow")
            };
            var n = t.fn.popover;
            t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function () {
                return t.fn.popover = n, this
            }
        }(jQuery), function (t) {
            "use strict";
            function e(i, n) {
                this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, n), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
            }

            function i(i) {
                return this.each(function () {
                    var n = t(this), a = n.data("bs.scrollspy"), o = "object" == typeof i && i;
                    a || n.data("bs.scrollspy", a = new e(this, o)), "string" == typeof i && a[i]()
                })
            }

            e.VERSION = "3.3.7", e.DEFAULTS = {offset: 10}, e.prototype.getScrollHeight = function () {
                return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
            }, e.prototype.refresh = function () {
                var e = this, i = "offset", n = 0;
                this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", n = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
                    var e = t(this), a = e.data("target") || e.attr("href"), o = /^#./.test(a) && t(a);
                    return o && o.length && o.is(":visible") && [[o[i]().top + n, a]] || null
                }).sort(function (t, e) {
                    return t[0] - e[0]
                }).each(function () {
                    e.offsets.push(this[0]), e.targets.push(this[1])
                })
            }, e.prototype.process = function () {
                var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), n = this.options.offset + i - this.$scrollElement.height(), a = this.offsets, o = this.targets, s = this.activeTarget;
                if (this.scrollHeight != i && this.refresh(), e >= n)return s != (t = o[o.length - 1]) && this.activate(t);
                if (s && e < a[0])return this.activeTarget = null, this.clear();
                for (t = a.length; t--;)s != o[t] && e >= a[t] && (void 0 === a[t + 1] || e < a[t + 1]) && this.activate(o[t])
            }, e.prototype.activate = function (e) {
                this.activeTarget = e, this.clear();
                var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', n = t(i).parents("li").addClass("active");
                n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate.bs.scrollspy")
            }, e.prototype.clear = function () {
                t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
            };
            var n = t.fn.scrollspy;
            t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
                return t.fn.scrollspy = n, this
            }, t(window).on("load.bs.scrollspy.data-api", function () {
                t('[data-spy="scroll"]').each(function () {
                    var e = t(this);
                    i.call(e, e.data())
                })
            })
        }(jQuery), function (t) {
            "use strict";
            function e(e) {
                return this.each(function () {
                    var n = t(this), a = n.data("bs.tab");
                    a || n.data("bs.tab", a = new i(this)), "string" == typeof e && a[e]()
                })
            }

            var i = function (e) {
                this.element = t(e)
            };
            i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.show = function () {
                var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), n = e.data("target");
                if (n || (n = e.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
                    var a = i.find(".active:last a"), o = t.Event("hide.bs.tab", {relatedTarget: e[0]}), s = t.Event("show.bs.tab", {relatedTarget: a[0]});
                    if (a.trigger(o), e.trigger(s), !s.isDefaultPrevented() && !o.isDefaultPrevented()) {
                        var r = t(n);
                        this.activate(e.closest("li"), i), this.activate(r, r.parent(), function () {
                            a.trigger({type: "hidden.bs.tab", relatedTarget: e[0]}), e.trigger({
                                type: "shown.bs.tab",
                                relatedTarget: a[0]
                            })
                        })
                    }
                }
            }, i.prototype.activate = function (e, n, a) {
                function o() {
                    s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), a && a()
                }

                var s = n.find("> .active"), r = a && t.support.transition && (s.length && s.hasClass("fade") || !!n.find("> .fade").length);
                s.length && r ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), s.removeClass("in")
            };
            var n = t.fn.tab;
            t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function () {
                return t.fn.tab = n, this
            };
            var a = function (i) {
                i.preventDefault(), e.call(t(this), "show")
            };
            t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', a).on("click.bs.tab.data-api", '[data-toggle="pill"]', a)
        }(jQuery), function (t) {
            "use strict";
            function e(e) {
                return this.each(function () {
                    var n = t(this), a = n.data("bs.affix"), o = "object" == typeof e && e;
                    a || n.data("bs.affix", a = new i(this, o)), "string" == typeof e && a[e]()
                })
            }

            var i = function (e, n) {
                this.options = t.extend({}, i.DEFAULTS, n), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
            };
            i.VERSION = "3.3.7", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
                offset: 0,
                target: window
            }, i.prototype.getState = function (t, e, i, n) {
                var a = this.$target.scrollTop(), o = this.$element.offset(), s = this.$target.height();
                if (null != i && "top" == this.affixed)return a < i && "top";
                if ("bottom" == this.affixed)return null != i ? !(a + this.unpin <= o.top) && "bottom" : !(a + s <= t - n) && "bottom";
                var r = null == this.affixed, l = r ? a : o.top, d = r ? s : e;
                return null != i && a <= i ? "top" : null != n && l + d >= t - n && "bottom"
            }, i.prototype.getPinnedOffset = function () {
                if (this.pinnedOffset)return this.pinnedOffset;
                this.$element.removeClass(i.RESET).addClass("affix");
                var t = this.$target.scrollTop(), e = this.$element.offset();
                return this.pinnedOffset = e.top - t
            }, i.prototype.checkPositionWithEventLoop = function () {
                setTimeout(t.proxy(this.checkPosition, this), 1)
            }, i.prototype.checkPosition = function () {
                if (this.$element.is(":visible")) {
                    var e = this.$element.height(), n = this.options.offset, a = n.top, o = n.bottom, s = Math.max(t(document).height(), t(document.body).height());
                    "object" != typeof n && (o = a = n), "function" == typeof a && (a = n.top(this.$element)), "function" == typeof o && (o = n.bottom(this.$element));
                    var r = this.getState(s, e, a, o);
                    if (this.affixed != r) {
                        null != this.unpin && this.$element.css("top", "");
                        var l = "affix" + (r ? "-" + r : ""), d = t.Event(l + ".bs.affix");
                        if (this.$element.trigger(d), d.isDefaultPrevented())return;
                        this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
                    }
                    "bottom" == r && this.$element.offset({top: s - e - o})
                }
            };
            var n = t.fn.affix;
            t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function () {
                return t.fn.affix = n, this
            }, t(window).on("load", function () {
                t('[data-spy="affix"]').each(function () {
                    var i = t(this), n = i.data();
                    n.offset = n.offset || {}, null != n.offsetBottom && (n.offset.bottom = n.offsetBottom), null != n.offsetTop && (n.offset.top = n.offsetTop), e.call(i, n)
                })
            })
        }(jQuery)
    }, {}], 3: [function (t, e, i) {
        !function (t) {
            t.flexslider = function (e, i) {
                var n = t(e);
                n.vars = t.extend({}, t.flexslider.defaults, i);
                var a, o = n.vars.namespace, s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture, r = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch, l = "click touchend MSPointerUp keyup", d = "", c = "vertical" === n.vars.direction, u = n.vars.reverse, p = n.vars.itemWidth > 0, h = "fade" === n.vars.animation, f = "" !== n.vars.asNavFor, v = {};
                t.data(e, "flexslider", n), v = {
                    init: function () {
                        n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = t(n.vars.selector, n), n.container = t(n.containerSelector, n), n.count = n.slides.length, n.syncExists = t(n.vars.sync).length > 0, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = c ? "top" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !h && n.vars.useCSS && function () {
                                var t = document.createElement("div"), e = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                                for (var i in e)if (void 0 !== t.style[e[i]])return n.pfx = e[i].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
                                return !1
                            }(), n.ensureAnimationEnd = "", "" !== n.vars.controlsContainer && (n.controlsContainer = t(n.vars.controlsContainer).length > 0 && t(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = t(n.vars.manualControls).length > 0 && t(n.vars.manualControls)), "" !== n.vars.customDirectionNav && (n.customDirectionNav = 2 === t(n.vars.customDirectionNav).length && t(n.vars.customDirectionNav)), n.vars.randomize && (n.slides.sort(function () {
                            return Math.round(Math.random()) - .5
                        }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && v.controlNav.setup(), n.vars.directionNav && v.directionNav.setup(), n.vars.keyboard && (1 === t(n.containerSelector).length || n.vars.multipleKeyboard) && t(document).bind("keyup", function (t) {
                            var e = t.keyCode;
                            if (!n.animating && (39 === e || 37 === e)) {
                                var i = 39 === e ? n.getTarget("next") : 37 === e && n.getTarget("prev");
                                n.flexAnimate(i, n.vars.pauseOnAction)
                            }
                        }), n.vars.mousewheel && n.bind("mousewheel", function (t, e, i, a) {
                            t.preventDefault();
                            var o = e < 0 ? n.getTarget("next") : n.getTarget("prev");
                            n.flexAnimate(o, n.vars.pauseOnAction)
                        }), n.vars.pausePlay && v.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && v.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function () {
                            n.manualPlay || n.manualPause || n.pause()
                        }, function () {
                            n.manualPause || n.manualPlay || n.stopped || n.play()
                        }), n.vars.pauseInvisible && v.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), f && v.asNav.setup(), r && n.vars.touch && v.touch(), (!h || h && n.vars.smoothHeight) && t(window).bind("resize orientationchange focus", v.resize), n.find("img").attr("draggable", "false"), setTimeout(function () {
                            n.vars.start(n)
                        }, 200)
                    }, asNav: {
                        setup: function () {
                            n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(o + "active-slide").eq(n.currentItem).addClass(o + "active-slide"), s ? (e._slider = n, n.slides.each(function () {
                                var e = this;
                                e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function (t) {
                                    t.preventDefault(), t.currentTarget._gesture && t.currentTarget._gesture.addPointer(t.pointerId)
                                }, !1), e.addEventListener("MSGestureTap", function (e) {
                                    e.preventDefault();
                                    var i = t(this), a = i.index();
                                    t(n.vars.asNavFor).data("flexslider").animating || i.hasClass("active") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0))
                                })
                            })) : n.slides.on(l, function (e) {
                                e.preventDefault();
                                var i = t(this), a = i.index();
                                i.offset().left - t(n).scrollLeft() <= 0 && i.hasClass(o + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : t(n.vars.asNavFor).data("flexslider").animating || i.hasClass(o + "active-slide") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0))
                            })
                        }
                    }, controlNav: {
                        setup: function () {
                            n.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
                        }, setupPaging: function () {
                            var e, i, a = "thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging", s = 1;
                            if (n.controlNavScaffold = t('<ol class="' + o + "control-nav " + o + a + '"></ol>'), n.pagingCount > 1)for (var r = 0; r < n.pagingCount; r++) {
                                if (i = n.slides.eq(r), e = "thumbnails" === n.vars.controlNav ? '<img src="' + i.attr("data-thumb") + '"/>' : "<a>" + s + "</a>", "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions) {
                                    var c = i.attr("data-thumbcaption");
                                    "" !== c && void 0 !== c && (e += '<span class="' + o + 'caption">' + c + "</span>")
                                }
                                n.controlNavScaffold.append("<li>" + e + "</li>"), s++
                            }
                            n.controlsContainer ? t(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), v.controlNav.set(), v.controlNav.active(), n.controlNavScaffold.delegate("a, img", l, function (e) {
                                if (e.preventDefault(), "" === d || d === e.type) {
                                    var i = t(this), a = n.controlNav.index(i);
                                    i.hasClass(o + "active") || (n.direction = a > n.currentSlide ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction))
                                }
                                "" === d && (d = e.type), v.setToClearWatchedEvent()
                            })
                        }, setupManual: function () {
                            n.controlNav = n.manualControls, v.controlNav.active(), n.controlNav.bind(l, function (e) {
                                if (e.preventDefault(), "" === d || d === e.type) {
                                    var i = t(this), a = n.controlNav.index(i);
                                    i.hasClass(o + "active") || (a > n.currentSlide ? n.direction = "next" : n.direction = "prev", n.flexAnimate(a, n.vars.pauseOnAction))
                                }
                                "" === d && (d = e.type), v.setToClearWatchedEvent()
                            })
                        }, set: function () {
                            var e = "thumbnails" === n.vars.controlNav ? "img" : "a";
                            n.controlNav = t("." + o + "control-nav li " + e, n.controlsContainer ? n.controlsContainer : n)
                        }, active: function () {
                            n.controlNav.removeClass(o + "active").eq(n.animatingTo).addClass(o + "active")
                        }, update: function (e, i) {
                            n.pagingCount > 1 && "add" === e ? n.controlNavScaffold.append(t("<li><a>" + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(i).closest("li").remove(), v.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(i, e) : v.controlNav.active()
                        }
                    }, directionNav: {
                        setup: function () {
                            var e = t('<ul class="' + o + 'direction-nav"><li class="' + o + 'nav-prev"><a class="' + o + 'prev" href="#">' + n.vars.prevText + '</a></li><li class="' + o + 'nav-next"><a class="' + o + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");
                            n.customDirectionNav ? n.directionNav = n.customDirectionNav : n.controlsContainer ? (t(n.controlsContainer).append(e), n.directionNav = t("." + o + "direction-nav li a", n.controlsContainer)) : (n.append(e), n.directionNav = t("." + o + "direction-nav li a", n)), v.directionNav.update(), n.directionNav.bind(l, function (e) {
                                e.preventDefault();
                                var i;
                                "" !== d && d !== e.type || (i = t(this).hasClass(o + "next") ? n.getTarget("next") : n.getTarget("prev"), n.flexAnimate(i, n.vars.pauseOnAction)), "" === d && (d = e.type), v.setToClearWatchedEvent()
                            })
                        }, update: function () {
                            var t = o + "disabled";
                            1 === n.pagingCount ? n.directionNav.addClass(t).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(t).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(t).filter("." + o + "prev").addClass(t).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(t).filter("." + o + "next").addClass(t).attr("tabindex", "-1") : n.directionNav.removeClass(t).removeAttr("tabindex")
                        }
                    }, pausePlay: {
                        setup: function () {
                            var e = t('<div class="' + o + 'pauseplay"><a></a></div>');
                            n.controlsContainer ? (n.controlsContainer.append(e), n.pausePlay = t("." + o + "pauseplay a", n.controlsContainer)) : (n.append(e), n.pausePlay = t("." + o + "pauseplay a", n)), v.pausePlay.update(n.vars.slideshow ? o + "pause" : o + "play"), n.pausePlay.bind(l, function (e) {
                                e.preventDefault(), "" !== d && d !== e.type || (t(this).hasClass(o + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === d && (d = e.type), v.setToClearWatchedEvent()
                            })
                        }, update: function (t) {
                            "play" === t ? n.pausePlay.removeClass(o + "pause").addClass(o + "play").html(n.vars.playText) : n.pausePlay.removeClass(o + "play").addClass(o + "pause").html(n.vars.pauseText)
                        }
                    }, touch: function () {
                        function t(t) {
                            t.stopPropagation(), n.animating ? t.preventDefault() : (n.pause(), e._gesture.addPointer(t.pointerId), C = 0, d = c ? n.h : n.w, v = Number(new Date), l = p && u && n.animatingTo === n.last ? 0 : p && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : p && n.currentSlide === n.last ? n.limit : p ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * d : (n.currentSlide + n.cloneOffset) * d)
                        }

                        function i(t) {
                            t.stopPropagation();
                            var i = t.target._slider;
                            if (i) {
                                var n = -t.translationX, a = -t.translationY;
                                if (C += c ? a : n, f = C, y = c ? Math.abs(C) < Math.abs(-n) : Math.abs(C) < Math.abs(-a), t.detail === t.MSGESTURE_FLAG_INERTIA)return void setImmediate(function () {
                                    e._gesture.stop()
                                });
                                (!y || Number(new Date) - v > 500) && (t.preventDefault(), !h && i.transitions && (i.vars.animationLoop || (f = C / (0 === i.currentSlide && C < 0 || i.currentSlide === i.last && C > 0 ? Math.abs(C) / d + 2 : 1)), i.setProps(l + f, "setTouch")))
                            }
                        }

                        function a(t) {
                            t.stopPropagation();
                            var e = t.target._slider;
                            if (e) {
                                if (e.animatingTo === e.currentSlide && !y && null !== f) {
                                    var i = u ? -f : f, n = i > 0 ? e.getTarget("next") : e.getTarget("prev");
                                    e.canAdvance(n) && (Number(new Date) - v < 550 && Math.abs(i) > 50 || Math.abs(i) > d / 2) ? e.flexAnimate(n, e.vars.pauseOnAction) : h || e.flexAnimate(e.currentSlide, e.vars.pauseOnAction, !0)
                                }
                                o = null, r = null, f = null, l = null, C = 0
                            }
                        }

                        var o, r, l, d, f, v, m, g, b, y = !1, w = 0, T = 0, C = 0;
                        s ? (e.style.msTouchAction = "none", e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", t, !1), e._slider = n, e.addEventListener("MSGestureChange", i, !1), e.addEventListener("MSGestureEnd", a, !1)) : (m = function (t) {
                            n.animating ? t.preventDefault() : (window.navigator.msPointerEnabled || 1 === t.touches.length) && (n.pause(), d = c ? n.h : n.w, v = Number(new Date), w = t.touches[0].pageX, T = t.touches[0].pageY, l = p && u && n.animatingTo === n.last ? 0 : p && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : p && n.currentSlide === n.last ? n.limit : p ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * d : (n.currentSlide + n.cloneOffset) * d, o = c ? T : w, r = c ? w : T, e.addEventListener("touchmove", g, !1), e.addEventListener("touchend", b, !1))
                        }, g = function (t) {
                            w = t.touches[0].pageX, T = t.touches[0].pageY, f = c ? o - T : o - w, y = c ? Math.abs(f) < Math.abs(w - r) : Math.abs(f) < Math.abs(T - r);
                            (!y || Number(new Date) - v > 500) && (t.preventDefault(), !h && n.transitions && (n.vars.animationLoop || (f /= 0 === n.currentSlide && f < 0 || n.currentSlide === n.last && f > 0 ? Math.abs(f) / d + 2 : 1), n.setProps(l + f, "setTouch")))
                        }, b = function (t) {
                            if (e.removeEventListener("touchmove", g, !1), n.animatingTo === n.currentSlide && !y && null !== f) {
                                var i = u ? -f : f, a = i > 0 ? n.getTarget("next") : n.getTarget("prev");
                                n.canAdvance(a) && (Number(new Date) - v < 550 && Math.abs(i) > 50 || Math.abs(i) > d / 2) ? n.flexAnimate(a, n.vars.pauseOnAction) : h || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0)
                            }
                            e.removeEventListener("touchend", b, !1), o = null, r = null, f = null, l = null
                        }, e.addEventListener("touchstart", m, !1))
                    }, resize: function () {
                        !n.animating && n.is(":visible") && (p || n.doMath(), h ? v.smoothHeight() : p ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : c ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && v.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal")))
                    }, smoothHeight: function (t) {
                        if (!c || h) {
                            var e = h ? n : n.viewport;
                            t ? e.animate({height: n.slides.eq(n.animatingTo).height()}, t) : e.height(n.slides.eq(n.animatingTo).height())
                        }
                    }, sync: function (e) {
                        var i = t(n.vars.sync).data("flexslider"), a = n.animatingTo;
                        switch (e) {
                            case"animate":
                                i.flexAnimate(a, n.vars.pauseOnAction, !1, !0);
                                break;
                            case"play":
                                i.playing || i.asNav || i.play();
                                break;
                            case"pause":
                                i.pause()
                        }
                    }, uniqueID: function (e) {
                        return e.filter("[id]").add(e.find("[id]")).each(function () {
                            var e = t(this);
                            e.attr("id", e.attr("id") + "_clone")
                        }), e
                    }, pauseInvisible: {
                        visProp: null, init: function () {
                            var t = v.pauseInvisible.getHiddenProp();
                            if (t) {
                                var e = t.replace(/[H|h]idden/, "") + "visibilitychange";
                                document.addEventListener(e, function () {
                                    v.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play()
                                })
                            }
                        }, isHidden: function () {
                            var t = v.pauseInvisible.getHiddenProp();
                            return !!t && document[t]
                        }, getHiddenProp: function () {
                            var t = ["webkit", "moz", "ms", "o"];
                            if ("hidden" in document)return "hidden";
                            for (var e = 0; e < t.length; e++)if (t[e] + "Hidden" in document)return t[e] + "Hidden";
                            return null
                        }
                    }, setToClearWatchedEvent: function () {
                        clearTimeout(a), a = setTimeout(function () {
                            d = ""
                        }, 3e3)
                    }
                }, n.flexAnimate = function (e, i, a, s, l) {
                    if (n.vars.animationLoop || e === n.currentSlide || (n.direction = e > n.currentSlide ? "next" : "prev"), f && 1 === n.pagingCount && (n.direction = n.currentItem < e ? "next" : "prev"), !n.animating && (n.canAdvance(e, l) || a) && n.is(":visible")) {
                        if (f && s) {
                            var d = t(n.vars.asNavFor).data("flexslider");
                            if (n.atEnd = 0 === e || e === n.count - 1, d.flexAnimate(e, !0, !1, !0, l), n.direction = n.currentItem < e ? "next" : "prev", d.direction = n.direction, Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e)return n.currentItem = e, n.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), !1;
                            n.currentItem = e, n.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), e = Math.floor(e / n.visible)
                        }
                        if (n.animating = !0, n.animatingTo = e, i && n.pause(), n.vars.before(n), n.syncExists && !l && v.sync("animate"), n.vars.controlNav && v.controlNav.active(), p || n.slides.removeClass(o + "active-slide").eq(e).addClass(o + "active-slide"), n.atEnd = 0 === e || e === n.last, n.vars.directionNav && v.directionNav.update(), e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), h)r ? (n.slides.eq(n.currentSlide).css({
                            opacity: 0,
                            zIndex: 1
                        }), n.slides.eq(e).css({
                            opacity: 1,
                            zIndex: 2
                        }), n.wrapup(y)) : (n.slides.eq(n.currentSlide).css({zIndex: 1}).animate({opacity: 0}, n.vars.animationSpeed, n.vars.easing), n.slides.eq(e).css({zIndex: 2}).animate({opacity: 1}, n.vars.animationSpeed, n.vars.easing, n.wrapup)); else {
                            var m, g, b, y = c ? n.slides.filter(":first").height() : n.computedW;
                            p ? (m = n.vars.itemMargin, b = (n.itemW + m) * n.move * n.animatingTo, g = b > n.limit && 1 !== n.visible ? n.limit : b) : g = 0 === n.currentSlide && e === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? u ? (n.count + n.cloneOffset) * y : 0 : n.currentSlide === n.last && 0 === e && n.vars.animationLoop && "prev" !== n.direction ? u ? 0 : (n.count + 1) * y : u ? (n.count - 1 - e + n.cloneOffset) * y : (e + n.cloneOffset) * y, n.setProps(g, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function () {
                                clearTimeout(n.ensureAnimationEnd), n.wrapup(y)
                            }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(function () {
                                n.wrapup(y)
                            }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function () {
                                n.wrapup(y)
                            })
                        }
                        n.vars.smoothHeight && v.smoothHeight(n.vars.animationSpeed)
                    }
                }, n.wrapup = function (t) {
                    h || p || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(t, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(t, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n)
                }, n.animateSlides = function () {
                    n.animating || n.flexAnimate(n.getTarget("next"))
                }, n.pause = function () {
                    clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && v.pausePlay.update("play"), n.syncExists && v.sync("pause")
                }, n.play = function () {
                    n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && v.pausePlay.update("pause"), n.syncExists && v.sync("play")
                }, n.stop = function () {
                    n.pause(), n.stopped = !0
                }, n.canAdvance = function (t, e) {
                    var i = f ? n.pagingCount - 1 : n.last;
                    return !!e || (!(!f || n.currentItem !== n.count - 1 || 0 !== t || "prev" !== n.direction) || (!f || 0 !== n.currentItem || t !== n.pagingCount - 1 || "next" === n.direction) && (!(t === n.currentSlide && !f) && (!!n.vars.animationLoop || (!n.atEnd || 0 !== n.currentSlide || t !== i || "next" === n.direction) && (!n.atEnd || n.currentSlide !== i || 0 !== t || "next" !== n.direction))))
                }, n.getTarget = function (t) {
                    return n.direction = t, "next" === t ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1
                }, n.setProps = function (t, e, i) {
                    var a = function () {
                        var i = t || (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo;
                        return -1 * function () {
                                if (p)return "setTouch" === e ? t : u && n.animatingTo === n.last ? 0 : u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : i;
                                switch (e) {
                                    case"setTotal":
                                        return u ? (n.count - 1 - n.currentSlide + n.cloneOffset) * t : (n.currentSlide + n.cloneOffset) * t;
                                    case"setTouch":
                                        return t;
                                    case"jumpEnd":
                                        return u ? t : n.count * t;
                                    case"jumpStart":
                                        return u ? n.count * t : t;
                                    default:
                                        return t
                                }
                            }() + "px"
                    }();
                    n.transitions && (a = c ? "translate3d(0," + a + ",0)" : "translate3d(" + a + ",0,0)", i = void 0 !== i ? i / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", i), n.container.css("transition-duration", i)), n.args[n.prop] = a, (n.transitions || void 0 === i) && n.container.css(n.args), n.container.css("transform", a)
                }, n.setup = function (e) {
                    if (h)n.slides.css({
                        width: "100%",
                        float: "left",
                        marginRight: "-100%",
                        position: "relative"
                    }), "init" === e && (r ? n.slides.css({
                        opacity: 0,
                        display: "block",
                        webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
                        zIndex: 1
                    }).eq(n.currentSlide).css({
                        opacity: 1,
                        zIndex: 2
                    }) : 0 == n.vars.fadeFirstSlide ? n.slides.css({
                        opacity: 0,
                        display: "block",
                        zIndex: 1
                    }).eq(n.currentSlide).css({zIndex: 2}).css({opacity: 1}) : n.slides.css({
                        opacity: 0,
                        display: "block",
                        zIndex: 1
                    }).eq(n.currentSlide).css({zIndex: 2}).animate({opacity: 1}, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && v.smoothHeight(); else {
                        var i, a;
                        "init" === e && (n.viewport = t('<div class="' + o + 'viewport"></div>').css({
                            overflow: "hidden",
                            position: "relative"
                        }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, u && (a = t.makeArray(n.slides).reverse(), n.slides = t(a), n.container.empty().append(n.slides))), n.vars.animationLoop && !p && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== e && n.container.find(".clone").remove(), n.container.append(v.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(v.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), n.newSlides = t(n.vars.selector, n), i = u ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, c && !p ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
                            n.newSlides.css({display: "block"}), n.doMath(), n.viewport.height(n.h), n.setProps(i * n.h, "init")
                        }, "init" === e ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(i * n.computedW, "init"), setTimeout(function () {
                            n.doMath(), n.newSlides.css({
                                width: n.computedW,
                                float: "left",
                                display: "block"
                            }), n.vars.smoothHeight && v.smoothHeight()
                        }, "init" === e ? 100 : 0))
                    }
                    p || n.slides.removeClass(o + "active-slide").eq(n.currentSlide).addClass(o + "active-slide"), n.vars.init(n)
                }, n.doMath = function () {
                    var t = n.slides.first(), e = n.vars.itemMargin, i = n.vars.minItems, a = n.vars.maxItems;
                    n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.h = t.height(), n.boxPadding = t.outerWidth() - t.width(), p ? (n.itemT = n.vars.itemWidth + e, n.minW = i ? i * n.itemT : n.w, n.maxW = a ? a * n.itemT - e : n.w, n.itemW = n.minW > n.w ? (n.w - e * (i - 1)) / i : n.maxW < n.w ? (n.w - e * (a - 1)) / a : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1),
                        n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + e * (n.count - 1) : (n.itemW + e) * n.count - n.w - e) : (n.itemW = n.w, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding
                }, n.update = function (t, e) {
                    n.doMath(), p || (t < n.currentSlide ? n.currentSlide += 1 : t <= n.currentSlide && 0 !== t && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === e && !p || n.pagingCount > n.controlNav.length ? v.controlNav.update("add") : ("remove" === e && !p || n.pagingCount < n.controlNav.length) && (p && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), v.controlNav.update("remove", n.last))), n.vars.directionNav && v.directionNav.update()
                }, n.addSlide = function (e, i) {
                    var a = t(e);
                    n.count += 1, n.last = n.count - 1, c && u ? void 0 !== i ? n.slides.eq(n.count - i).after(a) : n.container.prepend(a) : void 0 !== i ? n.slides.eq(i).before(a) : n.container.append(a), n.update(i, "add"), n.slides = t(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n)
                }, n.removeSlide = function (e) {
                    var i = isNaN(e) ? n.slides.index(t(e)) : e;
                    n.count -= 1, n.last = n.count - 1, isNaN(e) ? t(e, n.slides).remove() : c && u ? n.slides.eq(n.last).remove() : n.slides.eq(e).remove(), n.doMath(), n.update(i, "remove"), n.slides = t(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n)
                }, v.init()
            }, t(window).blur(function (t) {
                focused = !1
            }).focus(function (t) {
                focused = !0
            }), t.flexslider.defaults = {
                namespace: "flex-",
                selector: ".slides > li",
                animation: "fade",
                easing: "swing",
                direction: "horizontal",
                reverse: !1,
                animationLoop: !0,
                smoothHeight: !1,
                startAt: 0,
                slideshow: !0,
                slideshowSpeed: 7e3,
                animationSpeed: 600,
                initDelay: 0,
                randomize: !1,
                fadeFirstSlide: !0,
                thumbCaptions: !1,
                pauseOnAction: !0,
                pauseOnHover: !1,
                pauseInvisible: !0,
                useCSS: !0,
                touch: !0,
                video: !1,
                controlNav: !0,
                directionNav: !0,
                prevText: "Previous",
                nextText: "Next",
                keyboard: !0,
                multipleKeyboard: !1,
                mousewheel: !1,
                pausePlay: !1,
                pauseText: "Pause",
                playText: "Play",
                controlsContainer: "",
                manualControls: "",
                customDirectionNav: "",
                sync: "",
                asNavFor: "",
                itemWidth: 0,
                itemMargin: 0,
                minItems: 1,
                maxItems: 0,
                move: 0,
                allowOneSlide: !0,
                start: function () {
                },
                before: function () {
                },
                after: function () {
                },
                end: function () {
                },
                added: function () {
                },
                removed: function () {
                },
                init: function () {
                }
            }, t.fn.flexslider = function (e) {
                if (void 0 === e && (e = {}), "object" == typeof e)return this.each(function () {
                    var i = t(this), n = e.selector ? e.selector : ".slides > li", a = i.find(n);
                    1 === a.length && !0 === e.allowOneSlide || 0 === a.length ? (a.fadeIn(400), e.start && e.start(i)) : void 0 === i.data("flexslider") && new t.flexslider(this, e)
                });
                var i = t(this).data("flexslider");
                switch (e) {
                    case"play":
                        i.play();
                        break;
                    case"pause":
                        i.pause();
                        break;
                    case"stop":
                        i.stop();
                        break;
                    case"next":
                        i.flexAnimate(i.getTarget("next"), !0);
                        break;
                    case"prev":
                    case"previous":
                        i.flexAnimate(i.getTarget("prev"), !0);
                        break;
                    default:
                        "number" == typeof e && i.flexAnimate(e, !0)
                }
            }
        }(jQuery)
    }, {}], 4: [function (t, e, i) {
        !function (t, e, i, n) {
            var a = t(e);
            t.fn.lazyload = function (n) {
                function o() {
                    var e = 0;
                    r.each(function () {
                        var i = t(this);
                        if (!l.skip_invisible || i.is(":visible"))if (t.abovethetop(this, l) || t.leftofbegin(this, l)); else if (t.belowthefold(this, l) || t.rightoffold(this, l)) {
                            if (++e > l.failure_limit)return !1
                        } else i.trigger("appear"), e = 0
                    })
                }

                var s, r = this, l = {
                    threshold: 0,
                    failure_limit: 0,
                    event: "scroll",
                    effect: "show",
                    container: e,
                    data_attribute: "original",
                    skip_invisible: !1,
                    appear: null,
                    load: null,
                    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
                };
                return n && (void 0 !== n.failurelimit && (n.failure_limit = n.failurelimit, delete n.failurelimit), void 0 !== n.effectspeed && (n.effect_speed = n.effectspeed, delete n.effectspeed), t.extend(l, n)), s = void 0 === l.container || l.container === e ? a : t(l.container), 0 === l.event.indexOf("scroll") && s.on(l.event, function () {
                    return o()
                }), this.each(function () {
                    var e = this, i = t(e);
                    e.loaded = !1, void 0 !== i.attr("src") && !1 !== i.attr("src") || i.is("img") && i.attr("src", l.placeholder), i.one("appear", function () {
                        if (!this.loaded) {
                            if (l.appear) {
                                var n = r.length;
                                l.appear.call(e, n, l)
                            }
                            t("<img />").one("load", function () {
                                var n = i.attr("data-" + l.data_attribute);
                                i.hide(), i.is("img") ? i.attr("src", n) : i.css("background-image", "url('" + n + "')"), i[l.effect](l.effect_speed), e.loaded = !0;
                                var a = t.grep(r, function (t) {
                                    return !t.loaded
                                });
                                if (r = t(a), l.load) {
                                    var o = r.length;
                                    l.load.call(e, o, l)
                                }
                            }).attr("src", i.attr("data-" + l.data_attribute))
                        }
                    }), 0 !== l.event.indexOf("scroll") && i.on(l.event, function () {
                        e.loaded || i.trigger("appear")
                    })
                }), a.on("resize", function () {
                    o()
                }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && a.on("pageshow", function (e) {
                    e.originalEvent && e.originalEvent.persisted && r.each(function () {
                        t(this).trigger("appear")
                    })
                }), t(i).ready(function () {
                    o()
                }), this
            }, t.belowthefold = function (i, n) {
                return (void 0 === n.container || n.container === e ? (e.innerHeight ? e.innerHeight : a.height()) + a.scrollTop() : t(n.container).offset().top + t(n.container).height()) <= t(i).offset().top - n.threshold
            }, t.rightoffold = function (i, n) {
                return (void 0 === n.container || n.container === e ? a.width() + a.scrollLeft() : t(n.container).offset().left + t(n.container).width()) <= t(i).offset().left - n.threshold
            }, t.abovethetop = function (i, n) {
                return (void 0 === n.container || n.container === e ? a.scrollTop() : t(n.container).offset().top) >= t(i).offset().top + n.threshold + t(i).height()
            }, t.leftofbegin = function (i, n) {
                return (void 0 === n.container || n.container === e ? a.scrollLeft() : t(n.container).offset().left) >= t(i).offset().left + n.threshold + t(i).width()
            }, t.inviewport = function (e, i) {
                return !(t.rightoffold(e, i) || t.leftofbegin(e, i) || t.belowthefold(e, i) || t.abovethetop(e, i))
            }, t.extend(t.expr[":"], {
                "below-the-fold": function (e) {
                    return t.belowthefold(e, {threshold: 0})
                }, "above-the-top": function (e) {
                    return !t.belowthefold(e, {threshold: 0})
                }, "right-of-screen": function (e) {
                    return t.rightoffold(e, {threshold: 0})
                }, "left-of-screen": function (e) {
                    return !t.rightoffold(e, {threshold: 0})
                }, "in-viewport": function (e) {
                    return t.inviewport(e, {threshold: 0})
                }, "above-the-fold": function (e) {
                    return !t.belowthefold(e, {threshold: 0})
                }, "right-of-fold": function (e) {
                    return t.rightoffold(e, {threshold: 0})
                }, "left-of-fold": function (e) {
                    return !t.rightoffold(e, {threshold: 0})
                }
            })
        }(jQuery, window, document)
    }, {}]
}, {}, [1]);