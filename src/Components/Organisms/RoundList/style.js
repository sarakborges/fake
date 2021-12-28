import styled from "styled-components";

export const EmptyTitle = styled.div`
  padding-top: 16px;
`;

export const Title = styled.div`
  text-align: center;
  color: var(--main);
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  padding: 24px 16px 0;

  > a {
    display: flex;
  }
`;
