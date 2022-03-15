// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIS
import ProfileAPI from "Apis/Profile";
import ImageAPI from "Apis/Image";

// Helpers
import { slugify } from "Helpers/Functions";
import { TOASTS, TOAST_TYPES } from "Helpers/Constants";
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
import TagsForm from "Components/Molecules/TagsForm";

// Style
import * as S from "./style";

const SettingsProfile = ({ form, setForm, originalData }) => {
  const router = useRouter();
  const [valueImg, setValueImg] = useState();

  const { userState, userDispatch } = useContext(UserContext);
  const { user } = userState;

  const { appState, appDispatch } = useContext(AppContext);
  const { isRequesting } = appState;

  const profiles = user?.profiles;
  const _id = originalData?._id;

  const getFormData = useCallback(() => {
    if (!_id) {
      return;
    }

    let newObj = { ...form };

    for (let key of Object.keys(form)) {
      newObj = {
        ...newObj,
        [key]: {
          value: originalData[key] || "",
          error: "",
        },
      };
    }

    setForm({ ...newObj });
  }, [_id, setForm]);

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

  const handleCheck = (e) => {
    const tar = e.currentTarget;

    setForm({
      ...form,

      [tar.name]: {
        value: !form[tar.name].value,
        error: "",
      },
    });
  };

  const handleDelete = async () => {
    try {
      if (!_id) {
        appDispatch({
          type: "SET_TOAST",
          data: {
            ...TOAST_TYPES.error,
            text: TOASTS.DELETE_PROFILE.error,
            isVisible: true,
          },
        });

        return;
      }

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: true,
      });

      await ProfileAPI.deleteProfile({
        user: user._id,
        profile: originalData._id,
      });

      const filteredProfiles = profiles.filter(
        (item) => item._id !== originalData._id
      );

      userDispatch({
        type: "SET_PROFILE",
        data: {
          profile: undefined,
          profiles: [...filteredProfiles],
        },
      });

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...TOAST_TYPES.success,
          text: TOASTS.DELETE_PROFILE.success,
          isVisible: true,
        },
      });

      router.push(ROUTES.HOME);
    } catch (e) {
      console.log(e);

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...TOAST_TYPES.error,
          text: TOASTS.DELETE_PROFILE.error,
          isVisible: true,
        },
      });

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });
    }
  };

  const handleClear = () => {
    getFormData();
  };

  const handleUrlError = (req) => {
    if (req?.error === "urlExists") {
      setForm({
        ...form,
        url: {
          value: form.url.value,
          error: "URL em uso",
        },
      });

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...TOAST_TYPES.warning,
          text: TOASTS.URL_EXISTS.warning,
          isVisible: true,
        },
      });

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      return true;
    }

    return false;
  };

  const handleNewTags = (newTags, type) => {
    setForm({
      ...form,
      [`${type}Tags`]: {
        value: [...newTags],
        error: "",
      },
    });
  };

  const handleSubmit = async () => {
    try {
      if (!form.name.value) {
        appDispatch({
          type: "SET_TOAST",
          data: {
            ...TOAST_TYPES.warning,
            text: _id
              ? TOASTS.EDIT_PROFILE.warning
              : TOASTS.CREATE_PROFILE.warning,
            isVisible: true,
          },
        });

        return;
      }

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: true,
      });

      const url = slugify(form.url.value || form.name.value);

      const newProfile = {
        _id,
        name: form.name.value,
        url,
        link: form.link.value,
        about: form.about.value,
        isAdult: !!form.isAdult.value,
        publicTags: form.publicTags.value,
        privateTags: form.privateTags.value,
      };

      if (!_id) {
        const avatarUploaded = await ImageAPI.uploadFile(form.avatar.value);
        const coverUploaded = await ImageAPI.uploadFile(form.cover.value);

        const profileReq = await ProfileAPI.createProfile({
          profile: {
            ...newProfile,
            avatar: avatarUploaded.url,
            cover: coverUploaded.url,
            createdAt: new Date(),
          },

          user: user._id,
        });

        if (handleUrlError(profileReq)) {
          return;
        }

        userDispatch({
          type: "SET_NEW_PROFILE",
          data: { ...newProfile, _id: profileReq },
        });
      } else {
        let avatar = originalData.avatar;
        let cover = originalData.cover;

        if (originalData.avatar !== form.avatar.value) {
          const avatarUploaded = await ImageAPI.uploadFile(form.avatar.value);
          avatar = avatarUploaded.url;
        }

        if (originalData.cover !== form.cover.value) {
          const coverUploaded = await ImageAPI.uploadFile(form.cover.value);
          cover = coverUploaded.url;
        }

        const profileReq = await ProfileAPI.updateProfile({
          ...newProfile,
          avatar,
          cover,
        });

        if (handleUrlError(profileReq)) {
          return;
        }

        userDispatch({
          type: "SET_PROFILE",
          data: {
            profile: { ...newProfile },
            profiles: [
              ...profiles.map((item) =>
                item._id === originalData._id ? newProfile : item
              ),
            ],
          },
        });
      }

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...TOAST_TYPES.success,
          text: _id
            ? TOASTS.EDIT_PROFILE.success
            : TOASTS.CREATE_PROFILE.success,
          isVisible: true,
        },
      });

      router.push(ROUTES.PROFILE.replace(":id", url));
    } catch (e) {
      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...TOAST_TYPES.error,
          text: _id ? TOASTS.EDIT_PROFILE.error : TOASTS.CREATE_PROFILE.error,
          isVisible: true,
        },
      });

      console.log(e);
    }
  };

  useEffect(() => {
    setValueImg(
      form?.cover?.value?.name
        ? URL.createObjectURL(form?.cover?.value)
        : form?.cover?.value
    );
  }, [form]);

  useEffect(() => {
    getFormData();
  }, [getFormData]);

  return (
    <S.SettingsWrapper>
      <>
        <Text type='title' pb={16}>
          {_id ? "Configurações do seu perfil" : "Criar novo perfil"}
        </Text>

        <Form onSubmit={handleSubmit}>
          <S.Row2Items>
            <File
              id='avatar'
              placeholder='Arraste o arquivo da sua foto para cá'
              placeholderHover='Solte o arquivo da sua foto aqui'
              label='Foto'
              value={form.avatar.value}
              onChange={handleChange}
            />

            <File
              id='cover'
              placeholder='Arraste o arquivo da sua imagem de fundo para cá'
              placeholderHover='Solte o arquivo da sua imagem de fundo aqui'
              label='Imagem de fundo'
              value={form.cover.value}
              onChange={handleChange}
              Preview={
                <S.CoverPreview>
                  <div>
                    <img src={valueImg} />
                  </div>
                </S.CoverPreview>
              }
            />
          </S.Row2Items>

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
            error={form.url.error}
            onChange={handleChange}
          />

          <LabeledInput
            id='link'
            placeholder='Insira um link para ser exibido no cabeçalho do perfil'
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

          <TagsForm
            title='Tags privadas (Só você pode ver)'
            tags={form.privateTags.value}
            setTags={handleNewTags}
            type='private'
          />

          <TagsForm
            title='Tags públicas (Todos podem ver)'
            tags={form.publicTags.value}
            setTags={handleNewTags}
            type='public'
          />

          <Checkbox
            id='isAdult'
            label='Seu perfil possui conteúdo adulto (+18)?'
            checked={form.isAdult.value}
            onChange={handleCheck}
          />

          <S.Buttons>
            <div>
              {_id && (
                <Button style='warning' size={16} onClick={handleDelete}>
                  Excluir perfil
                </Button>
              )}
            </div>

            <S.ButtonsSave>
              {_id && (
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
                {_id ? "Salvar alterações" : "Criar perfil"}
              </Button>
            </S.ButtonsSave>
          </S.Buttons>
        </Form>
      </>
    </S.SettingsWrapper>
  );
};

export default SettingsProfile;
