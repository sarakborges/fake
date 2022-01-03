// Dependencies
import { useContext } from "react";
import Link from "next/link";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexts
import { UserContext } from "Contexts/User";

// Molecules
import MenuList from "Components/Molecules/MenuList";
import InfoArea from "Components/Molecules/InfoArea";

// Style
import * as S from "./style";

// Template
const Sidebar = () => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  return (
    <S.Menu>
      <MenuList />

      {profile?._id && (
        <Link href={ROUTES.PROFILE.replace(":id", profile.url)}>
          <a>
            <S.InfoArea>
              <InfoArea info={profile} isBox />
            </S.InfoArea>
          </a>
        </Link>
      )}
    </S.Menu>
  );
};

export default Sidebar;
