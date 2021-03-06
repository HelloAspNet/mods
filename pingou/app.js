import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import ES6Promise from 'es6-promise';
// import fetch from 'isomorphic-fetch'; 
import 'babel-polyfill';

// ES6Promise.polyfill();

import CONFIG from './config';

import Tools from './components/Tools';
import Area from './components/Area';
import Mod from './components/Mod';

import stylesTpl from './tpls/styles';
import htmlTpl from './tpls/html';
import scriptsTpl from './tpls/scripts';
//
//const CONFIG = {
//  CSS_PREFIX: 'kmod-',
//
//  // 倒计时及其配置
//  IS_COUNTDOWN: true,
//  WARM_TIME: '',
//  SALE_TIME: '',
//  END_TIME: '',
//
//  // 导航
//  IS_NAVIGATOR: true,
//
//  // 红包
//  IS_COUPON: true,
//
//  // 底部按钮
//  IS_FOOTER_BTN: true,
//
//  LINK_MODE: null // LINK_MODE: {product, brand, normal}
//};


const Temps = {
  bgList: [],
  link: null,
  linkId: 0,
  links: {},
  linkList: [],
  countdown: null,
  couponBtn: null,
  footerBtn: null,
  navigator: null,
  navCouponBtn: null
};


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CONFIG: CONFIG,
      bgList: [],
      linkList: [],
      tools: {}
    };

    if(CONFIG.bgList.length){
      //this.onBgListInit(CONFIG.bgList);
    }
  }

  onBgListInit(list) {
    Temps.bgList = list;
    this.state.bgList = list.map((image, i) => <Mod key={i} width={image.width} height={image.height}
                                                    bgUrl={image.src}/>);
    this.setState(this.state);
  }

  onLinkInit(link) {
    Temps.link = link;
    Temps.linkList.push(link);

    //console.log(link)
    //Temps.links[Temps.linkId].model = link;

  }



  addLink(options) {
    Temps.linkId += 1;
    const linkId = Temps.linkId;
    options.isSupportRemove = true;
    options.isSupportBackground = true;
    const link = <Area key={linkId} onInit={this.onLinkInit.bind(this)} {...options}/>;
    //Temps.links[linkId] = {
    //  el: link
    //};
    this.state.linkList.push(link);

    //this.state.linkList = Object.values(Temps.links).map(obj => obj.el);
    //console.log(222)
    this.setState(this.state);
  }

  /**
   *
   * 1. new and cache Area
   * 2. trigger cacheLink.update
   * 3. clear cacheLink
   *
   */
  dragBegin(e) {
    if(!CONFIG.LINK_MODE) return;

    const {clientX, clientY} = e;
    const {scrollX, scrollY} = window;
    const {offsetTop, offsetLeft} = this.refs.linkListWrapper;

    this.addLink({
      top: clientY - offsetTop + scrollY,
      left: clientX - offsetLeft + scrollX,
      type: CONFIG.LINK_MODE//,
      //isSupportScale: true
    });
  }

  draging(e) {
    if (!Temps.link) return;

    const {clientX, clientY} = e;
    const {scrollX, scrollY} = window;
    const {offsetTop, offsetLeft} = this.refs.linkListWrapper;

    Temps.link.update({
      x: clientX - offsetLeft + scrollX,
      y: clientY - offsetTop + scrollY
    });
  }

  dragEnd(e) {
    Temps.link = null;
  }

  printCode(){

    const bgList = Temps.bgList.map(({height, alt, src}) => {return {height, alt, src}});
    const linkList = Temps.linkList.map(a => a.state)
      .filter(a => !a.isHidden && a.width && a.height);

    //// 按位置排序，优先级为［top－left, 小－大］
    //linkList.sort((a, b) => a.top < b.top ? -1 : a.top > b.top ? 1 : a.left - b.left);



    Object.assign(CONFIG, {
      bgList: bgList,
      linkList: linkList,
      COUNTDOWN: Temps.countdown.state,
      COUPON_BUTTON: Temps.couponBtn.state,
      FOOTER_BUTTON: Temps.footerBtn.state,
      NAVIGATOR: Temps.navigator.state,
      NAVIGATOR_COUPON_BUTTON: Temps.navCouponBtn.state
    });

    const styles = stylesTpl();

    const html = htmlTpl();

    const scripts = scriptsTpl();

    const code = [
      '<style>', styles ,'</style>',
      html,
      '<script>', scripts, '</script>'
    ].join('\n');

    return code;
  }

  render() {
    return (
      <div className="kmods"
           onMouseDown={this.dragBegin.bind(this)}
           onMouseMove={this.draging.bind(this)}
           onMouseUp={this.dragEnd.bind(this)}>
        <Tools
          CONFIG={CONFIG}
          onBgListInit={this.onBgListInit.bind(this)}
          printCode={this.printCode.bind(this)}/>

        <div className="kmod-bgs">{this.state.bgList}</div>
        <div className="kmod-plinks">
          <div className="kmod-bd" ref="linkListWrapper">{this.state.linkList}</div>
        </div>
        <div className="kmod-exts">
          <div className="kmod-bd" ref="extListWrapper">
            <Area text="倒计时" onInit={obj => Temps.countdown = obj} {...{top: 20, left: 300, width: 120, height: 40, isHidden: CONFIG.COUNTDOWN.isHidden, isSupportBackground: true}}></Area>
            <Area text="红包按钮" onInit={obj => Temps.couponBtn = obj} {...{top: 120, left: 300, width: 120, height: 40, isHidden: CONFIG.COUPON_BUTTON.isHidden, isSupportBackground: true}}></Area>
            <Area text="底部按钮" onInit={obj => Temps.footerBtn = obj} {...{top: 220, left: 300, width: 120, height: 40, isHidden: CONFIG.FOOTER_BUTTON.isHidden, isSupportBackground: true}}></Area>
            <Area text="导航" onInit={obj => Temps.navigator = obj} {...{top: 80, left: 1040, width: 120, height: 360, isHidden: CONFIG.NAVIGATOR.isHidden, isSupportBackground: true, isFixed: true}}></Area>
            <Area text="导航红包" onInit={obj => Temps.navCouponBtn = obj} {...{top: 120, left: 1060, width: 80, height: 40, isHidden: CONFIG.NAVIGATOR_COUPON_BUTTON.isHidden, isSupportBackground: true, isFixed: true}}></Area>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

//
//import Koa from 'koa';
