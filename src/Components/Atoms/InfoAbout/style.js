import styled from "styled-components";

export const AboutWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
`;

export const About = styled.div`
  filter: ${({ isBlured }) => (isBlured ? "blur(50px)" : "none")};
`;
