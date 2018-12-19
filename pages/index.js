import React, { Component } from 'react';
import Layout from '@/components/layout';
import axios from '@/utils/axios';

class Home extends Component {
  state = {};
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
      axios.get('/status'),
      axios.get('/status'),
      axios.get('/status'),
    ]);
    console.log('Status', status);
  };
}

export default Home;
