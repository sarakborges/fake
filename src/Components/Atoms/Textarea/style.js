import styled from "styled-components";

export const Textarea = styled.textarea`
  width: 100%;
  height: ${({ size }) => (size ? `${size}px` : `320px`)};
  padding: 16px;
  resize: none;

  border: 1px solid var(--bgInverted);
  border-radius: 8px;
  background-color: ${({ isBgContrast }) =>
    !isBgContrast ? "var(--bg)" : "var(--bgContrast)"};

  font-size: 16px;
  font-family: inherit;
  color: var(--bgInverted);

  transition: border-color 0.3s;

  &:focus {
    border-color: var(--main);
  }
`;
