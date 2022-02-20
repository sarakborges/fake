// Dependencies
import { useContext } from "react";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { getTimeString } from "Helpers/Functions";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import ProfilePicture from "Components/Molecules/ProfilePicture";

// Styles
import * as S from "./style";

// Template
const ChatMessageItem = ({ info, defaultUser, lastMessageSender }) => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const getAvatar = (message) => {
    if (message.user === profile._id) {
      return profile.avatar;
    } else {
      return defaultUser.avatar;
    }
  };

  return (
    <S.MessageItem>
      <S.MessageAvatar>
        {lastMessageSender !== info.user && (
          <ProfilePicture avatar={getAvatar(info)} size={32} />
        )}
      </S.MessageAvatar>

      <S.MessageContent>
        {lastMessageSender !== info?.user && (
          <S.MessageSender>
            <Text type='custom' fc='white' lh={1.6} fw={600}>
              {info.user === profile._id ? profile.name : defaultUser.name}
            </Text>

            <Text type='custom' fc='white' lh={1.6} fw={600}>
              (@
              {info.user === profile._id ? profile.url : defaultUser.url})
            </Text>
          </S.MessageSender>
        )}

        <Text type='custom' fc='white' lh={1.6}>
          {info.text}
        </Text>

        <Text type='custom' fc='bgInverted' lh={1.6} fs={12} pb={8}>
          {getTimeString(info.sentAt, true)}
        </Text>
      </S.MessageContent>
    </S.MessageItem>
  );
};

export default ChatMessageItem;
