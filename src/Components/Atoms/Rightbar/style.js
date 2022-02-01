import styled from "styled-components";

export const RightBar = styled.div`
  display: flex;
  flex-flow: column;
  place-items: flex-end;
  gap: 32px;

  width: 336px;
  margin: 0 16px;

  @media (max-width: 760px) {
    display: none;
  }
`;
