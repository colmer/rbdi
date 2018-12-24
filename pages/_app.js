import App, { Container } from 'next/app';
import React from 'react';
import { serialize, deserialize } from '../services/immutable-serializer';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import cookie from 'cookie';
import { test } from '@/utils/__axios';

import { SIGN_CHECK_REQUEST, AUTH_UPDATE_COOKIE } from '@/ducks/auth';
import StoreConfig from '../redux/store';

// create axios instance
// const requestClient = new Axios();
// throw axios client to redux
const storeConfig = new StoreConfig(test.client);

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    let cookies = ctx.req
      ? cookie.parse(ctx.req.headers.cookie)
      : cookie.parse(document.cookie);

    console.log('Client token BS', test.token);
    /*
     *  Set tokens in instance
     */
    test.setTokens({
      token: cookies.token,
      refreshToken: cookies.refreshToken,
    });

    console.log('Client token AS', test.token);

    /*
     * Add http client to instance
     */
    // ctx.httpClient = requestClient.client;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    if (ctx.req && ctx.req.headers.cookie) {
      // Server logic
      // await ctx.store.dispatch({ type: SIGN_CHECK_REQUEST });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
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
})(withReduxSaga(MyApp));
