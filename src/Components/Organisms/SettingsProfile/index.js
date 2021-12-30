// Dependencies
import { useContext, useEffect, useState } from "react";

// APIS
import ProfileAPI from "Apis/Profile";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Atoms
import Text from "Components/Atoms/Text";
import Form from "Components/Atoms/Form";
import Checkbox from "Components/Atoms/Checkbox";
import Button from "Components/Atoms/Button";

// Molecules
import LabeledInput from "Components/Molecules/LabeledInput";
import File from "Components/Molecules/File";
import NoProfile from "Components/Molecules/NoProfile";

// Style
import * as S from "./style";

// Template
const SettingsProfile = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);
  const { user, profile } = userState;
  const { profiles } = user;

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
        text: "Perfil editado com sucesso.",
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
        text: "Aconteceu algum erro ao tentar editar seu perfil. Tente novamente.",
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
        ...profile,
        avatar: form.avatar.value,
        name: form.name.value,
        url,
        isAdult: form.isAdult.value,
      };

      await ProfileAPI.updateProfile({
        ...newProfile,
      });

      userDispatch({
        type: "SET_PROFILE",
        data: {
          profile: { ...newProfile },
          profiles: [
            ...profiles.map((item) =>
              item._id === profile._id ? newProfile : item
            ),
          ],
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

  useEffect(() => {
    if (!profile) {
      return;
    }

    const { avatar, name, url, isAdult } = profile;

    setForm({
      avatar: {
        value: avatar,
        error: "",
      },

      name: {
        value: name,
        error: "",
      },

      url: {
        value: url,
        error: "",
      },

      isAdult: {
        value: isAdult,
        error: "",
      },
    });
  }, [userState]);

  return (
    <S.SettingsWrapper>
      {!profile?._id && <NoProfile />}

      {profile && (
        <>
          <Text type='title' pb={16}>
            Configurações do seu perfil
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

            <S.Buttons>
              <Button style='warning' size={16}>
                Excluir perfil
              </Button>

              <S.ButtonsSave>
                <Button style='secondary' size={16}>
                  Descartar alterações
                </Button>

                <Button
                  type='submit'
                  style='primary'
                  size={16}
                  disabled={isRequesting}
                >
                  Salvar alterações
                </Button>
              </S.ButtonsSave>
            </S.Buttons>
          </Form>
        </>
      )}
    </S.SettingsWrapper>
  );
};

export default SettingsProfile;
