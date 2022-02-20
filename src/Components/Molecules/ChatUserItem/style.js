import styled from "styled-components";

export const PersonWrapper = styled.span`
  display: flex;
  place-items: center;
  gap: 24px;

  width: 100%;
  padding: 16px;

  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? "var(--bgContrast)" : "transparent"};

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--bg);
  }
`;

export const PersonAvatar = styled.div`
  display: flex;

  min-width: 48px;
`;

export const PersonTextWrapper = styled.div`
  overflow: hidden;

  > p {
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
