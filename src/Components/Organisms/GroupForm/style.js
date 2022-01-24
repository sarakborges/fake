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

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: flex-start;
  gap: 32px;
`;
