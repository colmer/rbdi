import css from './index.scss';

const RbIcon = props => {
  const { icon, active, onClick, size } = props;

  const iconSize = size ? size : 16;
  const style = { fontSize: `${iconSize}px` };
  let className = 'material-icons';

  if (active) className += ` ${css.active}`;
  return (
    <i className={className} style={style} onClick={onClick}>
      {icon}
    </i>
  );
};

export default RbIcon;
