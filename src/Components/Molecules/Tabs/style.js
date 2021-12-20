import styled from "styled-components";

export const Tabs = styled.ul`
  display: flex;
  gap: 16px;

  padding: 16px;

  background-color: var(--bg);
  border-radius: 16px;
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

    border-radius: 16px;

    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: var(--bgContrast);

      color: var(--main);
    }
  }
`;
