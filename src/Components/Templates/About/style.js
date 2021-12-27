import styled from "styled-components";

export const AboutWrapper = styled.div`
  display: flex;
  flex-flow: column;
  place-content: center;
  place-items: center;

  min-height: 100vh;
  padding: 32px;
`;

export const About = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;

  width: 480px;
  max-width: 100%;
  padding: 32px;
  margin-top: 32px;

  background-color: var(--bgContrast);
  border-radius: 16px;
`;
