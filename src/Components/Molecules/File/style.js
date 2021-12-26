import styled from "styled-components";

export const File = styled.div`
  padding-bottom: 16px;

  > input {
    display: none;
  }
`;

export const LabelText = styled.label`
  font-size: 12px;
`;

export const Label = styled.label`
  display: flex;
  flex-flow: column;
  place-content: center;
  place-items: center;

  padding: 32px;
  margin-top: 8px;

  border: 4px dotted var(--bgInverted);
  border-radius: 8px;
  cursor: pointer;

  transition: border-color 0.3s, background-color 0.3s;

  &:hover {
    border-color: var(--main);
    background-color: var(--bgContrast);
  }
`;

export const LabelButton = styled.div`
  display: flex;
  place-items: center;
  place-content: center;

  height: 48px;
  padding: 0 16px;

  background-color: var(--main);
  color: var(--offWhite);
  border-radius: 8px;

  font-size: 16px;
`;

export const Preview = styled.div`
  display: flex;
  flex-flow: column;
  place-items: center;

  padding-top: 48px;
`;
