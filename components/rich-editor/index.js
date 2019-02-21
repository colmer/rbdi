import './editor.scss';
import 'draft-js/dist/Draft.css';
import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import InlineControls from './inline-controls';

class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editor: false, editorState: null };
    // this.state = { editorState: EditorState.createEmpty() };
    // this.focus = () => this.refs.editor.focus();
    // this.onChange = editorState => this.setState({ editorState });
    // this.handleKeyCommand = this._handleKeyCommand.bind(this);
    // this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    // this.toggleBlockType = this._toggleBlockType.bind(this);
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

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }
  _onCodeClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'));
  }
  _onHeadingClick() {
    this.onChange(RichUtils.DraftBlockType(this.state.editorState, 'header-two'));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  render() {
    const { editor, editorState } = this.state;
    console.log('state', editorState);
    if (!editor) return <div>Pending...</div>;
    else
      return (
        <div className="rich-editor">
          <button onClick={this._onHeadingClick.bind(this)}>Heading</button>
          <button onClick={this._onBoldClick.bind(this)}>Bold</button>
          <button onClick={this._onCodeClick.bind(this)}>Code</button>
          <button onClick={this._onItalicClick.bind(this)}>Italic</button>
          <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>

          <InlineControls editorState={editorState} onToggle={this.toggleInlineStyle} />
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
