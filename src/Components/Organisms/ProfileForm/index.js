// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIS
import ProfileAPI from "Apis/Profile";
import ImageAPI from "Apis/Image";

// Helpers
import { displayToast, slugify } from "Helpers/Functions";
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
const SettingsProfile = ({ form, setForm, originalData }) => {
  const router = useRouter();
  const [valueImg, setValueImg] = useState();

  const { userState, userDispatch } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);
  const { user } = userState;

  const profiles = user?.profiles;
  const _id = originalData?._id;

  const [isRequesting, setIsRequesting] = useState(false);

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
        displayToast(TOASTS.DELETE_PROFILE, 1, appDispatch);
        return;
      }

      setIsRequesting(true);

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

      setIsRequesting(false);
      displayToast(TOASTS.DELETE_PROFILE, 0, appDispatch);
      router.push(ROUTES.HOME);
    } catch (e) {
      console.log(e);
      displayToast(TOASTS.DELETE_PROFILE, 1, appDispatch);
      setIsRequesting(false);
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

      displayToast(TOASTS.URL_EXISTS, 2, appDispatch);
      setIsRequesting(false);
      return true;
    }

    return false;
  };

  const handleSubmit = async () => {
    try {
      if (!form.name.value) {
        displayToast(_id ? "editProfileWarning" : "createProfileWarning");

        return;
      }

      setIsRequesting(true);

      const url = slugify(form.url.value || form.name.value);

      const newProfile = {
        _id,
        name: form.name.value,
        url,
        link: form.link.value,
        about: form.about.value,
        isAdult: !!form.isAdult.value,
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

      setIsRequesting(false);
      displayToast(_id ? "editProfileSuccess" : "createProfileSuccess");

      router.push(ROUTES.PROFILE.replace(":id", url));
    } catch (e) {
      setIsRequesting(false);
      displayToast(_id ? "editProfileError" : "createProfileError");
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
