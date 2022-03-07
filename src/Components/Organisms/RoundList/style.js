import styled from "styled-components";

export const EmptyTitle = styled.div`
  padding-top: 16px;
`;

export const RoundList = styled.div`
  width: 100%;
  padding: 16px 0;
`;

export const Title = styled.div`
  text-align: center;
  color: var(--main);
`;

export const LinkWrapper = styled.div`
  position: relative;

  > a {
    display: flex;
  }
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;

  padding: 12px 16px 0;
`;
