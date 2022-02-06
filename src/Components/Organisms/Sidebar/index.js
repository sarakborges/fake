// Dependencies
import { useContext } from "react";

// Contexts
import { UserContext } from "Contexts/User";

// Molecules
import MenuList from "Components/Molecules/MenuList";

// Organisms
import SelectProfile from "Components/Organisms/SelectProfile";

// Style
import * as S from "./style";

// Template
const Sidebar = ({ displaySidebar }) => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  return (
    <S.Sidebar displaySidebar={displaySidebar}>
      <MenuList />

      {profile?._id && <SelectProfile />}
    </S.Sidebar>
  );
};

export default Sidebar;
