import styled from "styled-components";

export const AvatarWrapper = styled.span`
  display: flex;
  place-content: center;
  place-items: center;

  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  overflow: hidden;

  border-radius: 100%;
  background-color: ${({ bgColor }) =>
    bgColor ? `var(--${bgColor})` : `var(--bgContrast)`};
`;

export const Avatar = styled.span`
  width: 100%;
  height: 100%;

  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center center;

  filter: ${({ isBlured }) => (isBlured ? "blur(15px)" : "none")};
`;
