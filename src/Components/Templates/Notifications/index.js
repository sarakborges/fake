// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

// APIs
import ProfileAPI from "Apis/Profile";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { getTimeString } from "Helpers/Functions";

// Atoms
import Text from "Components/Atoms/Text";
import Avatar from "Components/Atoms/Avatar";
import Button from "Components/Atoms/Button";

// Molecules
import NoProfile from "Components/Molecules/NoProfile";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";

// Template
const NotificationsTemplate = () => {
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

  const getPendingConnections = () => {
    return profileData?.connections?.filter?.((item) => {
      if (item.status === "pending") {
        return item;
      } else {
        return false;
      }
    });
  };

  const getNotifications = () => {
    return [
      ...getPendingConnections().map((item) => {
        return { connectionRequest: { ...item } };
      }),
    ];
  };

  useEffect(() => {
    getProfileData();
  }, [profile, getProfileData]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Notificações</title>
      </Head>

      {!profile?._id && <NoProfile />}

      {profileData && (
        <S.NotificationsWrapper>
          {getNotifications()?.length > 0 && (
            <>
              <Text type='pagetitle'>Suas notificações</Text>

              <S.NotificationsList>
                {getNotifications().map((item, key) => {
                  return (
                    <S.NotificationsItem key={`notification-${key}`}>
                      {item.connectionRequest && (
                        <>
                          <Avatar
                            img={item.connectionRequest.user.avatar}
                            size={48}
                            bgColor='main'
                          />

                          <S.NotificationText>
                            <Text>
                              <b>{item.connectionRequest.user.name}</b> enviou
                              uma solicitação de conexão.
                            </Text>

                            <Text pt={4}>
                              {getTimeString(
                                item.connectionRequest.connectedAt
                              )}
                            </Text>
                          </S.NotificationText>

                          <S.NotificationActions>
                            <Button style='success-secondary' size={16}>
                              <FontAwesomeIcon icon={faCheckCircle} />
                              Aceitar
                            </Button>

                            <Button style='warning-secondary' size={16}>
                              <FontAwesomeIcon icon={faTimesCircle} />
                              Recusar
                            </Button>
                          </S.NotificationActions>
                        </>
                      )}
                    </S.NotificationsItem>
                  );
                })}
              </S.NotificationsList>
            </>
          )}
        </S.NotificationsWrapper>
      )}
    </AuthedTemplate>
  );
};

export default NotificationsTemplate;
