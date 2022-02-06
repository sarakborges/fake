import styled from "styled-components";

export const EmptyTitle = styled.div`
  padding-top: 16px;
`;

export const TagsList = styled.div`
  width: 100%;
  padding: 16px 2px;

  background-color: var(--bg);
  border-radius: 16px;
`;

export const Title = styled.div`
  text-align: center;
  color: var(--main);
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  place-content: center;
  gap: 8px;

  padding: 16px 16px 0;
`;

export const TagItem = styled.a`
  display: flex;
  place-items: center;

  padding: 8px;

  border-radius: 4px;
  background-color: ${({ isCommon }) =>
    isCommon ? "var(--main)" : "var(--bgContrast)"};

  font-size: 12px;
  color: var(--white);
`;
