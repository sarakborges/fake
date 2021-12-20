import styled from "styled-components";

export const Avatar = styled.span`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};

  border-radius: 100%;
  background-color: var(--bgContrast);
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center center;
`;
