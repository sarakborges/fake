// Molecules
import LabeledInput from "Components/Molecules/LabeledInput";
import ChatUserItem from "Components/Molecules/ChatUserItem";

// Styles
import * as S from "./style";

// Template
const ChatUsers = ({ usersList, tempUser, currentUrl }) => {
  return (
    <S.PeopleWrapper>
      <S.PeopleFilter>
        <LabeledInput
          id='messages-people-filter'
          placeholder='Digite o nome ou @ de quem quer encontrar'
          label='Procurar pessoa'
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
          usersList.map((item) => {
            return (
              <li key={item.user._id}>
                <ChatUserItem info={item} currentUrl={currentUrl} />
              </li>
            );
          })}
      </S.PeopleList>
    </S.PeopleWrapper>
  );
};

export default ChatUsers;
