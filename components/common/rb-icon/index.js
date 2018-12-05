import css from "./index.scss";

const RbIcon = props => {
  const { icon, active } = props;

  let className = "material-icons";
  if (active) className += ` ${css.active}`;
  console.log();
  return <i className={className}>{icon}</i>;
};

export default RbIcon;
