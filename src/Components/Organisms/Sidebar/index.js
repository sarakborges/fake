// Dependencies
import { useContext } from "react";
import Link from "next/link";

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

      {profile && (
        <S.InfoArea>
          <InfoArea info={profile} />
        </S.InfoArea>
      )}
    </S.Menu>
  );
};

export default Sidebar;
