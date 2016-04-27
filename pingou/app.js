import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ES6Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import co from 'co';
import Q from 'q';
import 'babel-polyfill';

ES6Promise.polyfill();


import Tools from './components/Tools';
import Preview from './components/Preview';
import Area from './components/Area';
import Mod from './components/Mod';

import stylesTpl from './tpls/styles';
import htmlTpl from './tpls/html';
import scriptsTpl from './tpls/scripts';

const CONFIG = {
  IS_COUNTDOWN: true,
  IS_NAVIGATOR: true,
  IS_COUPON: true
};


const Temps = {
  mode: null,
  bgList: [],
  link: null,
  linkList: [],
  countdown: null,
  couponBtn: null,
  footerBtn: null
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
  }

  addLink(options) {
    const link = <Area key={+new Date} onInit={this.onLinkInit.bind(this)} {...options}/>;
    this.state.linkList.push(link);
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
    if(!Temps.mode) return;

    const {clientX, clientY} = e;
    const {scrollX, scrollY} = window;
    const {offsetTop, offsetLeft} = this.refs.linkListWrapper;

    this.addLink({
      top: clientY - offsetTop + scrollY,
      left: clientX - offsetLeft + scrollX,
      type: Temps.mode
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

  printCode(CONFIG){

    const bgList = Temps.bgList.map(({height, alt}) => {return {height, alt}});
    const linkList = Temps.linkList.map(a => a.state)
      .filter(a => a.width && a.height)
      .sort((a, b) => a.top < b.top ? -1 : a.top > b.top ? 1 : a.left - b.left);

    const styles = stylesTpl(Object.assign({
      bgList: bgList,
      linkList: linkList,
      countdown: Temps.countdown.state,
      couponBtn: Temps.couponBtn.state,
      footerBtn: Temps.footerBtn.state
    }, CONFIG));

    const html = htmlTpl(Object.assign({
      bgList: bgList,
      linkList: linkList
    }, CONFIG));

    const scripts = scriptsTpl(Object.assign({
      saleTime: `2016/04/24 10:00:00`,
      endTime: `2016/04/25 10:00:00`
    }, CONFIG));

    const code = [
      '<style>', styles ,'</style>',
      html,
      '<script>', scripts, '</script>'
    ].join('\n');

    return code;
  }

  onSwitchLinkMode(mode, value){
    Temps.mode = value ? mode : null;
  }


  render() {
    return (
      <div className="kmods"
           onMouseDown={this.dragBegin.bind(this)}
           onMouseMove={this.draging.bind(this)}
           onMouseUp={this.dragEnd.bind(this)}>
        <Tools
          config={CONFIG}
          onBgListInit={this.onBgListInit.bind(this)}
          onSwitchLinkMode={this.onSwitchLinkMode.bind(this)}
          printCode={this.printCode.bind(this)}/>

        <div className="kmod-bgs">{this.state.bgList}</div>
        <div className="kmod-plinks">
          <div className="kmod-bd" ref="linkListWrapper">{this.state.linkList}</div>
        </div>
        <div className="kmod-exts">
          <div className="kmod-bd" ref="extListWrapper">
            <Area text="countdown" onInit={obj => Temps.countdown = obj} {...{top: 20, left: 300, width: 120, height: 40}}></Area>
            <Area text="coupon_btn" onInit={obj => Temps.couponBtn = obj} {...{top: 120, left: 300, width: 120, height: 40}}></Area>
            <Area text="footer_btn" onInit={obj => Temps.footerBtn = obj} {...{top: 220, left: 300, width: 120, height: 40}}></Area>
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
