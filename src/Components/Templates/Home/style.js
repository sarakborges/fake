import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  gap: 32px;

  width: 100%;
  height: 100%;
  padding: 32px 16px 32px 32px;
`;

export const FeedWrapper = styled.ul`
  flex: 1;
`;

export const NewFeedItem = styled.div`
  margin-bottom: 48px;
  padding: 16px;

  background-color: var(--bg);
  border-radius: 16px;

  > textarea {
    border: 0;
  }
`;

export const FeedItem = styled.li`
  padding: 24px;

  box-shadow: 2px 2px 3px 2px var(--bg);
  background-color: var(--bg);
  border-radius: 16px;
`;

export const FeedItemHeader = styled.div`
  display: flex;
  place-content: space-between;

  > div {
    flex: 1;
  }
`;

export const FeedItemTime = styled.p`
  padding: 16px 0 8px;
`;

export const FeedItemContent = styled.div`
  padding: 16px 0;

  > img {
    max-width: 400px;
  }
`;
