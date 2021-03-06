import CONFIG from '../config';

export default function () {

  //const defaults = {
  //  imagesUrl: 'images/',  // 'http://a.vpimg3.com/upload/actpics/uidesign/2016/2m/0218haohaizi/'
  //  bgList: [],
  //  linkList: [],
  //  countdown: null,
  //  couponBtn: null,
  //  footerBtn: null
  //};
  //
  //CONFIG = Object.assign(defaults, CONFIG);

  const brandLinkList = CONFIG.linkList.filter(a => a.type === 'brand');
  const productLinkList = CONFIG.linkList.filter(a => a.type === 'product');
  const normalLinkList = CONFIG.linkList.filter(a => a.type === 'normal');

  const IMAGE_URL = CONFIG.imagesUrl;
  const WARM_NAME = 'warm';
  const SALE_NAME = 'sale';
  
  
  const BODY_WIDTH = 1000;
  const NAV_Z_INDEX = 20;
  


  const bgListCss = CONFIG.bgList
    .map((a, i) => `.${CONFIG.CSS_PREFIX}bg${i + 1}{height: ${a.height}px;}`)
    .join('\n');
  const bgListCssWarm = CONFIG.bgList
    .map((a, i) => `.${CONFIG.CSS_PREFIX}js-warm .${CONFIG.CSS_PREFIX}bg${i + 1}{background-image: url(${CONFIG.imagesUrl}${a.alt});}`)
    .join('\n');
  const bgListCssSale = CONFIG.bgList
    .map((a, i) => `.${CONFIG.CSS_PREFIX}js-sale .${CONFIG.CSS_PREFIX}bg${i + 1}{background-image: url(${CONFIG.imagesUrl}${a.alt.replace('warm', 'sale')});}`)
    .join('\n');

  const productLinkListCss = productLinkList
    .map((a, i) => `.${CONFIG.CSS_PREFIX}plink${i + 1} {top: ${a.top}px; left: ${a.left}px; width: ${a.width}px; height: ${a.height}px;}`)
    .join('\n');

  const brandLinkListCss = brandLinkList
    .map((a, i) => `.${CONFIG.CSS_PREFIX}blink${i + 1} {top: ${a.top}px; left: ${a.left}px; width: ${a.width}px; height: ${a.height}px;}`)
    .join('\n');

  const hashListCss = brandLinkList
    .map((a, i) => `.${CONFIG.CSS_PREFIX}hash${i + 1}{ display: block; width: 100%; height: 60px; }`);

  const targetListCss = brandLinkList
    .map((a, i) => `<a class="${CONFIG.CSS_PREFIX}target" id="${CONFIG.CSS_PREFIX}hash${i + 1}" name="${CONFIG.CSS_PREFIX}hash${i + 1}"></a>`);


  const normalLinkListCss = normalLinkList
    .map((a, i) => `.${CONFIG.CSS_PREFIX}link${i + 1} {top: ${a.top}px; left: ${a.left}px; width: ${a.width}px; height: ${a.height}px;}`)
    .join('\n');


  function getCountdownCss(){
    if(CONFIG.COUNTDOWN.isHidden) return '';
    return `
/* 倒计时-begin */
.${CONFIG.CSS_PREFIX}countdown{overflow: hidden; position:absolute;top:${CONFIG.COUNTDOWN.top}px;left:${CONFIG.COUNTDOWN.left}px;width:${CONFIG.COUNTDOWN.width}px;height:${CONFIG.COUNTDOWN.height + 32}px;text-align: center;}
.${CONFIG.CSS_PREFIX}countdown-tips{display: inline-block;position:relative;margin:0 auto;height:32px;background:center 0 no-repeat}
.${CONFIG.CSS_PREFIX}countdown-tips-text{color: #000;font-size: 15px;}
.${CONFIG.CSS_PREFIX}countdown-tips-line1,
.${CONFIG.CSS_PREFIX}countdown-tips-line2{position:absolute;top:10px;width:500px;margin:0;border:0;border-top:1px solid #ccc;opacity: 0.6;filter:alpha(opacity=60);}
.${CONFIG.CSS_PREFIX}countdown-tips-line1{left:-500px;margin-left:-10px}
.${CONFIG.CSS_PREFIX}countdown-tips-line2{right:-500px;margin-right:-10px}
.${CONFIG.CSS_PREFIX}countdown-main{width:263px;height:50px;background:url(${IMAGE_URL}${CONFIG.COUNTDOWN.alt || 'countdown.png'}) center 0 no-repeat; text-align: left;}
.${CONFIG.CSS_PREFIX}countdown-nums{position:relative;top:-3px;left:-2px;width:400px;font-size:30px;color:#fff}
.${CONFIG.CSS_PREFIX}countdown-num{float:left;width:62px;margin-left:5px;letter-spacing:6px}
/* 倒计时-end */
    `;
  }

  function getNavigatorCss(){
    if(CONFIG.NAVIGATOR.isHidden) return '';
    return `
/* 导航-begin */
.${CONFIG.CSS_PREFIX}nav-wrap{height:0}
.${CONFIG.CSS_PREFIX}nav{position:relative;top:0;width:100%;margin:0 auto;z-index:${NAV_Z_INDEX}}
.${CONFIG.CSS_PREFIX}nav.${CONFIG.CSS_PREFIX}js-fixed{position:fixed}
.${CONFIG.CSS_PREFIX}nav1{width:${CONFIG.NAVIGATOR.width}px;height:${CONFIG.NAVIGATOR.height}px;margin-left:1040px;padding-top:${CONFIG.NAVIGATOR.top}px;background:url(${IMAGE_URL}${CONFIG.NAVIGATOR.alt || 'nav.png'}) center ${CONFIG.NAVIGATOR.top}px no-repeat}
.${CONFIG.CSS_PREFIX}nav1 .${CONFIG.CSS_PREFIX}nav-hd{height:168px}
.${CONFIG.CSS_PREFIX}nav1 .${CONFIG.CSS_PREFIX}nav-bd,
.${CONFIG.CSS_PREFIX}nav1 .${CONFIG.CSS_PREFIX}nav-ft{margin:0 11px 0 0}
.${CONFIG.CSS_PREFIX}nav1 .${CONFIG.CSS_PREFIX}nav-ft .${CONFIG.CSS_PREFIX}hash{height:40px}
.${CONFIG.CSS_PREFIX}nav1 .${CONFIG.CSS_PREFIX}hash{display:block;width:100%;height: 40px;}
/*.${CONFIG.CSS_PREFIX}hash1{ height:134px }*/
/*.${CONFIG.CSS_PREFIX}hash2{ height:132px }*/
/* 导航-end */
    `;
  }

  function getCouponCss(){
    if(CONFIG.COUPON_BUTTON.isHidden) return '';
    return `
/* 红包-begin */
.${CONFIG.CSS_PREFIX}coupon{position:relative}
.${CONFIG.CSS_PREFIX}nav-coupon{position:relative}
.${CONFIG.CSS_PREFIX}coupon-btn{position:absolute;width:${CONFIG.COUPON_BUTTON.width}px;display:block;height:${Math.floor(CONFIG.COUPON_BUTTON.height / 3)}px;top:${CONFIG.COUPON_BUTTON.top}px;left:${CONFIG.COUPON_BUTTON.left}px;cursor:default;background:url(${IMAGE_URL}${CONFIG.COUPON_BUTTON.alt || 'coupon-btn.png'}) no-repeat}
.${CONFIG.CSS_PREFIX}nav-coupon-btn{position:absolute;top:${CONFIG.NAVIGATOR_COUPON_BUTTON.top}px;left:23px;width:${CONFIG.NAVIGATOR_COUPON_BUTTON.width}px;height:${Math.floor(CONFIG.NAVIGATOR_COUPON_BUTTON.height / 3)}px;background:url(${IMAGE_URL}nav-coupon-btn.png) 0 0 no-repeat;cursor:default}

.${CONFIG.CSS_PREFIX}js-coupon-get .${CONFIG.CSS_PREFIX}coupon-btn:hover,
.${CONFIG.CSS_PREFIX}js-coupon-get .${CONFIG.CSS_PREFIX}nav-coupon-btn:hover{opacity:.9;filter:alpha(opacity=90)}
.${CONFIG.CSS_PREFIX}js-coupon-get .${CONFIG.CSS_PREFIX}coupon-btn{background-position:0 ${-Math.floor(CONFIG.COUPON_BUTTON.height / 3)}px;cursor:pointer}
.${CONFIG.CSS_PREFIX}js-coupon-get .${CONFIG.CSS_PREFIX}nav-coupon-btn{background-position:0 ${-Math.floor(CONFIG.NAVIGATOR_COUPON_BUTTON.height / 3)}px;cursor:pointer}

.${CONFIG.CSS_PREFIX}js-coupon-success .${CONFIG.CSS_PREFIX}coupon-btn:hover,
.${CONFIG.CSS_PREFIX}js-coupon-success .${CONFIG.CSS_PREFIX}nav-coupon-btn:hover{opacity:1;filter:alpha(opacity=100)}
.${CONFIG.CSS_PREFIX}js-coupon-success .${CONFIG.CSS_PREFIX}coupon-btn{background-position: 0 ${-Math.floor(CONFIG.COUPON_BUTTON.height * 2 / 3)}px}
.${CONFIG.CSS_PREFIX}js-coupon-success .${CONFIG.CSS_PREFIX}nav-coupon-btn{background-position:0 ${-Math.floor(CONFIG.NAVIGATOR_COUPON_BUTTON.height * 2 / 3)}px}
/* 红包-end */
    `;
  }

  function getFooterBtnCss(){
    if(CONFIG.FOOTER_BUTTON.isHidden) return '';
    return `
.${CONFIG.CSS_PREFIX}footer-btn {top: ${CONFIG.FOOTER_BUTTON.top}px; left: ${CONFIG.FOOTER_BUTTON.left}px; width: ${CONFIG.FOOTER_BUTTON.width}px; height: ${CONFIG.FOOTER_BUTTON.height}px; background: url(${IMAGE_URL}${CONFIG.FOOTER_BUTTON.alt || 'footer-btn.png'}) no-repeat center 0;}
.${CONFIG.CSS_PREFIX}footer-btn:hover {opacity:.8;filter:alpha(opacity=80)}
    `
  }

  return `
/* 状态-begin */
.${CONFIG.CSS_PREFIX}js-debug a{background-color:rgba(0,0,0,.3)}
.${CONFIG.CSS_PREFIX}js-debug a.${CONFIG.CSS_PREFIX}js-hover,
.${CONFIG.CSS_PREFIX}js-debug a:hover{background-color:rgba(0,0,0,.4)}
.${CONFIG.CSS_PREFIX}js-hover{}
.${CONFIG.CSS_PREFIX}js-fixed{position:fixed}
/* 状态-end */

.${CONFIG.CSS_PREFIX}mods{overflow:hidden; position: relative;}
.${CONFIG.CSS_PREFIX}mod{background:center top no-repeat}
.${CONFIG.CSS_PREFIX}bd{position:relative;width:${BODY_WIDTH}px;margin:0 auto}
.${CONFIG.CSS_PREFIX}bd:after,
.${CONFIG.CSS_PREFIX}bd:before{display:table;content:""}
.${CONFIG.CSS_PREFIX}bd:after{clear:both}
.${CONFIG.CSS_PREFIX}link,
.${CONFIG.CSS_PREFIX}blink,
.${CONFIG.CSS_PREFIX}plink{position:absolute;display:block;}
.${CONFIG.CSS_PREFIX}hash { }
.${CONFIG.CSS_PREFIX}target { display: block; position: relative; visibility: hidden; }

.${CONFIG.CSS_PREFIX}bgs{}
.${CONFIG.CSS_PREFIX}bg{background: no-repeat center 0;}
.${CONFIG.CSS_PREFIX}main{position: absolute; top: 0; left: 0; right: 0; width: 100%;}
.${CONFIG.CSS_PREFIX}links, .${CONFIG.CSS_PREFIX}exts{}


/* 售卖状态-begin */
.${CONFIG.CSS_PREFIX}plink .${CONFIG.CSS_PREFIX}tips{position:relative;top:50%;left:50%;display:none}
.${CONFIG.CSS_PREFIX}plink.${CONFIG.CSS_PREFIX}js-sold-onload,
.${CONFIG.CSS_PREFIX}js-sale .${CONFIG.CSS_PREFIX}plink.${CONFIG.CSS_PREFIX}js-sold-onload{cursor:default}
.${CONFIG.CSS_PREFIX}js-warm .${CONFIG.CSS_PREFIX}plink:hover .${CONFIG.CSS_PREFIX}tips{display:block;width:86px;height:47px;margin:-23px 0 0 -43px;background:url(http://a.vpimg4.com/upload/actpics/uidesign/2015/10m/1024sport/floor3_btn.png) no-repeat}
.${CONFIG.CSS_PREFIX}js-sale .${CONFIG.CSS_PREFIX}plink:hover .${CONFIG.CSS_PREFIX}tips{display:block;width:82px;height:76px;margin:-38px 0 0 -41px;background:url(http://a.vpimg2.com/upload/actpics/pingou/2015/5m/21/andi/buy_ico.png) no-repeat}
.${CONFIG.CSS_PREFIX}js-sale .${CONFIG.CSS_PREFIX}plink.${CONFIG.CSS_PREFIX}js-sold-chance .${CONFIG.CSS_PREFIX}tips,
.${CONFIG.CSS_PREFIX}js-sale .${CONFIG.CSS_PREFIX}plink.${CONFIG.CSS_PREFIX}js-sold-chance:hover .${CONFIG.CSS_PREFIX}tips{display:block;width:75px;height:75px;margin:-37px 0 0 -37px;background:url(http://a.vpimg2.com/upload/actpics/pingou/2015/5m/21/andi/chance_yellow.png) no-repeat}
.${CONFIG.CSS_PREFIX}js-sale .${CONFIG.CSS_PREFIX}plink.${CONFIG.CSS_PREFIX}js-sold-out .${CONFIG.CSS_PREFIX}tips,
.${CONFIG.CSS_PREFIX}js-sale .${CONFIG.CSS_PREFIX}plink.${CONFIG.CSS_PREFIX}js-sold-out:hover .${CONFIG.CSS_PREFIX}tips{display:block;width:75px;height:75px;margin:-37px 0 0 -37px;background:url(http://a.vpimg2.com/upload/actpics/pingou/2015/5m/21/andi/off_sell_icon_circle.png) no-repeat}
.${CONFIG.CSS_PREFIX}plink.${CONFIG.CSS_PREFIX}js-sold-onload .${CONFIG.CSS_PREFIX}tips,
.${CONFIG.CSS_PREFIX}plink.${CONFIG.CSS_PREFIX}js-sold-onload:hover .${CONFIG.CSS_PREFIX}tips,
.${CONFIG.CSS_PREFIX}js-sale .${CONFIG.CSS_PREFIX}plink.${CONFIG.CSS_PREFIX}js-sold-onload .${CONFIG.CSS_PREFIX}tips,
.${CONFIG.CSS_PREFIX}js-sale .${CONFIG.CSS_PREFIX}plink.${CONFIG.CSS_PREFIX}js-sold-onload:hover .${CONFIG.CSS_PREFIX}tips{width:82px;height:82px;margin:-41px 0 0 -41px;background:url(http://a.vpimg4.com/upload/actpics/uidesign/2016/1m/0122balabala/zailushang.png) no-repeat;display:block}
/* 售卖状态-end */

${getCountdownCss()}

${getNavigatorCss()}

${getCouponCss()}

${bgListCss}
${bgListCssWarm}
${bgListCssSale}

${brandLinkListCss}

${productLinkListCss}

${normalLinkListCss}

${getFooterBtnCss()}

/* 头部nav切换-begin */
.main-nav-link li a.current{background:none;cursor:pointer;font-weight:normal}
.main-nav-link li a.current:hover{background-color:#DB0A76}
.main-nav-link li a[href='http://kid.vip.com']{background-color:#BD1067;cursor:default;font-weight:700}
/* 头部nav切换-end */

/*  半品购调整-begin */
.warmup_bg .pro_bread{display: none;}
.warmup_bg, .list-define-w{overflow: hidden;position: relative;}
.warmup_bg .${CONFIG.CSS_PREFIX}mods{margin: 0 -460px;}
.list-define-w .${CONFIG.CSS_PREFIX}mods{margin: -380px -460px 0;}
/*  半品购调整-end */
  `;
};