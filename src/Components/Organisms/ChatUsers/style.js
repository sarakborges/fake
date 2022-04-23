import styled from "styled-components";

export const PeopleWrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
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

  padding: 16px;
`;

export const NoChatUsers = styled.div`
  display: flex;
  flex-flow: column;
  place-items: center;
  place-content: center;
  gap: 16px;

  flex: 1;
  padding: 16px;
`;
