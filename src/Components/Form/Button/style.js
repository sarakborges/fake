import styled, { css } from "styled-components";

const ButtonStyle = css`
  display: flex;
  place-content: center;
  place-items: center;

  padding: 0;

  background-color: ${({ theme }) => theme.button.bgColor};
  border: none;
  cursor: pointer;

  color: ${({ theme }) => theme.button.fontColor};
  font-size: 14px;

  transition: background-color 0.3s, color 0.3s;

  ${({ customStyle }) => customStyle}
`;

const ButtonStyleHover = css`
  background-color: ${({ theme }) => theme.button.hover.bgColor};

  color: ${({ theme }) => theme.button.hover.fontColor};
`;

export const Button = styled.button`
  ${ButtonStyle}

  &:hover {
    ${ButtonStyleHover}
    ${({ customHoverStyle }) => customHoverStyle}
  }
`;

export const LinkButton = styled.a`
  ${ButtonStyle}

  &:hover {
    ${ButtonStyleHover}
    ${({ customHoverStyle }) => customHoverStyle}
  }
`;
