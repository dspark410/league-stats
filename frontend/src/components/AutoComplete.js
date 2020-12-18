import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import style from "./autocomplete.module.css";

export default function AutoComplete({ change, submit }) {
  const [autoFill, setAutoFill] = useState([]);

  return (
    <div className={style.inputContainer}>
      <form onSubmit={submit}>
        <input spellCheck="false" type="text" onChange={change} />
      </form>
      <AiOutlineSearch className={style.searchIcon} onClick={submit} />
    </div>
  );
}
