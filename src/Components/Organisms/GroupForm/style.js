import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  padding: 32px;
`;

export const FormContent = styled.div`
  form {
    display: flex;
    flex-flow: column;
    gap: 24px;

    padding: 24px;

    background-color: var(--bg);
    border-radius: 16px;
  }
`;

export const FormSave = styled.div`
  display: flex;
  place-content: flex-end;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
`;
