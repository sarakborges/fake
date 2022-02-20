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

    transition: background-color 0.3s;

    &:hover {
      background-color: var(--bgTransparent);
    }
  }
`;

export const MainInfo = styled.span`
  display: flex;
  place-items: center;
  gap: 48px;
  flex: 1;
`;

export const TagsList = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  width: 100%;
  padding: 16px 24px;

  > a {
    display: flex;
  }
`;

export const TagItem = styled.span`
  padding: 4px 8px;

  color: var(--white);
  font-size: 12px;

  background-color: ${({ isCommon }) =>
    isCommon ? "var(--main)" : "var(--bgContrast)"};
  border-radius: 4px;
  box-shadow: 2px 2px 3px var(--bg);
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
