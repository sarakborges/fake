import styled from "styled-components";

export const InfoList = styled.ul`
  display: flex;
  flex-flow: column;

  overflow: hidden;

  background-color: var(--bg);
  border-radius: 4px;
  box-shadow: 2px 2px 3px var(--bg);

  > li {
    &:not(:last-child) {
      border-bottom: 1px solid var(--bgContrast);
    }
  }
`;
