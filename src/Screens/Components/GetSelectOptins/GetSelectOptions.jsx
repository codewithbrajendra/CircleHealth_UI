import React from "react";

function GetSelectOptions(props) {
  return (
    <option value={props.value} selected={props.selected ?? "selected"}>
      {props.name}
    </option>
  );
}

export default GetSelectOptions;
