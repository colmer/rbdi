import App, { Container } from "next/app";
import React from "react";
import { serialize, deserialize } from "../services/immutable-serializer";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

const { fromJS, Record } = require("immutable");

import createStore from "../redux/store";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
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
  // serializeState: state => state.toJS(),
  // deserializeState: state => fromJS(state)
  // serializeState: state => serialize(state),
  // deserializeState: state => deserialize(state)
  serializeState: function(state) {
    return serialize(state);
  },
  deserializeState: function(state) {
    return deserialize(state);
    //
  }
})(withReduxSaga(MyApp));
