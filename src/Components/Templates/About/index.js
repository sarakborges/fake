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
            Olá, caro usuário. Este é um ambiente de testes, onde coisas
            estranhas poderão ocorrer.
          </Text>

          <Text>
            Então... Caso você esteja possua uma conta, e não consiga logar
            (mesmo inserindo informações válidas), é possível que o banco de
            dados tenha sido apagado.
          </Text>

          <Text>
            Isso acontece porque, enquanto features são desenvolvidas, cria-se
            um volume muito grande de informações bugadas. Aí, deletar o banco
            de dados passa a ser a solução mais rápida.
          </Text>

          <Text>
            Fora isso; sua compreensão, paciência, e ajuda na hora de testar o
            <b> {SITE_NAME}</b> são extremamente apreciadas. ♥
          </Text>

          <Text ta='center' pt={32}>
            <>Ir para </>

            <Link href={ROUTES.LOGIN}>
              <a>
                <b>Login</b>
              </a>
            </Link>

            <>, </>

            <Link href={ROUTES.REGISTER}>
              <a>
                <b>Cadastro</b>
              </a>
            </Link>

            <>, ou </>

            <Link href={ROUTES.HOME}>
              <a>
                <b>Home</b>
              </a>
            </Link>
          </Text>
        </S.About>
      </S.AboutWrapper>
    </ThemeProvider>
  );
};

export default AboutTemplate;
