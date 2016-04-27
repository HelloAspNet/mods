import React, {Component} from 'react';

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


class Area extends Component {

  constructor(props) {
    super(props);

    this.state = Object.assign({
      top: 0,
      left: 0,
      link: 'javascript:;',
      target: '_self',
      type: 'normal',
      isSelected: false
    }, props);


    props.onInit && props.onInit(this);
    _list.push(this);
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
    console.log(clientX, clientY)

    const top = _last.top - -offsetTop;
    const left = _last.left - -offsetLeft;
    Object.assign(_selected.state, {top, left});
    Object.assign(_last, {clientX, clientY, top, left});
    _selected.setState(_selected.state);
  }

  mouseUp(e){
    _selected = null;
  }


  render() {
    return (
      <div
        className={[
          'area',
          _types[this.state.type].className,
          this.state.isSelected ? 'selected' : ''
        ].join(' ')}
        href={this.state.link}
        target={this.state.target}
        style={{
          top: this.state.top,
          left: this.state.left,
          width: this.state.width,
          height: this.state.height
        }}
        onMouseDown={this.mouseDown.bind(this)}
        onMouseMove={this.mouseMove.bind(this)}
        onMouseUp={this.mouseUp.bind(this)}
        >{this.state.text}</div>
    );
  }
}

export default Area;