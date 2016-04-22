import React, {Component} from 'react';

class Preview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <iframe className="preview" src="" frameBorder="0"></iframe>
    );
  }
}

export default Preview;