import styled, { css } from "styled-components";

const PrimaryButton = css`
  border: 1px solid var(--main);
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
    background-color: var(--white);
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

const WarningButton = css`
  border: 1px solid var(--red);
  background-color: var(--red);
  color: var(--white);

  &:not(:disabled):hover {
    background-color: var(--white);
    color: var(--red);
  }
`;

const WarningSecondaryButton = css`
  border: 1px solid var(--red);
  background-color: transparent;
  color: var(--red);

  &:not(:disabled):hover {
    background-color: var(--white);
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
  font-family: inherit;

  transition: background-color 0.3s, color 0.3s;

  ${({ buttonStyle }) => buttonStyle === "primary" && PrimaryButton}
  ${({ buttonStyle }) => buttonStyle === "secondary" && SecondaryButton}
  ${({ buttonStyle }) => buttonStyle === "transparent" && TransparentButton}
  ${({ buttonStyle }) => buttonStyle === "warning" && WarningButton}
  ${({ buttonStyle }) =>
    buttonStyle === "warning-secondary" && WarningSecondaryButton}

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
