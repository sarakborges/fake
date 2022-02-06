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
import Input from "Components/Atoms/Input";

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
        const fields = ["name", "url"];

        for (let field of fields) {
          if (item[field].toLowerCase().includes(filter.toLowerCase())) {
            return true;
          }
        }

        return false;
      })
    );
  }, [filter]);

  return (
    <S.InfoAreaWrapper>
      <S.InfoArea ref={profilesListRef} onClick={(e) => e.stopPropagation()}>
        <S.SelectProfile displayProfiles={displayProfiles}>
          <Link href={ROUTES.PROFILE.replace(":id", profile.url)}>
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
            <>
              <S.Filter>
                <Input
                  id='filter-profiles'
                  value={filter}
                  onChange={handleFilterChange}
                  placeholder='Insira o nome ou @ do perfil que quer encontrar'
                />
              </S.Filter>

              <SelectProfilesList
                profiles={filteredProfiles?.filter(
                  (item) => item._id !== profile._id
                )}
              />
            </>
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

export default SelectProfile;
