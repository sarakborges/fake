import styled from "styled-components";

export const TagsForm = styled.div`
  display: flex;
  flex-flow: column;
  gap: 12px;
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;

  padding: 16px;

  border-radius: 4px;
  background-color: var(--bg);
`;

export const Tags = styled.div`
  display: flex;
  gap: 16px;
`;

export const TagItem = styled.div`
  display: flex;
  place-items: center;
  gap: 8px;

  padding: 8px;

  color: var(--white);
  font-size: 12px;

  background-color: var(--main);
  border-radius: 4px;

  cursor: pointer;
`;

export const NewTag = styled.div`
  display: flex;
  place-items: center;
  gap: 16px;
`;
