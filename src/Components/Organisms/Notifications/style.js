import styled from "styled-components";

export const NotificationsWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;

  width: 480px;
  max-height: 300px;
  overflow: hidden auto;

  background-color: var(--bgContrast);
  box-shadow: 2px 2px 3px 2px var(--bg);
  border-radius: 0 0 4px 4px;

  opacity: ${({ displayNotifications }) => (displayNotifications ? 1 : 0)};
  visibility: ${({ displayNotifications }) =>
    displayNotifications ? "visible" : "hidden"};

  transition: opacity 0.3s, visibility 0.3s;
`;

export const NoNotificationsWrapper = styled.div`
  display: flex;
  place-items: center;
  place-content: center;
`;

export const NotificationsList = styled.ul`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

export const NotificationsItem = styled.li`
  padding: 12px 24px;

  background-color: var(--bg);

  > a {
    display: flex;
  }
`;

export const NotificationsContent = styled.div`
  display: flex;
  place-items: center;
  gap: 16px;

  > a {
    display: flex;
  }
`;

export const NotificationText = styled.div`
  flex: 1;

  > p:first-child {
    display: flex;
    gap: 6px;

    > a {
      max-width: 100%;

      white-space: nowrap;
      overflow: hidden;
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

export const NotificationsButtons = styled.div`
  display: flex;
  place-items: center;
  gap: 16px;
`;

export const NotificationIcon = styled.span`
  position: relative;
`;

export const Counter = styled.span`
  position: absolute;
  right: 4px;
  top: 4px;

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
