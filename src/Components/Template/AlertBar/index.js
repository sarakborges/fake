// Dependencies
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faBan,
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// Styles
import * as s from "./style";

// Template
const AlertBar = ({ type, children, onCloseClick }) => {
  return (
    <s.Container type={type}>
      <s.IconWrapper>
        {type === "success" && <FontAwesomeIcon icon={faCheckCircle} />}

        {type === "warning" && <FontAwesomeIcon icon={faExclamationCircle} />}

        {(!type || type === "error") && <FontAwesomeIcon icon={faBan} />}
      </s.IconWrapper>

      <s.TextWrapper>{children}</s.TextWrapper>

      <s.CloseWrapper onClick={onCloseClick}>
        <FontAwesomeIcon icon={faTimes} />
      </s.CloseWrapper>
    </s.Container>
  );
};

export default AlertBar;
