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
import Button from "Components/Atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTh } from "@fortawesome/free-solid-svg-icons";

const SelectProfile = () => {
  const router = useRouter();

  const { userState, userDispatch } = useContext(UserContext);
  const { user, profile } = userState;

  const { appDispatch } = useContext(AppContext);

  const [displayProfiles, setDisplayProfiles] = useState(false);
  const [listStyle, setListStyle] = useState("list");
  const [filter, setFilter] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState();

  const profilesListRef = useRef();

  const handleChangeListStyle = (style) => {
    setListStyle(style);
  };

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
    setFilteredProfiles(
      user.profiles.filter((item) => item._id !== profile._id)
    );
  }, [user]);

  useEffect(() => {
    const newProfiles = user.profiles
      .filter((item) => {
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
      .filter((item) => item._id !== profile._id);

    setFilteredProfiles(newProfiles);
  }, [filter, profile]);

  return (
    <S.SelectProfileWrapper ref={profilesListRef}>
      <S.SelectProfile displayProfiles={displayProfiles}>
        <S.ActiveProfile>
          <S.ActiveInfo>
            <InfoArea info={profile} avatarSize={48} side='left' displayTags />
          </S.ActiveInfo>

          <div>
            <ButtonLink href={ROUTES.PROFILE.replace(":id", profile.url)}>
              Ver perfil
            </ButtonLink>
          </div>
        </S.ActiveProfile>

        <div>
          <S.Settings>
            <div>
              <Link href={ROUTES.SETTINGS.PROFILE}>
                <a>Editar perfil ativo</a>
              </Link>
            </div>

            <div>
              <Link href={ROUTES.SETTINGS.SITE}>
                <a>Preferências do site</a>
              </Link>
            </div>

            <div>
              <Link href={ROUTES.SETTINGS.ACCOUNT}>
                <a>Gerenciar sua conta</a>
              </Link>
            </div>

            <div>
              <S.Logout>
                <span onClick={handleLogout}>Sair</span>
              </S.Logout>
            </div>
          </S.Settings>
        </div>

        {user.profiles.length > 1 && (
          <>
            <S.SelectProfileHeader>
              <Text type='custom' fw={400}>
                Selecione seu perfil ativo
              </Text>

              <S.ListStyle>
                <Button
                  style={listStyle === "list" ? "primary" : "borderless"}
                  size={12}
                  onClick={() => handleChangeListStyle("list")}
                >
                  <FontAwesomeIcon icon={faList} />
                </Button>

                <Button
                  style={listStyle === "grid" ? "primary" : "borderless"}
                  size={12}
                  onClick={() => handleChangeListStyle("grid")}
                >
                  <FontAwesomeIcon icon={faTh} />
                </Button>
              </S.ListStyle>
            </S.SelectProfileHeader>

            <Input
              id='filter-profiles'
              value={filter}
              onChange={handleFilterChange}
              placeholder='Encontre perfis'
            />

            {filteredProfiles?.length > 0 && (
              <SelectProfilesList
                listStyle={listStyle}
                profiles={filteredProfiles}
              />
            )}
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
