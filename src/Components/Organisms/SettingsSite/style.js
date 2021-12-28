import styled from "styled-components";

export const SettingsWrapper = styled.div`
  form {
    display: flex;
    place-items: center;
  }
`;

export const ThemeOptions = styled.div`
  display: flex;
  gap: 16px;

  padding-left: 32px;

  > button {
    padding: 0;
  }
`;

export const ThemeButton = styled.span`
  width: 32px;
  height: 32px;

  border-radius: 8px;
  border: 2px solid
    ${({ isActive }) => (isActive ? "var(--main)" : "transparent")};

  background-color: ${({ thumb }) => thumb};

  transition: border-color 0.3s;
`;
