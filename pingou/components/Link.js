import React, {Component} from 'react';

const linkList = [];
class Link extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      top: 1,
      left: 0,
      width: 0,
      height: 0,
      link: 'javascript:;',
      target: '_self',
      text: ''
    }, props);

    linkList.push(this);
    this.onSelect();
    this.onInit();
  }

  onInit(){
    this.props.onInit(this);
  }
  onSelect(){
    this.props.onSelect(this);
  }

  update(point){

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

    this.setState(this.state);
  }

  setSelected(e){
    e.stopPropagation();
    linkList.forEach(function(v){
      v.state.selected = false;
      v.setState(v.state);
    });
    this.state.selected = !this.state.selected;
    this.setState(this.state);
  }

  render() {
    return (
      <span className={'kmod-link ' + (this.state.selected ? 'kstate-selected' : '')}
            href={this.state.link} target={this.state.target}
            style={{
              top: this.state.top,
              left: this.state.left,
              width: this.state.width,
              height: this.state.height
            }}
            onMouseDown={this.setSelected.bind(this)}
        >{this.state.text}</span>
    );
  }
}

export default Link;