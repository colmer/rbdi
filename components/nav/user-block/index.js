import css from "./index.scss";
import RbIcon from "@/components/common/rb-icon";

const UserBlock = props => {
  const { user } = props;
  return (
    <div className={css["user-block"]}>
      <span className={css.login}>{user.username}</span>
      <RbIcon active={true} icon="exit_to_app" />
    </div>
  );
};

export default UserBlock;
