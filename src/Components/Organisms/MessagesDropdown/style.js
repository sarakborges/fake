import styled from "styled-components";

export const MessagesWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 25%;
  z-index: 1;

  width: 400px;
  max-height: 400px;
  overflow: hidden auto;

  background-color: var(--bgContrast);
  box-shadow: 0 2px 3px 2px var(--bg);
  border-radius: 0 0 4px 4px;

  opacity: ${({ displayMessages }) => (displayMessages ? 1 : 0)};
  visibility: ${({ displayMessages }) =>
    displayMessages ? "visible" : "hidden"};

  transition: opacity 0.3s, visibility 0.3s;
`;

export const NoMessagesWrapper = styled.div`
  display: flex;
  place-items: center;
  place-content: center;
`;

export const MessagesList = styled.ul`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

export const MessagesItem = styled.li`
  padding: 12px 24px;

  background-color: var(--bg);

  > a {
    display: flex;
  }
`;

export const MessagesContent = styled.div`
  display: flex;
  place-items: center;
  gap: 16px;

  > a {
    display: flex;
  }
`;

export const NotificationText = styled.div`
  flex: 1;

  overflow: hidden;
  white-space: nowrap;

  > p:first-child {
    display: flex;
    gap: 6px;

    > a {
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      font-weight: 600;
    }
  }
`;

export const NotificationActions = styled.div`
  display: flex;
  place-content: space-between;
  place-items: center;
  gap: 16px;

  padding-top: 8px;
`;

export const MessagesButtons = styled.div`
  display: flex;
  place-items: center;
  gap: 16px;
`;

export const NotificationIcon = styled.span`
  position: relative;

  display: flex;
  place-content: center;
  place-items: center;

  height: 100%;
  aspect-ratio: 1;

  background-color: ${({ isActive }) =>
    isActive ? "var(--bgContrast)" : "transparent"};
  cursor: pointer;

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--bgContrast);
  }
`;

export const Counter = styled.span`
  position: absolute;
  right: 16px;
  top: 16px;

  display: flex;
  place-content: center;
  place-items: center;

  width: 16px;
  aspect-ratio: 1;

  background-color: var(--main);
  border-radius: 100%;

  font-size: 12px;
  color: var(--white);
`;
