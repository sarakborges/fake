import styled from "styled-components";

export const InfoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
`;

export const InfoItem = styled.li`
  background-color: var(--bg);
  border-radius: 16px;
`;
