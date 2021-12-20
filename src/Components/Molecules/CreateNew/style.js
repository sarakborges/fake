import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, calc(25% - ((32px * 3) / 4)));
  gap: 32px;

  padding-bottom: 96px;
`;

export const CreateNew = styled.div`
  background-color: var(--bg);
  border-radius: 16px;
`;
