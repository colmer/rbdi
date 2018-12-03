import css from "./index.scss";

import Head from "Components/head";
import Nav from "Components/nav";
import Footer from "Components/footer";

const Layout = props => (
  <div className={css.layout}>
    <Head title="Login" />
    <Nav />
    <div className={css.content}>{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
