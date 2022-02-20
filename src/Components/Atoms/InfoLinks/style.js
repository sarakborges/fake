import styled from "styled-components";

export const Sections = styled.div`
  display: flex;
`;

export const SectionLink = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  > a {
    padding: 16px 24px;

    font-size: 16px;
    color: ${({ active }) => (active ? "var(--white)" : "var(--bgInverted)")};
    text-shadow: 2px 2px 3px var(--bgContrast);

    transition: color 0.3s;
  }
`;
