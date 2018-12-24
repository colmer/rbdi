import React, { Component } from 'react';
import Layout from '@/components/layout';
// import axios from '@/utils/axios';
import { test } from '@/utils/__axios';

class Home extends Component {
  static async getInitialProps({ Component, ctx }) {
    console.log('In index page', test.token);

    return {};
  }

  render() {
    console.log('FUNCT', this.props.axios);
    return (
      <Layout>
        Main page
        <br />
        <button onClick={this.handleClick}>Check auth</button>
      </Layout>
    );
  }

  handleClick = async () => {
    const [status] = await Promise.all([
      test.client.get('http://localhost:1337/auth/status'),
    ]);
    console.log('Status', status);
  };
}

export default Home;
