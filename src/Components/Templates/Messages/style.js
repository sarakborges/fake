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
  padding: 32px 16px;
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

export const MessagesList = styled.ul`
  display: flex;
  flex-flow: column;
  flex: 1;
  gap: 24px;

  padding: 24px;

  border-left: 2px solid var(--bg);
`;

export const MessageItem = styled.li`
  display: flex;
  place-items: center;
  flex-flow: ${({ isSelf }) => (isSelf ? "row-reverse" : "row")};
  gap: 16px;

  > p {
    padding: 8px 12px;

    color: var(--white);

    border-radius: 8px;
    background-color: ${({ isSelf }) => (isSelf ? "var(--main)" : "var(--bg)")};
  }
`;

export const NewMessage = styled.div`
  display: flex;
  place-content: center;
  gap: 32px;

  padding: 24px 16px;

  border-left: 2px solid var(--bg);
`;
