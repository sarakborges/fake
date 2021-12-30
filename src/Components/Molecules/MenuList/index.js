// Dependencies
import { useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Helpers
import { LEFT_MENU } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Contexts
import { UserContext } from "Contexts/User";
import { AppContext } from "Contexts/App";

// Atoms
import Button from "Components/Atoms/Button";

// Style
import * as S from "./style";

// Template
const MenuList = () => {
  const router = useRouter();
  const { pathname } = router;

  const { userState, userDispatch } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);
  const { profile } = userState;

  const getIsActive = (item) => {
    for (let route of item.activeOnRoutes) {
      if (pathname.includes(route)) {
        return true;
      }
    }

    return false;
  };

  const handleClick = (text) => {
    if (text === "Sair") {
      sessionStorage.clear();

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
          title: "Deslogado",
          text: `Esperamos que volte logo.`,
          type: "success",
          isVisible: true,
        },
      });

      setTimeout(() => {
        appDispatch({
          type: "TOGGLE_TOAST",
          data: false,
        });
      }, 5000);

      router.push(ROUTES.LOGIN);
    }
  };

  return (
    <S.MenuLists>
      {LEFT_MENU.map((item, key) => {
        return (
          <S.MenuList key={key}>
            {item
              .filter((subItem) => {
                if (subItem?.link?.includes(":id")) {
                  if (profile?.url) {
                    return subItem;
                  } else {
                    return false;
                  }
                }

                return subItem;
              })
              .map((subItem) => {
                return (
                  <S.MenuItem key={subItem.text} active={getIsActive(subItem)}>
                    {!subItem.link && (
                      <Button
                        onClick={() => {
                          handleClick(subItem.text);
                        }}
                      >
                        <S.MenuItemIcon>
                          <FontAwesomeIcon icon={subItem.icon} />
                        </S.MenuItemIcon>

                        <span>{subItem.text}</span>
                      </Button>
                    )}

                    {subItem.link && (
                      <a
                        href={
                          subItem.link === ROUTES.PROFILE
                            ? subItem.link.replace(":id", profile?.url)
                            : subItem.link
                        }
                      >
                        <S.MenuItemIcon>
                          <FontAwesomeIcon icon={subItem.icon} />
                        </S.MenuItemIcon>

                        <span>{subItem.text}</span>
                      </a>
                    )}
                  </S.MenuItem>
                );
              })}
          </S.MenuList>
        );
      })}
    </S.MenuLists>
  );
};

export default MenuList;
