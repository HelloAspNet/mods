const tag = 'pingou_config';
const cache = localStorage.getItem(tag);

const CONFIG = {
  CSS_PREFIX: 'kmod-',

  // 倒计时及其配置
  IS_COUNTDOWN: true,
  WARM_TIME: '',
  SALE_TIME: '',
  END_TIME: '',

  // 导航
  IS_NAVIGATOR: true,

  // 红包
  IS_COUPON: true,

  // 底部按钮
  IS_FOOTER_BTN: true,

  LINK_MODE: null, // LINK_MODE: {product, brand, normal}



  imagesUrl: 'images/',  // 'http://a.vpimg3.com/upload/actpics/uidesign/2016/2m/0218haohaizi/'
  bgList: [],
  linkList: [],

  COUNTDOWN: {},
  COUPON_BUTTON: {},
  FOOTER_BUTTON: {},
  NAVIGATOR: {},
  NAVIGATOR_COUPON_BUTTON: {},

  PRODUCTS_DATA: {"VIP_NH":[],"VIP_SH":[],"VIP_CD":[],"VIP_BJ":[],"VIP_HZ":[]},
  BRANDS_DATA: {"VIP_NH":[],"VIP_SH":[],"VIP_CD":[],"VIP_BJ":[],"VIP_HZ":[]},

  save(){
    localStorage.setItem(tag, JSON.stringify(this));
  }
};

try{
  Object.assign(CONFIG, JSON.parse(cache));
}
catch (e){

}

export default CONFIG;