// Dependencies
import Link from "next/link";
import { faEllipsisH, faQuestion } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexsts
import { AppContext } from "Contexts/App";

// Atoms
import Text from "Components/Atoms/Text";
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

// Styles
import * as S from "./style";
import { useContext } from "react";

// Template
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
                    {item.avatar ? (
                      <Avatar
                        img={item.avatar}
                        size={40}
                        bgColor='main'
                        isBlured={item.isAdult && !displayAdult}
                      />
                    ) : (
                      <RoundIcon icon={faQuestion} size={40} bgColor='main' />
                    )}
                  </a>
                </Link>

                <S.Tooltip>{item.name}</S.Tooltip>
              </S.LinkWrapper>
            );
          })}

          {list.length > 4 && (
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
