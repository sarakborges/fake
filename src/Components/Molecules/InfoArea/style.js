import styled from "styled-components";

export const InfoArea = styled.span`
  display: flex;
  flex-flow: ${({ side }) => (side === "left" ? "row" : "row-reverse")};
  place-items: center;
  gap: ${({ infoGap }) => (infoGap ? `${infoGap}px` : "16px")};
`;

export const TextWrapper = styled.span`
  display: block;

  max-width: calc(100% - 64px);
  flex: 1;
`;

export const Text = styled.span`
  display: flex;
  place-content: center;
  flex-flow: column;

  width: 100%;
  flex: 1;
`;

export const Name = styled.span`
  width: 100%;
  overflow: hidden;

  line-height: 32px;
  font-size: 20px;
  color: var(--main);

  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Url = styled.span`
  width: 100%;
  overflow: hidden;

  line-height: 32px;
  font-size: 16px;
  color: var(--bgInverted);

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CounterList = styled.span`
  display: flex;
  gap: 24px;

  width: 100%;
  flex: 1;
`;

export const Counter = styled.span`
  display: flex;
  place-items: center;
  gap: 8px;

  line-height: 32px;
  font-size: 16px;
  color: var(--bgInverted);
`;

export const CounterIcon = styled.span`
  display: flex;
  place-content: center;
  place-items: center;

  width: 20px;
  height: 20px;

  font-size: 12px;
  color: var(--white);

  background-color: var(--main);
  border-radius: 100%;
`;

export const TagsList = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  width: 100%;
  padding-top: 16px;
`;

export const TagItem = styled.span`
  padding: 8px;

  color: var(--white);
  font-size: 12px;

  background-color: var(--main);
  border-radius: 4px;
`;

export const Link = styled.span`
  display: flex;
  place-items: center;
  place-content: center;

  width: 32px;

  color: var(--main);

  border-radius: 12px;
  transition: background-color 0.3s;
`;

export const InfoAreaBox = styled.div`
  padding: 16px;

  background-color: ${({ isBgContrast }) =>
    isBgContrast ? "var(--bgContrast)" : "var(--bg)"};
  border-radius: ${({ squaredBox }) => (squaredBox ? "none" : "16px")};
  cursor: pointer;

  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: var(--bgContrast);

    box-shadow: ${({ isBgContrast }) =>
      isBgContrast ? "0 0 5px var(--main)" : "none"};
  }
`;
