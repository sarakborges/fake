import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px;

  border: 1px solid var(--bgInverted);
  border-radius: 8px;
  background-color: ${({ isBgContrast }) =>
    !isBgContrast ? "var(--bg)" : "var(--bgContrast)"};

  font-size: 16px;
  color: var(--bgInverted);
  font-family: inherit;

  transition: border-color 0.3s;

  &:focus {
    border-color: var(--main);
  }
`;
