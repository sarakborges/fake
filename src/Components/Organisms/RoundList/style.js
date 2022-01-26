import styled from "styled-components";

export const EmptyTitle = styled.div`
  padding-top: 16px;
`;

export const Title = styled.div`
  text-align: center;
  color: var(--main);
`;

export const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% - 8px);
  right: 0;
  z-index: 2;

  padding: 12px;

  color: var(--main);
  white-space: nowrap;

  background-color: var(--bgContrast);
  box-shadow: 2px 2px 3px 2px var(--bg);
  border-radius: 12px;

  opacity: 0;
  visibility: hidden;

  transition: 0.3s opacity, 0.3s visibility;
`;

export const LinkWrapper = styled.div`
  position: relative;

  &:hover > ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }

  > a {
    display: flex;
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  padding: 24px 16px 0;
`;
