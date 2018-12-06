import css from './index.scss';

const SocialBlock = props => {
  const { className } = props;
  let blockClass = css['social-block'];
  if (className) blockClass += ` ${className}`;
  return (
    <div className={blockClass}>
      <img src="/static/img/social/vk.svg" />
      <img src="/static/img/social/twitter.svg" />
      <img src="/static/img/social/instagram.svg" />
      <img src="/static/img/social/fb.svg" />
    </div>
  );
};

export default SocialBlock;
