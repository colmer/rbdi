import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from 'Components/auth/auth-form';
import Layout from 'Components/layout';
import { signIn, errorSelector } from '@/ducks/auth';

class AuthPage extends Component {
  render() {
    return (
      <Layout>
        <AuthForm onSubmit={this.handleSignIn} />
      </Layout>
    );
  }

  handleSignIn = values => {
    this.props.signIn(values.get('email'), values.get('password'));
  };
}

export default connect(
  null,
  { signIn },
)(AuthPage);
