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
`;

export const ProfileButtons = styled.div`
  display: flex;
  gap: 24px;

  > div > a {
    width: 100px;
  }
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
  padding: 0 24px;

  background-color: var(--bgTransparent);
`;

export const Counters = styled.div`
  display: flex;
  place-content: center;
  place-items: center;
  gap: 24px;

  padding-bottom: 16px;

  > a {
    display: flex;
    flex-flow: column;
    place-content: center;
    place-items: center;

    width: 100px;
    padding: 12px;

    background-color: var(--bgContrast);
    border: 2px solid transparent;
    border-radius: 4px;

    transition: border-color 0.3s;

    &:hover {
      border-color: var(--main);
    }
  }
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-flow: column;

  min-width: 400px;

  background-color: var(--bgTransparent);
  border-left: 4px solid var(--bgTransparent);
`;
