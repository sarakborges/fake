// Dependencies
import { useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIS
import GroupAPI from "Apis/Group";
import ImageAPI from "Apis/Image";

// Helpers
import { slugify } from "Helpers/Functions";
import { TOASTS } from "Helpers/Constants";
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

// Style
import * as S from "./style";

// Template
const GroupForm = ({ id, form, setForm }) => {
  const router = useRouter();

  const { userDispatch, userState } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);
  const { user, profile } = userState;

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

  const handleSubmit = async () => {
    try {
      if (!form.name.value) {
        displayToast(id ? "editGroupWarning" : "createGroupWarning");
        return;
      }

      setIsRequesting(true);

      const avatarUploaded = await ImageAPI.uploadFile(form.avatar.value);
      const coverUploaded = await ImageAPI.uploadFile(form.cover.value);

      const url = slugify(form.url.value || form.name.value);

      const newGroup = {
        owner: profile._id,
        avatar: avatarUploaded.url,
        cover: coverUploaded.url,
        name: form.name.value,
        url,
        about: form.about.value,
        isAdult: form.isAdult.value,
        createdAt: new Date(),
        members: [
          {
            profile: profile._id,
            status: "member",
            joinedAt: new Date(),
          },
        ],
        moderators: [],
        relatedGroups: [],
        tags: [],
        importantLinks: [],
      };

      const newId = await GroupAPI.createGroup({
        group: { ...newGroup },
        profile: profile._id,
      });

      const newGroupData = {
        _id: newId,
        name: newGroup.name,
        url,
        avatar: newGroup.avatar,
        owner: newGroup.owner,
        moderators: newGroup.moderators,
      };

      const newProfileData = {
        ...profile,

        groups:
          profile.groups?.length > 0
            ? [...profile.groups, { ...newGroupData }]
            : [{ ...newGroupData }],
      };

      const newData = {
        user: { ...user },
        profile: { ...newProfileData },
      };

      userDispatch({
        type: "SET_USER",
        data: newData,
      });

      displayToast(id ? "editGroupSuccess" : "createGroupSuccess");

      router.push(ROUTES.GROUP.replace(":id", newGroupData.url));
    } catch (e) {
      setIsRequesting(false);
      displayToast(id ? "editGroupError" : "createGroupError");
      console.log(e);
    }
  };

  return (
    <S.FormWrapper>
      <S.FormContent>
        <Text type='title' pb={32}>
          {id ? "Configurações do seu grupo" : "Criar novo grupo"}
        </Text>

        <Form onSubmit={handleSubmit}>
          <S.Row>
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
              label='URL personalizada (Caso fique em branco, será baseado no nome)'
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

          <S.FormSave>
            <Button
              type='submit'
              style='primary'
              size={16}
              disabled={isRequesting}
            >
              Criar grupo
            </Button>
          </S.FormSave>
        </Form>
      </S.FormContent>
    </S.FormWrapper>
  );
};

export default GroupForm;
