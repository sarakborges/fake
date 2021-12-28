// Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Text from "Components/Atoms/Text";

// Styles
import * as S from "./style";

// Template
const LinkList = ({ list, title, emptyTitle, hideEmpty }) => {
  return !hideEmpty ? (
    <div>
      <S.Title>{title}</S.Title>

      {list?.length ? (
        <S.List>
          {list.map((item) => {
            return (
              <a key={item.title} href={item.link} target='_blank'>
                <FontAwesomeIcon icon={faLink} />
                <>{item.title}</>
              </a>
            );
          })}
        </S.List>
      ) : (
        <S.EmptyTitle>
          <Text ta='center'>{emptyTitle}</Text>
        </S.EmptyTitle>
      )}
    </div>
  ) : (
    false
  );
};

export default LinkList;
