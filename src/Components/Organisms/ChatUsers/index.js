// Atoms
import Input from "Components/Atoms/Input";
import Text from "Components/Atoms/Text";

// Molecules
import ChatUserItem from "Components/Molecules/ChatUserItem";

// Styles
import * as S from "./style";

const ChatUsers = ({ usersList, tempUser, currentUrl, isBgContrast }) => {
  return (
    <S.PeopleWrapper>
      {tempUser?._id || usersList?.length > 0 ? (
        <>
          <S.PeopleFilter>
            <Input
              id='messages-people-filter'
              placeholder='Encontre pessoas'
              isBgContrast={!isBgContrast}
            />
          </S.PeopleFilter>

          <S.PeopleList>
            {tempUser?._id &&
              !usersList?.find?.((item) => item.user.url === tempUser.url) && (
                <li>
                  <ChatUserItem
                    info={{ user: { ...tempUser } }}
                    currentUrl={currentUrl}
                  />
                </li>
              )}

            {usersList?.length > 0 &&
              usersList.map((item, key) => {
                return (
                  <li key={item.user._id || key}>
                    <ChatUserItem info={item} currentUrl={currentUrl || ""} />
                  </li>
                );
              })}
          </S.PeopleList>
        </>
      ) : (
        <S.NoChatUsers>
          <Text type='custom' lh={1.4} ta='center' fw={600}>
            Você ainda não iniciou conversas.
          </Text>

          <Text type='custom' lh={1.4} ta='center'>
            Para iniciar uma conversa, basta entrar em algum perfil, e começar a
            conversar.
          </Text>
        </S.NoChatUsers>
      )}
    </S.PeopleWrapper>
  );
};

export default ChatUsers;
