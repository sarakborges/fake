// Dependencies
import { useContext } from "react";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// Helpers
import { GROUP_ACTIONS } from "Helpers/Constants";
import { PROFILE_ACTIONS } from "Helpers/Constants";

// Contexsts
import { UserContext } from "Contexts/User";

// Atoms
import Button from "Components/Atoms/Button";
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

const InfoHeader = ({ info, type }) => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const actionConditions = {
    hasToOwn: profile._id !== info.owner,
    hasToNotOwn: profile._id === info.owner,
    isNotSelf: profile._id === info._id,
  };

  const date = new Date(info.createdAt);

  let time = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    minute: date.getMinutes(),
    hour: date.getHours(),
    year: date.getFullYear(),
  };

  for (let item of Object.keys(time)) {
    let val = time[item];

    time = {
      ...time,
      [item]: `${val}`.length < 2 ? `0${val}` : val,
    };
  }

  const { day, month, year, minute, hour } = time;
  const dateStr = `${day}/${month}/${year}, às ${hour}:${minute}`;

  return (
    <>
      <S.InfoHead>
        <S.InfoCover img={info.cover} />

        <S.InfoInfo>
          <S.Avatar>
            {info.avatar ? (
              <Avatar size={128} img={info.avatar} bgColor={"main"} />
            ) : (
              <RoundIcon size={128} icon={faQuestion} bgColor={"main"} />
            )}
          </S.Avatar>

          <div>
            <Text type='custom' fs={36} fw={600}>
              {info.name}
            </Text>

            <Text type='custom' fs={20} fw={400}>
              @{info.url}
            </Text>

            <Text type='custom' pt={16}>
              {`${
                type === "profile" ? "Perfil" : "Grupo"
              } criado em: ${dateStr}`}
            </Text>

            {info?.link && (
              <Text type='custom'>
                <a href='#'>{info.link}</a>
              </Text>
            )}
          </div>
        </S.InfoInfo>

        <S.InfoActions>
          {(type === "group" ? GROUP_ACTIONS : PROFILE_ACTIONS).map((item) => {
            if (item.condition && actionConditions[item.condition]) {
              return false;
            }

            return (
              <div key={item.id}>
                {item.type === "button" ? (
                  <Button style='primary' size={16} onClick={item.action}>
                    <FontAwesomeIcon icon={item.icon} />
                  </Button>
                ) : (
                  <Link href={item.to.replace(":id", info.url)}>
                    <a>
                      <FontAwesomeIcon icon={item.icon} />
                    </a>
                  </Link>
                )}
              </div>
            );
          })}
        </S.InfoActions>
      </S.InfoHead>
    </>
  );
};

export default InfoHeader;
