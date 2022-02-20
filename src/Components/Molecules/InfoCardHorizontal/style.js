import styled from "styled-components";

export const InfoCard = styled.div`
  display: flex;
  flex-flow: column;

  padding: 16px 24px;
`;

export const CardContent = styled.div`
  display: flex;
  place-items: center;
  gap: 24px;

  > a {
    display: flex;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-flow: column;

  max-width: calc(100% - 64px);
  flex: 1;
`;

export const CardButtons = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;

  > a {
    display: flex;
    place-items: center;
    place-content: center;
    gap: 8px;

    padding: 8px;

    color: var(--white);
    font-size: 12px;

    border: 2px solid var(--main);
    background-color: var(--main);
    border-radius: 4px;

    transition: background-color 0.3s, color 0.3s;

    &:hover {
      color: var(--main);

      background-color: var(--white);
    }
  }
`;

export const TagsList = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  width: 100%;
  padding-top: 16px;

  > a {
    display: flex;
  }
`;

export const TagItem = styled.span`
  padding: 8px;

  color: var(--white);
  font-size: 12px;

  background-color: ${({ isCommon }) =>
    isCommon ? "var(--main)" : "var(--bgContrast)"};
  border-radius: 4px;
`;
