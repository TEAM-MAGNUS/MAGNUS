import { React, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { BiX, HiOutlineUser, BiMenu } from "react-icons/bi";
import profile from "../asset/header/profile1.png";

function Header() {
  let location = useLocation();
  const [open, setOpen] = useState(false);
  // const [open, setOpen] = useState(true);
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
            <BiX size="22" onClick={onToggle} className={`${animation0}`} />
          ) : (
            <BiMenu size="22" onClick={onToggle} className={`${animation00}`} />
          )}
          <NavLink
            className="link-header div-header-logo"
            to="/"
            onClick={() => {
              if (location.pathname === "/") window.location.reload();
            }}
          >
            TEAM MAGNUS
          </NavLink>
          <NavLink className="link-header" to="/profile">
            {/* <HiOutlineUser size="22" /> */}
            <img src={profile} alt="" style={{ width: "22px" }} />
          </NavLink>
        </div>
      </div>
      {open && (
        <div
          className={`div-header-menu-wrap ${animation1}`}
          // onClick={() => {
          //   onToggle();
          // }}
        >
          <div
            className={`div-header-menu ${animation2}`}
            // onClick={() => {
            //   onToggle();
            // }}
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
              // to="/technique"
              to="/technique"
              onClick={() => {
                onToggle();
              }}
            >
              TECHNIQUE
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
              to="/notice"
              onClick={() => {
                onToggle();
              }}
            >
              NOTICE
            </NavLink>
            {window.localStorage.getItem("m") == 1 && (
              <>
                <br />
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
              </>
            )}
          </div>
          <div
            className="div-header-menu-not"
            onClick={() => {
              onToggle();
            }}
          />
        </div>
      )}
    </>
  );
}

export default Header;
