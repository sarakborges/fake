import styled from "styled-components";

export const Cover = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center center;

  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;

  &:before {
    content: "";

    display: block;

    height: 100%;

    background-image: ${({ img }) =>
      img
        ? `linear-gradient(transparent, var(--bgContrast))`
        : `linear-gradient(var(--bg), var(--bgContrast))`};
  }
`;

export const PendingAction = styled.div`
  display: flex;
  place-items: center;
  place-content: center;
  gap: 32px;

  padding: 16px 32px;
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
  gap: 32px;

  position: sticky;
  left: 0;
  top: 0;
  z-index: 2;

  width: 100%;
  margin-bottom: 32px;
  padding: 32px;
  overflow: hidden;

  background-color: var(--bgContrast);
`;

export const DropdownMenu = styled.div`
  position: absolute;
  right: 32px;
  top: 32px;
  z-index: 6;

  > button {
    padding: 0 8px;
    aspect-ratio: 1;

    box-shadow: 2px 2px 3px var(--bgContrast);
    border-radius: 8px;
  }
`;

export const EditLink = styled.div`
  position: absolute;
  right: 32px;
  top: 32px;
  z-index: 6;

  > a {
    display: flex;
    place-items: center;
    place-content: center;
    gap: 8px;

    width: 48px;
    aspect-ratio: 1;

    border-radius: 8px;
    border: 2px solid transparent;
    background-color: var(--bg);
    box-shadow: 2px 2px 3px var(--bgContrast);
    cursor: pointer;

    color: var(--main);
    font-size: 16px;
    font-family: inherit;

    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: var(--bgContrast);
    }
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 1;

  overflow: hidden;

  border-radius: 4px;
  background-color: var(--bg);
  box-shadow: 2px 2px 3px var(--bgContrast);

  white-space: nowrap;

  opacity: ${({ displayMenu }) => (displayMenu ? 1 : 0)};
  visibility: ${({ displayMenu }) => (displayMenu ? "visible" : "hidden")};

  transition: opacity 0.3s, visibility 0.3s;

  > button {
    place-content: flex-start;
    width: 100%;
  }
`;

export const Center = styled.div`
  flex: 1;
`;

export const Info = styled.div`
  display: flex;
  gap: 32px;

  flex: 1;
`;

export const MainInfo = styled.div`
  display: flex;
  flex-flow: column;
  gap: 12px;

  max-width: calc(100% - 80px);

  text-shadow: 2px 2px 3px var(--bgContrast);
  color: var(--white);

  a {
    color: var(--mainVariation);
    font-size: 12px;
  }

  > :is(p, h3) {
    width: 100%;
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.4;
  }
`;

export const Avatar = styled.div`
  display: flex;

  > span {
    box-shadow: 2px 2px 3px var(--bgContrast);
  }
`;

export const Actions = styled.div`
  display: flex;
  place-items: center;
  gap: 24px;

  > div {
    display: flex;
    place-content: center;
    place-items: center;

    position: relative;

    > a {
      display: flex;
      place-content: center;
      place-items: center;
      gap: 8px;

      height: 48px;

      font-size: 16px;
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

    > a,
    > button {
      padding: 12px;

      box-shadow: 2px 2px 3px var(--bgContrast);
    }
  }
`;
