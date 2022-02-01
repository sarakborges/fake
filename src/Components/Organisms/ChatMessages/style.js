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
  flex-flow: column;
  flex: 1;

  padding: 0 24px 24px;
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
