import styled, { css } from "styled-components";

const PL = css`
  padding-left: ${({ pl }) => (pl ? `${pl}px` : 0)};
`;

export const PageTitle = styled.h1`
  ${PL}
  padding-bottom: 16px;

  font-size: 24px;
  font-weight: 600;
`;

export const Title = styled.h2`
  ${PL}
  padding-bottom: 16px;

  font-size: 24px;
  font-weight: 600;
`;

export const SubTitle = styled.h3`
  ${PL}
  padding-bottom: 16px;

  font-size: 24px;
  font-weight: 600;
`;

export const Text = styled.p`
  ${PL}

  line-height: 1.6;
  font-size: 16px;
  font-weight: 300;
`;
