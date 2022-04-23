// Dependencies
import { useContext, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

// Contexts
import { MessagesContext } from "Contexts/Messages";

// Organisms
import ChatUsers from "Components/Organisms/ChatUsers";

// Styles
import * as S from "./style";

const MessagesDropdown = () => {
  const [displayMessages, setDisplayMessages] = useState(false);

  const { messagesState } = useContext(MessagesContext);
  const { chatUsers } = messagesState;

  const messagesRef = useRef();

  const toggleMessages = (e) => {
    if (!messagesRef?.current?.contains(e.target)) {
      setDisplayMessages(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", toggleMessages);

    return () => {
      document.removeEventListener("click", toggleMessages);
    };
  }, []);

  return (
    <div ref={messagesRef}>
      <S.MessagesWrapper displayMessages={displayMessages}>
        <ChatUsers usersList={chatUsers} isBgContrast />
      </S.MessagesWrapper>

      <S.NotificationIcon
        onClick={() => setDisplayMessages(!displayMessages)}
        isActive={displayMessages}
      >
        <FontAwesomeIcon icon={faEnvelope} />

        {chatUsers?.length > 0 && <S.Counter>{chatUsers.length}</S.Counter>}
      </S.NotificationIcon>
    </div>
  );
};

export default MessagesDropdown;
