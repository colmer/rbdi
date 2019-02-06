import css from './index.scss';

const RbButton = props => {
  const { count, className } = props;

  return <div className={[css['sw-badge'], className].join(' ')}>{count}</div>;
};

export default RbButton;
