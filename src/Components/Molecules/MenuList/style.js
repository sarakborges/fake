import styled from "styled-components";

export const MenuLists = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const MenuList = styled.ul`
  padding: 24px 0;
`;

export const MenuItem = styled.li`
  > :is(a, button) {
    display: flex;
    place-items: center;
    place-content: flex-start;
    gap: 16px;

    height: 40px;
    padding: 0 32px;
    width: 100%;

    font-size: 14px;
    color: ${({ active }) => (active ? "var(--main)" : "var(--bgInverted)")};

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
`;

export const Counter = styled.span`
  display: flex;
  place-content: center;
  place-items: center;

  width: 20px;
  height: 20px;

  font-size: 12px;
  color: var(--white);

  background-color: var(--main);
  border-radius: 100%;
`;
