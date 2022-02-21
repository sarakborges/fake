// Dependencies
import { useEffect } from "react";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import TagsList from "Components/Molecules/TagsList";

// Styles
import * as S from "./style";

// Template
const LinkList = ({ list, title, emptyTitle, hideEmpty }) => {
  useEffect(() => {
    if (!list?.length) {
      return;
    }

    list.sort((a, b) => (a > b ? 1 : -1));
  }, []);

  return !hideEmpty ? (
    <S.List>
      <S.Title>{title}</S.Title>

      {list?.length ? (
        <S.TagsList>
          <TagsList tags={list} hasLink highlighted />
        </S.TagsList>
      ) : (
        <S.EmptyTitle>
          <Text ta='center'>{emptyTitle}</Text>
        </S.EmptyTitle>
      )}
    </S.List>
  ) : (
    false
  );
};

export default LinkList;
