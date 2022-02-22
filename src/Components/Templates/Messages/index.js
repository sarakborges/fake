// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

// APIs
import MessageAPI from "Apis/Message";
import ProfileAPI from "Apis/Profile";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Molecules
import NoProfile from "Components/Molecules/NoProfile";

// Organisms
import ChatUsers from "Components/Organisms/ChatUsers";
import ChatMessages from "Components/Organisms/ChatMessages";

// Templates
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";

const MessagesTemplate = () => {
  const [chatUsers, setChatUsers] = useState();
  const [tempUser, setTempUser] = useState();
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState("");

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const handleSubmit = async () => {
    try {
      const sentProfile = messages?.profile?._id || tempUser?._id;

      if (!sentProfile) {
        return;
      }

      await MessageAPI.sendMessage({
        users: [profile._id, sentProfile],
        message: newMessage,
        sender: profile._id,
      });

      setNewMessage("");

      await getMessages();
      await getChatUsers();
    } catch (e) {
      console.log(e);
    }
  };

  const getChatUsers = useCallback(async () => {
    if (!profile?._id) {
      return;
    }

    const chatUsersReq = await MessageAPI.getAllMessages(profile._id);

    if (chatUsersReq) {
      setChatUsers(chatUsersReq);
    }
  }, [profile, MessageAPI]);

  const getTempUser = async () => {
    const profileReq = await ProfileAPI.getProfileByUrl(url);

    if (profileReq?._id) {
      setTempUser(profileReq);
      setMessages(undefined);
    }
  };

  const getMessages = useCallback(async () => {
    if (!profile?._id || !url) {
      return;
    }

    const user = chatUsers?.find?.((item) => item.user.url === url);

    if (!user?.user?._id) {
      await getTempUser();
      return;
    }

    const messagesReq = await MessageAPI.getMessages([
      profile._id,
      user.user._id,
    ]);

    if (messagesReq) {
      setMessages(messagesReq);
    }
  }, [chatUsers, profile, url, MessageAPI]);

  useEffect(() => {
    getChatUsers();
  }, [getChatUsers]);

  useEffect(() => {
    getMessages();
  }, [url, getMessages]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Mensagens</title>
      </Head>

      {!profile?._id && <NoProfile />}

      {profile?._id && (
        <S.MessagesWrapper>
          <ChatUsers
            usersList={chatUsers}
            tempUser={tempUser}
            currentUrl={url}
          />

          <ChatMessages
            messages={messages}
            handleSubmit={handleSubmit}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        </S.MessagesWrapper>
      )}
    </AuthedTemplate>
  );
};

export default MessagesTemplate;
