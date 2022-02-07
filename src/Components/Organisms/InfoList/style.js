import styled from "styled-components";

export const InfoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 356px);
  grid-auto-rows: 1fr;
  gap: 32px;

  > li {
    height: 100%;

    > div {
      height: 100%;
    }
  }
`;
