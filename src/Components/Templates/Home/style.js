import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  gap: 32px;

  width: 100%;
  height: 100%;
  padding: 32px 16px 32px 32px;
`;

export const FeedPlaceholder = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  flex: 1;
  min-height: calc(100vh - 64px);
`;
