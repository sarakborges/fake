import styled from "styled-components";

export const AboutWrapper = styled.div`
  flex: 1;
  margin: 0 32px 32px;
  overflow: hidden;
`;

export const About = styled.div`
  filter: ${({ isBlured }) => (isBlured ? "blur(50px)" : "none")};

  img {
    max-width: 100%;
  }
`;
