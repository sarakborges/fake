// Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Style
import * as S from "./style";

// Template
const Tag = ({ tag, highlighted, handleRemove }) => {
  return (
    <S.Tag
      key={tag}
      onClick={() => handleRemove(tag)}
      handleRemove={handleRemove}
      highlighted={highlighted}
    >
      <span>{tag}</span>

      {!!handleRemove && <FontAwesomeIcon icon={faTimes} />}
    </S.Tag>
  );
};

export default Tag;
