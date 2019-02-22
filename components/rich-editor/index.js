import './editor.scss';
import 'draft-js/dist/Draft.css';
import css from './index.scss';
import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import InlineControls from './inline-controls';
import BlockControls from './block-controls';

class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editor: false, editorState: null };
    // this.state = { editorState: EditorState.createEmpty() };
    // this.focus = () => this.refs.editor.focus();
    // this.onChange = editorState => this.setState({ editorState });
    // this.handleKeyCommand = this._handleKeyCommand.bind(this);
    // this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  componentDidMount() {
    this.setState({
      editor: true,
      editorState: EditorState.createEmpty(),
    });
  }

  onChange = editorState => {
    // console.log('editorState ==>', editorState.toJS());

    this.setState({ editorState });
  };

  _toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  render() {
    const { editor, editorState } = this.state;
    console.log('state', editorState);
    if (!editor) return <div>Pending...</div>;
    else
      return (
        <div className="rich-editor">
          <div className={css.editorControls}>
            <InlineControls editorState={editorState} onToggle={this.toggleInlineStyle} />
            <div className={css.controlDelimiter} />
            <BlockControls editorState={editorState} onToggle={this.toggleBlockType} />
          </div>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            placeholder="Пишем тут..."
          />
        </div>
      );
  }
}

export default RichEditor;
