// Dependencies
import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import MessageAPI from "Apis/Message";
import ProfileAPI from "Apis/Profile";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Contexts
import { UserContext } from "Contexts/User";
import { ProfileContext } from "Contexts/Profile";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import InfoNotFound from "Components/Molecules/InfoNotFound";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
import ChatMessages from "Components/Organisms/ChatMessages";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const ProfileTemplate = ({ children }) => {
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState("");

  const { profileState, profileDispatch } = useContext(ProfileContext);

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getProfile = useCallback(async () => {
    const profileReq = await ProfileAPI.getProfileByUrl(url);

    if (profileReq) {
      profileDispatch({
        type: "SET_PROFILE",
        data: profileReq,
      });
    }
  }, [url, ProfileAPI]);

  const handleSubmit = async () => {
    try {
      const sentProfile = messages?.profileData?._id;

      if (!sentProfile) {
        return;
      }

      await MessageAPI.sendMessage({
        users: [profileState._id, sentProfile],
        message: newMessage,
        sender: profileState._id,
      });

      setNewMessage("");

      await getMessages();
    } catch (e) {
      console.log(e);
    }
  };

  const getMessages = useCallback(async () => {
    if (!profileState?._id || !profile?._id || !url) {
      return;
    }

    const messagesReq = await MessageAPI.getMessages([
      profile._id,
      profileState._id,
    ]);

    setMessages(messagesReq);
  }, [profileState, profile, url, MessageAPI]);

  useEffect(() => {
    getMessages();
  }, [url, getMessages]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - ${profileState?.name || "Perfil"}`}</title>
      </Head>

      {(!profileState?._id ||
        profileState?.blockedUsers?.includes?.(profile?._id)) && (
        <InfoNotFound type='profile' />
      )}

      {profileState?._id &&
        !profileState?.blockedUsers?.includes?.(profile?._id) && (
          <S.ProfileWrapper bg={profileState.cover}>
            <S.ProfileContent bg={!!profileState.cover}>
              <S.ProfileBody>
                <S.ProfileLeft>
                  <InfoHeader
                    info={profileState}
                    type='profile'
                    // setInfo={setProfileData}
                  />

                  {children}
                </S.ProfileLeft>

                <S.ProfileRight>
                  <S.ChatWrapper>
                    {!profileState.isPrivate ||
                    profileState.connections
                      .filter((item) => item.status === "connected")
                      .map((item) => item.user._id)
                      .includes(profile?._id) ? (
                      <ChatMessages
                        messages={messages}
                        handleSubmit={handleSubmit}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                      />
                    ) : (
                      <S.NoChatWrapper>
                        <Text
                          type='custom'
                          ta='center'
                          fs={16}
                          fw={600}
                          lh={1.4}
                        >
                          {`Apenas conexões podem enviar mensagens para ${profileState.name}`}
                        </Text>
                      </S.NoChatWrapper>
                    )}
                  </S.ChatWrapper>
                </S.ProfileRight>
              </S.ProfileBody>
            </S.ProfileContent>
          </S.ProfileWrapper>
        )}
    </AuthedTemplate>
  );
};

export default ProfileTemplate;
