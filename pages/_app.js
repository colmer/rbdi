import App, { Container } from 'next/app';
import React from 'react';
import { serialize, deserialize } from '../services/immutable-serializer';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { parseCookies, setCookie } from 'nookies';
import cookie from 'cookie';
import Request from '@/utils/__axios';

import { SIGN_CHECK_REQUEST, AUTH_UPDATE_COOKIE } from '@/ducks/auth';
import StoreConfig from '../redux/store';

const storeConfig = new StoreConfig();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    let { token, refreshToken } = parseCookies(ctx);
    /*
     *  Set tokens in instance
     */
    Request.setTokens({ token, refreshToken });

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    if (ctx.req && ctx.req.headers.cookie) {
      // Server logic
      await ctx.store.dispatch({ type: SIGN_CHECK_REQUEST });
    }

    /*
     * Update token cookie from Request
     */
    setCookie('token', Request.token);
    setCookie('refreshToken', Request.refreshToken)

    return { pageProps };
  }

  componentDidMount() {
    // /*
    //  * Set Request tokens for after ssr in browser
    //  */
    // if (!Request.token) {
    //   const { token, refreshToken } = cookie.parse(document.cookie || '');
    //   Request.setTokens({ token, refreshToken });
    // }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    console.log(store);
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(storeConfig.configureStore, {
  serializeState: function(state) {
    return serialize(state);
  },
  deserializeState: function(state) {
    return deserialize(state);
  },
})(withReduxSaga({async: true})(MyApp));
