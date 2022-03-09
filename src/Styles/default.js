import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const DefaultStyle = createGlobalStyle`
  ${reset}

  :root{
    --offWhite: #eeeeee;
    --white: #ffffff;

    --offBlack: #111111;
    --black: #000000;

    --purple: #6447bd;
    --green: #47bda7;
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
