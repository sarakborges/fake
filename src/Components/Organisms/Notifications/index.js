// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { getTimeString } from "Helpers/Functions";
import { ROUTES } from "Helpers/routes";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import NoNotification from "Components/Molecules/NoNotification";
import ProfilePicture from "Components/Molecules/ProfilePicture";
import AcceptConnectionButton from "Components/Molecules/AcceptConnectionButton";
import UnconnectButton from "Components/Molecules/UnconnectButton";

// Styles
import * as S from "./style";

const Notifications = ({ displayNotifications }) => {
  const [pendingConnections, setPendingConnections] = useState([]);

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const getPendingConnections = useCallback(() => {
    if (!profile?._id) {
      return;
    }

    setPendingConnections(
      profile?.connections?.filter?.((item) => item.status === "pending") || []
    );
  }, [setPendingConnections, profile]);

  useEffect(() => {
    getPendingConnections();
  }, [getPendingConnections]);

  return (
    <S.NotificationsWrapper displayNotifications={displayNotifications}>
      {pendingConnections?.length < 1 && (
        <S.NoNotificationsWrapper>
          <NoNotification />
        </S.NoNotificationsWrapper>
      )}

      {pendingConnections?.length > 0 && (
        <>
          <Text type='custom' fw={600} pl={24} lh='48px'>
            {`Você possui ${pendingConnections?.length} ${
              pendingConnections?.length !== 1 ? "solicitações" : "solicitação"
            } de conexão:`}
          </Text>

          <S.NotificationsList>
            {pendingConnections.map((item, key) => {
              return (
                <S.NotificationsItem key={`notification-${key}`}>
                  <S.NotificationsContent>
                    <Link href={ROUTES.PROFILE.replace(":id", item.user.url)}>
                      <a>
                        <ProfilePicture avatar={item.user.avatar} size={40} />
                      </a>
                    </Link>

                    <S.NotificationText>
                      <Text>
                        <Link
                          href={ROUTES.PROFILE.replace(":id", item.user.url)}
                        >
                          <a>
                            {item.user.name} (@{item.user.url})
                          </a>
                        </Link>{" "}
                        deseja conectar-se.
                      </Text>
                    </S.NotificationText>
                  </S.NotificationsContent>

                  <S.NotificationActions>
                    <div>
                      <Text type='custom' fs={12}>
                        {getTimeString(item.connectedAt)}
                      </Text>
                    </div>

                    <S.NotificationsButtons>
                      <AcceptConnectionButton profileId={item.user._id}>
                        Aceitar
                      </AcceptConnectionButton>

                      <UnconnectButton profileId={item.user._id}>
                        Recusar
                      </UnconnectButton>
                    </S.NotificationsButtons>
                  </S.NotificationActions>
                </S.NotificationsItem>
              );
            })}
          </S.NotificationsList>
        </>
      )}
    </S.NotificationsWrapper>
  );
};

export default Notifications;
