import React, { Component } from "react";
import Layout from "Components/layout";

import OnlyLogged from "@/components/only-logged";

class Logged extends Component {
  state = {};
  render() {
    return (
      <Layout>
        <OnlyLogged>I'm Logged</OnlyLogged>;
      </Layout>
    );
  }
}

export default Logged;
