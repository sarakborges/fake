// Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

// Template
const NoNotification = () => {
  return (
    <S.NoNotification>
      <S.NoNotificationWrapper>
        <S.NoNotificationIcon>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </S.NoNotificationIcon>

        <Text type='pagetitle'>Nenhuma notificação</Text>

        <Text ta='center'>
          Você está a par de tudo que demanda sua atenção!
        </Text>
      </S.NoNotificationWrapper>
    </S.NoNotification>
  );
};

export default NoNotification;
