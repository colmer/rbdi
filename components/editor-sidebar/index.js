import css from './index.scss';
import React, { Component } from 'react';
import RbIcon from '@/components/common/rb-icon';

class EditorSidebar extends Component {
  static getInitialProps() {}

  render() {
    return (
      <div className={css.editorSidebar}>
        <div className={css.header}>Категории</div>
        <ul className={css.list}>
          <li className={css.item}>
            <RbIcon active={true} icon="keyboard_arrow_down" />
            Робототехника <span className={css.badge}>(3)</span>
          </li>
          <li className={css.item}>
            {' '}
            <RbIcon active={true} icon="keyboard_arrow_down" />
            Ардуино<span className={css.badge}>(1)</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default EditorSidebar;
