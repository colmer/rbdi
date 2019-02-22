import css from './index.scss';
import React, { Component } from 'react';
import EditorBtn from '../editor-btn';

const BLOCK_TYPES = [
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'Blockquote', icon: 'format_quote', style: 'blockquote' },
  { label: 'UL', icon: 'format_list_bulleted', style: 'unordered-list-item' },
  { label: 'OL', icon: 'format_list_numbered', style: 'ordered-list-item' },
  { label: 'Code Block', icon: 'code', style: 'code-block' },
];

class InlineControls extends Component {
  render() {
    const currentStyle = this.props.editorState.getCurrentInlineStyle();

    return (
      <div className={css.blockControls}>
        {BLOCK_TYPES.map(type => (
          <EditorBtn
            key={type.label}
            icon={type.icon}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={this.props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  }
}

export default InlineControls;
