import styled from "styled-components";

export const List = styled.div`
  display: flex;
  flex-flow: column;
  gap: 32px;
`;

export const Row = styled.div`
  display: flex;
  place-items: center;
  gap: 12px;
`;

export const ColorButton = styled.div`
  > button {
    width: 32px;
    aspect-ratio: 1;

    background-color: ${({ color }) => color};
    border: 0;

    &:not(:disabled):hover {
      background-color: ${({ color }) => color};
    }
  }
`;
