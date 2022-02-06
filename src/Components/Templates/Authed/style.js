import styled from "styled-components";

export const Topbar = styled.div`
  display: none;

  @media (max-width: 1140px) {
    display: flex;

    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;

  height: 100vh;

  @media (max-width: 1140px) {
    height: calc(100vh - 60px);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-flow: column;

  flex: 1;
  overflow: hidden;

  background-color: var(--bgContrast);
`;

export const PageContentWrapper = styled.div`
  min-height: 100vh;
  overflow-y: auto;

  @media (max-width: 1140px) {
    min-height: calc(100vh - 60px);
  }
`;

export const PageContent = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;

  @media (max-width: 1140px) {
    min-height: calc(100vh - 60px);
  }
`;
