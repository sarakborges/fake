import styled, { css } from "styled-components";

const PrimaryButton = css`
  border: 0;
  background-color: var(--main);
  color: var(--offWhite);

  &:not(:disabled):hover {
    background-color: var(--offWhite);
    color: var(--main);
  }
`;

const SecondaryButton = css`
  border: 1px solid var(--main);
  background-color: var(--bg);
  color: var(--main);

  &:not(:disabled):hover {
    background-color: var(--bgContrast);
  }
`;

const TransparentButton = css`
  border: 1px solid transparent;
  background-color: var(--bg);
  color: var(--main);

  &:not(:disabled):hover {
    background-color: var(--bgContrast);
  }
`;

export const Button = styled.button`
  display: flex;
  place-items: center;
  place-content: center;

  height: ${({ size }) => `${size * 3}px`};
  padding: 0 16px;

  border-radius: 8px;
  cursor: pointer;

  font-size: ${({ size }) => `${size}px`};

  transition: background-color 0.3s, color 0.3s;

  ${({ buttonStyle }) => buttonStyle === "primary" && PrimaryButton}
  ${({ buttonStyle }) => buttonStyle === "secondary" && SecondaryButton}
  ${({ buttonStyle }) => buttonStyle === "transparent" && TransparentButton}

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
