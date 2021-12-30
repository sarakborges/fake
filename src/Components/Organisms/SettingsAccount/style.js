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
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
`;
