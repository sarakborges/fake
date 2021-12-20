// Dependencies
import { useContext, useEffect, useState } from "react";

// APIS
import ProfileAPI from "Apis/Profile";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Atoms
import Form from "Components/Atoms/Form";
import Checkbox from "Components/Atoms/Checkbox";
import Avatar from "Components/Atoms/Avatar";
import Button from "Components/Atoms/Button";

// Molecules
import LabeledInput from "Components/Molecules/LabeledInput";

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

  const [form, setForm] = useState({
    avatar: { ...baseFormField },
    name: { ...baseFormField },
    url: { ...baseFormField },
    isAdult: { ...baseFormField },
  });

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.currentTarget.name]: {
        value: e.currentTarget.value,
        error: "",
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const newProfile = {
        ...profile,
        avatar: form.avatar.value,
        name: form.name.value,
        url: form.url.value,
        isAdult: form.isAdult.value,
      };

      await ProfileAPI.updateProfile({
        ...newProfile,
        connections: [...newProfile.connections.map((item) => item._id)],
        groups: [...newProfile.groups.map((item) => item._id)],
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

      const newToast = {
        title: "Sucesso!",
        text: "Seu perfil foi editado com sucesso.",
        type: "success",
      };

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...newToast,
          isVisible: true,
        },
      });

      setTimeout(() => {
        appDispatch({
          type: "TOGGLE_TOAST",
          data: false,
        });
      }, 5000);
    } catch (e) {
      const newToast = {
        title: "Erro!",
        text: "Aconteceu algum erro ao tentar editar seu perfil. Tente novamente.",
        type: "error",
      };

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...newToast,
          isVisible: true,
        },
      });

      setTimeout(() => {
        appDispatch({
          type: "TOGGLE_TOAST",
          data: false,
        });
      }, 5000);
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
      <h2>Configurações do seu perfil</h2>

      {profile && (
        <Form onSubmit={handleSubmit}>
          <S.AvatarItem>
            <Avatar img={form.avatar.value} size={128} />

            <S.AvatarInput>
              <LabeledInput
                id='avatar'
                placeholder='Avatar'
                label='Avatar'
                value={form.avatar.value}
                onChange={handleChange}
              />
            </S.AvatarInput>
          </S.AvatarItem>

          <LabeledInput
            id='name'
            placeholder='Nome'
            label='Nome'
            value={form.name.value}
            onChange={handleChange}
          />

          <LabeledInput
            id='url'
            placeholder='URL'
            label='URL'
            value={form.url.value}
            onChange={handleChange}
          />

          <Checkbox
            id='isAdult'
            label='Possui conteúdo adulto (+18)?'
            value={form.url.value}
            onChange={handleChange}
          />

          <S.SettingsSave>
            <Button type='submit' style='primary' size={16}>
              Salvar
            </Button>
          </S.SettingsSave>
        </Form>
      )}
    </S.SettingsWrapper>
  );
};

export default SettingsProfile;
