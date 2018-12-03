import css from "./index.scss";

import AuthBlock from "./auth-block";
import SearchBlock from "./search-block";
import Menu from "./menu";
import Logo from "./logo";

const Nav = () => (
  <nav className={css.nav}>
    <div className={css.content}>
      <Logo />
      <Menu />
      <SearchBlock />
      <AuthBlock />
    </div>
  </nav>
);

export default Nav;
