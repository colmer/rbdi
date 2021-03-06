import css from './index.scss';
import React, { Component } from 'react';
import EditorBtn from '../editor-btn';

const INLINE_STYLES = [
  { label: 'Bold', icon: 'format_bold', style: 'BOLD' },
  { label: 'Italic', icon: 'format_italic', style: 'ITALIC' },
  { label: 'Underline', icon: 'format_underlined', style: 'UNDERLINE' },
  { label: 'Monospace', icon: 'space_bar', style: 'CODE' },
];

class InlineControls extends Component {
  render() {
    const currentStyle = this.props.editorState.getCurrentInlineStyle();

    return (
      <div className={css.inlineControls}>
        {INLINE_STYLES.map(type => (
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
