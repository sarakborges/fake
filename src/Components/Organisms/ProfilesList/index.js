// Dependencies
import Link from "next/link";
import { useState, useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexts
import { UserContext } from "Contexts/User";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Organisms
import SelectProfilesList from "Components/Organisms/SelectProfilesList";

// Style
import * as S from "./style";

const ProfilesList = () => {
  const { userState } = useContext(UserContext);
  const { user, profile } = userState;

  const [displayProfiles, setDisplayProfiles] = useState(false);
  const profilesListRef = useRef();

  const toggleProfiles = () => {
    setDisplayProfiles(!displayProfiles);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!profilesListRef?.current?.contains(e.target)) {
        setDisplayProfiles(false);
      }
    });
  }, []);

  return (
    <S.InfoAreaWrapper>
      <S.InfoArea ref={profilesListRef} onClick={(e) => e.stopPropagation()}>
        <S.SelectProfile displayProfiles={displayProfiles}>
          <Link href={ROUTES.PROFILE.replace(":id", profile?.url)}>
            <a>
              <InfoArea
                info={profile}
                infoGap={24}
                avatarSize={64}
                side='left'
                hasLink
                isBox
                squaredBox
              />
            </a>
          </Link>

          {user.profiles.length > 1 && (
            <SelectProfilesList
              profiles={user.profiles.filter(
                (item) => item._id !== profile?._id
              )}
            />
          )}

          <S.NewProfile>
            <Link href={ROUTES.NEW_PROFILE}>
              <a>
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>

                <Text type='custom' fw={600}>
                  Novo perfil
                </Text>
              </a>
            </Link>
          </S.NewProfile>
        </S.SelectProfile>

        <div onClick={toggleProfiles}>
          <InfoArea info={profile} isBox />
        </div>
      </S.InfoArea>
    </S.InfoAreaWrapper>
  );
};

export default ProfilesList;
