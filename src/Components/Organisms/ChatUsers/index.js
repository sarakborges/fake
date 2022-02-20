// Atoms
import Input from "Components/Atoms/Input";

// Molecules
import ChatUserItem from "Components/Molecules/ChatUserItem";

// Styles
import * as S from "./style";

// Template
const ChatUsers = ({ usersList, tempUser, currentUrl }) => {
  return (
    <S.PeopleWrapper>
      <S.PeopleFilter>
        <Input id='messages-people-filter' placeholder='Insira sua pesquisa' />
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
    </S.PeopleWrapper>
  );
};

export default ChatUsers;
