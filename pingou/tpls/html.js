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
    .map((a, i) => `<div class="kmod-bg kmod-bg${i + 1}"></div>`)
    .join('\n');

  const brandLinkListHtml = brandLinkList
    .map((a, i) => `<a class="kmod-blink kmod-blink${i + 1}" href="javascript:;"></a>`)
    .join('\n');

  const productLinkListHtml = productLinkList
    .map((a, i) => `<a class="kmod-plink kmod-plink${i + 1}" href="javascript:;"></a>`)
    .join('\n');

  const normalLinkListHtml = normalLinkList
    .map((a, i) => `<a class="kmod-link kmod-link${i + 1}" href="javascript:;"></a>`)
    .join('\n');

  const hashListHtml = brandLinkList
    .map((a, i) => `<a class="kmod-hash kmod-hash${i + 1}" href="#kmod_hash${i + 1}" data-id="kmod_hash${i + 1}" target="_self"></a>`)
    .join('\n');

  const targetListHtml = brandLinkList
    .map((a, i) => `<a class="kmod-target" id="kmod_hash${i + 1}" name="kmod_hash${i + 1}"></a>`)
    .join('\n');



  function getCountdownHtml(){
    if(!CONFIG.IS_COUNTDOWN) return '';
    return `
              <!--倒计时-begin-->
                <div class="kmod-countdown" id="J_top_countdown">
                    <div class="kmod-countdown-tips">
                        <hr class="kmod-countdown-tips-line1">
                        <span class="kmod-countdown-tips-text" id="J_countdown_text"></span>
                        <hr class="kmod-countdown-tips-line2">
                    </div>
                    <div class="kmod-countdown-main">
                        <div class="kmod-countdown-nums">
                            <span class="kmod-countdown-num" id="day">00</span>
                            <span class="kmod-countdown-num" id="hour">00</span>
                            <span class="kmod-countdown-num" id="min">00</span>
                            <span class="kmod-countdown-num" id="sec">00</span>
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
                    <div class="kmod-bd">
                        <div class="kmod-nav kmod-nav1">
                            <div class="kmod-nav-hd">
                                <div class="kmod-nav-coupon">
                                    <a href="javascript:;" class="kmod-nav-coupon-btn"></a>
                                </div>
                            </div>
                            <div class="kmod-nav-bd">
                                ${hashListHtml}
                            </div>
                            <div class="kmod-nav-ft">
                                <a class="kmod-hash" href="#" target="_self"></a>
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
                <a href="javascript:;" class="kmod-coupon-btn"></a>
                <!--红包-end-->
    `;
  }

  return `
<!--模块总容器-begin-->
<div class="kmods kstate-warm kstate-debug">
    <div class="kmod-bgs">
        ${bgListHtml}
    </div>
    <div class="kmod-main">
        <div class="kmod-bd">
            <div class="kmod-links">
                ${brandLinkListHtml}
                ${productLinkListHtml}
                ${normalLinkListHtml}
            </div>
            <div class="kmod-exts">

                <!--这些拖到对应背景div里面-begin-->
${getNavigatorHtml()}

                    <!--锚点-begin-->
                    ${targetListHtml}
                    <!--锚点-end-->
                <!--这些拖到对应背景div里面-end-->

${getCountdownHtml()}

${getCouponHtml()}

                <a class="kmod-link kmod-footer-btn" target="_blank" href="http://kid.vip.com/"></a>

            </div>
        </div>
    </div>
</div>
<!--模块容器-end-->
  `;
}