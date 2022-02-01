import styled from "styled-components";

export const NoNotification = styled.div`
  display: flex;
  place-items: center;
  place-content: center;

  height: 100%;
  width: 100%;
  flex: 1;
  padding: 32px;
`;

export const NoNotificationWrapper = styled.div`
  display: flex;
  flex-flow: column;
  place-items: center;
  place-content: center;
  gap: 32px;

  width: 520px;

  span {
    font-weight: 600;
  }
`;

export const NoNotificationIcon = styled.div`
  padding-bottom: 16px;

  font-size: 128px;
`;
