// Dependencies
import { useContext, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";

// APIS
import GroupAPI from "Apis/Group";
import ProfileAPI from "Apis/Profile";

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
  const { user, profile } = userState;

  const baseFormField = {
    value: "",
    error: "",
  };

  const baseForm = {
    avatar: { ...baseFormField },
    name: { ...baseFormField },
    url: { ...baseFormField },
    isAdult: { ...baseFormField },
    about: { ...baseFormField },
    cover: { ...baseFormField },
  };

  const [form, setForm] = useState({ ...baseForm });
  const [isRequesting, setIsRequesting] = useState(false);

  const displaySuccessToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Sucesso!",
        text: "Grupo criado com sucesso.",
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
        text: "Aconteceu algum erro ao tentar criar o grupo. Tente novamente.",
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

      const url = slugify(form.url.value || form.name.value);

      const newGroup = {
        owner: profile._id,
        avatar: form.avatar.value,
        cover: form.cover.value,
        name: form.name.value,
        url,
        about: form.about.value,
        isAdult: form.isAdult.value,
        createdAt: new Date(),
        members: [
          {
            _id: profile._id,
            avatar: profile.avatar,
            name: profile.name,
            url: profile.url,
          },
        ],
        moderators: [],
        relatedGroups: [],
        tags: [],
        importantLinks: [],
      };

      setIsRequesting(true);

      const newId = await GroupAPI.createGroup(newGroup);

      if (!newId) {
        return;
      }

      const newGroupData = {
        _id: newId,
        name: newGroup.name,
        url,
        avatar: newGroup.avatar,
        owner: newGroup.owner,
        moderators: newGroup.moderators,
      };

      await ProfileAPI.updateProfile({
        ...profile,
        groups:
          profile.groups?.length > 0
            ? [...profile.groups, { ...newGroupData }]
            : [{ ...newGroupData }],
      });

      setForm({ ...baseForm });

      const newProfileData = {
        ...profile,

        groups:
          profile.groups?.length > 0
            ? [...profile.groups, { ...newGroupData }]
            : [{ ...newGroupData }],
      };

      const newData = {
        user: {
          ...user,

          profiles: [
            ...user.profiles.map((item) => {
              if (item._id === profile._id) {
                return { ...newProfileData };
              } else {
                return item;
              }
            }),
          ],
        },

        profile: { ...newProfileData },
      };

      userDispatch({
        type: "SET_USER",
        data: newData,
      });

      displaySuccessToast();

      router.push(ROUTES.GROUP.replace(":id", newGroupData.url));
    } catch (e) {
      setIsRequesting(false);
      displayErrorToast();
      console.log(e);
    }
  };

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - Novo grupo`}</title>
      </Head>

      <S.NewGroupWrapper>
        <S.NewGroupContent>
          <Text type='title' pb={32}>
            Novo grupo
          </Text>

          <Form onSubmit={handleSubmit}>
            <S.Row>
              <File
                id='avatar'
                label='Avatar'
                value={form.avatar.value}
                onChange={handleChange}
              />

              <File
                id='cover'
                label='Capa'
                value={form.cover.value}
                onChange={handleChange}
              />
            </S.Row>

            <S.Row>
              <LabeledInput
                id='name'
                placeholder='Insira o nome do grupo'
                label='Nome'
                value={form.name.value}
                onChange={handleChange}
              />

              <LabeledInput
                id='url'
                placeholder='Insira uma URL personalizada para o grupo'
                label='URL (Caso fique em branco, será baseado no nome)'
                value={form.url.value}
                onChange={handleChange}
              />
            </S.Row>

            <LabeledTextarea
              id='about'
              placeholder='Insira o HTML do about de seu grupo'
              label='About'
              value={form.about.value}
              onChange={handleChange}
              size={120}
            />

            <Checkbox
              id='isAdult'
              label='O grupo possui conteúdo adulto (+18)?'
              value={form.url.value}
              onChange={handleChange}
            />

            <S.NewGroupSave>
              <Button
                type='submit'
                style='primary'
                size={16}
                disabled={isRequesting}
              >
                Criar grupo
              </Button>
            </S.NewGroupSave>
          </Form>
        </S.NewGroupContent>
      </S.NewGroupWrapper>
    </AuthedTemplate>
  );
};

export default NewProfileTemplate;
