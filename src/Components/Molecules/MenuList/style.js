import styled from "styled-components";

export const MenuLists = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const MenuList = styled.ul`
  padding: 24px 32px;
`;

export const MenuItem = styled.li`
  &:not(:first-of-type) {
    padding-top: 8px;
  }

  > :is(a, button) {
    display: flex;
    place-items: center;
    place-content: flex-start;

    height: 48px;
    padding: 0 16px;
    width: 100%;

    font-size: 16px;
    color: ${({ active }) => (active ? "var(--main)" : "var(--bgInverted)")};

    border-radius: 16px;
    background-color: transparent;
    border: none;

    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: var(--bgContrast);

      color: var(--main);
    }
  }
`;

export const MenuItemIcon = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  width: 24px;
  height: 24px;

  margin-right: 16px;
`;
