// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import Head from "next/head";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Organisms
import ProfileForm from "Components/Organisms/ProfileForm";

// Template
import SettingsTemplate from "Components/Templates/Settings";

// Template
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
    isAdult: { ...baseFormField },
    link: { ...baseFormField },
    about: { ...baseFormField },
  };

  const [form, setForm] = useState({ ...baseForm });

  const getProfileData = useCallback(() => {
    let newObj = { ...form };

    for (let key of Object.keys(form)) {
      newObj = {
        ...newObj,
        [key]: {
          value: profile[key],
          error: "",
        },
      };
    }

    setForm({ ...newObj });
  }, [profile, setForm]);

  useEffect(() => {
    if (!profile) {
      return;
    }

    getProfileData();
  }, [userState, getProfileData]);

  return (
    <SettingsTemplate>
      <Head>
        <title>{`${SITE_NAME} - Configurações de perfil`}</title>
      </Head>

      <ProfileForm
        form={form}
        id={profile?._id}
        setForm={setForm}
        getProfileData={getProfileData}
      />
    </SettingsTemplate>
  );
};

export default SettingsProfileTemplate;
