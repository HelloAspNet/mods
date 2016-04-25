export default function (config) {

  const defaults = {
    imagesUrl: 'images/',  // 'http://a.vpimg3.com/upload/actpics/uidesign/2016/2m/0218haohaizi/'
    bgList: [],
    linkList: []
  };

  config = Object.assign(defaults, config);

  const brandLinkList = config.linkList.filter(a => a.type === 'brand');
  const productLinkList = config.linkList.filter(a => a.type === 'product');
  const normalLinkList = config.linkList.filter(a => a.type === 'normal');

  const IMAGE_URL = config.imagesUrl;
  const WARM_NAME = 'warm';
  const SALE_NAME = 'sale';
  
  
  const BODY_WIDTH = 1000;
  const NAV_Z_INDEX = 20;
  


  const bgListCss = config.bgList
    .map((a, i) => `.kmod-bg${i + 1}{height: ${a.height}px; background-image: url('${a.alt}');}`)
    .join('\n');

  const productLinkListCss = productLinkList
    .map((a, i) => `.kmod-plink${i + 1} {top: ${a.top}px; left: ${a.left}px; width: ${a.width}px; height: ${a.height}px;}`)
    .join('\n');

  const brandLinkListCss = brandLinkList
    .map((a, i) => `.kmod-blink${i + 1} {top: ${a.top}px; left: ${a.left}px; width: ${a.width}px; height: ${a.height}px;}`)
    .join('\n');

  const hashListCss = brandLinkList
    .map((a, i) => `.kmod-hash${i + 1}{ display: block; width: 100%; height: 60px; }`);

  const targetListCss = brandLinkList
    .map((a, i) => `<a class="kmod-target" id="kmod_hash${i + 1}" name="kmod_hash${i + 1}"></a>`);


  const normalLinkListCss = normalLinkList
    .map((a, i) => `.kmod-link${i + 1} {top: ${a.top}px; left: ${a.left}px; width: ${a.width}px; height: ${a.height}px;}`)
    .join('\n');





  return `
/* 状态-begin */
.kstate-debug a{background-color:rgba(0,0,0,.3)}
.kstate-debug a.kstate-hover,
.kstate-debug a:hover{background-color:rgba(0,0,0,.4)}
.kstate-hover{}
.kstate-fixed{position:fixed}
/* 状态-end */

.kmods{overflow:hidden; position: relative;}
.kmod{background:center top no-repeat}
.kmod-bd{position:relative;width:${BODY_WIDTH}px;margin:0 auto}
.kmod-bd:after,
.kmod-bd:before{display:table;content:""}
.kmod-bd:after{clear:both}
.kmod-link,
.kmod-blink,
.kmod-plink{position:absolute;float:left}
.kmod-hash { }
.kmod-target { display: block; position: relative; visibility: hidden; }

.kmod-bg{background: no-repeat center 0;}
.kmod-links{position: absolute; top: 0; left: 0; right: 0; width: 100%;}



/* 售卖状态-begin */
.kmod-plink .kmod-tips{position:relative;top:50%;left:50%;display:none}
.kmod-plink.kstate-sold-onload,
.kstate-sale .kmod-plink.kstate-sold-onload{cursor:default}
.kstate-warm .kmod-plink:hover .kmod-tips{display:block;width:86px;height:47px;margin:-23px 0 0 -43px;background:url(http://a.vpimg4.com/upload/actpics/uidesign/2015/10m/1024sport/floor3_btn.png) no-repeat}
.kstate-sale .kmod-plink:hover .kmod-tips{display:block;width:82px;height:76px;margin:-38px 0 0 -41px;background:url(http://a.vpimg2.com/upload/actpics/pingou/2015/5m/21/andi/buy_ico.png) no-repeat}
.kstate-sale .kmod-plink.kstate-sold-chance .kmod-tips,
.kstate-sale .kmod-plink.kstate-sold-chance:hover .kmod-tips{display:block;width:75px;height:75px;margin:-37px 0 0 -37px;background:url(http://a.vpimg2.com/upload/actpics/pingou/2015/5m/21/andi/chance_yellow.png) no-repeat}
.kstate-sale .kmod-plink.kstate-sold-out .kmod-tips,
.kstate-sale .kmod-plink.kstate-sold-out:hover .kmod-tips{display:block;width:75px;height:75px;margin:-37px 0 0 -37px;background:url(http://a.vpimg2.com/upload/actpics/pingou/2015/5m/21/andi/off_sell_icon_circle.png) no-repeat}
.kmod-plink.kstate-sold-onload .kmod-tips,
.kmod-plink.kstate-sold-onload:hover .kmod-tips,
.kstate-sale .kmod-plink.kstate-sold-onload .kmod-tips,
.kstate-sale .kmod-plink.kstate-sold-onload:hover .kmod-tips{width:82px;height:82px;margin:-41px 0 0 -41px;background:url(http://a.vpimg4.com/upload/actpics/uidesign/2016/1m/0122balabala/zailushang.png) no-repeat;display:block}
/* 售卖状态-end */


/* 导航-begin */
.kmod-nav-wrap{height:0}
.kmod-nav{position:relative;top:0;width:100%;margin:0 auto;z-index:${NAV_Z_INDEX}}
.kmod-nav.kstate-fixed{position:fixed}
.kmod-nav1{width:142px;height:306px;margin-left:1040px;padding-top:80px;background:url(${IMAGE_URL}nav.png) center 80px no-repeat}
.kmod-nav1 .kmod-nav-hd{height:50px}
.kmod-nav1 .kmod-nav-bd{margin:0 7px 0 11px}
.kmod-nav1 .kmod-nav-ft{height:54px;margin:0 7px 0 11px}
.kmod-nav1 .kmod-nav-ft .kmod-hash{height:54px}
.kmod-nav1 .kmod-hash{display:block;width:100%;height:59.5px}
${hashListCss}
/* 导航-end */


/* 红包-begin */
.kmod-coupon{position:relative;width:482px;height:144px}
.kmod-coupon-btn{position:absolute;width:256px;display:block;height:64px;top:22px;left:618px;cursor:default;background:url(${IMAGE_URL}coupon-btn.png) no-repeat}
.kstate-coupon-get .kmod-coupon-btn:hover,
.kstate-coupon-get .kmod-nav-coupon-btn:hover{opacity:.9;filter:alpha(opacity=90)}
.kstate-coupon-get .kmod-coupon-btn{background:url(${IMAGE_URL}coupon-btn.png) 0 -171px no-repeat;cursor:pointer}
.kstate-coupon-get .kmod-nav-coupon-btn{background:url(${IMAGE_URL}nav-coupon-btn.png) 0 -21px no-repeat;cursor:pointer}
.kstate-coupon-success .kmod-coupon-btn:hover,
.kstate-coupon-success .kmod-nav-coupon-btn:hover{opacity:1;filter:alpha(opacity=100)}
.kstate-coupon-success .kmod-coupon-btn{background:url(${IMAGE_URL}coupon-btn.png) 0 -86px no-repeat}
.kstate-coupon-success .kmod-nav-coupon-btn{background:url(${IMAGE_URL}coupon-btn.png) 0 -114px no-repeat}
.kmod-nav-coupon{position:relative}
.kmod-nav-coupon-btn{position:absolute;top:20px;left:7px;width:106px;height:25px;cursor:default}
/* 红包-end */


/* 倒计时-begin */
.kmod-countdown{overflow: hidden; position:absolute;top:420px;left:113px;width:360px;height:104px}
.kmod-countdown-tips{position:relative;margin:0 auto;width:167px;height:32px;background:center 0 no-repeat}
.kmod-countdown-tips-line1,
.kmod-countdown-tips-line2{position:absolute;top:8px;width:500px;margin:0;border:0;border-top:1px solid #888}
.kmod-countdown-tips-line1{left:-500px;margin-left:-10px}
.kmod-countdown-tips-line2{right:-500px;margin-right:-10px}
.kmod-countdown-main{width:350px;height:50px;background:url(http://a.vpimg4.com/upload/actpics/uidesign/2016/3m/0316kidacu/index-top/warm-top-countdown.png) center 0 no-repeat}
.kmod-countdown-nums{position:relative;top:-3px;left:-29px;width:400px;font-size:38px;color:#fff}
.kmod-countdown-num{float:left;width:62px;margin-left:34px;letter-spacing:11px}
/* 倒计时-end */


${bgListCss}
${productLinkListCss}
${brandLinkListCss}
${normalLinkListCss}

.kstate-warm{
  .kmod-header{ background: url('${IMAGE_URL}${WARM_NAME}-header.jpg') no-repeat center 0; }
  .kmod-logo{ background: url('${IMAGE_URL}${WARM_NAME}-logo.png') no-repeat center 0; }
  .kmod-countdown-tips{ background: url("http://a.vpimg4.com/upload/actpics/uidesign/2016/3m/0316kidacu/index-top/warm-top-countdown-tips.png") no-repeat 0 0;}
  .kmod-body { background: url('${IMAGE_URL}${WARM_NAME}-body.jpg') repeat; }
  .kmod-footer { background: url('${IMAGE_URL}${WARM_NAME}-footer.jpg') no-repeat center 0; }
  .kmod-footer .kmod-btn { background: url('${IMAGE_URL}${WARM_NAME}-footer-btn.png') no-repeat center 0; }

}
.kstate-sale{
  .kmod-header{ background: url('${IMAGE_URL}${SALE_NAME}-header.jpg') no-repeat center 0; }
  .kmod-logo{ background: url('${IMAGE_URL}${SALE_NAME}-logo.png') no-repeat center 0; }
  .kmod-countdown-tips{ background: url("http://a.vpimg4.com/upload/actpics/uidesign/2016/3m/0316kidacu/index-top/sale-top-countdown-tips.png") no-repeat 0 -2px;}
  .kmod-body { background: url('${IMAGE_URL}${SALE_NAME}-body.jpg') repeat; }
  .kmod-footer { background: url('${IMAGE_URL}${SALE_NAME}-footer.png') no-repeat center 0; }

}

/*  半品购调整-begin */
.warmup_bg .pro_bread{display: none;}
.warmup_bg, .list-define-w{overflow: hidden;position: relative;}
.warmup_bg .kmods{margin: 0 -460px;}
.list-define-w .kmods{margin: -380px -460px 0;}
/*  半品购调整-end */
  `;
};