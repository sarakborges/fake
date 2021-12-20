import styled from "styled-components";

export const ProfilesListWrapper = styled.div`
  padding: 48px 32px;
`;

export const Header = styled.div`
  padding-bottom: 32px;
`;

export const Filter = styled.div`
  input {
    background-color: transparent;
  }
`;

export const NewProfile = styled.div`
  display: grid;
  grid-template-columns: repeat(4, calc(25% - ((32px * 3) / 4)));
  gap: 32px;

  padding-bottom: 64px;
`;
