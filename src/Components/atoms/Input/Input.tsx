import React, { FC } from "react";
import { InputProps } from "../../../Utils/types/login";

const Input: FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  name = "",
  label = "",
  outerBoxclassName = "",
  inputBoxclassName = "",
  labelBoxclassName = "",
}) => {
  return (
    <div>
      <div className={`${outerBoxclassName}`}>
        <input
          type={type}
          placeholder={placeholder?placeholder:""}
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          className={`${inputBoxclassName}`}
        />
        <label
          htmlFor={name}
          className={`${labelBoxclassName}`}
        >
          {" "}
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
