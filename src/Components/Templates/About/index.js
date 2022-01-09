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
        <title>{SITE_NAME} - Sobre</title>
      </Head>

      <S.AboutWrapper>
        <S.About>
          <Text type='pagetitle'>Sobre o {SITE_NAME}</Text>

          <Text>
            Olá, caro usuário. Seja bem vindo ao <b>{SITE_NAME}</b>. Meu nome é
            Sara, e vou contar um pouco sobre o que é isso aqui.
          </Text>

          <Text>
            Resumidamente, ele é uma rede social. Uma junção de tudo que eu acho
            legal nas redes que já utilizei, somado a algumas funcionalidades
            que eu gostaria que existissem nelas.
          </Text>

          <Text>
            Aqui, os usuários poderão interagir através da criação de ilimitados
            perfis em sua conta. Dessa forma, por exemplo: se você tem seu
            perfil pessoal, e deseja criar um perfil para sua marca, não terá
            necessidade de criar duas contas. Apenas dois prefis.
          </Text>

          <Text>
            Os usuários também podem conectar-se, criando uma rede de contatos
            entre si. Ou, ainda, juntar-se em grupos de interesse em comum,
            comunicando-se através de fóruns imbutidos nos grupos.
          </Text>
        </S.About>

        <S.About>
          <Text type='title'>Período de testes</Text>

          <Text>
            Durante o período de testes, coisas estranhas poderão ocorrer.
          </Text>

          <Text>
            Então... Caso você esteja possua uma conta, e não consiga logar
            (mesmo inserindo informações corretas), é possível que o banco de
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
        </S.About>

        <S.About>
          <Text type='title'>Vagas?</Text>

          <Text>
            Até o momento, o projeto está sendo desenvolvido por mim, Sara,
            sozinha.
          </Text>

          <Text>
            Eu sou uma desenvolvedora front-end, sem muito conhecimento em UI,
            UX, ou back-end. Logo, o back-end não está otimizado (nem o banco de
            dados), e a interface está sendo desenvolvida de acordo com o que eu
            entendo ser melhor, sem conhecimento técnico.
          </Text>

          <Text>
            Se você for uma pessoa das áreas citadas acima, e tiver interesse em
            colaborar no projeto, peço que me mande uma mensagem sobre o
            assunto.
          </Text>
        </S.About>

        <S.About>
          <Text type='title'>Contatos</Text>

          <Text>
            Feedbacks também são essenciais. Então, se tiver algo para me falar
            (algo que gostou muito e quer enfatizar, ou algum bug encontrado, ou
            algo que você acha que pode melhorar), pode me mandar uma mensagem.
          </Text>

          <Text>
            -{" "}
            <a href='https://github.com/sarakborges/' target='_blank'>
              <b>Github</b>
            </a>
          </Text>

          <Text>
            -{" "}
            <a href='https://www.linkedin.com/in/sarakborges/' target='_blank'>
              <b>Linkedin</b>
            </a>
          </Text>

          <Text>
            -{" "}
            <a href='https://www.instagram.com/yoggsara/' target='_blank'>
              <b>Instagram</b>
            </a>
          </Text>

          <Text>
            -{" "}
            <a href='https://twitter.com/YoggSaritosa' target='_blank'>
              <b>Twitter</b>
            </a>
          </Text>
        </S.About>

        <S.About>
          <Text ta='center'>
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
