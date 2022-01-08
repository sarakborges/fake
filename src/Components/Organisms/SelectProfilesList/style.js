import styled from "styled-components";

export const ProfilesList = styled.ul`
  width: 100%;
  max-height: calc(128px * 3);
  overflow: hidden;
  overflow-y: auto;

  border: 0 solid var(--bgContrast);
  border-width: 4px 0;

  & > li {
    width: 100%;
  }
`;
