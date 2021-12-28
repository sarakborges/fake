import styled from "styled-components";

export const SettingsWrapper = styled.div`
  display: flex;
  flex-flow: column;

  height: 100%;

  form {
    display: flex;
    flex-flow: column;
    gap: 24px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  place-content: space-between;

  padding-top: 16px;
`;

export const ButtonsSave = styled.div`
  display: flex;
  place-content: flex-end;
  gap: 16px;
`;
