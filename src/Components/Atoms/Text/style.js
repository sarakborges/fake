import styled, { css } from "styled-components";

const Style = css`
  padding-top: ${({ pt }) => (pt ? `${pt}px` : 0)};
  padding-bottom: ${({ pb }) => (pb ? `${pb}px` : 0)};
  padding-left: ${({ pl }) => (pl ? `${pl}px` : 0)};

  text-align: ${({ ta }) => (ta ? `${ta}` : "left")};
  font-size: ${({ fs }) => (fs ? `${fs}px` : "16px")};
  font-weight: ${({ fw }) => (fw ? `${fw}` : "300")};
  line-height: ${({ lh }) => (lh ? `${lh}` : 1)};
  color: ${({ fc }) => (fc ? `var(--${fc})` : "inherit")};
  font-family: "Open Sans", sans-serif;
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

  font-size: 20px;
`;

export const Text = styled.p`
  ${Style}

  line-height: 1.6;
  font-weight: 300;
  font-size: 16px;
`;

export const Custom = styled.p`
  ${Style}
`;
