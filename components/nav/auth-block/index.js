import css from './index.scss';

import Link from 'next/link';

import RbBtn from 'Components/common/rb-btn';

const AuthBlock = () => (
  <div className={css['auth-block']}>
    <RbBtn className={css.login} link="/sign-in">
      Войти
    </RbBtn>

    <Link prefetch href="/sign-up">
      <a className={css['sign-up']}>Регистрация</a>
    </Link>
  </div>
);

export default AuthBlock;
