// Dependencies
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

// APIs
import GroupAPI from "Apis/Group";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Organisms
import GroupForm from "Components/Organisms/GroupForm";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Template
const NewGroupTemplate = () => {
  const router = useRouter();
  const {
    query: { url },
  } = router;

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

  const [group, setGroup] = useState({});
  const [form, setForm] = useState({ ...baseForm });

  const getGroup = useCallback(async () => {
    const groupData = await GroupAPI.getGroupByUrl(url);

    if (groupData) {
      setGroup(groupData);
    }
  }, [url, GroupAPI]);

  useEffect(() => {
    getGroup();
  }, [getGroup]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - Editar grupo`}</title>
      </Head>

      <GroupForm originalData={{ ...group }} form={form} setForm={setForm} />
    </AuthedTemplate>
  );
};

export default NewGroupTemplate;
