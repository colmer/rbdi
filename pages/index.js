import React, { Component } from 'react';
import Layout from '@/components/layout';
import Request from '@/utils/__axios'; 

class Home extends Component {
  static async getInitialProps({ Component, ctx }) {
    return {};
  }

  render() {
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
      Request.client.get('/auth/status'),
    ]);
  };
}

export default Home;
