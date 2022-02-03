import styled from "styled-components";

export const NewFeed = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;

  margin: 24px 0;

  > textarea {
    padding: 16px;

    border-radius: 16px;
  }
`;

export const ContentPreview = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  > img {
    max-width: 40%;
  }
`;

export const FeedButtons = styled.div`
  display: flex;
  place-items: center;
  place-content: space-between;
  gap: 16px;

  > div {
    > button {
      position: relative;
    }
  }
`;
