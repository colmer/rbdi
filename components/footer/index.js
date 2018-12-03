import css from "./index.scss";

import Menu from "Components/nav/menu";
import Logo from "Components/nav/logo";
import SocialLBlock from "Components/social-block";

const Footer = () => (
  <footer className={css.footer}>
    <div className={css.content}>
      <Logo />
      <Menu />
      <SocialLBlock className={css.social} />
    </div>
  </footer>
);

export default Footer;
