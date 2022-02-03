// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
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
const GroupForm = ({ form, setForm, originalData }) => {
  const router = useRouter();
  const [valueImg, setValueImg] = useState();

  const { userState } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);
  const { profile } = userState;

  const _id = originalData?._id;

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
        displayToast("deleteGroupError");
        return;
      }

      setIsRequesting(true);

      await GroupAPI.deleteGroup({
        id: _id,
      });

      setIsRequesting(false);
      displayToast("deleteGroupSuccess");
      router.push(ROUTES.HOME);
    } catch (e) {
      console.log(e);
      displayToast("deleteGroupError");
      setIsRequesting(false);
    }
  };

  const handleClear = () => {
    getFormData();
  };

  const handleUrlError = (req) => {
    console.log(req);
    if (req?.error === "urlExists") {
      setForm({
        ...form,
        url: {
          value: form.url.value,
          error: "URL em uso",
        },
      });

      displayToast("urlExists");
      setIsRequesting(false);
      return true;
    }

    return false;
  };

  const handleSubmit = async () => {
    try {
      if (!form.name.value) {
        displayToast(_id ? "editGroupWarning" : "createGroupWarning");
        return;
      }

      setIsRequesting(true);

      const url = slugify(form.url.value || form.name.value);

      const newGroup = {
        name: form.name.value,
        url,
        link: form.link.value,
        about: form.about.value,
        isAdult: !!form.isAdult.value,
      };

      if (!_id) {
        const avatarUploaded = await ImageAPI.uploadFile(form.avatar.value);
        const coverUploaded = await ImageAPI.uploadFile(form.cover.value);

        const groupReq = await GroupAPI.createGroup({
          group: {
            ...newGroup,
            avatar: avatarUploaded.url,
            cover: coverUploaded.url,
          },
          profile: profile._id,
        });

        if (handleUrlError(groupReq)) {
          return;
        }
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

        const groupReq = await GroupAPI.updateGroup({
          ...newGroup,
          _id,
          avatar,
          cover,
        });

        if (handleUrlError(groupReq)) {
          return;
        }
      }

      displayToast(_id ? "editGroupSuccess" : "createGroupSuccess");

      router.push(ROUTES.GROUP.replace(":id", url));
    } catch (e) {
      setIsRequesting(false);
      displayToast(_id ? "editGroupError" : "createGroupError");
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
    <S.FormWrapper>
      <S.FormContent>
        <Text type='title' pb={32}>
          {_id ? "Configurações do seu grupo" : "Criar novo grupo"}
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
              Preview={
                <S.CoverPreview>
                  <div>
                    <img src={valueImg} />
                  </div>
                </S.CoverPreview>
              }
            />
          </S.Row>

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
            error={form.url.error}
            onChange={handleChange}
          />

          <LabeledInput
            id='link'
            placeholder='Insira um link para ser exibido no cabeçalho do grupo'
            label='Link'
            value={form.link.value}
            onChange={handleChange}
          />

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
            checked={form.isAdult.value}
            onChange={handleCheck}
          />

          <S.Buttons>
            <div>
              {_id && (
                <Button style='warning' size={16} onClick={handleDelete}>
                  Excluir grupo
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
                {`${_id ? "Salvar alterações" : "Criar grupo"}`}
              </Button>
            </S.ButtonsSave>
          </S.Buttons>
        </Form>
      </S.FormContent>
    </S.FormWrapper>
  );
};

export default GroupForm;
