// Dependencies
import { useContext, useState } from "react";
import Head from "next/head";

// APIS
import ProfileAPI from "Apis/Profile";
import UserAPI from "Apis/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { slugify } from "Helpers/Functions";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Atoms
import Form from "Components/Atoms/Form";
import Checkbox from "Components/Atoms/Checkbox";
import Button from "Components/Atoms/Button";
import Text from "Components/Atoms/Text";

// Molecules
import File from "Components/Molecules/File";
import LabeledInput from "Components/Molecules/LabeledInput";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const NewProfileTemplate = () => {
  const { userDispatch, userState } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);
  const { user } = userState;

  const baseFormField = {
    value: "",
    error: "",
  };

  const baseForm = {
    avatar: { ...baseFormField },
    name: { ...baseFormField },
    url: { ...baseFormField },
    isAdult: { ...baseFormField },
  };

  const [form, setForm] = useState({ ...baseForm });
  const [isRequesting, setIsRequesting] = useState(false);

  const displaySuccessToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Sucesso!",
        text: "Perfil criado com sucesso.",
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
        text: "Aconteceu algum erro ao tentar criar seu perfil. Tente novamente.",
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
    const tar = e.currentTarget;

    setForm({
      ...form,

      [tar.name]: {
        value: tar.files?.length ? tar.files[0] : tar.value,
        error: "",
      },
    });
  };

  const handleSubmit = async () => {
    try {
      if (!form.name.value) {
        displayWarningToast();

        return;
      }

      setIsRequesting(true);

      const url = slugify(form.url.value || form.name.value);

      const newProfile = {
        avatar: form.avatar.value,
        name: form.name.value,
        url,
        isAdult: form.isAdult.value,
        createdAt: new Date(),
        connections: [],
        groups: [],
        about: ``,
      };

      const insertedProfile = await ProfileAPI.createProfile(newProfile);

      if (!insertedProfile.newId) {
        setIsRequesting(false);
        displayErrorToast();
        return;
      }

      const newProfileData = {
        _id: insertedProfile.newId,
        avatar: insertedProfile.avatar,
        name: newProfile.name,
        url,
      };

      await UserAPI.updateUser({
        ...user,
        profiles:
          user.profiles?.length > 0
            ? [...user.profiles, { ...newProfileData }]
            : [{ ...newProfileData }],
      });

      setForm({ ...baseForm });

      userDispatch({
        type: "SET_NEW_PROFILE",
        data: {
          ...newProfileData,
        },
      });

      setIsRequesting(false);
      displaySuccessToast();
    } catch (e) {
      setIsRequesting(false);
      displayErrorToast();
      console.log(e);
    }
  };

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - Novo perfil`}</title>
      </Head>

      <S.NewProfileWrapper>
        <S.NewProfileContent>
          <Text type='title' pb={32}>
            Novo perfil
          </Text>

          <Form onSubmit={handleSubmit}>
            <File
              id='avatar'
              label='Avatar'
              value={form.avatar.value}
              onChange={handleChange}
            />

            <S.Row>
              <LabeledInput
                id='name'
                placeholder='Insira o nome do seu perfil'
                label='Nome'
                value={form.name.value}
                onChange={handleChange}
              />

              <LabeledInput
                id='url'
                placeholder='Insira uma URL personalizada para o seu perfil'
                label='URL (Caso fique em branco, será baseado no nome)'
                value={form.url.value}
                onChange={handleChange}
              />
            </S.Row>

            <Checkbox
              id='isAdult'
              label='Seu perfil possui conteúdo adulto (+18)?'
              value={form.url.value}
              onChange={handleChange}
            />

            <S.NewProfileSave>
              <Button
                type='submit'
                style='primary'
                size={16}
                disabled={isRequesting}
              >
                Criar perfil
              </Button>
            </S.NewProfileSave>
          </Form>
        </S.NewProfileContent>
      </S.NewProfileWrapper>
    </AuthedTemplate>
  );
};

export default NewProfileTemplate;
