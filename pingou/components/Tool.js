import React, {Component} from 'react';

class Tool extends Component {
  constructor(props) {
    super(props);
  }

  onMouseDown(e){
     e.stopPropagation();
  }

  onMouseMove(e){
     e.stopPropagation();
  }

  onMouseUp(e){
     e.stopPropagation();
  }

  onClick(e){
     e.stopPropagation();
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Tool;