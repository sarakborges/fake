import styled from "styled-components";

export const Tabs = styled.ul`
  display: flex;
  gap: 16px;

  padding: 8px;

  border-radius: 4px;
`;

export const TabItem = styled.li`
  line-height: 32px;
  font-size: 16px;

  a {
    display: flex;
    place-items: center;

    height: 48px;
    padding: 0 16px;

    color: ${({ active }) => (active ? "var(--main)" : "var(--bgInverted)")};

    border-radius: 4px;
    background-color: var(--bgTransparent);

    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: var(--bgContrastTransparent);

      color: var(--main);
    }
  }
`;
