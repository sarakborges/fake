// Dependencies
import { useContext, useEffect, useState } from "react";

// Contexts
import { UserContext } from "Contexts/User";

// Atoms
import Form from "Components/Atoms/Form";
import Button from "Components/Atoms/Button";
import Text from "Components/Atoms/Text";

// Molecules
import LabeledInput from "Components/Molecules/LabeledInput";

// Style
import * as S from "./style";

const SettingsAccount = () => {
  const { userState } = useContext(UserContext);
  const { user } = userState;

  const baseFormField = {
    value: "",
    error: "",
  };

  const [form, setForm] = useState({
    email: { ...baseFormField },
    password: { ...baseFormField },
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

  const handleSubmit = () => {};

  useEffect(() => {
    if (!user) {
      return;
    }

    const { email, password } = user;

    setForm({
      email: {
        value: email,
        error: "",
      },

      password: {
        value: password,
        error: "",
      },
    });
  }, [userState]);

  return (
    <S.SettingsWrapper>
      <Text type='title' pb={16}>
        Configurações da sua conta
      </Text>

      {user && (
        <Form onSubmit={handleSubmit}>
          <LabeledInput
            id='account-settings-email'
            placeholder='Email'
            label='Email'
            value={form.email.value}
            onChange={handleChange}
          />

          <LabeledInput
            id='account-settings-password'
            type='password'
            placeholder='Senha'
            label='Senha'
            value={form.password.value}
            onChange={handleChange}
          />

          <S.SettingsSave>
            <Button style='primary' size={16}>
              Salvar
            </Button>
          </S.SettingsSave>
        </Form>
      )}
    </S.SettingsWrapper>
  );
};

export default SettingsAccount;
