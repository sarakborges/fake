import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 12px 0;

  border: 0;
  border-bottom: 1px solid var(--bgInverted);
  background-color: transparent;

  font-size: 16px;
  color: var(--bgInverted);
  font-family: inherit;

  transition: border-color 0.3s;

  &:focus {
    border-color: var(--main);
  }
`;

export const Error = styled.label`
  padding-top: 8px;

  font-size: 12px;
  color: var(--red);

  & ~ ${Input} {
    border-color: var(--red);
  }

  & ~ label {
    color: var(--red);
  }
`;
