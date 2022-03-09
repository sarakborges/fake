import styled from "styled-components";

export const Topbar = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;

  display: flex;
  place-content: center;
  place-items: center;
  gap: 48px;

  width: 100%;
  height: 72px;
  padding: 0 44px;

  background-color: var(--bg);
`;

export const AboutWrapper = styled.div`
  display: flex;
  flex-flow: column;
  place-content: center;
  place-items: center;
  gap: 48px;

  padding: calc(72px + 48px) 48px 48px;
`;

export const About = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;

  width: 960px;
  max-width: 100%;
  padding: 32px;

  background-color: var(--bg);
  border-radius: 4px;
`;
