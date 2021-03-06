import styled from "styled-components";

export const NewProfileWrapper = styled.div`
  width: 100%;
  padding: 32px;
`;

export const NewProfileContent = styled.div`
  form {
    display: flex;
    flex-flow: column;
    gap: 24px;

    padding-top: 16px;
  }
`;

export const NewProfileSave = styled.div`
  display: flex;
  place-content: flex-end;
`;

export const Row2Items = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
`;

export const Row3Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
`;
