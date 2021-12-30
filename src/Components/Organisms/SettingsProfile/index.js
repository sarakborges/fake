// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";

// APIS
import ProfileAPI from "Apis/Profile";
import UserAPI from "Apis/User";

// Helpers
import { slugify } from "Helpers/Functions";

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
import LabeledTextarea from "Components/Molecules/LabeledTextarea";
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
    cover: { ...baseFormField },
    name: { ...baseFormField },
    url: { ...baseFormField },
    isAdult: { ...baseFormField },
    link: { ...baseFormField },
    about: { ...baseFormField },
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

  const displayDeleteSuccessToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Sucesso!",
        text: "Perfil excluído com sucesso.",
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

  const displayDeleteErrorToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Erro!",
        text: "Aconteceu algum erro ao tentar excluir seu perfil. Tente novamente.",
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

  const handleDelete = async () => {
    setIsRequesting(true);
    const deleteReq = await ProfileAPI.deleteProfile(profile._id);

    if (!deleteReq) {
      displayDeleteErrorToast();
      setIsRequesting(false);
      return;
    }

    const filteredProfiles = profiles.filter(
      (item) => item._id !== profile._id
    );

    const updateReq = await UserAPI.updateUser({
      ...user,
      profiles: [...filteredProfiles],
    });

    setIsRequesting(false);

    if (!updateReq) {
      displayDeleteErrorToast();
      return;
    }

    displayDeleteSuccessToast();

    userDispatch({
      type: "SET_PROFILE",
      data: {
        profile:
          filteredProfiles.length > 0 ? { ...filteredProfiles[0] } : undefined,
        profiles: [...filteredProfiles],
      },
    });

    clearProfileData();
  };

  const handleClear = () => {
    getProfileData();
  };

  const clearProfileData = () => {
    let newObj = { ...form };

    for (let key of Object.keys(profile)) {
      newObj = {
        ...newObj,
        [key]: {
          value: "",
          error: "",
        },
      };
    }

    setForm({ ...newObj });
  };

  const getProfileData = useCallback(() => {
    let newObj = { ...form };

    for (let key of Object.keys(profile)) {
      newObj = {
        ...newObj,
        [key]: {
          value: profile[key],
          error: "",
        },
      };
    }

    setForm({ ...newObj });
  }, [profile, setForm]);

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
        cover: form.cover.value,
        name: form.name.value,
        about: form.about.value,
        link: form.link.value,
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

    getProfileData();
  }, [userState, getProfileData]);

  return (
    <S.SettingsWrapper>
      {!profile?._id && <NoProfile />}

      {profile?._id && (
        <>
          <Text type='title' pb={16}>
            Configurações do seu perfil
          </Text>

          <Form onSubmit={handleSubmit}>
            <S.Row2Items>
              <File
                id='avatar'
                placeholder='Arraste o arquivo do seu AVATAR para cá'
                placeholderHover='Solte o arquivo do seu AVATAR aqui'
                label='Avatar'
                value={form.avatar.value}
                onChange={handleChange}
              />

              <File
                id='cover'
                placeholder='Arraste o arquivo da sua CAPA para cá'
                placeholderHover='Solte o arquivo da sua CAPA aqui'
                label='Capa'
                value={form.cover.value}
                onChange={handleChange}
              />
            </S.Row2Items>

            <S.Row3Items>
              <LabeledInput
                id='name'
                placeholder='Insira o nome a ser exibido'
                label='Nome'
                value={form.name.value}
                onChange={handleChange}
              />

              <LabeledInput
                id='url'
                placeholder='Insira uma URL personalizada'
                label='URL (Caso fique em branco, será baseado no nome)'
                value={form.url.value}
                onChange={handleChange}
              />

              <LabeledInput
                id='link'
                placeholder='Insira um link para ser exibido'
                label='Link'
                value={form.link.value}
                onChange={handleChange}
              />
            </S.Row3Items>

            <LabeledTextarea
              id='about'
              placeholder='Insira o HTML do about de seu perfil'
              label='About'
              value={form.about.value}
              onChange={handleChange}
              size={120}
            />

            <Checkbox
              id='isAdult'
              label='Seu perfil possui conteúdo adulto (+18)?'
              value={form.url.value}
              onChange={handleChange}
            />

            <S.Buttons>
              <Button style='warning' size={16} onClick={handleDelete}>
                Excluir perfil
              </Button>

              <S.ButtonsSave>
                <Button style='secondary' size={16} onClick={handleClear}>
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
