// Dependencies
import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamation,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// Contexts
import { AppContext } from "Contexts/App";

// Atoms
import Button from "Components/Atoms/Button";

// Style
import * as S from "./style";

const Toast = ({ type, title, text }) => {
  const { appState, appDispatch } = useContext(AppContext);
  const { toast } = appState;

  const handleClose = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        ...toast,
        isVisible: false,
      },
    });
  };

  useEffect(() => {
    if (toast.isVisible) {
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  }, [toast]);

  return (
    <S.Toast isVisible={appState.toast.isVisible} type={type}>
      <S.Icon>
        {type === "success" && <FontAwesomeIcon icon={faCheck} />}
        {type === "warning" && <FontAwesomeIcon icon={faExclamation} />}
        {type === "error" && <FontAwesomeIcon icon={faExclamation} />}
      </S.Icon>

      <S.Text>
        <p>{title}</p>
        <p>{text}</p>
      </S.Text>

      <Button style='transparent' size={20} onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </S.Toast>
  );
};

export default Toast;
