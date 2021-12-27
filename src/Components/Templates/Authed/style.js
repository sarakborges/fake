import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-flow: column;

  flex: 1;

  border-radius: 32px 0 0 32px;
  background-color: var(--bgContrast);
`;

export const PageContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;
