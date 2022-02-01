import styled from "styled-components";

export const PeopleWrapper = styled.div`
  display: flex;
  flex-flow: column;

  width: 400px;
`;

export const PeopleList = styled.ul`
  display: flex;
  flex-flow: column;
  flex: 1;

  width: 100%;
  overflow: hidden;
  overflow-y: auto;
`;

export const PeopleFilter = styled.div`
  display: flex;
  place-items: center;

  padding: 0 16px;
  height: 100px;

  background-color: var(--bg);
`;
