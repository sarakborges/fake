import styled from "styled-components";

export const Topbar = styled.div`
  display: flex;
  place-items: center;
  place-content: space-between;
  gap: 16px;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;

  width: 100%;

  background-color: var(--bg);
`;

export const ToggleMenu = styled.div`
  display: none;

  @media (max-width: 1140px) {
    display: flex;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  place-items: center;
  place-content: center;

  width: 400px;

  > p {
    display: flex;
    place-items: center;
    place-content: center;

    height: 48px;
    aspect-ratio: 1;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  place-items: center;
  place-content: center;

  > div {
    position: relative;

    display: flex;
    place-items: center;
    place-content: center;

    height: 72px;

    font-size: 20px;

    > a {
      display: flex;
      place-items: center;
      place-content: center;

      height: 100%;
      aspect-ratio: 1;

      transition: background-color 0.3s;

      &:hover {
        background-color: var(--bgContrast);
      }
    }
  }
`;

export const ActionsButtons = styled.div`
  display: flex;
  place-items: center;
  gap: 12px;

  padding-left: 16px;

  flex: 1;

  > button {
    padding: 0 12px;
  }
`;
