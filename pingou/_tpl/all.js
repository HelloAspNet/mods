
//*******************************************************************************************
var wh = $.Cookie.get('vip_wh') || 'VIP_NH';
var whs = wh.toLocaleUpperCase();


var linksData = {};
var links = linksData[whs];
// 添加商品链接
$('.kmod-link').each(function (i) {
  $(this).attr({
    target: '_blank',
    href: 'http://www.vip.com/detail-' + links[i] + '.html'
  });
});


var blinksData = {};
var blinks = blinksData[whs];
// 添加专场链接
$('.kmod-blink').each(function (i) {
  $(this).attr({
    target: '_blank',
    href: 'http://list.vip.com/' + blinks[i % 3] + '.html'
  });
});
//*******************************************************************************************

/**
 * 格式化参数
 * @type {{}}
 */
var params = {};
location.search.substring(1).replace(/(&)?([^=]+)=([^&]+)/g, function (a, b, key, value) {
  return params[key] = decodeURIComponent(value);
});



var tpl = $.Tpl;
tpl.helper('kidFormatIndex', function (v) {
  v += 1;
  return v > 9 ? v : '0' + v;
});



/**
 * 渲染背景
 */
(function () {
  $('#kidBgHtml').html(tpl('kidBgTpl', {list: new Array(17)}));
  var isSaleState = $('#kidBgHtml').parents('.kid-sale').length > 0;
  // 添加背景链接
  $('.kid-main-bg').each(function (i) {
    var backgroundImage = 'url(http://a.vpimg4.com/upload/actpics/uidesign/2016/1m/0123paikelandi/'
      + (isSaleState ? 'sale1-' : 'warm1-')
      + tpl.helpers['kidFormatIndex'](i)
      + '.jpg)';
    $(this).css({
      backgroundImage: backgroundImage
    });
  });
})();


// 渲染商品锚点
(function () {
  $('#kidLinkHtml').html(tpl('kidLinkTpl', {list: new Array(20), brandList: new Array(6)}));

  // 商品链接数据
  var links = {
    "VIP_NH": ["634859-86633591", "634859-86633589", "634859-86633607", "634859-86633584", "634859-86633580", "634859-86633593", "634859-86633617", "634859-86633887", "634859-86633884", "634859-86633905", "633585-86639304", "633585-86639290", "633585-86639309", "633585-86639340", "633585-86639365", "633585-86639344", "633585-86639343", "633585-86639768", "633585-86639753", "633585-86639795"],
    "VIP_SH": ["634860-86634029", "634860-86634027", "634860-86634045", "634860-86634022", "634860-86634018", "634860-86634031", "634860-86634055", "634860-86634325", "634860-86634322", "634860-86634343", "633586-86639942", "633586-86639928", "633586-86639947", "633586-86639978", "633586-86640003", "633586-86639982", "633586-86639981", "633586-86640386", "633586-86640371", "633586-86640413"],
    "VIP_CD": ["634861-86634467", "634861-86634465", "634861-86634483", "634861-86634460", "634861-86634456", "634861-86634469", "634861-86634493", "634861-86634763", "634861-86634760", "634861-86634781", "633587-86640540", "633587-86640526", "633587-86640546", "633587-86640583", "633587-86640614", "633587-86640588", "633587-86640587", "633587-86641004", "633587-86640989", "633587-86641031"],
    "VIP_BJ": ["634862-86635885", "634862-86635883", "634862-86635905", "634862-86635878", "634862-86635874", "634862-86635887", "634862-86635916", "634862-86636551", "634862-86636548", "634862-86636593", "633588-86641185", "633588-86641171", "633588-86641190", "633588-86641221", "633588-86641246", "633588-86641225", "633588-86641224", "633588-86641629", "633588-86641614", "633588-86641656"],
    "VIP_HZ": ["634863-86637624", "634863-86637622", "634863-86637640", "634863-86637617", "634863-86637613", "634863-86637626", "634863-86637650", "634863-86638920", "634863-86638917", "634863-86638941", "633589-86641794", "633589-86641780", "633589-86641799", "633589-86641830", "633589-86641855", "633589-86641834", "633589-86641833", "633589-86642238", "633589-86642223", "633589-86642265"]
  };
  var link = links[whs];

  // 添加商品链接
  $('.kid-main-link').each(function (i) {
    $(this).attr("href", 'http://www.vip.com/detail-' + link[i] + '.html');
  });

  // 移除在路上的商品
  //    $('.kid-main-link04').addClass('kid-show-tip').removeAttr("target").attr("href", 'javascript:;');

  // 专场链接
  var blinks = {
    "VIP_NH": ['634859', '633585'],
    "VIP_SH": ['634860', '633586'],
    "VIP_CD": ['634861', '633587'],
    "VIP_BJ": ['634862', '633588'],
    "VIP_HZ": ['634863', '633589']
  };
  var blink = blinks[whs];

  // 添加专场链接
  $('.kid-main-blink').each(function (i) {
    $(this).attr("href", 'http://list.vip.com/' + blink[i % 2] + '.html');
  });
})();


