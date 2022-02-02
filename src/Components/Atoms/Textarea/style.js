import styled from "styled-components";

export const Textarea = styled.textarea`
  width: 100%;
  height: ${({ size }) => (size ? `${size}px` : `320px`)};
  padding: 12px;
  resize: none;

  border: 2px solid transparent;
  border-radius: 4px;
  background-color: ${({ isBgContrast }) =>
    !isBgContrast ? "var(--bg)" : "var(--bgContrast)"};

  font-size: 16px;
  line-height: 1.4;
  font-family: inherit;
  color: var(--bgInverted);

  transition: border-color 0.3s;

  &:focus {
    border-color: var(--main);
  }
`;
