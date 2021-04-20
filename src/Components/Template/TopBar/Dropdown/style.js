import styled from "styled-components";

const top = "70px";
const size = "50px";

export const Container = styled.div`
  position: fixed;
  top: ${top};
  right: 0;
  z-index: 10;

  border: 3px solid ${({ theme }) => theme.topBar.dropDown.border};
  border-top: 0;
  border-right: 0;

  transition: border-color 0.3s;
`;

export const MenuItem = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  height: ${size};
`;

export const MenuItemIcon = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  height: ${size};
  width: ${size};

  font-size: 20px;
`;

export const MenuItemText = styled.div`
  padding-left: 5px;
  padding-right: 40px;

  font-size: 16px;
`;
