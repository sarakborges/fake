import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body{
    background-color: ${({ theme }) => theme.body.bgColor};
  
    color: ${({ theme }) => theme.body.fontColor};

    transition: color .3s, background-color 0.3s;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
`;
