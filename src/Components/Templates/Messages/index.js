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
import {
  faEnvelope,
  faForward,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

// Template
const MessagesTemplate = () => {
  const [messages, setMessages] = useState();

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const getMessages = useCallback(async () => {
    if (!profile?._id) {
      return;
    }

    const messagesReq = await MessageAPI.getAllMessages(profile._id);

    if (messagesReq) {
      setMessages(messagesReq);
    }
  }, [profile, MessageAPI]);

  const getMessagesOnFocus = () => {
    if (messages?.length < 1) {
      return false;
    }

    return messages.find((item) => item.user.url === url);
  };

  const getAvatar = (message) => {
    if (message.user === profile._id) {
      return profile.avatar;
    } else {
      return getMessagesOnFocus().user.avatar;
    }
  };

  useEffect(() => {
    getMessages();
  }, [profile, getMessages]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Mensagens</title>
      </Head>

      {!profile?._id && <NoProfile />}

      {profile?._id && (
        <S.MessagesWrapper>
          {messages?.length > 0 && (
            <>
              <S.PeopleWrapper>
                <S.PeopleList>
                  {messages.map((item) => {
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

                                <Text type='custom' fc='bgInverted' lh={1.6}>
                                  @{item.user.url}
                                </Text>
                              </div>
                            </S.PersonWrapper>
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </S.PeopleList>

                <S.PeopleFilter>
                  <LabeledInput
                    id='messages-people-filter'
                    placeholder='Digite o nome ou @ de quem quer encontrar'
                    label='Procurar pessoa'
                  />
                </S.PeopleFilter>
              </S.PeopleWrapper>

              <S.MessageWrapper>
                <S.MessagesList>
                  {getMessagesOnFocus() &&
                    getMessagesOnFocus().messages.map((item, key) => {
                      return (
                        <S.MessageItem
                          key={`message-item-${key}`}
                          isSelf={item.user === profile._id}
                        >
                          <Avatar
                            img={getAvatar(item)}
                            color='main'
                            size={48}
                          />

                          <Text>{item.text}</Text>
                        </S.MessageItem>
                      );
                    })}
                </S.MessagesList>

                <S.NewMessage>
                  <Input
                    id='messages-new-message'
                    placeholder='Digite sua mensagem'
                  />

                  <Button style='primary' size={16}>
                    <FontAwesomeIcon icon={faPaperPlane} />
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
