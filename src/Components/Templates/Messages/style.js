import styled from "styled-components";

export const MessagesWrapper = styled.div`
  display: flex;
  flex: 1;

  width: 100%;
  height: 100%;
`;

export const ChatUsers = styled.div`
  display: flex;
  flex-flow: column;

  position: sticky;
  top: 72px;
  right: 0;
  z-index: 1;

  max-height: calc(100vh - 72px);
  min-width: 400px;
  max-width: 400px;

  background-color: var(--bgTransparent);
`;
