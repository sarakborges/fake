import styled from "styled-components";

export const InfoCard = styled.div`
  display: flex;
  gap: 24px;

  padding-right: 24px;
  overflow: hidden;

  border-radius: 16px;
  background-color: var(--bg);
`;

export const CardBar = styled.div`
  width: 12px;

  background-color: var(--main);
`;

export const CardContent = styled.div`
  display: flex;
  place-items: center;
  gap: 24px;

  flex: 1;
  padding: 24px 0;

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

    padding: 12px;

    color: var(--white);

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
