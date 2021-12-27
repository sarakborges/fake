import styled from "styled-components";

export const SettingsWrapper = styled.div`
  display: flex;
  flex-flow: column;

  height: 100%;
  padding: 16px 0;

  form {
    display: flex;
    flex-flow: column;
    gap: 24px;
  }
`;

export const SettingsSave = styled.div`
  display: flex;
  place-content: flex-end;
`;
