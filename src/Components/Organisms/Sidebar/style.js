import styled from "styled-components";

const sidebar = "260px";

export const Sidebar = styled.div`
  display: flex;
  flex-flow: column;

  min-width: ${sidebar};
  max-width: ${sidebar};
  height: 100vh;
  padding: 32px 0;

  transition: min-width 0.3s, width 0.3s;

  @media (max-width: 1140px) {
    min-width: ${({ displaySidebar }) => (displaySidebar ? sidebar : "0")};
    width: ${({ displaySidebar }) => (displaySidebar ? sidebar : "0")};
    height: calc(100vh - 60px);
  }
`;
