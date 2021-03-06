import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  :root{
    --main: ${({ theme }) => theme.main};
    --mainTransparent: ${({ theme }) => `${theme.main}44`};
    --bg: ${({ theme }) => theme.bg};
    --bgContrast: ${({ theme }) => theme.bgContrast};
    --bgInverted: ${({ theme }) => theme.bgInverted};
    --bgTransparent: ${({ theme }) => `${theme.bg}DD`};
    --bgContrastTransparent: ${({ theme }) => `${theme.bgContrast}DD`};

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
    --golden: #d4af37;
    --silver: #dbe4eb;
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

    font-family: 'Open Sans', serif;
  }

  body{
    background-color: var(--bgContrast);

    color: var(--bgInverted);

    transition: color .3s, background-color 0.3s;
  }
`;
