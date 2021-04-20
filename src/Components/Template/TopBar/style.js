import styled from "styled-components";

const size = "70px";

export const Container = styled.div`
  display: flex;
  place-content: end;
  place-items: center;

  position: sticky;
  left: 0;
  top: 0;
  z-index: 9;

  background-color: ${({ theme }) => theme.topBar.bgColor};

  width: 100%;

  transition: background-color 0.3s;
`;

export const Logo = styled.div`
  display: flex;
  place-items: center;
  place-content: center;

  width: calc(${size} * 2.25);
  height: ${size};
  padding: 0 15px;
  overflow: hidden;

  svg {
    fill: ${({ theme }) => theme.body.fontColor};
    width: 100%;
  }
`;
