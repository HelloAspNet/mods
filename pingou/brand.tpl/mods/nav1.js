// 导航1
(function () {
  var $win = $(window);
  var $doc = $(document);
  var $kmodBody = $('.kmod-body');
  var $kmodNav = $('.kmod-nav');

  // 定位点
  var offset = $kmodBody.offset();
  var scrollBegin = offset.top;
  var scrollEnd = offset.top + $kmodBody.height() - 400;

  // 导航顶部距离
  var cssTop = 60;

  // 导航最大高度
  var maxHeight = 0;
  $kmodNav.each(function () {
    var height = $(this).height();
    maxHeight = height > maxHeight ? height : maxHeight;
  });

  $win.on({
    'scroll.kmodNav': function () {
      var scrollTop = $doc.scrollTop();
      if (scrollTop > scrollBegin && scrollTop < scrollEnd - maxHeight) {
        $kmodNav.addClass('kmod-js-fixed');
        $kmodNav.css({
          top: cssTop
        });

      }
      else if (scrollTop - cssTop < scrollEnd) {
        $kmodNav.css({
          top: cssTop - scrollTop + (scrollEnd - maxHeight )
        });
      }
      else {
        $kmodNav.removeClass('kmod-js-fixed');
      }
    }
  });

//
//
//$(function () {
//  var $kmodBody = $('.kmod-body');
//  var offset = $kmodBody.offset();
//  var scrollBegin = offset.top;
//  var scrollEnd = offset.top + $kmodBody.height();
//  var $win = $(window);
//  var $doc = $(document);
//  var $kmodNav = $('.kmod-nav');
//
//  var maxHeight = 0;
//  $kmodNav.each(function () {
//    var height = $(this).height();
//    maxHeight = height > maxHeight ? height : maxHeight;
//  });
//
//  $win.on({
//    scroll: function () {
//      var scrollTop = $doc.scrollTop();
//      if (scrollTop > scrollBegin && scrollTop < scrollEnd - maxHeight) {
//        $kmodNav.addClass('kmod-js-fixed');
//        $kmodNav.css({
//          top: 60
//        });
//
//
//      }
//      else if (scrollTop < scrollEnd) {
//        console.log(scrollTop)
//        $kmodNav.css({
//          top: 60 - scrollTop + (scrollEnd - maxHeight )
//        });
//      }
//      else {
//        $kmodNav.removeClass('kmod-js-fixed');
//      }
//    }
//  });
//});

})();