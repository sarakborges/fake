// Dependencies
import Link from "next/link";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { getTimeString } from "Helpers/Functions";
import { ROUTES } from "Helpers/routes";

// Atoms
import Text from "Components/Atoms/Text";
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

// Styles
import * as S from "./style";

// Template
const ChatUserItem = ({ info, currentUrl }) => {
  return (
    <Link href={ROUTES.MESSAGES.replace(":id", info.user.url)}>
      <a>
        <S.PersonWrapper selected={info.user.url === currentUrl}>
          <S.PersonAvatar>
            {info.user.avatar ? (
              <Avatar img={info.user.avatar} size={48} bgColor='main' />
            ) : (
              <RoundIcon icon={faQuestion} size={48} bgColor='main' />
            )}
          </S.PersonAvatar>

          <S.PersonTextWrapper>
            <Text type='custom' fc='white' fw={400} lh={1.6}>
              {`${info.user.name} (@${info.user.url})`}
            </Text>

            {info?.latestMessage?.text && (
              <>
                <Text type='custom' fc='bgInverted' lh={1.6} pt={4}>
                  {info.latestMessage.text}
                </Text>

                <Text type='custom' fc='bgInverted' lh={1.6} fs={12} pt={4}>
                  {getTimeString(info.latestMessage.sentAt, true)}
                </Text>
              </>
            )}
          </S.PersonTextWrapper>
        </S.PersonWrapper>
      </a>
    </Link>
  );
};

export default ChatUserItem;
