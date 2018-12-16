import App, { Container } from 'next/app';
import React from 'react';
import { serialize, deserialize } from '../services/immutable-serializer';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
// import cookie from 'cookie';

import { SIGN_CHECK_REQUEST } from '@/ducks/auth';
import createStore from '../redux/store';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    if (ctx.req && ctx.req.headers.cookie) {
      //const cookies = cookie.parse(ctx.req.headers.cookie);
      //console.log(cookies);
      // await ctx.store.dispatch({ type: SIGN_CHECK_REQUEST, payload: { cookies: 'asd' } });
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

export default withRedux(createStore, {
  serializeState: function(state) {
    return serialize(state);
  },
  deserializeState: function(state) {
    return deserialize(state);
  },
})(withReduxSaga(MyApp));
