// Dependencies
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useState, useContext, useEffect, useRef } from "react";

// Helpers
import { ROUTES } from "Helpers/routes";
import { TOASTS, TOAST_TYPES } from "Helpers/Constants";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Atoms
import Text from "Components/Atoms/Text";
import Input from "Components/Atoms/Input";
import ButtonLink from "Components/Atoms/ButtonLink";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";
import ProfilePicture from "Components/Molecules/ProfilePicture";

// Organisms
import SelectProfilesList from "Components/Organisms/SelectProfilesList";

// Style
import * as S from "./style";

const SelectProfile = () => {
  const router = useRouter();

  const { userState, userDispatch } = useContext(UserContext);
  const { user, profile } = userState;

  const { appDispatch } = useContext(AppContext);

  const [displayProfiles, setDisplayProfiles] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState();

  const profilesListRef = useRef();

  const handleLogout = () => {
    localStorage.clear();

    userDispatch({
      type: "SET_USER",
      data: {
        isLoggedIn: false,
        user: undefined,
        profile: undefined,
      },
    });

    appDispatch({
      type: "SET_TOAST",
      data: {
        ...TOAST_TYPES.success,
        text: TOASTS.LOGOUT.success,
        isVisible: true,
      },
    });

    router.push(ROUTES.LOGIN);
  };

  const toggleProfiles = () => {
    setDisplayProfiles(!displayProfiles);
  };

  const handleFilterChange = (e) => {
    setFilter(e.currentTarget.value);
  };

  const toggleMenu = (e) => {
    if (!profilesListRef?.current?.contains(e.target)) {
      setDisplayProfiles(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", toggleMenu);

    return () => {
      document.removeEventListener("click", toggleMenu);
    };
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
    <S.SelectProfileWrapper ref={profilesListRef}>
      <S.SelectProfile displayProfiles={displayProfiles}>
        <S.ActiveProfile>
          <S.ActiveInfo>
            <InfoArea info={profile} avatarSize={48} side='left' displayTags />
          </S.ActiveInfo>

          <S.GoToProfile>
            <ButtonLink href={ROUTES.PROFILE.replace(":id", profile.url)}>
              Ver perfil
            </ButtonLink>
          </S.GoToProfile>
        </S.ActiveProfile>

        <div>
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

            <span />

            <S.Logout onClick={handleLogout}>
              <Text type='custom' fs={12} fc='main' fw={400}>
                Sair
              </Text>
            </S.Logout>
          </S.Settings>
        </div>

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
        <ProfilePicture avatar={profile.avatar} size={40} />
      </S.InfoAreaWrapper>
    </S.SelectProfileWrapper>
  );
};

export default SelectProfile;
