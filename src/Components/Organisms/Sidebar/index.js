// Molecules
import MenuList from "Components/Molecules/MenuList";

// Style
import * as S from "./style";

// Template
const Sidebar = ({ displaySidebar }) => {
  return (
    <S.Sidebar displaySidebar={displaySidebar}>
      <MenuList />
    </S.Sidebar>
  );
};

export default Sidebar;
