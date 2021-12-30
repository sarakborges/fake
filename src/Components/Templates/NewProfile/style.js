import styled from "styled-components";

export const NewProfileWrapper = styled.div`
  padding: 32px;
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
`;

export const NewProfileSave = styled.div`
  display: flex;
  place-content: flex-end;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
`;
