import React, {Component} from 'react';

const Temps = {
  point: null
};
class Ext extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: 0,
      left: 0
    };


  }

  down(e){
    const {clientX, clientY} = e;
    const {scrollX, scrollY} = window;
    const {offsetTop, offsetLeft} = this.props.wrapper();

    Temps.point = {
      x: clientX - offsetLeft + scrollX,
      y: clientY - offsetTop + scrollY
    };

    console.log('down', clientX, scrollX, offsetTop, this.props.wrapper())
  }

  move(e){
    if(!Temps.point) return;
    const {clientX, clientY} = e;
    const {scrollX, scrollY} = window;
    const {offsetTop, offsetLeft} = this.props.wrapper();


    console.log('move')
  }

  up(e){
    const {clientX, clientY} = e;
    const {scrollX, scrollY} = window;
    const {offsetTop, offsetLeft} = this.props.wrapper();

    Temps.point = null;
    console.log('up')
  }

  render() {
    return (
      <div className="kmod-ext" style={this.state}
           onMouseDown={this.down.bind(this)}
           onMouseMove={this.move.bind(this)}
           onMouseUp={this.up.bind(this)}>

      </div>
    );
  }
}

export default Ext;