import { React, useState } from "react";
import { NavLink } from "react-router-dom";

import { HiX, HiOutlineUser, HiOutlineMenuAlt4 } from "react-icons/hi";

function Header() {
  const [open, setOpen] = useState(false);
  const [animation0, setAnimation0] = useState("");
  const [animation00, setAnimation00] = useState("");
  const [animation1, setAnimation1] = useState("");
  const [animation2, setAnimation2] = useState("");

  const onToggle = () => {
    if (open) {
      setAnimation0("closeAnimation0");
      setAnimation00("openAnimation0");
      setAnimation1("closeAnimation1");
      setAnimation2("closeAnimation2");
      setTimeout(() => {
        setOpen(false);
      }, 270);
    } else {
      setAnimation0("openAnimation0");
      setAnimation1("openAnimation1");
      setAnimation2("openAnimation2");
      setOpen(true);
    }
  };

  return (
    <>
      <div
        className="div-header"
        onClick={() => {
          if (open) onToggle();
        }}
      >
        <div className="div-header-wrap">
          {open ? (
            <HiX size="25" onClick={onToggle} className={`${animation0}`} />
          ) : (
            <HiOutlineMenuAlt4
              size="25"
              onClick={onToggle}
              className={`${animation00}`}
            />
          )}
          <NavLink className="link-header div-header-logo" to="/">
            TEAM MAGNUS
          </NavLink>
          <NavLink className="link-header" to="/profile">
            <HiOutlineUser size="25" />
          </NavLink>
        </div>
      </div>
      {open && (
        <div
          className={`div-header-menu-wrap ${animation1}`}
          onClick={() => {
            onToggle();
          }}
        >
          <div
            className={`div-header-menu ${animation2}`}
            onClick={() => {
              onToggle();
            }}
          >
            <NavLink
              className="link-header"
              to="/attendance"
              onClick={() => {
                onToggle();
              }}
            >
              ATTENDANCE
            </NavLink>
            <br />
            -
            <br />
            <NavLink
              className="link-header"
              to="/calendar"
              onClick={() => {
                onToggle();
              }}
            >
              CALENDAR
            </NavLink>
            <br />
            -
            <br />
            <NavLink
              className="link-header"
              to="/ranking"
              onClick={() => {
                onToggle();
              }}
            >
              RANKING
            </NavLink>
            <br />
            -
            <br />
            <NavLink
              className="link-header"
              to="/notice"
              onClick={() => {
                onToggle();
              }}
            >
              NOTICE
            </NavLink>
            <br />
            -
            <br />
            <NavLink
              className="link-header"
              to="/manage"
              onClick={() => {
                onToggle();
              }}
            >
              MANAGE
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
