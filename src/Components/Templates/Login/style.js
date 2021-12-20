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
    background-color: var(--bgContrast);
  
    color: var(--bgInverted);

    transition: color .3s, background-color 0.3s;
  }

  a{
    color: var(--main);
  }
`;

export const LoginWrapper = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  min-height: 100vh;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 32px;

  width: 480px;
  padding: 32px;

  background-color: var(--bg);
  border-radius: 16px;
`;

export const RegisterLink = styled.p`
  text-align: center;
  font-size: 12px;
`;
