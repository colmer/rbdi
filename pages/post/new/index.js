import css from './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarLayout from '@/components/sidebar-layout';
import EditorSidebar from '@/components/editor-sidebar';
import RbIcon from '@/components/common/rb-icon';
import RichEditor from '@/components/rich-editor';

class newPost extends Component {
  render() {
    // const BLOCK_TYPES = [
    //   { label: 'H1', style: 'looks_one' },
    //   { label: 'Blockquote', style: 'format_quote' },
    //   { label: 'UL', style: 'format_list_bulleted' },
    //   { label: 'OL', style: 'format_list_numbered' },
    //   { label: 'Code Block', style: 'laptop_mac' },
    // ];

    return (
      <SidebarLayout className={css.newPost}>
        {{
          sidebar: <EditorSidebar />,
          content: <RichEditor />,
        }}
      </SidebarLayout>
    );
  }

  // focusEditor = () => {
  //   if (this.editor) {
  //     this.editor.focus();
  //   }
  // };
}

export default connect(null)(newPost);
