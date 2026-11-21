import React, { useRef } from "react";
import "./inputBox.scss";

const InputBox = React.forwardRef((props, ref) => {
  //const Input = useRef(null);
  const clickToFocus = () => {
    //alert("ok");
    ref.current.focus();
  };

  return (
    <div
      className={`input__Wrapper ${props.styled && "style_" + props.styled}`}
    >
      <div className={props.error !== "" ? "error" : ""}>
        {props.styled === "1" && (
          <label className="input__label_1 d-block" htmlFor={props.label}>
            {props.label}
          </label>
        )}
        <input ref={ref} {...props} />

        {props.styled === "2" && (
          <label
            className="input__label"
            htmlFor={props.label}
            onClick={clickToFocus}
          >
            {props.label}
          </label>
        )}
        {props.error && (
          <label className="error has-error">{props.error}</label>
        )}
      </div>
    </div>
  );
});

export default InputBox;
