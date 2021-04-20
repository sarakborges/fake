// Dependencies
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";

// Template Wrapper
import AuthedTemplate from "Templates/Authed";

// Helpers
import { SITE_NAME } from "Helpers/constants";

// Contexts
import { UserContext } from "Contexts/User";

// Template
const HomeTemplate = () => {
  const { userState } = useContext(UserContext);
  const { user } = userState;

  const [profile, setProfile] = useState(undefined);

  useEffect(() => {
    const findProfile = user?.profiles?.find(
      (profile) => profile.id === user?.activeProfile
    );

    if (findProfile) {
      setProfile(findProfile);
    }
  }, [user]);

  return (
    <AuthedTemplate>
      <Head>
        <title>
          Perfil de {profile?.name} (@{profile?.url}) - {SITE_NAME}
        </title>
      </Head>
    </AuthedTemplate>
  );
};

export default HomeTemplate;
