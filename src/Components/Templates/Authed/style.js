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

export const PageContentWrapper = styled.div`
  min-height: 100vh;
  overflow-y: auto;
`;

export const PageContent = styled.div`
  display: flex;
  min-height: 100vh;
`;
