import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 24px;

  background-color: var(--bg);
  border-radius: 16px;

  &:not(:last-child) {
    margin-bottom: 48px;
  }
`;

export const Header = styled.div`
  padding-bottom: 32px;
`;
