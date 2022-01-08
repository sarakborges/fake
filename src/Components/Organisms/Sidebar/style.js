import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  flex-flow: column;

  width: 320px;
  height: 100vh;
  padding: 32px 0;
`;

export const InfoAreaWrapper = styled.div`
  padding: 0 16px;
`;

export const SelectProfile = styled.div`
  position: absolute;
  left: 0;
  bottom: calc(100% + 16px);
  z-index: 3;

  width: calc(100% + 120px);
  overflow: hidden;

  background-color: var(--bg);
  border-radius: 16px;
  box-shadow: 0 0 5px 3px var(--bgContrast);

  opacity: ${({ displayProfiles }) => (displayProfiles ? 1 : 0)};
  visibility: ${({ displayProfiles }) =>
    displayProfiles ? "visible" : "hidden"};

  transition: opacity 0.3s, visibility 0.3s;
`;

export const NewProfile = styled.div`
  > a {
    display: flex;
    place-content: center;
    place-items: center;
    gap: 8px;

    padding: 16px 0;

    transition: background-color 0.3s;

    &:hover {
      background-color: var(--bgContrast);
    }

    > span {
      display: flex;
      place-content: center;
      place-items: center;

      border-radius: 100%;
      background-color: var(--bgContrast);
    }
  }
`;

export const InfoArea = styled.div`
  position: relative;

  padding: 0 16px;
`;
