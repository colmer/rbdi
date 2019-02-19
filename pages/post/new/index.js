import css from './index.scss';
import 'draft-js/dist/Draft.css';
import './editor.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarLayout from '@/components/sidebar-layout';
import EditorSidebar from '@/components/editor-sidebar';
import { Editor, EditorState } from 'draft-js';
import RbIcon from '@/components/common/rb-icon';

class AuthPage extends Component {
  state = { editor: false, editorState: null };

  componentDidMount() {
    this.setState({
      editor: true,
      editorState: EditorState.createEmpty(),
    });
  }

  render() {
    const { editorState, editor } = this.state;

    const BLOCK_TYPES = [
      { label: 'H1', style: 'looks_one' },
      { label: 'Blockquote', style: 'format_quote' },
      { label: 'UL', style: 'format_list_bulleted' },
      { label: 'OL', style: 'format_list_numbered' },
      { label: 'Code Block', style: 'laptop_mac' },
    ];

    return (
      <SidebarLayout className={css.newPost}>
        {{
          sidebar: <EditorSidebar />,
          content: editor ? (
            <div>
              <div className="RichEditor-controls">
                {BLOCK_TYPES.map(type => (
                  <RbIcon icon={type.style} />
                ))}
              </div>
              <Editor
                className="asd"
                editorState={editorState}
                placeholder="Пишем тут..."
              />
            </div>
          ) : null,
        }}
      </SidebarLayout>
    );
  }

  focusEditor = () => {
    if (this.editor) {
      this.editor.focus();
    }
  };
}

export default connect(null)(AuthPage);
