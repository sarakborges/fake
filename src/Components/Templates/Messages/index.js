// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";

// APIs
import MessageAPI from "Apis/Message";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Atoms
import Avatar from "Components/Atoms/Avatar";

// Molecules
import NoProfile from "Components/Molecules/NoProfile";
import LabeledInput from "Components/Molecules/LabeledInput";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";
import Text from "Components/Atoms/Text";
import { ROUTES } from "Helpers/routes";
import Input from "Components/Atoms/Input";
import Button from "Components/Atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { getTimeString } from "Helpers/Functions";

// Template
const MessagesTemplate = () => {
  const [chatUsers, setChatUsers] = useState();
  const [messages, setMessages] = useState();

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const getChatUsers = useCallback(async () => {
    if (!profile?._id) {
      return;
    }

    const chatUsersReq = await MessageAPI.getAllMessages(profile._id);

    if (chatUsersReq) {
      setChatUsers(chatUsersReq);
    }
  }, [profile, MessageAPI]);

  const getMessages = useCallback(async () => {
    if (!profile?._id || !url || !chatUsers?.length) {
      return;
    }

    const user = chatUsers.find((item) => item.user.url === url);

    if (!user?.user?._id) {
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

  const getAvatar = (message) => {
    if (message.user === profile._id) {
      return profile.avatar;
    } else {
      return messages?.profile?.avatar;
    }
  };

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
          {chatUsers?.length > 0 && (
            <>
              <S.PeopleWrapper>
                <S.PeopleFilter>
                  <LabeledInput
                    id='messages-people-filter'
                    placeholder='Digite o nome ou @ de quem quer encontrar'
                    label='Procurar pessoa'
                  />
                </S.PeopleFilter>

                <S.PeopleList>
                  {chatUsers.map((item) => {
                    return (
                      <li key={item.user._id}>
                        <Link
                          href={ROUTES.MESSAGES.replace(":id", item.user.url)}
                        >
                          <a>
                            <S.PersonWrapper selected={item.user.url === url}>
                              <Avatar
                                img={item.user.avatar}
                                size={48}
                                bgColor='main'
                              />

                              <div>
                                <Text
                                  type='custom'
                                  fc='bgInverted'
                                  fw={400}
                                  lh={1.6}
                                >
                                  {item.user.name}
                                </Text>

                                <Text
                                  type='custom'
                                  fc='bgInverted'
                                  lh={1.6}
                                  pt={4}
                                >
                                  @{item.user.url}
                                </Text>

                                <Text
                                  type='custom'
                                  fc='bgInverted'
                                  lh={1.6}
                                  fs={12}
                                  pt={4}
                                >
                                  <>Última mensagem em: </>
                                  {getTimeString(item.latestMessage)}
                                </Text>
                              </div>
                            </S.PersonWrapper>
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </S.PeopleList>
              </S.PeopleWrapper>

              <S.MessageWrapper>
                <S.MessagesList>
                  {messages?.messages?.length > 0 &&
                    messages?.messages.map((item, key) => {
                      return (
                        <S.MessageItem key={`message-item-${key}`}>
                          <S.MessageAvatar>
                            {messages?.messages[key - 1]?.user !==
                              messages?.messages[key]?.user && (
                              <Avatar
                                img={getAvatar(item)}
                                color='main'
                                size={32}
                              />
                            )}
                          </S.MessageAvatar>

                          <S.MessageContent>
                            {messages?.messages[key - 1]?.user !==
                              messages?.messages[key]?.user && (
                              <S.MessageSender>
                                <Text
                                  type='custom'
                                  fc='white'
                                  lh={1.6}
                                  fw={600}
                                >
                                  {item.user === profile._id
                                    ? profile.name
                                    : messages?.profile?.name}
                                </Text>

                                <Text
                                  type='custom'
                                  fc='white'
                                  lh={1.6}
                                  fw={600}
                                >
                                  (@
                                  {item.user === profile._id
                                    ? profile.url
                                    : messages?.profile?.url}
                                  )
                                </Text>
                              </S.MessageSender>
                            )}

                            <Text type='custom' fc='white' lh={1.6}>
                              {item.text}
                            </Text>

                            <Text
                              type='custom'
                              fc='bgInverted'
                              lh={1.6}
                              fs={12}
                              pb={8}
                            >
                              {getTimeString(item.sentAt, true)}
                            </Text>
                          </S.MessageContent>
                        </S.MessageItem>
                      );
                    })}
                </S.MessagesList>

                <S.NewMessage>
                  <Input
                    id='messages-new-message'
                    placeholder='Digite sua mensagem'
                  />

                  <Button style='primary' size={12}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span>Enviar</span>
                  </Button>
                </S.NewMessage>
              </S.MessageWrapper>
            </>
          )}
        </S.MessagesWrapper>
      )}
    </AuthedTemplate>
  );
};

export default MessagesTemplate;
