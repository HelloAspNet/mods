const config = {
  bgList: [],
  linkList: [],
  navigator: {

  },
  link: {
    ids: [],

  },
  product: {
    ids: [],
    positions: []
  },
  brand: {
    ids: [],
    positions: []
  },
  countdown: {
    warmTime: '2016/04/07 20:00:00',
    saleTime: '2016/04/22 20:00:00',
    endTime: '2016/04/26 10:00:00'
  },
  coupon: {
    ids: []
  }
};

link = {
  map: {
    nh: '',
    NH: '',
    cd: '',
    CD: '',
    bj: '',
    BJ: '',
    sh: '',
    SH: '',
    hz: '',
    HZ: ''
  },
  position: {}
};

var MODS_CONFIG = {
  template: false,       // 使用artTemplate模版【boolean】
  layout: 'float',   // 布局方式【string：position/float】
  bodyWidth: 1000,      // 页面宽度【number】
  imageSuffix: '.jpg',
  header: {image: {}},         // 页头模块【boolean】
  footer: {image: {}},         // 页脚模块【boolean】
  footerBtn: {image: {}},
  navigators: [{image: {}}],    // 导航模块
  modulesLength: 13,
  modules: null,   // 常规模块【array】
  products: new Array(3),   // 产品模块【array】
  brands: new Array(5),     // 品牌模块【array】
  coupons: null,            // 红包模块【array】
  warmTime: '2016/04/07 20:00:00',
  saleTime: '2016/04/22 20:00:00',
  endTime: '2016/04/26 10:00:00'
};

