import styled from "styled-components";

export const RoundIcon = styled.span`
  display: flex;
  place-content: center;
  place-items: center;

  width: ${({ size }) => (size ? `${size}px` : "100%")};
  aspect-ratio: 1;

  border-radius: 100%;
  background-color: ${({ bgColor }) => (bgColor ? `var(--${bgColor})` : `bg`)};

  font-size: ${({ size }) => (size ? `${size / 2}px` : "140%")};
  color: var(--white);
`;
