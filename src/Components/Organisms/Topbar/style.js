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
  padding: 0 20px 0 12px;

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
  gap: 8px;

  > p {
    display: flex;
    place-items: center;
    place-content: center;

    height: 48px;
    aspect-ratio: 1;

    > a {
      display: flex;
      place-content: center;
      place-items: center;

      height: 100%;
      width: 100%;
    }
  }
`;

export const ActionsButtons = styled.div`
  display: flex;
  place-items: center;
  gap: 12px;

  flex: 1;

  > button {
    padding: 0 12px;
  }
`;
