import styled from "styled-components";

export const Sidebar = styled.div`
  display: flex;
  flex-flow: column;

  min-width: 320px;
  max-width: 320px;
  height: 100vh;
  padding: 32px 0;

  transition: min-width 0.3s, width 0.3s;

  @media (max-width: 1140px) {
    min-width: ${({ displaySidebar }) => (displaySidebar ? "320px" : "0")};
    width: ${({ displaySidebar }) => (displaySidebar ? "320px" : "0")};
    height: calc(100vh - 60px);
  }
`;
