import React, {Component} from 'react';
import File from './File';
import CONFIG from '../config';

class Tools extends File {
  constructor(props) {
    super(props);
    this.state = {
        CONFIG: CONFIG,
        imageList: []
    };

  }


  drop(e){
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    //this.load(files).then(imageList => console.log(imageList));
    this.loadImages(files).then(imageList => {
      this.props.onBgListInit(imageList);
      this.state.imageList = imageList.map((image, i) => <li key={i}>{image.alt}</li>);
      this.setState(this.state);
    });

    return false;
  }

  switchMode(mode) {
    CONFIG.LINK_MODE = CONFIG.LINK_MODE === mode ? null : mode;
    this.setState(this.state);
  }

  changeIsCountdown(){
    CONFIG.COUNTDOWN.isHidden = !CONFIG.COUNTDOWN.isHidden;
    this.setState(this.state);
  }
  changeIsNavigator(){
    CONFIG.NAVIGATOR.isHidden = !CONFIG.NAVIGATOR.isHidden;
    if(CONFIG.NAVIGATOR.isHidden) CONFIG.NAVIGATOR_COUPON_BUTTON.isHidden = true;
    this.setState(this.state);
  }
  changeIsCoupon(){
    CONFIG.COUPON_BUTTON.isHidden = !CONFIG.COUPON_BUTTON.isHidden;
    if(CONFIG.COUPON_BUTTON.isHidden) CONFIG.NAVIGATOR_COUPON_BUTTON.isHidden = true;
    this.setState(this.state);
  }
  changeIsFooterButton(){
    CONFIG.FOOTER_BUTTON.isHidden = !CONFIG.FOOTER_BUTTON.isHidden;
    this.setState(this.state);
  }

  printCode(){
    const {IS_COUNTDOWN, IS_NAVIGATOR, IS_COUPON} = CONFIG;
    const options = {IS_COUNTDOWN, IS_NAVIGATOR, IS_COUPON};
    //console.log(options)
    //console.log(CONFIG)
    const code = this.props.printCode(options);
    this.state.CODE = code;
    this.setState(this.state);
  }

  render() {
    return (
      <fieldset className="tools" onMouseDown={(e) => e.stopPropagation()}>

        <fieldset className="group">
        <div className="tool-images" onDragOver={this.dragOver.bind(this)} onDrop={this.drop.bind(this)}>图片拖到这里</div>
        </fieldset>

        <fieldset className="group">
          <label><input type="checkbox" checked={CONFIG.LINK_MODE === 'product'} onChange={this.switchMode.bind(this, 'product')}/>商品链接</label>
          <label><input type="checkbox" checked={CONFIG.LINK_MODE === 'brand'} onChange={this.switchMode.bind(this, 'brand')}/>档期链接</label>
          <label style={{display: 'none1'}}><input type="checkbox" checked={CONFIG.LINK_MODE === 'normal'} onChange={this.switchMode.bind(this, 'normal')}/>普通链接</label>
        </fieldset>


        <fieldset className="group" style={{display: 'none1'}}>
          <label><input type="checkbox" checked={!CONFIG.COUNTDOWN.isHidden} onChange={this.changeIsCountdown.bind(this)}/>倒计时</label>
          <label><input type="checkbox" checked={!CONFIG.NAVIGATOR.isHidden} onChange={this.changeIsNavigator.bind(this)}/>导航</label>
          <label><input type="checkbox" checked={!CONFIG.COUPON_BUTTON.isHidden} onChange={this.changeIsCoupon.bind(this)}/>红包按钮</label>
          <label><input type="checkbox" checked={!CONFIG.FOOTER_BUTTON.isHidden} onChange={this.changeIsFooterButton.bind(this)}/>底部按钮</label>
        </fieldset>


        <fieldset className="group" style={{background: '#fff'}}>
          <label><input type="button" onClick={this.printCode.bind(this)} value="生成代码"/></label>
          <textarea value={this.state.CODE}></textarea>
        </fieldset>

        <fieldset className="group">
          <label><a href="tools/product_ids.html" target="_blank">生成商品ID</a></label>
          <label><a href="tools/brand_ids.html" target="_blank">生成档期ID</a></label>
          <label><a href="tools/sgs.html" target="_blank">SGS格式转换</a></label>
        </fieldset>

        <ul>
          {this.state.imageList}
        </ul>
      </fieldset>
    );
  }
}

export default Tools;