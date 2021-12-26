// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faQuestion } from "@fortawesome/free-solid-svg-icons";

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
import Text from "Components/Atoms/Text";
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

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

        <S.RightBar>
          <div>
            <S.RightBarTitle>Suas conexões</S.RightBarTitle>

            {profileData?.connections?.length ? (
              <S.BubbleList>
                {profileData.connections.slice(0, 5).map((item) => {
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

                <Link href={ROUTES.CONNECTIONS}>
                  <a>
                    <RoundIcon icon={faEllipsisH} size={40} bgColor='main' />
                  </a>
                </Link>
              </S.BubbleList>
            ) : (
              <S.RightBarNoItems>
                <Text>Você ainda não possui conexões</Text>
              </S.RightBarNoItems>
            )}
          </div>

          <div>
            <S.RightBarTitle>Seus grupos</S.RightBarTitle>

            {profileData?.groups?.length ? (
              <S.BubbleList>
                {profileData.groups.slice(0, 5).map((item) => {
                  return (
                    <Link
                      key={item._id}
                      href={ROUTES.GROUP.replace(":id", item.url)}
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

                <Link href={ROUTES.GROUPS}>
                  <a>
                    <RoundIcon icon={faEllipsisH} size={40} bgColor='main' />
                  </a>
                </Link>
              </S.BubbleList>
            ) : (
              <S.RightBarNoItems>
                <Text>Você ainda não participa de grupos</Text>
              </S.RightBarNoItems>
            )}
          </div>
        </S.RightBar>
      </S.HomeWrapper>
    </AuthedTemplate>
  );
};

export default HomeTemplate;
