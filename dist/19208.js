var wh = $.Cookie.get("vip_wh") || "VIP_NH";

var whs = wh.toLocaleUpperCase();

var linksData = {};

var links = linksData[whs];

$(".kmod-body .kmod-link").each(function(i) {
    $(this).attr({
        target: "_blank",
        href: "http://www.vip.com/detail-" + links[i] + ".html"
    });
});

var blinksData = {};

var blinks = blinksData[whs];

$(".kmod-body .kmod-blink").each(function(i) {
    $(this).attr({
        target: "_blank",
        href: "http://list.vip.com/" + blinks[i % 3] + ".html"
    });
});