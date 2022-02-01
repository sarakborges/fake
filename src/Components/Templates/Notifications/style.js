import styled from "styled-components";

export const NotificationsWrapper = styled.div`
  width: 100%;
  padding: 32px;
`;

export const NoNotificationsWrapper = styled.div`
  display: flex;
  place-items: center;
  place-content: center;

  min-height: 100vh;
`;

export const NotificationsList = styled.ul`
  display: flex;
  flex-flow: column;
  gap: 16px;

  padding-top: 16px;
`;

export const NotificationsItem = styled.li`
  display: flex;
  place-items: center;
  gap: 24px;

  padding: 24px;

  box-shadow: 2px 2px 3px 2px var(--bg);
  background-color: var(--bg);
  border-radius: 16px;

  > a {
    display: flex;
  }
`;

export const NotificationText = styled.div`
  flex: 1;
  max-width: calc(100% - 96px - 250px);

  > p:first-child {
    display: flex;
    gap: 6px;

    > a {
      max-width: calc(100% - 280px);

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
    }
  }
`;

export const NotificationActions = styled.div`
  display: flex;
  gap: 16px;
`;
