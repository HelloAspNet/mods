export default function (config) {

  const date = new Date;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const defaults = {
    productLinks: {},
    brandLinks: {},
    saleTime: `${year}/${month}/${day + 1} 10:00:00`,
    endTime: `${year}/${month}/${day + 2} 10:00:00`
  };

  config = Object.assign(defaults, config);

  return `
(function () {

  var wh = $.Cookie.get('vip_wh') || 'VIP_NH';
  var whs = wh.toLocaleUpperCase();
  var plinksData = ${JSON.stringify(config.productLinks)};
  var blinksData = ${JSON.stringify(config.brandLinks)};
  var plinks = plinksData[whs];
  var blinks = blinksData[whs];

  addProductLinks(plinks);
  addSellState(blinks);
  addBrandLinks(blinks);
  addNavigators();
  addCoupons(blinks);
  addCountDown();

  // 添加商品链接
  function addProductLinks(plinks, exceptPlinks) {
    $('.kmod-body .kmod-plink').each(function (i) {
      $(this).attr({
        target: '_blank',
        href: 'http://www.vip.com/detail-' + plinks[i] + '.html'
      }).data('pid', (plinks[i] || '').replace(/^.*-/, ''));
    });

    if(!exceptPlinks) return;
    var re = new RegExp('(' + exceptLinks.join('|') + ')$');
    $('.kmod-body .kmod-plink').each(function (i) {
      if (re.test(plinks[i])) {
        $(this).addClass('kstate-sold-onload').attr({
          target: '_self',
          href: 'javascript:;'
        });
      }
    });
  }

  // 添加售卖状态
  function addSellState(blinks){
      $.ajax({
        url: 'http://stock.vip.com/list/',
        data: {
          bids: blinks.join(',')
        },
        dataType: 'jsonp'
      }).done(function(res){

        var prodChance = res.sold_chance;
        var prodOut = res.sold_out;

        var reProdChance = new RegExp('^(' + prodChance.replace(/,/g, '|') + ')$');
        var reProdOut = new RegExp('^(' + prodOut.replace(/,/g, '|') + ')$');

        $('.kmod-plink').each(function(){
          var $this = $(this);
          var pid = $this.data('pid');

          $this.append('<span class="kmod-tips"></span>');
          if(reProdChance.test(pid)){
            return $this.addClass('kstate-sold-chance');
          }
          if(reProdOut.test(pid)){
            return $this.addClass('kstate-sold-out');
          }
        });
      });
    }

  // 添加专场链接
  function addBrandLinks(blinks) {
    // 顺序打乱时这样添加
    $('.kmod-body .kmod-blink').attr({target: '_blank'});
    $(blinks).each(function(i, blink){
      $('.kmod-body .kmod-blink' + (i + 1)).attr({href: 'http://list.vip.com/' + blink + '.html'});
    });
    //$('.kmod-body .kmod-blink1').attr({href: 'http://list.vip.com/' + blinks[0] + '.html'});
    //$('.kmod-body .kmod-blink2').attr({href: 'http://list.vip.com/' + blinks[1] + '.html'});
    //$('.kmod-body .kmod-blink3').attr({href: 'http://list.vip.com/' + blinks[2] + '.html'});
  }

  // 导航2
  function addNavigators() {

    var $nav = $('.kmod-nav');
    var beginOffset = $nav.offset();

    var $win = $(window);
    var $doc = $(document);

    var $navTarget = $('.kmod-target');

    var navHeight = $nav.outerHeight();
    var endOffset;
    var $footer = $('.kmod-footer');

    if ($footer.length || $footer.is(':visible')) {
      endOffset = $footer.offset();
    }
    else {
      var $kmods = $('.kmods');
      endOffset = $kmods.offset();
      endOffset.top += $kmods.outerHeight();
    }


    var $navTargetNew = $navTarget.map(function () {
      var $this = $(this);
      return {
        top: $this.offset().top,
        $el: $this,
        $ctrl: $('[data-id=' + $this.attr('id') + ']')
      };
    });

    $navTargetNew.sort(function (a, b) {
      return a.top - b.top;
    });
    $win.on({
      'scroll.kmodNav': function () {
        var scrollTop = $doc.scrollTop();

        // 控制导航悬浮
        $nav[scrollTop > beginOffset.top ? 'addClass' : 'removeClass']('kstate-fixed');

        // 控制导航focus效果
        var len = $navTargetNew.length;
        var index = 0;
        do {
          len -= 1;
          index = len;
        }
        while (index >= 0 && scrollTop < $navTargetNew[index].top);

        $navTargetNew.each(function (i, v) {
          v.$ctrl && v.$ctrl.removeClass('kstate-hover');
        });
        index >= 0 && $navTargetNew[index].$ctrl.addClass('kstate-hover');

        // 控制导航focus时底边线左右滑动
        var lastIndex = $nav.data('index');
        $nav.addClass('kstate-hover' + (index + 1));
        if (!isNaN(lastIndex) && index !== lastIndex) {
          $nav.removeClass('kstate-hover' + (lastIndex + 1));
        }
        $nav.data('index', index);


        var endTop = endOffset.top - navHeight - scrollTop;

        if(endTop < 0) return $nav.css({ top: endTop });
        if(scrollTop > beginOffset.top){
          // 控制导航悬浮
          $nav.addClass('kstate-fixed');
          $nav.css({top: 0});
        }
        else {
          // 控制导航悬浮
          $nav.removeClass('kstate-fixed');
          $nav.css({top: 0});
        }

      }
    });

    //$doc.delegate('.kmod-nav a', {
    //  'click.kmodNav': function () {
    //
    //    //$('html, body').scrollTop(200);
    //  }
    //});

  }

  // 红包
  function addCoupons(bids) {
    var map = {};

    //        getCoupons(bids);

    if ($.Cookie.get('VipLID')) {
      getCoupons(bids);
    } else {
      $('.kmods').addClass('kstate-coupon-get');
    }

    // 领取红包
    $('.kmods').delegate('.kmod-coupon-btn, .kmod-nav-coupon-btn', {
      'click.kmodCoupon': function (e) {
        var $this = $(this);
        if (!$this.closest('.kstate-coupon-get').length) return;

        if ($.Cookie.get('VipLID')) {
          bindCoupon();
        } else {
          VIPSHOP.login.init({
            loginEvent: function () {
              VIPSHOP.member.chk();//登录成功后回调
              bindCoupon();
            }
          });
        }
      }
    });


    // 获取档期红包
    function getCoupons() {
      var marsCid = $.Cookie.get('mars_cid');
      var promises = [];
      $.each(bids, function (i, bid) {
        promises[i] = $.ajax({
          url: 'http://act.vip.com/act/index_ajax.php',
          dataType: 'jsonp',
          data: {
            service: 'NewCoupon.getAll',
            mars_cid: marsCid,
            bid: bid
          }
        });
      });

      $.when.apply($, promises).then(function (res) {
        var args = arguments;
        // 未领取红包数
        var hasNotGetCount = 0;
        // 已领取红包数
        var hasGetCount = 0;
        // 红包总数
        var totalCount = 0;
        // 任意红包有库存
        var hasLeft = false;
        $.each(bids, function (i, bid) {
          try {
            var obj = map[bid] = bids.length > 1 ? args[i][0] : args[i];
            var coupon = obj.coupons[0];
            // 有红包+未领取
            if (coupon.left && coupon.status === 1) hasNotGetCount += 1;
            // 有红包+已领取
            if (coupon.left && coupon.status === 2) hasGetCount += 1;
            // 任意红包有库存
            if (!hasLeft && coupon.left) hasLeft = true;
            totalCount += 1;
          } catch (e) {
          }
        });


        // 有红包时设置领取状态
        if (hasLeft) {
          $('.kmods').addClass(hasGetCount !== totalCount ? 'kstate-coupon-get' : 'kstate-coupon-success');
        }

      });
    }

    // 绑定红包
    function bindCoupon() {
      var utype = VIPSHOP.UINFO.isNewUser() ? 1 : 2;
      var promises = [];
      $.each(map, function (bid, obj) {
        var promise = $.ajax({
          url: 'http://act.vip.com/act/index_ajax.php',
          dataType: 'jsonp',
          data: {
            service: 'NewCoupon.bind',
            bid: bid,
            cid: obj.coupons[0].couponId,
            utype: utype
          }
        });
        promises.push(promise);
      });

      $.when.apply($, promises).then(function (res) {
        var args = arguments;
        var len = args.length;
        getCoupons();
        while (len--) {
          if ((bids.length > 1 ? args[len][0] : args[len]).status === 1) {
            //console.log('领取成功');
            return;
          }
        }
        //console.log('领取失败');
      });
    }
  }

  function addCountDown(){

    var timeSpan = function (timestamp) {
      var t = timestamp - (new Date).getTime(),
        d = {time: t, day: '00', hour: '00', min: '00', sec: '00'},
        s = '';
      if (t > 0) {
        s = '0' + parseInt(t / 1000 % 60);
        d.sec = s.substr(s.length - 2); //秒
        s = '0' + parseInt(t / 1000 / 60 % 60);
        d.min = s.substr(s.length - 2); //分
        s = '0' + parseInt(t / 1000 / 60 / 60 % 24);
        d.hour = s.substr(s.length - 2); //时
        s = '0' + parseInt(t / 1000 / 60 / 60 / 24 % 30);
        d.day = s.substr(s.length - 2); //天
      }
      return d;
    };

    var kid_countDown = function (timestamp, callback) {
      var self = this;
      var timer = setInterval(function () {
        var result = timeSpan(timestamp);
        if (result <= 0 || callback(result) === false) {
          clearInterval(timer);
        }
      }, 1000);
      callback(timeSpan(timestamp));
    };

    $(function () {
      var dayBox = $('#day'), hourBox = $('#hour'), minBox = $('#min'), secBox = $('#sec');
      var backtime  = function(time) {
        kid_countDown(time, function (d) {
          dayBox.text(d.day);
          hourBox.text(d.hour);
          minBox.text(d.min);
          secBox.text(d.sec);
        });
      };
      if ($.now() < new Date('${config.saleTime}')) {
        backtime (new Date('${config.saleTime}'));
      }
      else {
        backtime (new Date('${config.endTime}'));
      }
    });
  }
})();
  `;
};