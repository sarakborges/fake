import styled from "styled-components";

export const FeedItem = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;

  width: 100%;
  padding: 24px;

  border-radius: 24px;
  background-color: var(--bg);

  > img {
    max-width: 64%;
  }
`;

export const InfoAreaWrapper = styled.div`
  display: flex;
`;

export const FeedLike = styled.div`
  display: flex;

  color: ${({ hasLike }) => (hasLike ? "var(--red)" : "inherit")};
  font-size: 32px;

  transition: color 0.3s;
`;