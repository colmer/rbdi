import css from './index.scss';
import React, { Component } from 'react';
import RbIcon from '@/components/common/rb-icon';

class EditorBtn extends Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    const { icon, label } = this.props;
    let className = css.editorBtn;
    if (this.props.active) {
      className += ' ' + css['editorBtn_active'];
    }

    const inner = icon ? <RbIcon icon={icon} /> : label;

    return (
      <div className={className} onMouseDown={this.onToggle}>
        {inner}
      </div>
    );
  }
}

export default EditorBtn;
