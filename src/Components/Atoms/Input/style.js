import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  height: 32px;
  padding: 0;

  border: 0;
  border-bottom: 1px solid var(--bgInverted);
  background-color: var(--bg);

  font-size: 16px;
  color: var(--bgInverted);
  font-family: inherit;

  transition: border-bottom-color 0.3s;

  &:focus {
    border-bottom-color: var(--main);
  }
`;
