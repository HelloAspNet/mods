import React, {Component} from 'react';

class FontButton extends Component {
  constructor(props) {
    super(props);
    //this.state = Object.assign({}, this.props, {
    //
    //});
  }

  click(e){
    e.stopPropagation();
    this.props.onClick && this.props.onClick(e);
  }

  mouseDown(e){
    e.stopPropagation();
    this.props.onMouseDown && this.props.onMouseDown(e);
  }
  mouseMove(e){
    e.stopPropagation();
    this.props.onMouseMove && this.props.onMouseMove(e);
  }
  mouseUp(e){
    e.stopPropagation();
    this.props.onMouseUp && this.props.onMouseUp(e);
  }

  render() {
    return (
      <i className={[
        'fa',
        'fa-' + this.props.name,
        this.props.className
      ].join(' ')}
         style={this.props.style || {}}
         onMouseDown={this.mouseDown.bind(this)}
         onMouseMove={this.mouseMove.bind(this)}
         onMouseUp={this.mouseUp.bind(this)}
         onClick={this.click.bind(this)}></i>
    );
  }
}

export default FontButton;