import { React, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { HiX, HiOutlineUser, HiOutlineMenuAlt4 } from "react-icons/hi";

function Header() {
  const [open, setOpen] = useState(false);
  const [animation1, setAnimation1] = useState("openAnimation1");
  const [animation2, setAnimation2] = useState("openAnimation2");

  const onToggle = () => {
    if (open) {
      setAnimation1("closeAnimation1");
      setAnimation2("closeAnimation2");
      setTimeout(() => {
        setOpen(false);
      }, 500);
    } else {
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
            <HiX size="25" onClick={onToggle} />
          ) : (
            <HiOutlineMenuAlt4 size="25" onClick={onToggle} />
          )}
          <div
            className="div-header-logo"
            onClick={() => (window.location.href = "/")}
          >
            TEAM MAGNUS
          </div>
          <HiOutlineUser
            size="25"
            onClick={() => (window.location.href = "/profile")}
          />
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
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
