import styled from "styled-components";

export const PendingAction = styled.div`
  display: flex;
  place-items: center;
  place-content: center;
  gap: 32px;

  padding: 16px 28px;

  background-color: var(--bgTransparent);
`;

export const PendingText = styled.div`
  flex: 1;

  b {
    color: var(--white);
  }
`;

export const PendingButtons = styled.div`
  display: flex;
  place-items: center;
  place-content: center;
  gap: 16px;
`;

export const Head = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;

  width: 100%;
  padding: 28px;
`;

export const EditLink = styled.div`
  > a {
    display: flex;
    place-items: center;
    place-content: center;

    height: 42px;
    padding: 0 16px;

    border-radius: 4px;
    border: 2px solid var(--main);
    background-color: var(--main);
    box-shadow: 2px 2px 3px var(--bgContrast);
    cursor: pointer;

    color: var(--white);
    font-size: 14px;
    font-family: inherit;

    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: var(--white);
      color: var(--main);
    }
  }
`;

export const Info = styled.div`
  display: flex;
  place-items: center;
  gap: 24px;

  flex: 1;
`;

export const InfoArea = styled.div`
  text-shadow: 2px 2px 3px var(--bgContrast);
`;

export const Center = styled.div`
  flex: 1;
  min-width: 400px;
`;

export const Actions = styled.div`
  display: flex;
  place-items: center;
  gap: 16px;

  > div {
    display: flex;
    place-content: center;
    place-items: center;

    position: relative;
  }
`;

export const TagsList = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  width: 100%;

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
