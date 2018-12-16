import React, { Component } from 'react';

import css from './index.scss';

class Input extends Component {
  render() {
    return <div className={css.input}>{this.props.children}</div>;
  }
}

export default Input;
