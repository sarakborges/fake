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

    padding: 24px 0;
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

export const CoverPreview = styled.div`
  div {
    display: flex;
    place-content: center;
    place-items: center;

    width: 100%;
    height: 128px;
    aspect-ratio: 18/4;
    overflow: hidden;

    border-radius: 8px;

    > img {
      width: 100%;
    }
  }
`;
