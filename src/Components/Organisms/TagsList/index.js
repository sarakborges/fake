// Dependencies
import { useContext } from "react";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexts
import { UserContext } from "Contexts/User";

// Atoms
import Text from "Components/Atoms/Text";

// Styles
import * as S from "./style";

// Template
const LinkList = ({ list, title, emptyTitle, hideEmpty }) => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  list.sort((a, b) => (a > b ? 1 : -1));

  return (
    !hideEmpty ||
    (list?.length > 0 && (
      <S.TagsList>
        <S.Title>{title}</S.Title>

        {list?.length ? (
          <S.List>
            {list.map((item) => {
              return (
                <S.TagItem
                  key={item}
                  href={ROUTES.SEARCH.replace(":str", item)}
                  target='_blank'
                  isCommon={
                    profile?.publicTags?.includes(item) ||
                    profile?.privateTags?.includes(item)
                  }
                >
                  {item}
                </S.TagItem>
              );
            })}
          </S.List>
        ) : (
          <S.EmptyTitle>
            <Text ta='center'>{emptyTitle}</Text>
          </S.EmptyTitle>
        )}
      </S.TagsList>
    ))
  );
};

export default LinkList;
