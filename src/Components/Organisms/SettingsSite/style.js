import styled from "styled-components";

export const List = styled.div`
  display: flex;
  flex-flow: column;
  gap: 32px;
`;

export const Row = styled.div`
  display: flex;
  place-items: center;
`;

export const ThemeOptions = styled.div`
  display: flex;
  gap: 16px;

  padding-left: 32px;

  > button {
    padding: 0;
    background: none;
  }
`;

export const ThemeButton = styled.span`
  width: 32px;
  height: 32px;

  border-radius: 8px;
  box-shadow: 0 0 3px
    ${({ isActive }) => (isActive ? "var(--main)" : "var(--bgInverted)")};
  background-color: ${({ thumb }) => thumb};

  transition: border-color 0.3s;
`;
