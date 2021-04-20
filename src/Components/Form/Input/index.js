// Dependencies
import React from "react";

// Style
import * as s from "./style";

// Component
const Input = ({ type, customStyle, placeholder, value, setValue }) => {
  return (
    <s.Container customStyle={customStyle}>
      <s.Input
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </s.Container>
  );
};

export default Input;
