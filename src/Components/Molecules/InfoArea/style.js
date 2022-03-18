import styled from "styled-components";

export const InfoArea = styled.span`
  display: flex;
  flex-flow: ${({ side }) => (side === "left" ? "row" : "row-reverse")};
  place-items: center;
  gap: 16px;
`;

export const Avatar = styled.span`
  > span {
    box-shadow: 2px 2px 3px var(--bg);
  }
`;

export const TextWrapper = styled.span`
  display: flex;
  flex-flow: column;

  width: 100%;
  overflow: hidden;
`;

export const Text = styled.span`
  display: flex;
  place-content: center;
  flex-flow: column;

  width: 100%;
  flex: 1;
  overflow: hidden;

  text-shadow: 2px 2px 3px var(--bgContrast);

  > p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const CounterList = styled.span`
  display: flex;
  gap: 16px;

  width: 100%;
  padding: 4px 0;
  flex: 1;
`;

export const Counter = styled.span`
  display: flex;
  place-items: center;
  gap: 8px;

  font-size: 12px;
  font-weight: 300;
  color: var(--bgInverted);
`;

export const CounterIcon = styled.span`
  display: flex;
  place-content: center;
  place-items: center;

  width: 16px;
  height: 16px;

  font-size: 12px;
  color: var(--white);

  background-color: var(--main);
  border-radius: 100%;
`;

export const TagItem = styled.span`
  padding: 4px 8px;

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
