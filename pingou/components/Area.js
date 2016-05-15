import React, {Component} from 'react';
import File from './File';
import FontButton from './FontButton';

const _list = [];
let _selected = null;
const _types = {
  product: {
    className: 'plink',
    index: 0,
    prefix: 'p'
  },
  brand: {
    className: 'blink',
    index: 0,
    prefix: 'b'
  },
  normal: {
    className: '',
    index: 0,
    prefix: 'link'
  }
};
const _last = {
  top: 0,
  left: 0,
  clientX: 0,
  clientY: 0
};


class Area extends File {

  constructor(props) {
    super(props);

    this.state = Object.assign({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      background: '',   //rgba(255, 0, 0, .2)
      display: '',

      alt: '',                // 暂时用来放原图片名
      link: 'javascript:;',
      target: '_self',
      type: 'normal',         // 链接类型，分别有{product, brand, normal}

      isSelected: false,            // 是否被选中
      isFixed: false,               // 是否悬浮定位

      isSupportRemove: false,   // 是否支持移除
      isSupportResize: false,   // 是否支持更改大小
      isSupportBackground: false,   // 是否支持背景
      //isSupportDrag: false,         // 是否支持拖拽
      isSupportScale: false         // 是否支持缩放
    }, props);


    props.onInit && props.onInit(this);
    _list.push(this);
  }

  drop(e){
    e.preventDefault();
    e.stopPropagation();
    if(this.state.isSupportBackground) {
      const files = e.dataTransfer.files;
      //this.load(files).then(imageList => console.log(imageList));
      this.loadImages(files).then(([image]) => {
        const {width, height, src, alt} = image;
        Object.assign(this.state, {
          width: width > 1000 ? 1000 : width < 20 ? 20 : width,
          height: height > 800 ? 800 : height < 16 ? 16 : height,
          background: `url(${src})`,
          alt: alt
        });
        this.setState(this.state);
      });
    }
    return false;
  }

  /**
   * 更新
   * @param point
   */
  update(point) {

    const props = this.props;

    const pointXs = [props.left, point.x];
    const pointYs = [props.top, point.y];

    pointXs.sort((a, b) => a - b);
    pointYs.sort((a, b) => a - b);


    const width = pointXs[1] - pointXs[0];
    const height = pointYs[1] - pointYs[0];

    Object.assign(this.state, {
      top: pointYs[0],
      left: pointXs[0],
      width: width,
      height: height
    });

    if(!this.state.text) {
      const obj = _types[this.state.type];
      obj.index += 1;
      this.state.text = obj.prefix + obj.index;
    }

    this.setState(this.state);
  }


  mouseDown(e){
    e.stopPropagation();
    _selected = this;

    const {clientX, clientY} = e;
    const {top, left} = this.state;

    Object.assign(_last, {clientX, clientY, top, left});

    // 选中当前<Area>
    _list.forEach(function (v) {
      v.state.isSelected = false;
      v.setState(v.state);
    });
    this.state.isSelected = !this.state.isSelected;

    // 更新状态
    this.setState(this.state);
  }

  mouseMove(e){
    if(!_selected) return;


    const {clientX, clientY} = e;
    const offsetTop = clientY - _last.clientY;
    const offsetLeft = clientX - _last.clientX;
    console.log(clientX, clientY);

    const top = _last.top - -offsetTop;
    const left = _last.left - -offsetLeft;
    Object.assign(_selected.state, {top, left});
    Object.assign(_last, {clientX, clientY, top, left});
    _selected.setState(_selected.state);
  }

  mouseUp(e){
    _selected = null;
  }


  remove(e){
    console.log('in remove')
    this.state.display = 'none';
    this.setState(this.state);
  }

  resize(e){
    this.state.display = 'none';
    this.setState(this.state);
  }

  render() {
    return (
      <div
        className={[
          'area',
          _types[this.state.type].className,
          this.state.isSelected ? 'selected' : '',
          this.state.isFixed ? 'fixed' : ''
        ].join(' ')}
        href={this.state.link}
        target={this.state.target}
        style={{
          top: this.state.top,
          left: this.state.left,
          width: this.state.width,
          height: this.state.height,
          background: this.state.background,
          display: this.state.display
        }}
        onMouseDown={this.mouseDown.bind(this)}
        onMouseMove={this.mouseMove.bind(this)}
        onMouseUp={this.mouseUp.bind(this)}

        onDragOver={this.dragOver.bind(this)}
        onDrop={this.drop.bind(this)}
        >
        <div className="area-main">
          <div className="area-border"></div>
          {this.state.text}

          <FontButton name="times-circle" className="area-remove" onClick={this.remove.bind(this)} style={{display: this.isSupportRemove ? '' : 'none'}}/>
          <FontButton name="arrows-alt" className="area-resize" onClick={this.resize.bind(this)} style={{display: this.isSupportRemove ? '' : 'none'}}/>
        </div>
      </div>
    );
  }
}

export default Area;