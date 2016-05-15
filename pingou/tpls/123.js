
var imageUrlList = [
  'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0512handuyishe/ani.png',
  'http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0512handuyishe/warm-4a.jpg'
];
setAnimation('J_text11', 'fadeIn', 30).then(function(){
  setInterval(function(){
    setAnimation('J_text11', 'tada');
  }, 2500);
});

setAnimation('J_text21', 'fadeIn', 60).then(function(){
  setTimeout(function(){
    setInterval(function(){
      setAnimation('J_text21', 'tada');
    }, 2500);
  }, 1250);
});

setAnimation('J_text12', 'fadeIn', 30);
setAnimation('J_text13', 'fadeInLeft', 60);
setAnimation('J_text14', 'zoomInUp', 150);
setAnimation('J_text15', 'bounceInDown', 180);

setAnimation('J_text22', 'bounceInDown', 210);
setAnimation('J_text23', 'flip', 240);
setAnimation('J_text24', 'bounceInLeft', 450);
setAnimation('J_text25', 'slideInUp', 1100);



var animationList = [
  {
    selector: '#J_text11',
    imgList: ['http://a.vpimg4.com/upload/actpics/uidesign/2016/5m/0512handuyishe/ani.png'],
    animationList: [
      {name: 'fadeIn', delay: 30},
      {name: 'tada', delay: 0, interval: 2500}
    ]
  }
];



addAnimation(imageUrlList);
function addAnimation(imageUrlList){

  var promises = [];
  $.each(imageUrlList, function(i, url){
    var defer = $.Deferred();
    var img = new Image;
    img.onload = defer.resolve;
    img.onerror = defer.reject;
    img.src = url;
    promises[i] = defer.promise();
  });

  $.when.apply($, promises).then(function(){
    var $win = $(window);
    var lazyTimer;
    var $wrapper = $('#J_text_wrapper');
    var runTimes = 0;
    $win.on({
      /**
       * lazyload run
       */
      'scroll': setupScroll
    });

    setupScroll();

    function setupScroll() {
      if(runTimes > 0) return;
      clearTimeout(lazyTimer);
      lazyTimer = setTimeout(function () {
        var winHeight = $win.height();
        var scrollTop = $win.scrollTop();

        var top = $wrapper.offset().top;
        var height = $wrapper.height();
        if (top < scrollTop - height) return;
        if (top > scrollTop + winHeight) return;
        runTimes += 1;
        setTimeout(setAnimations, 200); // 延迟动画效果
      }, 60);
    }
  });




  function setAnimations(){

    setAnimation('J_text11', 'fadeIn', 30).then(function(){
      setInterval(function(){
        setAnimation('J_text11', 'tada');
      }, 2500);
    });

    setAnimation('J_text21', 'fadeIn', 60).then(function(){
      setTimeout(function(){
        setInterval(function(){
          setAnimation('J_text21', 'tada');
        }, 2500);
      }, 1250);
    });

    setAnimation('J_text12', 'fadeIn', 30);
    setAnimation('J_text13', 'fadeInLeft', 60);
    setAnimation('J_text14', 'zoomInUp', 150);
    setAnimation('J_text15', 'bounceInDown', 180);

    setAnimation('J_text22', 'bounceInDown', 210);
    setAnimation('J_text23', 'flip', 240);
    setAnimation('J_text24', 'bounceInLeft', 450);
    setAnimation('J_text25', 'slideInUp', 1100);

  }
//        function loadImage(url){
//            var time = new Date;
//            var defer = $.Deferred();
//            var img = new Image;
//            img.onload = defer.resolve;
//            img.onerror = defer.reject;
//            img.src = url;
//            return defer.promise().pipe(function(){return new Date - time;});
//        }

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
          $el.removeClass('animated ' + actionClassName);
          defer.resolve();
        });
    }, delay || 0);
    return defer.promise();
  }
}
