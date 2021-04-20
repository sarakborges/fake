// Dependencies
import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

// APIs
import UserAPI from "Apis/User";

// Template Wrapper
import AuthedTemplate from "Templates/Authed";

// Helpers
import { SITE_NAME } from "Helpers/constants";

// Components
import Button from "Components/Form/Button";

// Styles
import * as s from "./style";

// Template
const PerfilTemplate = () => {
  const router = useRouter();
  const { id } = router.query;

  const [profile, setProfile] = useState(undefined);

  const headButtonStyle = {
    padding: "0 15px",
    marginLeft: "15px",
    height: "40px",
  };

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
          <s.ProfileHead>
            <s.HeadAvatar avatar={profile.avatar} />

            <s.HeadInfo>
              <s.HeadTitle>
                <s.HeadName>{profile.name}</s.HeadName>

                <s.HeadButtons>
                  <Button customStyle={headButtonStyle}>Enviar mensagem</Button>
                  <Button customStyle={headButtonStyle}>Seguir</Button>
                  <Button customStyle={headButtonStyle}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </Button>
                </s.HeadButtons>
              </s.HeadTitle>

              <s.HeadAt>@{profile.url}</s.HeadAt>

              <s.HeadStatus>
                <s.HeadStatusItem>
                  <span>{Math.floor(Math.random() * 10000)}</span> publicações
                </s.HeadStatusItem>

                <s.HeadStatusItem>
                  <span>{Math.floor(Math.random() * 10000)}</span> seguidores
                </s.HeadStatusItem>

                <s.HeadStatusItem>
                  <span>{Math.floor(Math.random() * 10000)}</span> seguindo
                </s.HeadStatusItem>
              </s.HeadStatus>
            </s.HeadInfo>
          </s.ProfileHead>
        </s.Container>
      ) : (
        <>Não encontrado</>
      )}
    </AuthedTemplate>
  );
};

export default PerfilTemplate;
