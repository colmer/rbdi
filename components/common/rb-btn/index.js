import css from "./index.scss";
import Link from "next/link";

const RbButton = props => {
  const { link, className } = props;
  let btnClass = css["rb-btn"];

  if (className) btnClass += ` ${className}`;

  if (link) {
    return (
      <Link href={props.link}>
        <a className={btnClass}>{props.children}</a>
      </Link>
    );
  }

  return <button className={btnClass}>{props.children}</button>;
  //
};

export default RbButton;
