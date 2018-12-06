import css from './index.scss';

import Link from 'next/link';

const Logo = () => (
  <Link prefetch href="/">
    <a className={css.logo}>RBDI</a>
  </Link>
);

export default Logo;
