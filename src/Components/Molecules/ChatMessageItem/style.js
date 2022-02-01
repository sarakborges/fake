import styled from "styled-components";

export const MessageItem = styled.li`
  display: flex;
  place-items: flex-start;
  gap: 16px;
`;

export const MessageAvatar = styled.div`
  display: flex;

  min-width: 32px;
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
