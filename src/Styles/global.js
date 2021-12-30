import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

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

  *{
    box-sizing: border-box;
    outline: none;

    scrollbar-width: thin;
  }

  a{
    color: var(--main);
    text-decoration: none;
  }

  b{
    font-weight: 600;
  }

  html,
  body { 
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    -moz-osx-font-smoothing: grayscale;

    width: 100%;
    overflow-x: hidden;

    font-family: 'Open Sans', serif;
  }

  body{
    background-color: var(--bg);

    color: var(--bgInverted);

    transition: color .3s, background-color 0.3s;
  }
`;
