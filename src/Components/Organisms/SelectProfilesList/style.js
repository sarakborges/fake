import styled from "styled-components";

export const ProfilesList = styled.ul`
  width: 100%;
  max-height: calc((108px * 2.5) + 8px);
  padding: ${({ type }) => (type === "list" ? "0" : "8px")};
  overflow: hidden;
  overflow-y: auto;

  display: ${({ type }) => (type === "list" ? "block" : "grid")};
  grid-template-columns: repeat(10, 1fr);

  & > li {
    width: 100%;
    padding: ${({ type }) => (type === "list" ? "16px" : "8px")};

    cursor: pointer;

    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ type }) =>
        type === "list" ? "var(--bg)" : "transparent"};
    }
  }
`;

export const TagsList = styled.div`
  padding-top: 12px;
`;
