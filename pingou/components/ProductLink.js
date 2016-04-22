import React, {Component} from 'react';
import Link from './Link';

class ProductLink extends Link {
  constructor(props) {
    super(props);
    this.props.aa = 11;
  }

  render() {
    return (
      <Link className="aa"/>
    );
  }
}

export default ProductLink;