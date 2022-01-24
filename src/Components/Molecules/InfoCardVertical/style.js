import styled, { css } from "styled-components";

export const InfoCard = styled.div`
  display: flex;
  flex-flow: column;
  place-items: center;
  gap: 24px;

  width: 356px;
  padding: 32px;

  border-radius: 16px;
  background-color: var(--bg);
`;

export const Avatar = styled.div`
  > a {
    display: flex;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-flow: column;
  place-items: center;

  width: 100%;
`;

export const Name = styled.div`
  width: 100%;

  h2 {
    max-width: 100%;
    height: 28px;
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const CardButtons = styled.div`
  display: flex;
  flex-flow: column;

  padding-top: 16px;

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

const CrownCss = css`
  display: flex;
  place-items: center;
  place-content: center;
  gap: 16px;
`;

export const Owner = styled.span`
  ${CrownCss}

  > svg {
    color: var(--golden);
  }
`;

export const Moderator = styled.span`
  ${CrownCss}

  > svg {
    color: var(--silver);
  }
`;
