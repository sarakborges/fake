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
  place-content: center;

  padding: 16px 16px 0;

  > a {
    display: flex;
    place-items: center;

    height: 32px;
    padding: 0 8px;
    margin: 4px;

    border-radius: 8px;
    background-color: var(--bg);

    font-size: 14px;

    > svg {
      margin-right: 8px;
    }
  }
`;
