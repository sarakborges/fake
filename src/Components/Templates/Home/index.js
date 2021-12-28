// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

// APIs
import ProfileAPI from "Apis/Profile";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Atoms
import Button from "Components/Atoms/Button";
import Textarea from "Components/Atoms/Textarea";
import Rightbar from "Components/Atoms/Rightbar";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";
import NoProfile from "Components/Molecules/NoProfile";

// Organisms
import RoundList from "Components/Organisms/RoundList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";

// Template
const HomeTemplate = () => {
  const [profileData, setProfileData] = useState();

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const getProfileData = useCallback(async () => {
    if (!profile?._id) {
      return;
    }

    const profileReq = await ProfileAPI.getProfileById(profile._id);
    setProfileData(profileReq);
  }, [profile, ProfileAPI]);

  useEffect(() => {
    getProfileData();
  }, [profile, getProfileData]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Home</title>
      </Head>

      {!profile?._id && <NoProfile />}

      {profileData && (
        <S.HomeWrapper>
          <S.FeedWrapper>
            <S.NewFeedItem>
              <Textarea
                id='new-feed-item'
                size={120}
                placeholder='Faça uma nova publicação'
              />
            </S.NewFeedItem>

            <S.FeedItem>
              <S.FeedItemHeader>
                <div>
                  <Link href='#'>
                    <a>
                      <InfoArea
                        side='left'
                        info={{
                          name: "Yogg'Sara",
                          url: "yogg-sara",
                          avatar: `http://pm1.narvii.com/6280/2d5ef40edeab7884d64508563b7cb0d5b6321595_00.jpg`,
                        }}
                      />
                    </a>
                  </Link>
                </div>

                <Button style='transparent' size={16}>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </Button>
              </S.FeedItemHeader>

              <S.FeedItemTime>1 hora atrás</S.FeedItemTime>

              <S.FeedItemContent>
                <img
                  src={`https://i.pinimg.com/originals/bc/7f/ff/bc7fff0f4fec8297bf46ae5fb5c52f9f.jpg`}
                />
              </S.FeedItemContent>

              <div>1289 curtidas - 156 comentários</div>
            </S.FeedItem>
          </S.FeedWrapper>

          <Rightbar>
            <RoundList
              type='profile'
              title='Suas conexões'
              emptyTitle='Você ainda não possui conexões'
              extraItemLink={ROUTES.CONNECTIONS}
              list={profileData?.connections?.slice?.(0, 5)}
            />

            <RoundList
              type='group'
              title='Seus grupos'
              emptyTitle='Você ainda não participa de grupos'
              extraItemLink={ROUTES.GROUPS}
              list={profileData?.groups?.slice?.(0, 5)}
            />
          </Rightbar>
        </S.HomeWrapper>
      )}
    </AuthedTemplate>
  );
};

export default HomeTemplate;
