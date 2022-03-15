// Dependencies
import Link from "next/link";
import { useContext } from "react";

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

  return !hideEmpty ? (
    <S.RoundList>
      <S.Title>
        <span>{title}</span>

        <Link href={extraItemLink}>
          <a>(ver mais)</a>
        </Link>
      </S.Title>

      {list?.length ? (
        <S.List>
          {list.map((item) => {
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
