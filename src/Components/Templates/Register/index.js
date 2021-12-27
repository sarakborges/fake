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
const RegisterTemplate = () => {
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
        text: "Cadastrado com sucesso. Redirecionando.",
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

  const displayWarningExistingToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Cuidado!",
        text: "Já existe um usuário com essas informações.",
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
        text: "Aconteceu algum erro ao tentar cadastrar. Tente novamente.",
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

    if (loginReq?._id) {
      displayWarningExistingToast();
      return;
    }

    const registerReq = await UserAPI.createUser(email.value, password.value);

    if (!registerReq) {
      displayErrorToast();
      return;
    }

    setIsRequesting(false);

    sessionStorage.setItem(
      "user",
      JSON.stringify({ user: { ...registerReq } })
    );

    displaySuccessToast();
    router.push(ROUTES.HOME);
  };

  return (
    <ThemeProvider theme={theme || DarkTheme}>
      <GlobalStyle />

      {<Toast {...toast} />}

      <Head>
        <title>{SITE_NAME} - Cadastro</title>
      </Head>

      <Form onSubmit={handleSubmit}>
        <S.RegisterWrapper>
          <S.FormWrapper>
            <Text type='pagetitle'>Cadastro</Text>

            <LabeledInput
              id='email'
              label='Email'
              placeholder='Digite seu email aqui'
              value={form.email.value}
              onChange={handleChange}
              isBgInverted
            />

            <LabeledInput
              id='password'
              type='password'
              label='Senha'
              placeholder='Digite sua senha aqui'
              value={form.password.value}
              onChange={handleChange}
              isBgInverted
            />

            <Button
              type='submit'
              style='primary'
              size={16}
              disabled={isRequesting}
            >
              Cadastrar
            </Button>

            <S.LoginLink>
              Já possui uma conta? Clique{" "}
              <Link href={ROUTES.LOGIN}>
                <a>aqui</a>
              </Link>{" "}
              para entrar.
            </S.LoginLink>
          </S.FormWrapper>
        </S.RegisterWrapper>
      </Form>
    </ThemeProvider>
  );
};

export default RegisterTemplate;
