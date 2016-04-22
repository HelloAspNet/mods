!function() {
    function addProductLinks(plinks, exceptPlinks) {
        $(".kmod-body .kmod-plink").each(function(i) {
            $(this).attr({
                target: "_blank",
                href: "http://www.vip.com/detail-" + plinks[i] + ".html"
            }).data("pid", (plinks[i] || "").replace(/^.*-/, ""));
        });
        if (exceptPlinks) {
            var re = new RegExp("(" + exceptLinks.join("|") + ")$");
            $(".kmod-body .kmod-plink").each(function(i) {
                re.test(plinks[i]) && $(this).addClass("kstate-sold-onload").attr({
                    target: "_self",
                    href: "javascript:;"
                });
            });
        }
    }
    function addSellState(blinks) {
        $.ajax({
            url: "http://stock.vip.com/list/",
            data: {
                bids: blinks.join(",")
            },
            dataType: "jsonp"
        }).done(function(res) {
            var prodChance = res.sold_chance;
            var prodOut = res.sold_out;
            var reProdChance = new RegExp("^(" + prodChance.replace(/,/g, "|") + ")$");
            var reProdOut = new RegExp("^(" + prodOut.replace(/,/g, "|") + ")$");
            $(".kmod-plink").each(function() {
                var $this = $(this);
                var pid = $this.data("pid");
                $this.append('<span class="kmod-tips"></span>');
                return reProdChance.test(pid) ? $this.addClass("kstate-sold-chance") : reProdOut.test(pid) ? $this.addClass("kstate-sold-out") : void 0;
            });
        });
    }
    function addBrandLinks(blinks) {
        $(".kmod-body .kmod-blink").attr({
            target: "_blank"
        });
        $(blinks).each(function(i, blink) {
            $(".kmod-body .kmod-blink" + (i + 1)).attr({
                href: "http://list.vip.com/" + blink + ".html"
            });
        });
    }
    function addNavigators() {
        var $nav = $(".kmod-nav");
        var beginOffset = $nav.offset();
        var $win = $(window);
        var $doc = $(document);
        var $navTarget = $(".kmod-target");
        var navHeight = $nav.outerHeight();
        var endOffset;
        var $footer = $(".kmod-footer");
        if ($footer.length || $footer.is(":visible")) endOffset = $footer.offset(); else {
            var $kmods = $(".kmods");
            endOffset = $kmods.offset();
            endOffset.top += $kmods.outerHeight();
        }
        var $navTargetNew = $navTarget.map(function() {
            var $this = $(this);
            return {
                top: $this.offset().top,
                $el: $this,
                $ctrl: $("[data-id=" + $this.attr("id") + "]")
            };
        });
        $navTargetNew.sort(function(a, b) {
            return a.top - b.top;
        });
        $win.on({
            "scroll.kmodNav": function() {
                var scrollTop = $doc.scrollTop();
                $nav[scrollTop > beginOffset.top ? "addClass" : "removeClass"]("kstate-fixed");
                var len = $navTargetNew.length;
                var index = 0;
                do {
                    len -= 1;
                    index = len;
                } while (index >= 0 && scrollTop < $navTargetNew[index].top);
                $navTargetNew.each(function(i, v) {
                    v.$ctrl && v.$ctrl.removeClass("kstate-hover");
                });
                index >= 0 && $navTargetNew[index].$ctrl.addClass("kstate-hover");
                var lastIndex = $nav.data("index");
                $nav.addClass("kstate-hover" + (index + 1));
                isNaN(lastIndex) || index === lastIndex || $nav.removeClass("kstate-hover" + (lastIndex + 1));
                $nav.data("index", index);
                var endTop = endOffset.top - navHeight - scrollTop;
                if (0 > endTop) return $nav.css({
                    top: endTop
                });
                if (scrollTop > beginOffset.top) {
                    $nav.addClass("kstate-fixed");
                    $nav.css({
                        top: 0
                    });
                } else {
                    $nav.removeClass("kstate-fixed");
                    $nav.css({
                        top: 0
                    });
                }
            }
        });
    }
    function addCoupons() {
        function getCoupons() {
            var marsCid = $.Cookie.get("mars_cid");
            var promises = [];
            $.each(bids, function(i, bid) {
                promises[i] = $.ajax({
                    url: "http://act.vip.com/act/index_ajax.php",
                    dataType: "jsonp",
                    data: {
                        service: "NewCoupon.getAll",
                        mars_cid: marsCid,
                        bid: bid
                    }
                });
            });
            $.when.apply($, promises).then(function(res) {
                var args = arguments;
                var hasNotGetCount = 0;
                var hasGetCount = 0;
                var totalCount = 0;
                var hasLeft = false;
                $.each(bids, function(i, bid) {
                    try {
                        var obj = map[bid] = bids.length > 1 ? args[i][0] : args[i];
                        var coupon = obj.coupons[0];
                        coupon.left && 1 === coupon.status && (hasNotGetCount += 1);
                        coupon.left && 2 === coupon.status && (hasGetCount += 1);
                        !hasLeft && coupon.left && (hasLeft = true);
                        totalCount += 1;
                    } catch (e) {}
                });
                hasLeft && $(".kmods").addClass(hasGetCount !== totalCount ? "kstate-coupon-get" : "kstate-coupon-success");
            });
        }
        function bindCoupon() {
            var utype = VIPSHOP.UINFO.isNewUser() ? 1 : 2;
            var promises = [];
            $.each(map, function(bid, obj) {
                var promise = $.ajax({
                    url: "http://act.vip.com/act/index_ajax.php",
                    dataType: "jsonp",
                    data: {
                        service: "NewCoupon.bind",
                        bid: bid,
                        cid: obj.coupons[0].couponId,
                        utype: utype
                    }
                });
                promises.push(promise);
            });
            $.when.apply($, promises).then(function(res) {
                var args = arguments;
                var len = args.length;
                getCoupons();
                for (;len--; ) if (1 === (bids.length > 1 ? args[len][0] : args[len]).status) return;
            });
        }
        var bids = [ 679654 ];
        var map = {};
        $.Cookie.get("VipLID") ? getCoupons(bids) : $(".kmods").addClass("kstate-coupon-get");
        $(".kmods").delegate(".kmod-coupon-btn, .kmod-nav-coupon-btn", {
            "click.kmodCoupon": function(e) {
                var $this = $(this);
                $this.closest(".kstate-coupon-get").length && ($.Cookie.get("VipLID") ? bindCoupon() : VIPSHOP.login.init({
                    loginEvent: function() {
                        VIPSHOP.member.chk();
                        bindCoupon();
                    }
                }));
            }
        });
    }
    function addCountDown() {
        var timeSpan = function(timestamp) {
            var t = timestamp - new Date().getTime(), d = {
                time: t,
                day: "00",
                hour: "00",
                min: "00",
                sec: "00"
            }, s = "";
            if (t > 0) {
                s = "0" + parseInt(t / 1e3 % 60);
                d.sec = s.substr(s.length - 2);
                s = "0" + parseInt(t / 1e3 / 60 % 60);
                d.min = s.substr(s.length - 2);
                s = "0" + parseInt(t / 1e3 / 60 / 60 % 24);
                d.hour = s.substr(s.length - 2);
                s = "0" + parseInt(t / 1e3 / 60 / 60 / 24 % 30);
                d.day = s.substr(s.length - 2);
            }
            return d;
        };
        var kid_countDown = function(timestamp, callback) {
            var timer = setInterval(function() {
                var result = timeSpan(timestamp);
                (0 >= result || false === callback(result)) && clearInterval(timer);
            }, 1e3);
            callback(timeSpan(timestamp));
        };
        $(function() {
            var dayBox = $("#day"), hourBox = $("#hour"), minBox = $("#min"), secBox = $("#sec");
            var backtime = function(time) {
                kid_countDown(time, function(d) {
                    dayBox.text(d.day);
                    hourBox.text(d.hour);
                    minBox.text(d.min);
                    secBox.text(d.sec);
                });
            };
            backtime($.now() < Date.parse("2016/04/11 10:00:00") ? Date.parse("2016/04/11 10:00:00") : Date.parse("2016/04/12 20:00:00"));
        });
    }
    var wh = $.Cookie.get("vip_wh") || "VIP_NH";
    var whs = wh.toLocaleUpperCase();
    var plinksData = {
        VIP_NH: [ "626529-88420745", "626529-88420737", "626529-88420723", "626529-88420754", "626529-88420722", "626529-88420800", "626529-88420789", "626529-88420787", "626529-88420740", "626529-88420752", "626529-88420774", "651416-90659848", "651416-90659857", "651416-90659850", "651416-90659852", "651416-90659861", "651416-90659853", "651416-90659860", "651416-90659859", "651416-90659868", "651416-90659865", "651416-90659866", "665851-89410673", "665851-89410604", "665851-89410617", "665851-89410648", "665851-89410697", "665851-89410643", "665851-89410657", "665851-89410618", "665851-89410626", "665851-89410556", "665851-89410563" ],
        VIP_SH: [ "626529-88420745", "626529-88420737", "626529-88420723", "626529-88420754", "626529-88420722", "626529-88420800", "626529-88420789", "626529-88420787", "626529-88420740", "626529-88420752", "626529-88420774", "651416-90659848", "651416-90659857", "651416-90659850", "651416-90659852", "651416-90659861", "651416-90659853", "651416-90659860", "651416-90659859", "651416-90659868", "651416-90659865", "651416-90659866", "665852-89412622", "665852-89412553", "665852-89412566", "665852-89412597", "665852-89412647", "665852-89412592", "665852-89412606", "665852-89412567", "665852-89412575", "665852-89412505", "665852-89412512" ],
        VIP_CD: [ "626529-88420745", "626529-88420737", "626529-88420723", "626529-88420754", "626529-88420722", "626529-88420800", "626529-88420789", "626529-88420787", "626529-88420740", "626529-88420752", "626529-88420774", "651416-90659848", "651416-90659857", "651416-90659850", "651416-90659852", "651416-90659861", "651416-90659853", "651416-90659860", "651416-90659859", "651416-90659868", "651416-90659865", "651416-90659866", "665853-89412779", "665853-89412710", "665853-89412723", "665853-89412754", "665853-89412804", "665853-89412749", "665853-89412763", "665853-89412724", "665853-89412732", "665853-89412662", "665853-89412669" ],
        VIP_BJ: [ "626529-88420745", "626529-88420737", "626529-88420723", "626529-88420754", "626529-88420722", "626529-88420800", "626529-88420789", "626529-88420787", "626529-88420740", "626529-88420752", "626529-88420774", "651416-90659848", "651416-90659857", "651416-90659850", "651416-90659852", "651416-90659861", "651416-90659853", "651416-90659860", "651416-90659859", "651416-90659868", "651416-90659865", "651416-90659866", "665854-89412936", "665854-89412867", "665854-89412880", "665854-89412911", "665854-89412961", "665854-89412906", "665854-89412920", "665854-89412881", "665854-89412889", "665854-89412819", "665854-89412826" ],
        VIP_HZ: [ "626529-88420745", "626529-88420737", "626529-88420723", "626529-88420754", "626529-88420722", "626529-88420800", "626529-88420789", "626529-88420787", "626529-88420740", "626529-88420752", "626529-88420774", "651416-90659848", "651416-90659857", "651416-90659850", "651416-90659852", "651416-90659861", "651416-90659853", "651416-90659860", "651416-90659859", "651416-90659868", "651416-90659865", "651416-90659866", "665855-89413093", "665855-89413024", "665855-89413037", "665855-89413068", "665855-89413118", "665855-89413063", "665855-89413077", "665855-89413038", "665855-89413046", "665855-89412976", "665855-89412983" ]
    };
    var blinksData = {
        VIP_NH: [ "667583", "667588", "667593" ],
        VIP_SH: [ "667584", "667589", "667594" ],
        VIP_CD: [ "667585", "667590", "667595" ],
        VIP_BJ: [ "667586", "667591", "667596" ],
        VIP_HZ: [ "667587", "667592", "667597" ]
    };
    var plinks = plinksData[whs];
    var blinks = blinksData[whs];
    addProductLinks(plinks);
    addSellState(blinks);
    addBrandLinks(blinks);
    addNavigators();
    addCoupons();
    addCountDown();
}();