// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

// APIs
import GroupAPI from "Apis/Group";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Organisms
import GroupForm from "Components/Organisms/GroupForm";

// Templates
import AuthedTemplate from "Components/Templates/Authed";

const NewGroupTemplate = () => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

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
    link: { ...baseFormField },
    isAdult: { ...baseFormField },
    about: { ...baseFormField },
    cover: { ...baseFormField },
  };

  const [group, setGroup] = useState({});
  const [form, setForm] = useState({ ...baseForm });

  const getGroup = useCallback(async () => {
    const groupData = await GroupAPI.getGroupByUrl(url);

    if (groupData && groupData.owner === profile?._id) {
      setGroup(groupData);
    }
  }, [url, profile, GroupAPI]);

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
