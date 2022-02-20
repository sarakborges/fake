import styled from "styled-components";

export const ProfilesList = styled.ul`
  width: 100%;
  max-height: calc((108px * 2.5) + 8px);
  overflow: hidden;
  overflow-y: auto;

  & > li {
    width: 100%;
    padding: 16px 24px;

    cursor: pointer;

    transition: background-color 0.3s;

    &:hover {
      background-color: var(--bg);
    }
  }
`;
