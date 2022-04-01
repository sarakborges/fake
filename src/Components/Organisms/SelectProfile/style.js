import styled from "styled-components";

export const SelectProfileWrapper = styled.div`
  position: relative;
`;

export const ActiveProfile = styled.div`
  display: flex;
  place-content: space-between;
  place-items: center;
  gap: 16px;

  width: 100%;
  padding: 0 16px;
  overflow: hidden;
`;

export const ActiveInfo = styled.div`
  flex: 1;
  padding: 16px 0;

  overflow: hidden;
`;

export const Settings = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 8px;

  padding: 0 16px 20px;

  a {
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }

  > div {
    display: flex;
    place-items: center;
    gap: 8px;

    &:before {
      content: "";

      width: 4px;
      height: 4px;
      margin-top: 2px;

      background-color: var(--bgInverted);
    }
  }
`;

export const Logout = styled.div`
  > span {
    cursor: pointer;

    font-size: 14px;
    color: var(--main);

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SelectProfile = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 3;

  width: 480px;
  overflow: hidden;

  background-color: var(--bgContrast);
  border-radius: 0 0 4px 4px;
  box-shadow: 0 3px 5px var(--bg);

  opacity: ${({ displayProfiles }) => (displayProfiles ? 1 : 0)};
  visibility: ${({ displayProfiles }) =>
    displayProfiles ? "visible" : "hidden"};

  transition: opacity 0.3s, visibility 0.3s;
`;

export const SelectProfileHeader = styled.div`
  display: flex;
  place-content: space-between;
  place-items: center;

  padding: 0 16px 16px;
`;

export const ListStyle = styled.div`
  display: flex;
  place-items: center;
  gap: 8px;

  > button {
    aspect-ratio: 1;
  }
`;

export const InfoAreaWrapper = styled.div`
  display: flex;

  padding: 16px;

  background-color: ${({ highlighted }) =>
    highlighted ? "var(--bgContrast)" : "transparent"};
  cursor: pointer;

  transition: background-color 0.3s;
`;
