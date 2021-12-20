import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  *{
    box-sizing: border-box;
    outline: none;

    scrollbar-width: thin;
  }

  a{
    text-decoration: none;
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
`;
