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

  font-size: 12px;

  background-color: var(--offWhite);
  border-radius: 4px;
`;

export const CheckboxIcon = styled.span`
  opacity: 0;
  color: var(--main);

  transition: opacity 0.3s;
`;

export const Label = styled.label`
  display: flex;
  place-items: center;
  gap: 8px;

  font-size: 12px;

  transition: color 0.3s;

  > input {
    display: none;

    &:checked + ${Checkbox} > ${CheckboxIcon} {
      opacity: 1;
    }
  }
`;
