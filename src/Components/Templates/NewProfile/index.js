// Dependencies
import { useContext, useState } from "react";
import Head from "next/head";

// APIS
import ProfileAPI from "Apis/Profile";
import UserAPI from "Apis/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Atoms
import Form from "Components/Atoms/Form";
import Checkbox from "Components/Atoms/Checkbox";
import Avatar from "Components/Atoms/Avatar";
import Button from "Components/Atoms/Button";

// Molecules
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

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.currentTarget.name]: {
        value: e.currentTarget.value,
        error: "",
      },
    });
  };

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

  const handleSubmit = async () => {
    try {
      const newProfile = {
        avatar: form.avatar.value,
        name: form.name.value,
        url: form.url.value,
        isAdult: form.isAdult.value,
        createdAt: new Date(),
        connections: [],
        groups: [],
        about: ``,
      };

      if (!form.name.value || !form.url.value) {
        displayWarningToast();

        return;
      }

      setIsRequesting(true);

      const newId = await ProfileAPI.createProfile(newProfile);

      if (!newId) {
        return;
      }

      const newProfileData = {
        _id: newId,
        avatar: newProfile.avatar,
        name: newProfile.name,
        url: newProfile.url,
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
          <h2>Novo perfil</h2>

          <Form onSubmit={handleSubmit}>
            <S.AvatarItem>
              <Avatar img={form.avatar.value} size={128} />

              <S.AvatarInput>
                <LabeledInput
                  id='avatar'
                  placeholder='Insira a URL do avatar do seu perfil'
                  label='Avatar'
                  value={form.avatar.value}
                  onChange={handleChange}
                />
              </S.AvatarInput>
            </S.AvatarItem>

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
              label='URL'
              value={form.url.value}
              onChange={handleChange}
            />

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
