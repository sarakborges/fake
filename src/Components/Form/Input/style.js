import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  padding: 0 10px;

  ${({ customStyle }) => customStyle};
`;

export const Input = styled.input`
  height: 100%;
  width: 100%;

  background: none;
  border: none;

  font-size: 14px;
`;
