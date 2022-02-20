import styled, { css } from "styled-components";

const PrimaryButton = css`
  border: 2px solid var(--main);
  background-color: var(--main);
  color: var(--offWhite);

  &:not(:disabled):hover {
    background-color: var(--offWhite);
    color: var(--main);
  }
`;

const SecondaryButton = css`
  border: 2px solid var(--main);
  background-color: var(--bg);
  color: var(--main);

  &:not(:disabled):hover {
    background-color: var(--white);
  }
`;

const TransparentButton = css`
  border: 2px solid transparent;
  background-color: var(--bg);
  color: var(--main);

  &:not(:disabled):hover {
    background-color: var(--bgContrast);
  }
`;

const SuccessButton = css`
  border: 2px solid var(--green);
  background-color: var(--green);
  color: var(--white);

  &:not(:disabled):hover {
    background-color: var(--white);
    color: var(--green);
  }
`;

const SuccessSecondaryButton = css`
  border: 2px solid var(--green);
  background-color: transparent;
  color: var(--green);

  &:not(:disabled):hover {
    background-color: var(--white);
  }
`;

const WarningButton = css`
  border: 2px solid var(--red);
  background-color: var(--red);
  color: var(--white);

  &:not(:disabled):hover {
    background-color: var(--white);
    color: var(--red);
  }
`;

const WarningSecondaryButton = css`
  border: 2px solid var(--red);
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
  gap: 8px;

  height: ${({ size }) => `${size * 3}px`};
  padding: 0 16px;

  border-radius: 4px;
  box-shadow: 2px 2px 3px var(--bg);
  cursor: pointer;

  font-size: ${({ size }) => `${size}px`};
  font-family: inherit;

  transition: background-color 0.3s, color 0.3s, opacity 0.3s;

  ${({ buttonStyle }) => buttonStyle === "primary" && PrimaryButton}
  ${({ buttonStyle }) => buttonStyle === "secondary" && SecondaryButton}
  ${({ buttonStyle }) => buttonStyle === "transparent" && TransparentButton}
  ${({ buttonStyle }) => buttonStyle === "warning" && WarningButton}
  ${({ buttonStyle }) =>
    buttonStyle === "warning-secondary" && WarningSecondaryButton}
  ${({ buttonStyle }) => buttonStyle === "success" && SuccessButton}
  ${({ buttonStyle }) =>
    buttonStyle === "success-secondary" && SuccessSecondaryButton}

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
