// Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Form from "Components/Atoms/Form";
import Input from "Components/Atoms/Input";
import Button from "Components/Atoms/Button";

// Molecules
import ChatMessageItem from "Components/Molecules/ChatMessageItem";

// Styles
import * as S from "./style";

// Template
const ChatMessages = ({
  messages,
  newMessage,
  setNewMessage,
  handleSubmit,
}) => {
  const handleChange = (e) => {
    setNewMessage(e.currentTarget.value);
  };

  return (
    <S.MessageWrapper>
      <S.MessagesList>
        {messages?.messages?.length > 0 &&
          messages?.messages.map((item, key) => {
            return (
              <ChatMessageItem
                info={item}
                defaultUser={{ ...messages.profile }}
                lastMessageSender={messages?.messages[key - 1]?.user}
              />
            );
          })}
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
            <span>Enviar</span>
          </Button>
        </Form>
      </S.NewMessage>
    </S.MessageWrapper>
  );
};

export default ChatMessages;
