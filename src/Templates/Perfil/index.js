// Dependencies
import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

// APIs
import UserAPI from "Apis/User";

// Template Wrapper
import AuthedTemplate from "Templates/Authed";

// Helpers
import { SITE_NAME } from "Helpers/constants";

// Components
import ProfileHead from "Components/ProfileHead";

// Styles
import * as s from "./style";

// Template
const PerfilTemplate = () => {
  const router = useRouter();
  const { id } = router.query;

  const [profile, setProfile] = useState(undefined);

  useEffect(() => {
    const findProfile = UserAPI.getProfile(id);

    if (findProfile) {
      setProfile(findProfile);
    }
  }, [id]);

  return (
    <AuthedTemplate>
      <Head>
        <title>
          {profile
            ? `Perfil de ${profile.name} (@${profile.url}) - ${SITE_NAME}`
            : `Perfil não encontrado - ${SITE_NAME}`}
        </title>
      </Head>

      {profile ? (
        <s.Container>
          <ProfileHead profile={profile} />
        </s.Container>
      ) : (
        <>Não encontrado</>
      )}
    </AuthedTemplate>
  );
};

export default PerfilTemplate;
