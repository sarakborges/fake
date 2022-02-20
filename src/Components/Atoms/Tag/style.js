import styled from "styled-components";

export const Tag = styled.span`
  display: flex;
  place-items: center;
  gap: 8px;

  padding: 4px 8px;

  color: var(--white);
  font-size: 12px;

  background-color: ${({ highlighted }) =>
    highlighted ? "var(--main)" : "var(--bgContrast)"};
  border-radius: 4px;
  box-shadow: 2px 2px 3px var(--bg);

  cursor: ${({ handleRemove }) => (!!handleRemove ? "pointer" : "inherit")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ handleRemove, highlighted }) =>
      !!handleRemove
        ? "var(--red)"
        : highlighted
        ? "var(--main)"
        : "var(--bgContrast)"};
  }
`;
