import styled from "styled-components";

export const Topbar = styled.div`
  display: flex;
  place-items: center;
  gap: 32px;

  width: 100%;
  min-height: 80px;
  padding-left: 16px;

  background-color: var(--bg);
`;

export const ToggleMenu = styled.div`
  display: none;

  @media (max-width: 1140px) {
    display: flex;
  }
`;

export const SearchWrapper = styled.div`
  flex: 1;

  input {
    background-color: var(--bgContrast);
    border-radius: 8px;
  }

  button {
    border-radius: 8px;
  }
`;

export const ProfileArea = styled.div`
  max-width: 50%;
  height: 100%;

  position: relative;
`;

export const InfoAreaWrapper = styled.div`
  display: flex;
  place-items: center;
  place-content: center;

  height: 100%;
  padding: 0 16px;

  cursor: pointer;

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--bgContrast);
  }
`;
