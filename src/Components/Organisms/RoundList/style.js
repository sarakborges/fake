import styled from "styled-components";

export const EmptyTitle = styled.div`
  padding-top: 16px;
`;

export const RoundList = styled.div`
  width: 100%;
  padding: 16px 0;
`;

export const Title = styled.div`
  display: flex;
  place-content: center;
  place-items: center;
  gap: 8px;

  padding-bottom: 12px;

  text-align: center;

  > a {
    font-size: 10px;
  }
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

  padding: 0 16px;
`;
