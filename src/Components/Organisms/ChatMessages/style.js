import styled from "styled-components";

export const MessagesWrapper = styled.div`
  display: flex;
  flex: 1;

  width: 100%;
  height: 100%;
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;

  border-left: 2px solid var(--bg);
`;

export const MessagesList = styled.ul`
  display: flex;
  place-content: flex-end;
  flex-flow: column;
  flex: 1;

  padding: 0 24px;
`;

export const NoChatMessage = styled.li``;

export const NewMessage = styled.div`
  > form {
    display: flex;
    place-items: center;
    gap: 16px;

    padding: 16px;

    > button {
      aspect-ratio: 1;
    }
  }
`;
