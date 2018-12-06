import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSelector } from '@/ducks/auth';

class OnlyLogged extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        user: {user && user.username}
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => ({
  user: userSelector(state),
}))(OnlyLogged);
