// Dependencies
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// Helpers
import { ROUTES } from "Helpers/routes";
import { GROUP_ACTIONS } from "Helpers/Constants";

// Contexsts
import { UserContext } from "Contexts/User";

// Atoms
import Button from "Components/Atoms/Button";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Style
import * as S from "./style";

const GroupHeader = ({ group }) => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  return (
    <>
      {group.cover && <S.GroupCover img={group.cover} />}

      <S.GroupHead>
        <Link href={ROUTES.GROUP.replace(":id", group.url)}>
          <a>
            <InfoArea info={group} side='left' />
          </a>
        </Link>

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
