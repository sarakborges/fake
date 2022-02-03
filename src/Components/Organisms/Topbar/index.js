// Dependencies
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Button from "Components/Atoms/Button";

// Style
import * as S from "./style";

// Template
const TopBar = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  return (
    <S.Topbar>
      <Button
        style='transparent'
        onClick={() => setDisplaySidebar(!displaySidebar)}
        size={20}
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>
    </S.Topbar>
  );
};

export default TopBar;
