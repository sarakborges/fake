import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column-reverse;

  width: 100%;
`;

export const Label = styled.label`
  font-size: 12px;

  transition: color 0.3s;

  input:focus + & {
    color: var(--main);
  }
`;
