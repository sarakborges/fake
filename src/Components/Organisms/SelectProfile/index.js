// Dependencies
import Link from "next/link";
import { useState, useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faLink,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexts
import { UserContext } from "Contexts/User";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Organisms
import SelectProfilesList from "Components/Organisms/SelectProfilesList";

// Style
import * as S from "./style";
import Input from "Components/Atoms/Input";
import Text from "Components/Atoms/Text";
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";
import ButtonLink from "Components/Atoms/ButtonLink";

// Template
const SelectProfile = () => {
  const { userState } = useContext(UserContext);
  const { user, profile } = userState;

  const [displayProfiles, setDisplayProfiles] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState();

  const profilesListRef = useRef();

  const toggleProfiles = () => {
    setDisplayProfiles(!displayProfiles);
  };

  const handleFilterChange = (e) => {
    setFilter(e.currentTarget.value);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!profilesListRef?.current?.contains(e.target)) {
        setDisplayProfiles(false);
      }
    });
  }, []);

  useEffect(() => {
    setFilteredProfiles(user.profiles);
  }, [user]);

  useEffect(() => {
    setFilteredProfiles(
      user.profiles.filter((item) => {
        let fields = ["name", "url"];

        for (let field of fields) {
          if (item[field]?.toLowerCase().includes(filter.toLowerCase())) {
            return true;
          }
        }

        fields = ["publicTags", "privateTags"];
        for (let field of fields) {
          if (item[field]?.length > 0) {
            for (let arrItem of item[field]) {
              if (arrItem.includes(filter.toLowerCase())) {
                return true;
              }
            }
          }
        }

        return false;
      })
    );
  }, [filter]);

  return (
    <S.SelectProfileWrapper
      ref={profilesListRef}
      onClick={(e) => e.stopPropagation()}
    >
      <S.SelectProfile displayProfiles={displayProfiles}>
        <S.ActiveProfile>
          <Link href={ROUTES.PROFILE.replace(":id", profile.url)}>
            <a>
              <InfoArea
                info={profile}
                avatarSize={48}
                side='left'
                displayTags
              />
            </a>
          </Link>

          <ButtonLink href={ROUTES.PROFILE.replace(":id", profile.url)}>
            Ver perfil
          </ButtonLink>
        </S.ActiveProfile>

        <S.Settings>
          <Link href={ROUTES.SETTINGS.PROFILE}>
            <a>Gerenciar seu perfil</a>
          </Link>

          <span />

          <Link href={ROUTES.SETTINGS.ACCOUNT}>
            <a>Gerenciar sua conta</a>
          </Link>

          <span />

          <Link href={ROUTES.SETTINGS.SITE}>
            <a>Preferências do site</a>
          </Link>
        </S.Settings>

        {user.profiles.length > 1 && (
          <>
            <Input
              id='filter-profiles'
              value={filter}
              onChange={handleFilterChange}
              placeholder='Filtrar seus perfis'
            />

            <SelectProfilesList
              profiles={filteredProfiles?.filter(
                (item) => item._id !== profile._id
              )}
            />
          </>
        )}
      </S.SelectProfile>

      <S.InfoAreaWrapper onClick={toggleProfiles} highlighted={displayProfiles}>
        {profile.avatar ? (
          <Avatar img={profile.avatar} size={48} bgColor='main' />
        ) : (
          <RoundIcon icon={faQuestion} size={48} bgColor='main' />
        )}
      </S.InfoAreaWrapper>
    </S.SelectProfileWrapper>
  );
};

export default SelectProfile;
