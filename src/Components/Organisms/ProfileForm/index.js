// Dependencies
import { useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIS
import ProfileAPI from "Apis/Profile";
import ImageAPI from "Apis/Image";

// Helpers
import { slugify } from "Helpers/Functions";
import { TOASTS } from "Helpers/Constants";
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
    appDispatch({
      type: "SET_TOAST",
      data: {
        ...TOASTS[toast],
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
    try {
      if (!id) {
        displayToast("deleteProfileError");
        return;
      }

      setIsRequesting(true);

      await ProfileAPI.deleteProfile({
        user: user._id,
        profile: profile._id,
      });

      const filteredProfiles = profiles.filter(
        (item) => item._id !== profile._id
      );

      userDispatch({
        type: "SET_PROFILE",
        data: {
          profile: undefined,
          profiles: [...filteredProfiles],
        },
      });

      setIsRequesting(false);
      displayToast("deleteProfileSuccess");
      router.push(ROUTES.HOME);
    } catch (e) {
      console.log(e);
      displayToast("deleteProfileError");
      setIsRequesting(false);
    }
  };

  const handleClear = () => {
    getProfileData();
  };

  const handleSubmit = async () => {
    try {
      if (!form.name.value) {
        displayToast(id ? "editProfileWarning" : "createProfileWarning");

        return;
      }

      setIsRequesting(true);

      const avatarUploaded = await ImageAPI.uploadFile(form.avatar.value);
      const coverUploaded = await ImageAPI.uploadFile(form.cover.value);

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
          profile: {
            ...newProfile,
            createdAt: new Date(),
          },

          user: user._id,
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
      displayToast(id ? "editProfileSuccess" : "createProfileSuccess");
    } catch (e) {
      setIsRequesting(false);
      displayToast(id ? "editProfileError" : "createProfileError");
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
              label='URL personalizada (Caso fique em branco, será baseado no nome)'
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
