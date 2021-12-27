import styled, { css } from "styled-components";

const Style = css`
  padding-top: ${({ pt }) => (pt ? `${pt}px` : 0)};
  padding-bottom: ${({ pb }) => (pb ? `${pb}px` : 0)};
  padding-left: ${({ pl }) => (pl ? `${pl}px` : 0)};

  text-align: ${({ ta }) => (ta ? `${ta}` : "left")};
`;

export const PageTitle = styled.h1`
  ${Style}

  font-size: 24px;
  font-weight: 600;
`;

export const Title = styled.h2`
  ${Style}

  font-size: 24px;
  font-weight: 600;
`;

export const SubTitle = styled.h3`
  ${Style}

  font-size: 24px;
  font-weight: 600;
`;

export const Text = styled.p`
  ${Style}

  line-height: 1.6;
  font-size: 16px;
  font-weight: 300;
`;
