


cssAnimation();
function cssAnimation(){

  var imgs = [
//                'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-light1.png',
//                'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-light2.png',
//                'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-light.png',
//                'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-tower.png',
//                'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-pigeon.png',
//                'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-duck.png',
    'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-brands.png',
    'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-boy2.png',
    'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-boy1.png',
    'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-girl.png',
    'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-text-bg.png',
    'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-text1.png',
    'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-text2.png',
    'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-text3.png',
    'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0509clothes/header-fragment.png'
  ];

  var promises = [];

  $.each(imgs, function(i, url){
    var defer = $.Deferred();
    var img = new Image;
    img.onload = defer.resolve;
    img.onerror = defer.reject;
    img.src = url;
    promises[i] = defer.promise();
  });

  $.when.apply($, promises).then($.Listeners.pub('kTopImgLoaded').success);

  // 图片加载完后设定并执行动画
//            $.Listeners.sub('kTopImgLoaded').onsuccess(function(){


  setAnimation('J_light1', 'fadeIn', 30);
  setAnimation('J_light2', 'fadeIn', 60);
  setAnimation('J_light', 'fadeIn', 90);

  setAnimation('J_tower', 'fadeIn', 120);
  setAnimation('J_pigeon', 'fadeIn', 150);
  setAnimation('J_duck', 'bounceInDown', 180);
  setAnimation('J_brands', 'bounceInDown', 210);
  setAnimation('J_fragment', 'fadeIn', 240);


  setAnimation('J_boy2', 'bounceInLeft', 450);
  setAnimation('J_girl', 'bounceInLeft', 700);
  setAnimation('J_boy1', 'bounceInLeft', 950);

  setAnimation('J_text_bg', 'slideInUp', 1100);
  setAnimation('J_text1', 'flip', 1350).then(function(){
    setTimeout($.Listeners.pub('text1Loaded').success, 1000);
  });
  setAnimation('J_text2', 'zoomInUp', 1600).then(function(){
    setInterval(function(){
      setAnimation('J_text2', 'flash');
    }, 5000);
  });
  setAnimation('J_text3', 'rubberBand', 1850).then(function(){
//                    setInterval(function(){
//                        setAnimation('J_text3', 'pulse');
//                    }, 6500);
  });

  setAnimation('J_top_countdown', 'fadeIn', 2100);

  function loadImage(url){
    var time = new Date;
    var defer = $.Deferred();
    var img = new Image;
    img.onload = defer.resolve;
    img.onerror = defer.reject;
    img.src = url;
    return defer.promise().pipe(function(){return new Date - time;});
  }

  // 设置动画
  function setAnimation(id, actionClassName, delay){
    var defer = $.Deferred();
    var $el = $('#' + id);
    setTimeout(function() {
      $el
        .removeClass('animated ' + actionClassName)
        .show()
        .addClass('animated ' + actionClassName)
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          //$(this).removeClass('animated ' + actionClassName);
          defer.resolve();
        });
    }, delay || 0);
    return defer.promise().then(function(){
      $el.removeClass('animated ' + actionClassName);
    });
  }

//            });
}