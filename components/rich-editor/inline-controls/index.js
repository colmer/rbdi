import React, { Component } from 'react';
import EditorBtn from '../editor-btn';

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

class InlineControls extends Component {
  render() {
    const currentStyle = this.props.editorState.getCurrentInlineStyle();

    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map(type => (
          <EditorBtn
            key={type.label}
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
