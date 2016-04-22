import React, {Component} from 'react';

class Mod extends Component {

  constructor(props) {
    super(props);



  }

  render() {
    return (
      <div className="kmod" style={{
        height: this.props.height,
        backgroundImage: `url(${this.props.bgUrl})`
      }}>
        <div className="kmod-bd"></div>
      </div>
    );
  }
}

export default Mod;