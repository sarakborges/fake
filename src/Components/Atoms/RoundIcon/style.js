import styled from "styled-components";

export const RoundIcon = styled.span`
  display: flex;
  place-content: center;
  place-items: center;

  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};

  border-radius: 100%;
  background-color: ${({ bgColor }) => (bgColor ? `var(--${bgColor})` : `bg`)};

  font-size: ${({ size }) => `${size / 2}px`};
  color: var(--white);
`;
