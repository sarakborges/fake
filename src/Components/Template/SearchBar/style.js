import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  place-content: space-between;
  flex: 1;

  height: 40px;
  margin: 0 30px;
  overflow: hidden;

  background-color: ${({ theme }) => theme.topBar.search.bgColor};
`;

export const Text = styled.div`
  flex: 1;
`;
