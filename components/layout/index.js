import css from './index.scss';
import React, { Component } from 'react';
import Head from '@/components/head';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { signCheck, SIGN_CHECK_REQUEST } from '@/ducks/auth';

class Layout extends Component {
  static getInitialProps({ ctx: { store } }) {
    // store.dispatch({
    //   type: GET_SYNC_REDUX_PROP_TYPE,
    // })
    ctx.store.dispatch({ type: SIGN_CHECK_REQUEST });
  }

  render() {
    return (
      <div className={[css.layout, this.props.className].join(' ')}>
        <Head title="Login" />
        <Nav />
        <div className={css.content}>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
