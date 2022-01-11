import styled from "styled-components";

export const Sections = styled.div`
  display: flex;
  gap: 64px;

  padding-top: 48px;
`;

export const SectionLink = styled.div`
  > a {
    font-size: 20px;
    color: ${({ active }) => (active ? "var(--main)" : "var(--bgInverted)")};
    text-shadow: 2px 2px 3px var(--bgContrast);

    transition: color 0.3s;
  }
`;
