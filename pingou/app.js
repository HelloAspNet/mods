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
import Link from './components/Link';
import Mod from './components/Mod';

import stylesTpl from './tpls/styles';
import htmlTpl from './tpls/html';
import scriptsTpl from './tpls/scripts';

const Temps = {
  bgList: [],
  link: null,
  linkList: []
};

//
//function getBgListCss() {
//  console.log(Temps.bgList);
//  return Temps.bgList.map(({height, alt}) => {
//    return {height, alt}
//  })
//    .reduce((a, b, i) => {
//      return `${a}\n.kmod-bg${i + 1}{height: ${b.height}px; background-image: url('${b.alt}');}`
//    }, '');
//}
//function getLinkListCss() {
//  console.log(Temps.linkList)
//  return Temps.linkList.map(a => a.state)
//    .filter(a => a.width && a.height)
//    .sort((a, b) => a.top < b.top ? -1 : a.top > b.top ? 1 : a.left - b.left)
//    .reduce((a, b, i) => `${a}\n.kmod-link${i + 1}{top: ${b.top}px; left: ${b.left}px; width: ${b.width}px; height: ${b.height}px;}`, '');
//}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgList: [],
      linkList: []
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
    const link = <Link key={+new Date} onInit={this.onLinkInit.bind(this)} {...options}/>;
    this.state.linkList.push(link);
    this.setState(this.state);
  }

  /**
   *
   * 1. new and cache Link
   * 2. trigger cacheLink.update
   * 3. clear cacheLink
   *
   */
  dragBegin(e) {
    const {clientX, clientY} = e;
    const {scrollX, scrollY} = window;
    const {offsetTop, offsetLeft} = this.refs.linkListWrapper;

    this.addLink({
      top: clientY - offsetTop + scrollY,
      left: clientX - offsetLeft + scrollX
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

    const bgList = Temps.bgList.map(({height, alt}) => {return {height, alt}});
    const linkList = Temps.linkList.map(a => a.state)
      .filter(a => a.width && a.height)
      .sort((a, b) => a.top < b.top ? -1 : a.top > b.top ? 1 : a.left - b.left);

    const styles = stylesTpl({
      bgList: bgList,
      productLinkList: linkList
    });

    const html = htmlTpl({
      bgList: bgList,
      productLinkList: linkList
    });

    const scripts = scriptsTpl({
      productLinks: {},
      brandLinks: {},
      saleTime: `2016/04/24 10:00:00`,
      endTime: `2016/04/25 10:00:00`
    });


    console.log([
      '<style>', styles ,'</style>',
      html,
      '<script>', scripts, '</script>'
    ].join('\n'));
  }

  render() {
    return (
      <div className="kmods"
           onMouseDown={this.dragBegin.bind(this)}
           onMouseMove={this.draging.bind(this)}
           onMouseUp={this.dragEnd.bind(this)}>
        <Tools onBgListInit={this.onBgListInit.bind(this)} printCode={this.printCode.bind(this)}/>

        <div className="kmod-bgs">{this.state.bgList}</div>
        <div className="kmod-plinks">
          <div className="kmod-bd" ref="linkListWrapper">{this.state.linkList}</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

