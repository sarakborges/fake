import styled from "styled-components";

export const FeedItem = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;

  width: 100%;
  padding: 8px;

  background-color: var(--bg);
  border-radius: 4px;
`;

export const Header = styled.div`
  display: flex;
  place-content: space-between;
`;

export const InfoAreaWrapper = styled.div`
  padding: 16px 16px 0;
`;

export const Content = styled.div`
  padding: 0 16px;

  > p {
    white-space: pre;
  }
`;

export const Date = styled.div`
  padding: 0 16px 16px;
`;

export const ImageWrapper = styled.div`
  overflow: hidden;

  > img {
    max-width: 64%;

    filter: ${({ isBlured }) => (isBlured ? "blur(50px)" : "none")};
  }
`;

export const FeedLike = styled.div`
  display: flex;

  color: ${({ hasLike }) => (hasLike ? "var(--red)" : "inherit")};
  font-size: 32px;

  transition: color 0.3s;
`;
