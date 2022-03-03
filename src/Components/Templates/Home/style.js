import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
  flex: 1;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-flow: column;
  place-items: center;
  gap: 16px;

  padding: 32px 0;

  > p {
    max-width: 100%;
    height: 24px;
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const ProfileButtons = styled.div`
  display: flex;
  gap: 16px;
`;

export const FeedWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 64px;

  flex: 1;
  padding: 24px;
`;

export const Lists = styled.div`
  display: flex;
  flex-flow: column;

  min-width: 400px;
  max-width: 400px;
  padding: 0 24px;

  background-color: var(--bgTransparent);
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-flow: column;

  min-width: 400px;

  background-color: var(--bgTransparent);
`;
