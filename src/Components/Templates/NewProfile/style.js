import styled from "styled-components";

export const NewProfileWrapper = styled.div`
  padding: 48px 32px;
`;

export const NewProfileContent = styled.div`
  form {
    display: flex;
    flex-flow: column;
    gap: 24px;

    padding: 24px;

    background-color: var(--bg);
    border-radius: 16px;
  }

  h2 {
    padding-bottom: 32px;

    font-size: 24px;
    font-weight: 600;
  }

  h3 {
    font-size: 20px;
    font-weight: 300;
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

export const NewProfileSave = styled.div`
  display: flex;
  place-content: flex-end;

  > button {
    width: auto;
  }
`;
