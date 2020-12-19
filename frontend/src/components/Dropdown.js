import React, { useState } from "react";
import style from "./dropdown.module.css";
import { Link } from "react-router-dom";

function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={
          click ? `${style.dropdownMenu} ${style.clicked}` : style.dropdownMenu
        }
      >
        <li>
          <Link
            className={style.dropdownLink}
            to="/champions"
            onClick={() => setClick(false)}
          >
            Champion List
          </Link>
        </li>
        <li>
          <Link
            className={style.dropdownLink}
            to="/championrotation"
            onClick={() => setClick(false)}
          >
            Champion Rotation
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Dropdown;
