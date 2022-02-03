// Dependencies
import { useContext } from "react";

// Contexts
import { AppContext } from "Contexts/App";

// Style
import * as S from "./style";

// Template
const InfoAbout = ({ isAdult, about }) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  return (
    <S.AboutWrapper>
      <S.About isBlured={isAdult && !displayAdult}>
        <div dangerouslySetInnerHTML={{ __html: about }} />
      </S.About>
    </S.AboutWrapper>
  );
};

export default InfoAbout;
