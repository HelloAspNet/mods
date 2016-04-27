export default function (CONFIG) {

  const defaults = {
    imagesUrl: 'images/',  // 'http://a.vpimg3.com/upload/actpics/uidesign/2016/2m/0218haohaizi/'
    bgList: [],
    linkList: [],
    countdown: null,
    couponBtn: null,
    footerBtn: null
  };

  CONFIG = Object.assign(defaults, CONFIG);

  const brandLinkList = CONFIG.linkList.filter(a => a.type === 'brand');
  const productLinkList = CONFIG.linkList.filter(a => a.type === 'product');
  const normalLinkList = CONFIG.linkList.filter(a => a.type === 'normal');

  const IMAGE_URL = CONFIG.imagesUrl;
  const WARM_NAME = 'warm';
  const SALE_NAME = 'sale';
  
  
  const BODY_WIDTH = 1000;
  const NAV_Z_INDEX = 20;
  


  const bgListCss = CONFIG.bgList
    .map((a, i) => `.kmod-bg${i + 1}{height: ${a.height}px;}`)
    .join('\n');
  const bgListCssWarm = CONFIG.bgList
    .map((a, i) => `.kmod-warm .kmod-bg${i + 1}{background-image: url('${CONFIG.imagesUrl}${a.alt}');}`)
    .join('\n');
  const bgListCssSale = CONFIG.bgList
    .map((a, i) => `.kmod-sale .kmod-bg${i + 1}{background-image: url('${CONFIG.imagesUrl}${a.alt.replace('warm', 'sale')}');}`)
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


  function getCountdownCss(){
    if(!CONFIG.IS_COUNTDOWN) return '';
    return `
/* 倒计时-begin */
.kmod-countdown{overflow: hidden; position:absolute;top:${CONFIG.countdown.top}px;left:${CONFIG.countdown.left}px;width:263px;height:104px;text-align: center;}
.kmod-countdown-tips{display: inline-block;position:relative;margin:0 auto;height:32px;background:center 0 no-repeat}
.kmod-countdown-tips-text{color: #fff;font-size: 15px;}
.kmod-countdown-tips-line1,
.kmod-countdown-tips-line2{position:absolute;top:10px;width:500px;margin:0;border:0;border-top:1px solid #ccc;opacity: 0.6;filter:alpha(opacity=60);}
.kmod-countdown-tips-line1{left:-500px;margin-left:-10px}
.kmod-countdown-tips-line2{right:-500px;margin-right:-10px}
.kmod-countdown-main{width:263px;height:50px;background:url(${IMAGE_URL}countdown.png) center 0 no-repeat; text-align: left;}
.kmod-countdown-nums{position:relative;top:-3px;left:-2px;width:400px;font-size:30px;color:#000}
.kmod-countdown-num{float:left;width:62px;margin-left:5px;letter-spacing:6px}
/* 倒计时-end */
    `;
  }

  function getNavigatorCss(){
    if(!CONFIG.IS_NAVIGATOR) return '';
    return `
/* 导航-begin */
.kmod-nav-wrap{height:0}
.kmod-nav{position:relative;top:0;width:100%;margin:0 auto;z-index:${NAV_Z_INDEX}}
.kmod-nav.kstate-fixed{position:fixed}
.kmod-nav1{width:137px;height:461px;margin-left:1040px;padding-top:80px;background:url(${IMAGE_URL}nav.png) center 80px no-repeat}
.kmod-nav1 .kmod-nav-hd{height:168px}
.kmod-nav1 .kmod-nav-bd,
.kmod-nav1 .kmod-nav-ft{margin:0 11px 0 0}
.kmod-nav1 .kmod-nav-ft .kmod-hash{height:27px}
.kmod-nav1 .kmod-hash{display:block;width:100%;}
.kmod-hash1{ height:134px }
.kmod-hash2{ height:132px }
/* 导航-end */
    `;
  }

  function getCouponCss(){
    if(!CONFIG.IS_COUPON) return '';
    return `
/* 红包-begin */
.kmod-coupon{position:relative;width:482px;height:144px}
.kmod-nav-coupon{position:relative}
.kmod-coupon-btn{position:absolute;width:436px;display:block;height:98px;top:${CONFIG.couponBtn.top}px;left:${CONFIG.couponBtn.left}px;cursor:default;background:url(${IMAGE_URL}coupon-btn.png) no-repeat}
.kmod-nav-coupon-btn{position:absolute;top:137px;left:23px;width:81px;height:25px;background:url(${IMAGE_URL}nav-coupon-btn.png) 0 0 no-repeat;cursor:default}

.kstate-coupon-get .kmod-coupon-btn:hover,
.kstate-coupon-get .kmod-nav-coupon-btn:hover{opacity:.9;filter:alpha(opacity=90)}
.kstate-coupon-get .kmod-coupon-btn{background:url(${IMAGE_URL}coupon-btn.png) 0 -121px no-repeat;cursor:pointer}
.kstate-coupon-get .kmod-nav-coupon-btn{background:url(${IMAGE_URL}nav-coupon-btn.png) 0 -25px no-repeat;cursor:pointer}

.kstate-coupon-success .kmod-coupon-btn:hover,
.kstate-coupon-success .kmod-nav-coupon-btn:hover{opacity:1;filter:alpha(opacity=100)}
.kstate-coupon-success .kmod-coupon-btn{background:url(${IMAGE_URL}coupon-btn.png) 0 -241px no-repeat}
.kstate-coupon-success .kmod-nav-coupon-btn{background:url(${IMAGE_URL}nav-coupon-btn.png) 0 -50px no-repeat}
/* 红包-end */
    `;
  }

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
.kmod-plink{position:absolute;display:block;}
.kmod-hash { }
.kmod-target { display: block; position: relative; visibility: hidden; }

.kmod-bgs{}
.kmod-bg{background: no-repeat center 0;}
.kmod-main{position: absolute; top: 0; left: 0; right: 0; width: 100%;}
.kmod-links, .kmod-exts{}


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

${getCountdownCss()}

${getNavigatorCss()}

${getCouponCss()}

${bgListCss}
${bgListCssWarm}
${bgListCssSale}

${productLinkListCss}

${brandLinkListCss}

${normalLinkListCss}

.kmod-footer-btn {top: ${CONFIG.footerBtn.top}px; left: ${CONFIG.footerBtn.left}px; width: 246px; height: 61px; background: url('${IMAGE_URL}footer-btn.png') no-repeat center 0;}
.kmod-footer-btn:hover {opacity:.8;filter:alpha(opacity=80)}

/* 头部nav切换-begin */
.main-nav-link li a.current{background:none;cursor:pointer;font-weight:normal}
.main-nav-link li a.current:hover{background-color:#DB0A76}
.main-nav-link li a[href='http://kid.vip.com']{background-color:#BD1067;cursor:default;font-weight:700}
/* 头部nav切换-end */

/*  半品购调整-begin */
.warmup_bg .pro_bread{display: none;}
.warmup_bg, .list-define-w{overflow: hidden;position: relative;}
.warmup_bg .kmods{margin: 0 -460px;}
.list-define-w .kmods{margin: -380px -460px 0;}
/*  半品购调整-end */
  `;
};