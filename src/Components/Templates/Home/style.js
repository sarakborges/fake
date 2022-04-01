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

export const ProfileContent = styled.div`
  display: flex;
  flex-flow: column;
  place-items: center;
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

  position: sticky;
  top: 72px;
  right: 0;
  z-index: 1;

  max-height: calc(100vh - 72px);
  min-width: 400px;
  max-width: 400px;
  padding: 0 24px 24px;
  overflow-x: visible;
  overflow-y: auto;

  background-color: var(--bgTransparent);
`;

export const ChatWrapper = styled.div`
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
