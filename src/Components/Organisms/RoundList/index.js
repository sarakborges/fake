// Dependencies
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexsts
import { AppContext } from "Contexts/App";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import ProfilePicture from "Components/Molecules/ProfilePicture";

// Styles
import * as S from "./style";

const RoundList = ({
  list,
  title,
  type,
  extraItemLink,
  emptyTitle,
  hideEmpty,
}) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  const [infoList, setInfoList] = useState();

  useEffect(() => {
    setInfoList(
      list.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      )
    );
  }, [list]);

  return !hideEmpty ? (
    <S.RoundList>
      {title && (
        <S.Title>
          <span>{title}</span>

          {extraItemLink && (
            <Link href={extraItemLink}>
              <a>(ver mais)</a>
            </Link>
          )}
        </S.Title>
      )}

      {infoList?.length ? (
        <S.List>
          {infoList.map((item) => {
            return (
              <S.LinkWrapper key={item._id}>
                <Link
                  href={(type === "profile"
                    ? ROUTES.PROFILE
                    : ROUTES.GROUP
                  ).replace(":id", item.url)}
                >
                  <a>
                    <ProfilePicture
                      avatar={item.avatar}
                      isBlured={item.isAdult && !displayAdult}
                    />
                  </a>
                </Link>
              </S.LinkWrapper>
            );
          })}
        </S.List>
      ) : (
        <S.EmptyTitle>
          <Text ta='center'>{emptyTitle}</Text>
        </S.EmptyTitle>
      )}
    </S.RoundList>
  ) : (
    false
  );
};

export default RoundList;
