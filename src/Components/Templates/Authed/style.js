import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root{
    --main: ${({ theme }) => theme.colors.main};
    --bg: ${({ theme }) => theme.colors.bg};
    --bgContrast: ${({ theme }) => theme.colors.bgContrast};
    --bgInverted: ${({ theme }) => theme.colors.bgInverted};

    --lightGray: #CCCCCC;
    --mediumGray: #999999;
    --darkGray: #666666;
    --darkerGray: #333333;

    --offWhite: #eeeeee;
    --white: #ffffff;

    --dark: #16141c;
    --offDark: #1b1924;
    
    --green: #11a26f;
    --yellow: #bfa436;
    --red: #c73d6b;
  }

  body{
    background-color: var(--bg);
  
    color: var(--bgInverted);

    transition: color .3s, background-color 0.3s;
  }

  a{
    color: var(--main);
  }
`;

export const Container = styled.div`
  display: flex;

  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-flow: column;

  flex: 1;

  border-radius: 32px 0 0 32px;
  background-color: var(--bgContrast);
`;

export const PageContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;
