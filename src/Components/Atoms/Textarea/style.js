import styled from "styled-components";

export const Textarea = styled.textarea`
  width: 100%;
  height: ${({ size }) => (size ? `${size}px` : `320px`)};
  padding: 16px;

  border: 1px solid var(--bgInverted);
  border-bottom-color: var(--bgInverted);
  background-color: var(--bg);
  resize: none;

  font-size: 16px;
  font-family: inherit;
  color: var(--bgInverted);

  transition: border-color 0.3s;

  &:focus {
    border-color: var(--main);
  }
`;
