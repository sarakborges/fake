import styled from "styled-components";

export const InfoCard = styled.div`
  width: 100%;

  position: relative;
`;

export const Cover = styled.span`
  display: flex;

  width: 100%;

  background-color: var(--bg);
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
`;

export const InfoCardContent = styled.span`
  width: 100%;
  padding-right: 24px;

  background-color: var(--bgTransparent);
`;

export const InfoAreaWrapper = styled.span`
  display: flex;
  place-items: center;
  gap: 16px;
  flex: 1;

  > a {
    padding: 24px;
  }
`;

export const MainInfo = styled.span`
  display: flex;
  place-items: center;
  gap: 48px;
  flex: 1;
`;

export const Tags = styled.span`
  display: flex;

  padding: 0 24px 16px;
`;

export const Owner = styled.span`
  > svg {
    color: var(--golden);
    text-shadow: 2px 2px 3px var(--bg);
  }
`;

export const Moderator = styled.span`
  > svg {
    color: var(--silver);
    text-shadow: 2px 2px 3px var(--bg);
  }
`;
