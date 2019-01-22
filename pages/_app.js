import App, { Container } from 'next/app';
import React from 'react';
import { fromJS } from 'immutable';
// import {serialize, deserialize} from 'json-immutable';

import { serialize, deserialize } from '../services/immutable-serializer';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { parseCookies, setCookie } from 'nookies';
import Request from '@/utils/__axios';

import { SIGN_CHECK_REQUEST, AUTH_UPDATE_COOKIE } from '@/ducks/auth';
import configureStore from '../redux/store';

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

      /*
     * Update token cookie from Request
     */
      console.log('REQUEST TOKEN', Request.token);
      if (Request.token) setCookie(ctx, 'token', Request.token);
      if (Request.refreshToken) setCookie(ctx, 'refreshToken', Request.refreshToken)
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

export default withRedux(configureStore, {
  serializeState: state => state.toJS(),
  deserializeState: state => fromJS(state),
})(withReduxSaga({async: true})(MyApp));
