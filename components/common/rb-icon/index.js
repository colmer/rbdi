import css from './index.scss';

const RbIcon = props => {
  const { icon, active, onClick } = props;

  let className = 'material-icons';
  if (active) className += ` ${css.active}`;
  return (
    <i className={className} onClick={onClick}>
      {icon}
    </i>
  );
};

export default RbIcon;
