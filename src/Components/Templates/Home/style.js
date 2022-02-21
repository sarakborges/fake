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

export const RightLists = styled.div`
  display: flex;
  flex-flow: column;
  gap: 32px;

  min-width: 400px;
  padding: 32px;
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-flow: column;

  min-width: 400px;

  background-color: var(--bgTransparent);
  border-left: 4px solid var(--bgTransparent);
`;
