// Dependencies
import Link from "next/Link";
import React, { useEffect, useState } from "react";

// Style
import * as s from "./style";

// Template
const UserArea = ({ user }) => {
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
    <s.Container>
      {profile && (
        <>
          <s.Avatar avatar={profile?.avatar} />

          <s.UserInfo>
            <s.UserName>{profile?.name}</s.UserName>

            <s.UserLink>
              <Link href={`/perfil/${profile.url}`}>
                <a>Ir para seu perfil</a>
              </Link>
            </s.UserLink>
          </s.UserInfo>
        </>
      )}
    </s.Container>
  );
};

export default UserArea;
