export default function (CONFIG) {

  const defaults = {
    bgList: [],
    linkList: []
  };

  CONFIG = Object.assign(defaults, CONFIG);

  const brandLinkList = CONFIG.linkList.filter(a => a.type === 'brand');
  const productLinkList = CONFIG.linkList.filter(a => a.type === 'product');
  const normalLinkList = CONFIG.linkList.filter(a => a.type === 'normal');

  const bgListHtml = CONFIG.bgList
    .map((a, i) => `<div class="${CONFIG.CSS_PREFIX}bg ${CONFIG.CSS_PREFIX}bg${i + 1}"></div>`)
    .join('\n');

  const brandLinkListHtml = brandLinkList
    .map((a, i) => `<a class="${CONFIG.CSS_PREFIX}blink ${CONFIG.CSS_PREFIX}blink${i + 1}" href="javascript:;"></a>`)
    .join('\n');

  const productLinkListHtml = productLinkList
    .map((a, i) => `<a class="${CONFIG.CSS_PREFIX}plink ${CONFIG.CSS_PREFIX}plink${i + 1}" href="javascript:;"></a>`)
    .join('\n');

  const normalLinkListHtml = normalLinkList
    .map((a, i) => `<a class="${CONFIG.CSS_PREFIX}link ${CONFIG.CSS_PREFIX}link${i + 1}" href="javascript:;"></a>`)
    .join('\n');


  var hashList = [1,2];
  const hashListHtml = hashList
    .map((a, i) => `<a class="${CONFIG.CSS_PREFIX}hash ${CONFIG.CSS_PREFIX}hash${i + 1}" href="#${CONFIG.CSS_PREFIX}hash${i + 1}" data-id="${CONFIG.CSS_PREFIX}hash${i + 1}" target="_self"></a>`)
    .join('\n');

  const targetListHtml = hashList
    .map((a, i) => `<a class="${CONFIG.CSS_PREFIX}target" id="${CONFIG.CSS_PREFIX}hash${i + 1}" name="${CONFIG.CSS_PREFIX}hash${i + 1}"></a>`)
    .join('\n');



  function getCountdownHtml(){
    if(!CONFIG.IS_COUNTDOWN) return '';
    return `
              <!--倒计时-begin-->
                <div class="${CONFIG.CSS_PREFIX}countdown" id="J_top_countdown">
                    <div class="${CONFIG.CSS_PREFIX}countdown-tips">
                        <hr class="${CONFIG.CSS_PREFIX}countdown-tips-line1">
                        <span class="${CONFIG.CSS_PREFIX}countdown-tips-text" id="J_countdown_text"></span>
                        <hr class="${CONFIG.CSS_PREFIX}countdown-tips-line2">
                    </div>
                    <div class="${CONFIG.CSS_PREFIX}countdown-main">
                        <div class="${CONFIG.CSS_PREFIX}countdown-nums">
                            <span class="${CONFIG.CSS_PREFIX}countdown-num" id="day">00</span>
                            <span class="${CONFIG.CSS_PREFIX}countdown-num" id="hour">00</span>
                            <span class="${CONFIG.CSS_PREFIX}countdown-num" id="min">00</span>
                            <span class="${CONFIG.CSS_PREFIX}countdown-num" id="sec">00</span>
                        </div>
                    </div>
                </div>
                <!--倒计时-end-->
    `;
  }

  function getNavigatorHtml(){
    if(!CONFIG.IS_NAVIGATOR) return '';
    return `
                    <!--导航-begin-->
                    <div class="${CONFIG.CSS_PREFIX}bd">
                        <div class="${CONFIG.CSS_PREFIX}nav ${CONFIG.CSS_PREFIX}nav1">
                            <div class="${CONFIG.CSS_PREFIX}nav-hd">
                                <div class="${CONFIG.CSS_PREFIX}nav-coupon">
                                    <a href="javascript:;" class="${CONFIG.CSS_PREFIX}nav-coupon-btn"></a>
                                </div>
                            </div>
                            <div class="${CONFIG.CSS_PREFIX}nav-bd">
                                ${hashListHtml}
                            </div>
                            <div class="${CONFIG.CSS_PREFIX}nav-ft">
                                <a class="${CONFIG.CSS_PREFIX}hash" href="#" target="_self"></a>
                            </div>
                        </div>
                    </div>
                    <!--导航-end-->
    `;
  }

  function getCouponHtml(){
    if(!CONFIG.IS_COUPON) return '';
    return `
                <!--红包-begin-->
                <a href="javascript:;" class="${CONFIG.CSS_PREFIX}coupon-btn"></a>
                <!--红包-end-->
    `;
  }

  function getFooterBtnHtml(){
    if(!CONFIG.IS_FOOTER_BTN) return '';
    return `
               <a class="${CONFIG.CSS_PREFIX}link ${CONFIG.CSS_PREFIX}footer-btn" target="_blank" href="http://kid.vip.com/"></a>
    `;
  }

  return `
<!--模块总容器-begin-->
<div class="${CONFIG.CSS_PREFIX}mods ${CONFIG.CSS_PREFIX}js-warm ${CONFIG.CSS_PREFIX}js-debug">
    <div class="${CONFIG.CSS_PREFIX}bgs">
        ${bgListHtml}
    </div>
    <div class="${CONFIG.CSS_PREFIX}main">
        <div class="${CONFIG.CSS_PREFIX}bd">
            <div class="${CONFIG.CSS_PREFIX}links">

                ${brandLinkListHtml}

                ${productLinkListHtml}

                ${normalLinkListHtml}

            </div>
            <div class="${CONFIG.CSS_PREFIX}exts">

                <!--这些拖到对应背景div里面-begin-->
${getNavigatorHtml()}

                    <!--锚点-begin-->
                    ${targetListHtml}
                    <!--锚点-end-->
                <!--这些拖到对应背景div里面-end-->

${getCountdownHtml()}

${getCouponHtml()}

${getFooterBtnHtml()}

            </div>
        </div>
    </div>
</div>
<!--模块容器-end-->
  `;
}