import styled from "styled-components";

export const InfoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, calc(25% - ((32px * 3) / 4)));
  gap: 32px;
`;

export const InfoItem = styled.li`
  background-color: var(--bg);
  border-radius: 16px;
`;
