// Dependencies
import { useState, useContext } from "react";

// Contexts
import { AppContext } from "Contexts/App";

// Atoms
import Button from "Components/Atoms/Button";
import Text from "Components/Atoms/Text";

// Themes
import Themes from "Styles/Themes";
import Colors from "Styles/Colors";

// Styles
import * as S from "./style";

const SelectTheme = () => {
  const { appDispatch } = useContext(AppContext);

  const [bright, setBright] = useState();

  const selectBright = (level) => {
    setBright(level);
  };

  const selectMainColor = (color) => {
    const theme = { ...Themes[bright], main: Colors[color] };

    localStorage.setItem(
      "theme",
      JSON.stringify({ localTheme: bright, localMainColor: color })
    );

    appDispatch({
      type: "SET_THEME",
      data: { ...theme },
    });
  };

  return (
    <>
      {!bright ? (
        <S.BrightWrapper>
          <S.DarkSide>
            <Button
              size={20}
              style='secondary'
              onClick={() => {
                selectBright("dark");
              }}
            >
              Clique aqui se você prefere usar tema escuro
            </Button>
          </S.DarkSide>

          <S.LightSide>
            <Button
              size={20}
              style='secondary'
              onClick={() => {
                selectBright("light");
              }}
            >
              Clique aqui se você prefere usar tema claro
            </Button>
          </S.LightSide>
        </S.BrightWrapper>
      ) : (
        <S.MainColorWrapper bright={bright}>
          <div>
            <Text type='title' pb={32} ta='center'>
              Escolha qual cor de destaque você prefere
            </Text>

            <S.ColorsWrapper>
              {Object.keys(Colors).map((item) => {
                return (
                  <S.ColorItem color={Colors[item]} key={item}>
                    <Button
                      style='secondary'
                      onClick={() => {
                        selectMainColor(item);
                      }}
                    />
                  </S.ColorItem>
                );
              })}
            </S.ColorsWrapper>
          </div>
        </S.MainColorWrapper>
      )}
    </>
  );
};

export default SelectTheme;
