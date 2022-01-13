// Dependencies
import { useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIS
import ProfileAPI from "Apis/Profile";
import UserAPI from "Apis/User";

// Helpers
import { slugify } from "Helpers/Functions";
import { ROUTES } from "Helpers/routes";

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

// Style
import * as S from "./style";

// Template
const SettingsProfile = ({ id, form, setForm, getProfileData }) => {
  const router = useRouter();

  const { userState, userDispatch } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);
  const { user, profile } = userState;
  const { profiles } = user || undefined;

  const [isRequesting, setIsRequesting] = useState(false);

  const displayToast = (toast) => {
    const toasts = {
      success: {
        title: "Sucesso!",
        text: `Perfil ${id ? "editado" : "criado"} com sucesso.`,
        type: "success",
      },

      warning: {
        title: "Cuidado!",
        text: "Todos os campos precisam ser preenchidos, antes de continuarmos.",
        type: "warning",
      },

      error: {
        title: "Erro!",
        text: `Aconteceu algum erro ao tentar ${
          id ? "editar" : "criar"
        } seu perfil. Tente novamente.`,
        type: "error",
      },

      deleteSuccess: {
        title: "Sucesso!",
        text: "Perfil excluído com sucesso.",
        type: "success",
      },

      deleteError: {
        title: "Erro!",
        text: "Aconteceu algum erro ao tentar excluir seu perfil. Tente novamente.",
        type: "error",
      },
    };

    appDispatch({
      type: "SET_TOAST",
      data: {
        ...toasts[toast],
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
    if (!id) {
      displayToast("deleteError");
      return;
    }

    setIsRequesting(true);
    const deleteReq = await ProfileAPI.deleteProfile(id);

    if (!deleteReq) {
      displayToast("deleteError");
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
      displayToast("deleteError");
      return;
    }

    displayToast("deleteSuccess");

    router.push(ROUTES.HOME);

    userDispatch({
      type: "SET_PROFILE",
      data: {
        profile: undefined,
        profiles: [...filteredProfiles],
      },
    });
  };

  const handleClear = () => {
    getProfileData();
  };

  const handleSubmit = async () => {
    try {
      if (!form.name.value) {
        displayToast("warning");

        return;
      }

      setIsRequesting(true);

      const avatarUploaded = await ProfileAPI.uploadFile(form.avatar.value);
      const coverUploaded = await ProfileAPI.uploadFile(form.cover.value);

      const url = slugify(form.url.value || form.name.value);

      const newProfile = {
        _id: id,
        avatar: avatarUploaded.url,
        cover: coverUploaded.url,
        name: form.name.value,
        about: form.about.value,
        link: form.link.value,
        url,
        isAdult: form.isAdult.value,
      };

      if (!id) {
        const newId = await ProfileAPI.createProfile({
          ...newProfile,
          createdAt: new Date(),
        });

        await UserAPI.updateUser({
          ...user,
          profiles:
            user.profiles?.length > 0
              ? [...user.profiles.map((item) => item._id), newId]
              : [newId],
        });

        userDispatch({
          type: "SET_NEW_PROFILE",
          data: { ...newProfile, _id: newId },
        });

        getProfileData();
      } else {
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
      }

      setIsRequesting(false);
      displayToast("success");
    } catch (e) {
      setIsRequesting(false);
      displayToast("error");
      console.log(e);
    }
  };

  return (
    <S.SettingsWrapper>
      <>
        <Text type='title' pb={16}>
          {id ? "Configurações do seu perfil" : "Criar novo perfil"}
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

          <S.Row2Items>
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
          </S.Row2Items>

          <LabeledInput
            id='link'
            placeholder='Insira um link para ser exibido'
            label='Link'
            value={form.link.value}
            onChange={handleChange}
          />

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
            <div>
              {id && (
                <Button style='warning' size={16} onClick={handleDelete}>
                  Excluir perfil
                </Button>
              )}
            </div>

            <S.ButtonsSave>
              {id && (
                <Button style='secondary' size={16} onClick={handleClear}>
                  Descartar alterações
                </Button>
              )}

              <Button
                type='submit'
                style='primary'
                size={16}
                disabled={isRequesting}
              >
                {id ? "Salvar alterações" : "Criar perfil"}
              </Button>
            </S.ButtonsSave>
          </S.Buttons>
        </Form>
      </>
    </S.SettingsWrapper>
  );
};

export default SettingsProfile;
