// Dependencies
import { useContext, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";

// APIS
import ProfileAPI from "Apis/Profile";
import UserAPI from "Apis/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { slugify } from "Helpers/Functions";
import { ROUTES } from "Helpers/routes";

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
import LabeledTextarea from "Components/Molecules/LabeledTextarea";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const NewProfileTemplate = () => {
  const router = useRouter();

  const { userDispatch, userState } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);
  const { user } = userState;

  const baseFormField = {
    value: "",
    error: "",
  };

  const baseForm = {
    avatar: { ...baseFormField },
    cover: { ...baseFormField },
    name: { ...baseFormField },
    url: { ...baseFormField },
    about: { ...baseFormField },
    link: { ...baseFormField },
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

      const avatarUploaded = await ProfileAPI.uploadFile(form.avatar.value);
      const coverUploaded = await ProfileAPI.uploadFile(form.cover.value);

      const url = slugify(form.url.value) || slugify(form.name.value);

      const newProfile = {
        avatar: avatarUploaded.url,
        cover: coverUploaded.url,
        name: form.name.value,
        about: form.about.value,
        link: form.link.value,
        url,
        isAdult: form.isAdult.value,
        createdAt: new Date(),
        connections: [],
        groups: [],
      };

      const insertedProfile = await ProfileAPI.createProfile(newProfile);

      if (!insertedProfile) {
        setIsRequesting(false);
        displayErrorToast();
        return;
      }

      const newProfileData = {
        _id: insertedProfile,
        avatar: newProfile.avatar,
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

      router.push(ROUTES.SELECT_PROFILE);

      displaySuccessToast();

      userDispatch({
        type: "SET_NEW_PROFILE",
        data: {
          ...newProfileData,
        },
      });
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
              placeholder='Insira um texto para seu about (pode ser HTML)'
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
