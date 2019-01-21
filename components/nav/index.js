import css from './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthBlock from './auth-block';
import UserBlock from './user-block';
import SearchBlock from './search-block';
import Menu from './menu';
import Logo from './logo';
import { userSelector } from '@/ducks/auth';

class Nav extends Component {
  render() {
    const { user } = this.props;
    console.log('USER', user);
    return (
      <nav className={css.nav}>
        <div className={css.content}>
          <Logo />
          <Menu />
          <SearchBlock />
          {user ? <UserBlock user={user} /> : <AuthBlock />}
        </div>
      </nav>
    );
  }
}

export default connect(state => ({ user: userSelector(state) }))(Nav);
