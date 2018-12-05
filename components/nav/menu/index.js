import css from "./index.scss";

import Link from "next/link";

const Menu = () => (
  <ul className={css.menu}>
    <li>
      <Link prefetch href="/">
        <a>Микросхемы</a>
      </Link>
    </li>
    <li>
      <Link prefetch href="/logged">
        <a>Чипы</a>
      </Link>
    </li>
    <li>
      <Link prefetch href="/s">
        <a>Платы</a>
      </Link>
    </li>
    <li>
      <Link prefetch href="/3">
        <a>Песочница</a>
      </Link>
    </li>
  </ul>
);

export default Menu;
