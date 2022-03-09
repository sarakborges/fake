import styled from "styled-components";

export const BrightWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);

  > div {
    display: flex;
    place-content: center;
    place-items: center;

    height: 100vh;
  }
`;

export const DarkSide = styled.div`
  color: var(--offWhite);

  background-color: var(--offBlack);

  > button {
    border: 2px solid var(--offWhite);
    background-color: var(--offBlack);

    color: var(--offWhite);

    &:not(:disabled):hover {
      background-color: var(--offWhite);

      color: var(--offBlack);
    }
  }
`;

export const LightSide = styled.div`
  color: var(--offBlack);

  background-color: var(--offWhite);

  > button {
    border: 2px solid var(--offBlack);
    background-color: var(--offWhite);

    color: var(--offBlack);

    &:not(:disabled):hover {
      background-color: var(--offBlack);

      color: var(--offWhite);
    }
  }
`;

export const MainColorWrapper = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  height: 100vh;

  background-color: ${({ bright }) =>
    bright === "dark" ? "var(--offBlack)" : "var(--offWhite)"};

  color: ${({ bright }) =>
    bright === "dark" ? "var(--offWhite)" : "var(--offBlack)"};
`;

export const Purple = styled.div`
  background-color: var(--purple);
`;

export const Green = styled.div`
  background-color: var(--green);
`;

export const ColorsWrapper = styled.div`
  display: flex;
  place-content: center;
  place-items: center;
  gap: 32px;

  > div > button {
    width: 64px;
    aspect-ratio: 1;
  }
`;
