// Dependencies
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// Helpers
import { PROFILE_ACTIONS } from "Helpers/Constants";

// Atoms
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

const ProfileHeader = ({ profile }) => {
  const date = new Date(profile.createdAt);
  let day = date.getDate();
  let month = date.getMonth() + 1;

  if (day.length < 2) {
    day = `0${day}`;
  }

  if (month.length < 2) {
    month = `0${month}`;
  }

  const dateStr = `${day}/${month}/${date.getFullYear()}`;

  return (
    <>
      <S.ProfileHead>
        <S.ProfileCover img={profile.cover} />

        <S.ProfileInfo>
          <S.Avatar>
            {profile.avatar ? (
              <Avatar size={128} img={profile.avatar} bgColor={"main"} />
            ) : (
              <RoundIcon size={128} icon={faQuestion} bgColor={"main"} />
            )}
          </S.Avatar>

          <div>
            <Text type='custom' fs={36} fw={600}>
              {profile.name}
            </Text>

            <Text type='custom' fs={20} fw={400}>
              @{profile.url}
            </Text>

            <Text type='custom' pt={16}>
              {`Perfil criado em: ${dateStr}`}
            </Text>

            {profile?.link && (
              <Text type='custom'>
                <a href='#'>{profile.link}</a>
              </Text>
            )}
          </div>
        </S.ProfileInfo>

        <S.ProfileActions>
          {PROFILE_ACTIONS.map((item) => {
            return (
              <div key={item.id}>
                <Link href={item.to.replace(":id", profile.url)}>
                  <a>
                    <FontAwesomeIcon icon={item.icon} />
                  </a>
                </Link>
              </div>
            );
          })}
        </S.ProfileActions>
      </S.ProfileHead>
    </>
  );
};

export default ProfileHeader;
