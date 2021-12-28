import styled from "styled-components";

export const SettingsWrapper = styled.div`
  display: flex;
  flex-flow: column;

  flex: 1;
  padding: 32px;
`;

export const SettingsContent = styled.div`
  display: flex;
  flex-flow: column;

  height: 100%;
  padding-top: 32px;

  form {
    padding: 24px;

    background-color: var(--bg);
    border-radius: 16px;
  }
`;
