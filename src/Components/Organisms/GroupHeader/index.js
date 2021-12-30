// Dependencies
import { useContext } from "react";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// Helpers
import { GROUP_ACTIONS } from "Helpers/Constants";

// Contexsts
import { UserContext } from "Contexts/User";

// Atoms
import Button from "Components/Atoms/Button";
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

const GroupHeader = ({ group }) => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const date = new Date(group.createdAt);
  const dateStr = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  return (
    <>
      <S.GroupHead>
        <S.GroupCover img={group.cover} />

        <S.GroupInfo>
          <S.Avatar>
            {group.avatar ? (
              <Avatar size={128} img={group.avatar} bgColor={"main"} />
            ) : (
              <RoundIcon size={128} icon={faQuestion} bgColor={"main"} />
            )}
          </S.Avatar>

          <div>
            <Text type='custom' fs={36} fw={600}>
              {group.name}
            </Text>

            <Text type='custom' fs={20} fw={400}>
              @{group.url}
            </Text>

            <Text type='custom' pt={16}>
              {`Grupo criado em: ${dateStr}`}
            </Text>
          </div>
        </S.GroupInfo>

        <S.GroupActions>
          {GROUP_ACTIONS.map((item) => {
            return item.id !== "more" || profile?._id === group.owner ? (
              <div key={item.id}>
                {item.type === "button" ? (
                  <Button style='transparent' size={16} onClick={item.action}>
                    <FontAwesomeIcon icon={item.icon} />
                  </Button>
                ) : (
                  <Link href={item.to.replace(":id", group.url)}>
                    <a>
                      <FontAwesomeIcon icon={item.icon} />
                    </a>
                  </Link>
                )}
              </div>
            ) : (
              false
            );
          })}
        </S.GroupActions>
      </S.GroupHead>
    </>
  );
};

export default GroupHeader;
