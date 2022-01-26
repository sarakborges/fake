import styled from "styled-components";

export const MessagesWrapper = styled.div`
  display: flex;
  flex: 1;

  width: 100%;
  height: 100%;
`;

export const PeopleWrapper = styled.div`
  display: flex;
  flex-flow: column;

  width: 400px;
`;

export const PeopleList = styled.ul`
  display: flex;
  flex-flow: column;
  flex: 1;

  width: 100%;
  overflow: hidden;
  overflow-y: auto;
`;

export const PersonWrapper = styled.span`
  display: flex;
  place-items: center;
  gap: 24px;

  width: 100%;
  padding: 16px;

  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? "var(--bg)" : "transparent"};

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--bg);
  }
`;

export const PeopleFilter = styled.div`
  display: flex;
  place-items: center;

  padding: 0 16px;
  height: 100px;

  background-color: var(--bg);
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;

  border-left: 2px solid var(--bg);
`;

export const MessagesList = styled.ul`
  display: flex;
  flex-flow: column;
  flex: 1;

  padding: 0 24px 24px;
`;

export const MessageItem = styled.li`
  display: flex;
  place-items: flex-start;
  gap: 16px;
`;

export const MessageAvatar = styled.div`
  display: flex;

  width: 32px;
  padding-top: 32px;
`;

export const MessageContent = styled.div`
  display: flex;
  flex-flow: column;
  place-items: flex-start;

  width: 100%;
`;

export const MessageSender = styled.div`
  display: flex;
  place-items: flex-end;
  gap: 8px;

  padding-top: 24px;
  padding-bottom: 8px;
`;

export const NewMessage = styled.div`
  > form {
    display: flex;
    place-items: flex-end;
    gap: 32px;

    padding: 16px 16px 24px;

    border-top: 2px solid var(--bg);
  }
`;
