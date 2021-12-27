// Dependencies
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faLink,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

// APIs
import ProfileAPI from "Apis/Profile";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Atoms
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

// Organisms
import ProfileHeader from "Components/Organisms/ProfileHeader";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const ProfileTemplate = () => {
  const [profile, setProfile] = useState();

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getProfile = useCallback(
    async (profileUrl) => {
      const profileData = await ProfileAPI.getProfileByUrl(profileUrl);

      if (profileData) {
        setProfile(profileData);
      }
    },
    [ProfileAPI]
  );

  useEffect(() => {
    getProfile(url);
  }, [url, getProfile]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - ${profile?.name || "Perfil"}`}</title>
      </Head>

      {profile && (
        <>
          <ProfileHeader profile={profile} />

          <S.ProfileBody>
            <S.About>
              <div dangerouslySetInnerHTML={{ __html: profile.about }} />
            </S.About>

            <S.RightBar>
              {profile?.connections?.length > 0 && (
                <div>
                  <S.RightBarTitle>Conexões</S.RightBarTitle>

                  <S.BubbleList>
                    {profile?.connections?.slice(0, 5).map((item) => {
                      return (
                        <Link
                          key={item._id}
                          href={ROUTES.PROFILE.replace(":id", item.url)}
                        >
                          <a>
                            {item.avatar ? (
                              <Avatar img={item.avatar} size={40} />
                            ) : (
                              <RoundIcon
                                icon={faQuestion}
                                size={40}
                                bgColor='main'
                              />
                            )}
                          </a>
                        </Link>
                      );
                    })}

                    <Link
                      href={ROUTES.GROUP_MEMBERS.MEMBERS.replace(
                        ":id",
                        profile.url
                      )}
                    >
                      <a>
                        <RoundIcon
                          icon={faEllipsisH}
                          size={40}
                          bgColor='main'
                        />
                      </a>
                    </Link>
                  </S.BubbleList>
                </div>
              )}

              {profile?.groups?.length > 0 && (
                <div>
                  <S.RightBarTitle>Grupos</S.RightBarTitle>

                  <S.BubbleList>
                    {profile.groups.slice(0, 5).map((item) => {
                      return (
                        <Link
                          key={item._id}
                          href={ROUTES.GROUP.replace(":id", item.url)}
                        >
                          <a>
                            <Avatar img={item.avatar} size={48} />
                          </a>
                        </Link>
                      );
                    })}
                  </S.BubbleList>
                </div>
              )}

              {profile?.tags?.length > 0 && (
                <div>
                  <S.RightBarTitle>Tags</S.RightBarTitle>

                  <S.TextList>
                    {profile.tags.map((item) => {
                      return (
                        <a
                          key={item}
                          href={`${ROUTES.GROUP.replace(
                            ":id",
                            profile.url
                          )}/tags/${item}`}
                          target='_blank'
                        >
                          {item}
                        </a>
                      );
                    })}
                  </S.TextList>
                </div>
              )}
            </S.RightBar>
          </S.ProfileBody>
        </>
      )}
    </AuthedTemplate>
  );
};

export default ProfileTemplate;
