import styled from "styled-components";

export const CheckboxWrapper = styled.div`
  display: flex;
  place-items: center;

  width: 100%;
`;

export const Checkbox = styled.span`
  display: flex;
  place-content: center;
  place-items: center;

  width: 16px;
  height: 16px;

  background-color: var(--offWhite);

  &:before {
    content: "";

    width: 12px;
    height: 12px;

    opacity: 0;
    background-color: var(--main);

    transition: opacity 0.3s;
  }
`;

export const Label = styled.label`
  display: flex;
  place-items: center;
  gap: 8px;

  font-size: 12px;

  transition: color 0.3s;

  > input {
    display: none;

    &:checked + ${Checkbox}:before {
      opacity: 1;
    }
  }
`;
