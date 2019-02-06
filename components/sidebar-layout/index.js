import css from './index.scss';
import React, { Component } from 'react';
import Head from '@/components/head';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { SIGN_CHECK_REQUEST } from '@/ducks/auth';

class SidebarLayout extends Component {
  static getInitialProps(ctx) {}

  render() {
    const { sidebar, content } = this.props.children;
    console.log(this.props.children);

    return (
      <div className={[css.layout, this.props.className].join(' ')}>
        <Head title="Sidebar Layout" />
        <Nav />
        <div className={css.main}>
          <div className={css.sidebar}>{sidebar}</div>
          <div className={css.content}>{content}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SidebarLayout;
