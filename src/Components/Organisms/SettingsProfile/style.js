import styled from "styled-components";

export const SettingsWrapper = styled.div`
  form {
    display: flex;
    flex-flow: column;
    gap: 24px;
  }
`;

export const AvatarItem = styled.div`
  display: flex;
  place-items: flex-end;
  gap: 16px;

  width: 100%;
`;

export const AvatarInput = styled.div`
  flex: 1;
  max-width: calc(100% - 16px - 128px);
`;

export const SettingsSave = styled.div`
  display: flex;
  place-content: flex-end;

  > button {
    width: auto;
  }
`;
