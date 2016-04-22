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


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      linkList: [],
      domLinkList: []
    };
    this.linkTemp = null;
  }



  updateModList(modList){
    console.log(1,modList)
    this.state.modList = modList;

    this.setState(this.state);
  }


  onLinkInit(link){
    this.state.linkList.push(link);
  }

  onLinkSelect(link){
    this.linkTemp = link;
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

    this.state.domLinkList.push(<Link key={+new Date} top={clientY - offsetTop + scrollY} left={clientX - offsetLeft + scrollX} onInit={this.onLinkInit.bind(this)} onSelect={this.onLinkSelect.bind(this)}/>);
    this.setState(this.state);

    //console.log(`begin with point x: ${clientX}, y: ${clientY}`);
  }

  draging(e) {

    if(!this.linkTemp) return;

    const {clientX, clientY} = e;
    const {scrollX, scrollY} = window;
    const {offsetTop, offsetLeft} = this.refs.linkListWrapper;

    this.linkTemp.update({
      x: clientX - offsetLeft + scrollX,
      y: clientY - offsetTop + scrollY
    });

    //console.log(`move with point x: ${clientX}, y: ${clientY}`);

  }

  dragEnd(e) {
    const {clientX, clientY} = e;
    this.linkTemp = null;
    //console.log(`end with point x: ${clientX}, y: ${clientY}`);
  }


  getLinksCss(){
    console.log(this.state.linkList);

    const bgsCss = '';

    const linksCss = this.state.linkList.map(a => a.state)
      .filter(a => a.width && a.height)
      .sort((a, b) => a.top < b.top ? -1 : a.top > b.top ? 1 : a.left - b.left)
      .reduce((a, b, i) => a + `.kmod-link${i + 1}{top:${b.top}px;left:${b.left}px;width:${b.width}px;height:${b.height}px;}` + '\n', '' );


  }

  render() {
    return (
      <div className="kmods" onMouseDown={this.dragBegin.bind(this)} onMouseMove={this.draging.bind(this)}
           onMouseUp={this.dragEnd.bind(this)}>
        <Tools updateModList={this.updateModList.bind(this)} getLinksCss={this.getLinksCss.bind(this)}/>
        <div className="kmod-bgs">
          {this.state.modList}
        </div>
        <div className="kmod-plinks">
          <div className="kmod-bd" ref="linkListWrapper">
            {this.state.domLinkList}
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

