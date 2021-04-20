// Dependencies
import React from "react";
import Link from "next/Link";

// Style
import * as s from "./style";

// Component
const Button = ({ children, customStyle, type, link, newTab, onClick }) => {
  return (
    <>
      {type !== "link" ? (
        <s.Button
          type={type || "button"}
          onClick={onClick}
          customStyle={customStyle}
        >
          {children}
        </s.Button>
      ) : (
        <Link href={link}>
          <s.LinkButton
            target={newTab ? "_blank" : ""}
            customStyle={customStyle}
          >
            {children}
          </s.LinkButton>
        </Link>
      )}
    </>
  );
};

export default Button;