/**
 * 渲染导航
 */
(function () {
  var KIDNAV = {
    options: {
      tpl: $.Tpl,
      dataList: null,
      $targetList: null,
      map: {}
    },
    init: function (options) {
      var _options = this.options;
      $.extend(_options, options);
//
//            var dataList = _options.dataList;
//            $.each(dataList, function(i, v){
//                if(dataList == null){
//                    dataList[i] = {};
//                }
//            });

//            var textMap = {
//                hash_discount: '2件8.5折<br>3件8折',
//                hash_buy1: '品质奶粉<br>大牌尿裤',
//                hash_buy2: '玩具文具<br>图书金饰',
//                hash_buy3: '童装童鞋<br>婴童服饰',
//                hash_buy4: '母婴用品<br>推车座椅',
//                buy5: '亲子旅游<br>精选线路',
//                hash_hot: '热销品牌<br>排行榜',
//                hash_cartoon: '卡通大牌<br>齐贺岁'
//            };
//
//            // 给导航楼层添加显示文字
//            $.each(dataList, function (i, floor) {
//                var html = textMap[floor.ext.floor_code];
//                if (html) {
//                    floor.ext.html = html;
//                }
//            });

      this.render();

      this.buildMap();

      this.bindEvent();
    },
    buildMap: function () {
      var map = this.options.map;
      // 预先取好各个导航楼层的top值
      $('.kid-nav-item, .kid-nav-top').each(function () {
        var $this = $(this);
        var targetId = $this.data('anchor');
        if (targetId) {
          var $target = $('#' + targetId);
          var $targetBg = $target.find('.f-box-bg');
          var offset = $targetBg.length ? $targetBg.offset() : $target.offset();
          map[targetId] = offset.top;
        }
      });
    },
    bindEvent: function () {
      var options = this.options;
      var $targetList = options.$targetList;
      var map = options.map;

      /**
       *  clickEvent
       */
      $(document).delegate('.kid-nav-item, .kid-nav-top', {
        'click.kidNav': function () {
          var $this = $(this);
          var targetId = $this.data('anchor');
          var top = map[targetId];
          $('html:not(:animated),body:not(:animated)').animate({
            scrollTop: top ? top : 0
          }, 800);

        }
      });

      // 确保target顺序正确
      $($targetList).sort(function (a, b) {
        return $(a).offset().top - $(b).offset().top;
      });

      /**
       *  scrollEvent
       */
      var $doc = $(document);
      var winHeight = $(window).height();
      var bodyHeight = $("body").height();
      var floorBottomHeight = $(".floor-bottom").height();
      var footerHeight = $("#footer").height();
      $(window).on({
        'scroll.kidNav': function () {
          var index = $targetList.length;
          var scrollTop = $doc.scrollTop();

          while (index > 0 && scrollTop < $targetList.eq(--index).offset().top) {
          }
          var targetId = $targetList.eq(index).attr('id').replace('floor-', '');

          $('.kid-state-on').removeClass('kid-state-on');
          if (targetId) {
            $('.kid-nav-item[data-anchor=' + targetId + ']').addClass('kid-state-on');
          }


          var _top = bodyHeight - scrollTop - floorBottomHeight - footerHeight - 320;
          if (scrollTop >= 560) {
            $('.kid-nav').fadeIn(800);
            if (scrollTop > bodyHeight - winHeight - footerHeight) {
              $('.kid-nav').css('top', _top);
            } else {
              $('.kid-nav').css('top', '50%');
            }
          } else {
            $('.kid-nav').fadeOut(800);
          }


        }
      });
    },
    render: function () {
      var options = this.options;
      // 渲染导航
      $('#kidNavHtml').html(options.tpl('kidNavTpl', {list: options.dataList}));
    }
  };

  KIDNAV.init({
    dataList: new Array(2),
    $targetList: $('.kid-nav-target')
  });
})();

