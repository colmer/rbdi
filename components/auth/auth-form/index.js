import css from "./index.scss";

import React from "react";
import { reduxForm, Field } from "redux-form";

import Input from "Components/common/input";
import RbBtn from "Components/common/rb-btn";

const Login = props => {
  const { handleSubmit } = props;

  return (
    <form className={css["login-form"]} onSubmit={handleSubmit}>
      <h1>Войти</h1>
      <Input>
        <Field name="email" component="input" placeholder="Эл.адрес2" />
      </Input>
      <Input>
        <Field
          name="password"
          component="input"
          type="password"
          placeholder="Пароль2"
        />
      </Input>
      <RbBtn>Войти</RbBtn>
    </form>
  );
};

export default reduxForm({ form: "auth" })(Login);
