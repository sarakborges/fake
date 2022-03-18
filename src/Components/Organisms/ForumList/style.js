import styled from "styled-components";

export const Forum = styled.ul`
  display: flex;
  flex-flow: column;
  gap: 24px;

  padding: 16px 28px;
`;

export const ForumItem = styled.li`
  padding-bottom: 16px;
  overflow: hidden;

  border-radius: 4px;
`;

export const Category = styled.ul`
  display: flex;
  place-items: center;
  gap: 16px;

  padding: 16px 16px;

  background-color: var(--bgTransparent);
`;

export const SubForumItem = styled.div`
  display: flex;
  place-items: center;
  place-content: space-between;

  padding: 12px 24px;

  background-color: var(--bgTransparent);

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--bgContrastTransparent);
  }
`;

export const SubForumHead = styled.div`
  display: flex;
  place-items: center;
  gap: 8px;
`;

export const SubForumInfo = styled.div`
  display: flex;
  gap: 48px;
`;

export const SubForumIcon = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  width: 24px;
  aspect-ratio: 1;

  background-color: var(--main);
  border-radius: 4px;

  color: var(--white);
  font-size: 12px;
`;

export const InfoAreaWrapper = styled.div`
  display: flex;

  padding: 8px 0;
`;
