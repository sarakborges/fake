import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
  flex: 1;
`;

export const LeftWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 64px;

  flex: 1;
  padding: 24px;
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-flow: column;

  min-width: 400px;

  background-color: var(--bgTransparent);
  border-left: 4px solid var(--bgTransparent);
`;
