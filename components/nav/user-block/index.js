import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './index.scss';

import RbIcon from '@/components/common/rb-icon';

import { signOut } from '@/ducks/auth';
 
class UserBlock extends Component {
  render() {
    const { user } = this.props;
    console.log( user );
    return (
      <div className={css['user-block']}>
        <span className={css.login}>{user.username}</span>
        <RbIcon active={true} onClick={this.handleLogOut} icon="exit_to_app" />
      </div>
    );
  }

  handleLogOut = e => {
    e.preventDefault(); 
    this.props.signOut();
  };
}

export default connect(
  null,
  { signOut },
)(UserBlock);
