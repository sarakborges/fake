// Dependencies
import { useState } from "react";
import Head from "next/head";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Organisms
import ProfileForm from "Components/Organisms/ProfileForm";

// Templates
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

const NewProfileTemplate = () => {
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
    publicTags: { ...baseFormField },
    privateTags: { ...baseFormField },
  };

  const [form, setForm] = useState({ ...baseForm });

  const getProfileData = () => {
    setForm({ ...baseForm });
  };

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - Novo perfil`}</title>
      </Head>

      <S.NewProfileWrapper>
        <S.NewProfileContent>
          <ProfileForm
            form={form}
            setForm={setForm}
            getProfileData={getProfileData}
          />
        </S.NewProfileContent>
      </S.NewProfileWrapper>
    </AuthedTemplate>
  );
};

export default NewProfileTemplate;
