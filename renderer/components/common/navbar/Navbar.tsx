import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "./Logo";
import NavItem from "./NavItem";
import s from "./Navbar.module.css";

const MENU_LIST = [
  { text: "Home", href: "/home" },
  { text: "Todo page", href: "/next" },
  // { text: "About", href: "/about" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`${s.nav}`}>
        <Link href={"/home"}>
          <a>
            <h1 className={`${s.logo}`}>Nextron</h1>
          </a>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`${s.nav__menu_bar}`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} ${s.nav__menu_list}`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
