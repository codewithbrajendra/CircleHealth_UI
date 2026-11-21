import React from "react";
import InputBox from "../InputBox/inputBox";
import { FiSearch } from "react-icons/fi";
import "./search.scss";

function SearchBox(props) {
  const { input, className, id } = props;
  return (
    <div className={`Searchbox  ${className}`} id={id}>
      <InputBox {...input} />
      <FiSearch className="searchBoxIcon" />
    </div>
  );
}

export default SearchBox;
