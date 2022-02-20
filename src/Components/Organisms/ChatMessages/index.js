// Dependencies
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// Contexts
import { UserContext } from "Contexts/User";

// Atoms
import Form from "Components/Atoms/Form";
import Input from "Components/Atoms/Input";
import Button from "Components/Atoms/Button";

// Molecules
import ChatMessageItem from "Components/Molecules/ChatMessageItem";

// Styles
import * as S from "./style";
import Text from "Components/Atoms/Text";

// Template
const ChatMessages = ({
  messages,
  newMessage,
  setNewMessage,
  handleSubmit,
}) => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const handleChange = (e) => {
    setNewMessage(e.currentTarget.value);
  };

  return (
    <S.MessageWrapper>
      <S.MessagesList>
        {messages?.messages?.length > 0 ? (
          messages?.messages.map((item, key) => {
            return (
              <ChatMessageItem
                info={item}
                defaultUser={{ ...messages.profile }}
                lastMessageSender={messages?.messages[key - 1]?.user}
              />
            );
          })
        ) : (
          <S.NoChatMessage>
            <Text type='custom' lh={1.4} pb={16}>
              {messages?.profile._id !== profile?._id
                ? `Você e ${messages?.profile.name} ainda não começaram a se falar.`
                : `Você pode enviar mensagens para si mesmo, que podem servir como anotações.`}
            </Text>

            {messages?.profile._id !== profile?._id && (
              <Text type='custom' lh={1.4} fw={600}>
                Que tal enviar uma mensagem para começar uma conversa?
              </Text>
            )}
          </S.NoChatMessage>
        )}
      </S.MessagesList>

      <S.NewMessage>
        <Form onSubmit={handleSubmit}>
          <Input
            id='messages-new-message'
            placeholder='Digite sua mensagem'
            value={newMessage}
            onChange={handleChange}
          />

          <Button
            type='submit'
            style='primary'
            size={12}
            disabled={!newMessage}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Form>
      </S.NewMessage>
    </S.MessageWrapper>
  );
};

export default ChatMessages;
