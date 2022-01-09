// Dependencies
import { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";

// APIs
import UserAPI from "Apis/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Contexts
import { AppContext } from "Contexts/App";

// Atoms
import Form from "Components/Atoms/Form";
import Button from "Components/Atoms/Button";
import Text from "Components/Atoms/Text";

// Molecules
import Toast from "Components/Molecules/Toast";
import LabeledInput from "Components/Molecules/LabeledInput";

// Themes
import DarkTheme from "Styles/Themes/Dark";

// Styles
import { GlobalStyle } from "Styles/global";
import * as S from "./style";

// Template
const LoginTemplate = () => {
  const router = useRouter();

  const { appState, appDispatch } = useContext(AppContext);
  const { theme, toast } = appState;

  const baseFormField = {
    value: "",
    error: "",
  };

  const baseForm = {
    email: { ...baseFormField },
    password: { ...baseFormField },
  };

  const [form, setForm] = useState({ ...baseForm });
  const [isRequesting, setIsRequesting] = useState(false);

  const displaySuccessToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Sucesso!",
        text: "Logado com sucesso. Redirecionando para a página inicial.",
        type: "success",
        isVisible: true,
      },
    });

    setTimeout(() => {
      appDispatch({
        type: "TOGGLE_TOAST",
        data: false,
      });
    }, 5000);
  };

  const displayWarningToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Cuidado!",
        text: "Todos os campos precisam ser preenchidos, antes de continuarmos.",
        type: "warning",
        isVisible: true,
      },
    });

    setTimeout(() => {
      appDispatch({
        type: "TOGGLE_TOAST",
        data: false,
      });
    }, 5000);
  };

  const displayErrorToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Erro!",
        text: "Suas informações de login estão incorretas. Tente novamente.",
        type: "error",
        isVisible: true,
      },
    });

    setTimeout(() => {
      appDispatch({
        type: "TOGGLE_TOAST",
        data: false,
      });
    }, 5000);
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.currentTarget.name]: {
        value: e.currentTarget.value,
        error: "",
      },
    });
  };

  const handleSubmit = async () => {
    const { email, password } = form;

    if (!email.value || !password.value) {
      displayWarningToast();
      return;
    }

    setIsRequesting(true);

    const loginReq = await UserAPI.getUser(email.value, password.value);

    if (!loginReq?._id) {
      setIsRequesting(false);
      displayErrorToast();
      return;
    }

    localStorage.setItem("user", JSON.stringify({ user: { ...loginReq } }));
    displaySuccessToast();
    router.push(ROUTES.HOME);
  };

  return (
    <ThemeProvider theme={theme || DarkTheme}>
      <GlobalStyle />

      {<Toast {...toast} />}

      <Head>
        <title>{SITE_NAME} - Login</title>
      </Head>

      <Form onSubmit={handleSubmit}>
        <S.LoginWrapper>
          <S.FormWrapper>
            <Text type='pagetitle'>Login</Text>

            <LabeledInput
              id='email'
              label='Email'
              placeholder='Digite seu email aqui'
              value={form.email.value}
              onChange={handleChange}
            />

            <LabeledInput
              id='password'
              type='password'
              label='Senha'
              placeholder='Digite sua senha aqui'
              value={form.password.value}
              onChange={handleChange}
            />

            <Button
              type='submit'
              style='primary'
              size={16}
              disabled={isRequesting}
            >
              Logar
            </Button>

            <S.RegisterLink>
              Ainda não possui uma conta? Clique{" "}
              <Link href={ROUTES.REGISTER}>
                <a>aqui</a>
              </Link>{" "}
              para se cadastrar.
            </S.RegisterLink>
          </S.FormWrapper>
        </S.LoginWrapper>
      </Form>
    </ThemeProvider>
  );
};

export default LoginTemplate;
