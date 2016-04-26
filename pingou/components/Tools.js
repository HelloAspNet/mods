import React, {Component} from 'react';
import Q from 'q';

class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: []
    }
  }

  dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  drop(e) {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    const fileList = Object.keys(files).map(i => files[i]);
    const promiseList = fileList.map(file => {
      const defer = Q.defer();
      const reader = new FileReader;
      reader.addEventListener('load', () => {
        const image = new Image;
        image.src = reader.result;
        image.alt = file.name;
        image.addEventListener('load', e => defer.resolve(image));
      });
      reader.readAsDataURL(file);
      return defer.promise;
    });

    console.log('files: ', files);

    Q.all(promiseList).then(([...imageList]) => {

      this.props.onBgListInit(imageList);

      this.state.imageList = imageList.map((image, i) => <li key={i}>{image.alt}</li>);
      this.setState(this.state);
    });

    return false;
  }


  switchMode(mode) {
    const map = {
      product: 'isProductMode',
      brand: 'isBrandMode',
      normal: 'isNormalMode'
    };
    const prop = map[mode];
    const oldValue = this.state[prop];
    const newValue = !oldValue;
    this.state.isProductMode = false;
    this.state.isBrandMode = false;
    this.state.isNormalMode = false;
    this.state[prop] = newValue;
    this.setState(this.state);
    this.props.onSwitchLinkMode(mode, newValue);
  }

  changeIsCountdown(){
    this.state.IS_COUNTDOWN = !this.state.IS_COUNTDOWN;
    this.setState(this.state);
  }
  changeIsNavigator(){
    this.state.IS_NAVIGATOR = !this.state.IS_NAVIGATOR;
    this.setState(this.state);
  }
  changeIsCoupon(){
    this.state.IS_COUPON = !this.state.IS_COUPON;
    this.setState(this.state);
  }

  printCode(){
    const {IS_COUNTDOWN, IS_NAVIGATOR, IS_COUPON} = this.state;
    const options = {IS_COUNTDOWN, IS_NAVIGATOR, IS_COUPON};
    console.log(options)
    const code = this.props.printCode(options);
    console.log(code);
  }

  render() {
    return (
      <fieldset className="tools" onMouseDown={(e) => e.stopPropagation()}>

        <div className="tool-images" onDragOver={this.dragOver.bind(this)} onDrop={this.drop.bind(this)}>这里这里</div>

        <label><input type="button" onClick={this.printCode.bind(this)} value="printCode"/></label>

        <fieldset>
          <label><input type="checkbox" checked={this.state.isProductMode} onChange={this.switchMode.bind(this, 'product')}/>plink</label>
          <label><input type="checkbox" checked={this.state.isBrandMode} onChange={this.switchMode.bind(this, 'brand')}/>blink</label>
          <label><input type="checkbox" checked={this.state.isNormalMode} onChange={this.switchMode.bind(this, 'normal')}/>link</label>
        </fieldset>

        <fieldset>
          <label><input type="checkbox" checked={this.state.IS_COUNTDOWN} onChange={this.changeIsCountdown.bind(this)}/>countdown</label>
          <label><input type="checkbox" checked={this.state.IS_NAVIGATOR} onChange={this.changeIsNavigator.bind(this)}/>navigator</label>
          <label><input type="checkbox" checked={this.state.IS_COUPON} onChange={this.changeIsCoupon.bind(this)}/>coupon</label>
        </fieldset>

        <ul>
          {this.state.imageList}
        </ul>
      </fieldset>
    );
  }
}

export default Tools;