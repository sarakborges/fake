import styled from "styled-components";

export const SettingsWrapper = styled.div`
  form {
    display: flex;
    flex-flow: column;
    gap: 24px;
  }
`;

export const SettingsSave = styled.div`
  display: flex;
  place-content: flex-end;

  > button {
    width: auto;
  }
`;
