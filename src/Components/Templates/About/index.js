// Dependencies
import { useContext } from "react";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import Link from "next/link";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Contexts
import { AppContext } from "Contexts/App";

// Atoms
import Text from "Components/Atoms/Text";

// Themes
import DarkTheme from "Styles/Themes/Dark";

// Styles
import { GlobalStyle } from "Styles/global";
import * as S from "./style";

// Template
const AboutTemplate = () => {
  const { appState } = useContext(AppContext);
  const { theme } = appState;

  return (
    <ThemeProvider theme={theme || DarkTheme}>
      <GlobalStyle />

      <Head>
        <title>{SITE_NAME} - Aviso</title>
      </Head>

      <S.AboutWrapper>
        <S.About>
          <Text type='title'>Aviso!</Text>

          <Text>
            Olá, caro usuário. Queremos deixa-lo avisado que este é um ambiente
            de testes, onde coisas estranhas poderão ocorrer.
          </Text>

          <Text>
            Então... Caso você esteja possua uma conta, e não consiga logar
            (mesmo inserindo informações válidas), é possível que o banco de
            dados tenha sido apagado.
          </Text>

          <Text>
            Isso acontece porque, enquanto features são desenvolvidas, podemos
            criar um volume muito grande de informações bugadas. Fica mais fácil
            apagar um banco de dados inteiro, do que catar informação bugada
            para ser apagada.
          </Text>

          <Text>
            Agradecemos sua compreensão, a paciência, e a ajuda na hora de
            testar o site. ♥
          </Text>

          <Text ta='center' pt={32}>
            <>Ir para </>

            <Link href={ROUTES.LOGIN}>
              <a>Login</a>
            </Link>

            <>, </>

            <Link href={ROUTES.REGISTER}>
              <a>Cadastro</a>
            </Link>

            <>, ou </>

            <Link href={ROUTES.HOME}>
              <a>Home</a>
            </Link>
          </Text>
        </S.About>
      </S.AboutWrapper>
    </ThemeProvider>
  );
};

export default AboutTemplate;
