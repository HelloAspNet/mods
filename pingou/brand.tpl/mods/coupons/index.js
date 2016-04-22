
addCoupons();

// 红包
function addCoupons() {

  var bids = [679654];
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
      if ($this.closest('.kstate-coupon-success').length > 0) return;

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