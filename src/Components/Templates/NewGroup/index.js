// Dependencies
import { useState } from "react";
import Head from "next/head";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Organisms
import GroupForm from "Components/Organisms/GroupForm";

// Templates
import AuthedTemplate from "Components/Templates/Authed";

const NewProfileTemplate = () => {
  const baseFormField = {
    value: "",
    error: "",
  };

  const baseForm = {
    avatar: { ...baseFormField },
    name: { ...baseFormField },
    link: { ...baseFormField },
    url: { ...baseFormField },
    isAdult: { ...baseFormField },
    about: { ...baseFormField },
    cover: { ...baseFormField },
  };

  const [form, setForm] = useState({ ...baseForm });

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - Novo grupo`}</title>
      </Head>

      <GroupForm form={form} setForm={setForm} />
    </AuthedTemplate>
  );
};

export default NewProfileTemplate;
