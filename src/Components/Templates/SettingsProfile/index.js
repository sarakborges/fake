// Dependencies
import { useContext, useState } from "react";
import Head from "next/head";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Organisms
import ProfileForm from "Components/Organisms/ProfileForm";

// Templates
import SettingsTemplate from "Components/Templates/Settings";

const SettingsProfileTemplate = () => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const baseFormField = {
    value: "",
    error: "",
  };

  const baseForm = {
    avatar: { ...baseFormField },
    cover: { ...baseFormField },
    name: { ...baseFormField },
    url: { ...baseFormField },
    link: { ...baseFormField },
    about: { ...baseFormField },
    isAdult: { ...baseFormField },
    publicTags: { ...baseFormField },
    privateTags: { ...baseFormField },
  };

  const [form, setForm] = useState({ ...baseForm });

  return (
    <SettingsTemplate>
      <Head>
        <title>{`${SITE_NAME} - Configurações de perfil`}</title>
      </Head>

      <ProfileForm
        form={form}
        originalData={{ ...profile }}
        setForm={setForm}
      />
    </SettingsTemplate>
  );
};

export default SettingsProfileTemplate;
