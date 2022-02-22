// Dependencies
import Link from "next/link";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexsts
import { AppContext } from "Contexts/App";

// Atoms
import Text from "Components/Atoms/Text";
import RoundIcon from "Components/Atoms/RoundIcon";

// Molecules
import ProfilePicture from "Components/Molecules/ProfilePicture";

// Styles
import * as S from "./style";
import { useContext } from "react";

const RoundList = ({
  list,
  title,
  type,
  extraItemLink,
  emptyTitle,
  hideEmpty,
  displayMore,
}) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  return !hideEmpty ? (
    <S.RoundList>
      <S.Title>{title}</S.Title>

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
                      size={40}
                      isBlured={item.isAdult && !displayAdult}
                    />
                  </a>
                </Link>

                <S.Tooltip>{item.name}</S.Tooltip>
              </S.LinkWrapper>
            );
          })}

          {displayMore && (
            <Link href={extraItemLink}>
              <a>
                <RoundIcon icon={faEllipsisH} size={40} bgColor='main' />
              </a>
            </Link>
          )}
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
