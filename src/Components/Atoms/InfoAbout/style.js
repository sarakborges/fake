import styled from "styled-components";

export const AboutWrapper = styled.div`
  width: 100%;
  margin: 0 32px 32px;
  overflow: hidden;
  overflow-x: auto;
`;

export const About = styled.div`
  filter: ${({ isBlured }) => (isBlured ? "blur(50px)" : "none")};
`;
