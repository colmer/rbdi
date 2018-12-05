import css from "./index.scss";

import RbIcon from "Components/common/rb-icon";

const SearchBlock = () => (
  <div className={css["search-block"]}>
    <RbIcon active={true} icon="search" />
  </div>
);

export default SearchBlock;
