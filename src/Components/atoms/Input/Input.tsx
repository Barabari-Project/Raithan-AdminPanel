import React, { FC, ChangeEvent } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  outerBoxclassName?: string;
  inputBoxclassName?: string;
  labelBoxclassName?: string;
}

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
          placeholder={placeholder}
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
