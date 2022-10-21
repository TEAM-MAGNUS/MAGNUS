import React, { useEffect, useState } from "react";
import {
  HiPlus,
  HiX,
  HiCheck,
  HiMinus,
  HiChevronDown,
  HiChevronUp,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import MemberAttendance from "./MemberAttendance";
import IsManager from "./IsManager";

var checkedList = [100];

function Member() {
  const [member, setMember] = useState([{}]);

  const getMember = (order1 = "name", order2 = "asc") => {
    const post = {
      order1: order1,
      order2: order2,
    };
    fetch("https://teammagnus.net/getMember", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        setMember(json);
      });
  };

  useEffect(() => {
    IsManager();
    getMember();
  }, []);

  const [newName, setNewName] = useState("");
  const [newPnum, setNewPnum] = useState("");
  const [newJoindate, setNewJoindate] = useState("");
  const [addPageOpen, setAddPageOpen] = useState(false);

  const onChange = (e) => {
    switch (e.target.name) {
      case "name":
        setNewName(e.target.value);
        break;
      case "pnum":
        setNewPnum(e.target.value);
        break;
      case "joindate":
        setNewJoindate(e.target.value);
        break;
      default:
    }
  };

  const addMember = () => {
    const post = {
      name: newName,
      pnum: newPnum,
      join_date: newJoindate,
    };
    fetch("https://teammagnus.net/addMember", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then(window.location.reload());
  };

  const addPage = (
    <>
      <div className="div-member-section">
        <input
          className="input-member-write-name"
          onChange={onChange}
          name="name"
          value={newName}
          placeholder="이름"
        />
        <input
          className="input-member-write-pnum"
          onChange={onChange}
          name="pnum"
          value={newPnum}
          placeholder="000-0000-0000"
        />
        <input
          className="input-member-write-joindate"
          onChange={onChange}
          name="joindate"
          value={newJoindate}
          placeholder="YYYY.MM.DD"
        />
      </div>
    </>
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [name, setName] = useState("");
  const [pnum, setPnum] = useState("");

  const [removeMemberList, setRemoveMemberList] = useState([]);

  const removeMember = () => {
    removeMemberList.map((user) => {
      const post = {
        name: user.name,
        pnum: user.pnum,
      };
      fetch("https://teammagnus.net/removeMember", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(post),
      }).then((res) => res.json());
    });

    window.location.reload();
  };

  const showMember = member.map((user, idx) => (
    <>
      {!isAddOpen && (
        <div
          key={idx}
          className="div-member-section"
          onClick={() => {
            if (!isRemoveOpen) {
              setIsAddOpen(true);
              setName(user.name);
              setPnum(user.pnum);
            }
          }}
        >
          <div className="div-member-name">{user.name}</div>
          <div className="div-member-pnum">{user.pnum}</div>
          <div className="div-member-join">{user.join_date}</div>
          {isRemoveOpen && (
            <HiCheck
              className="button-member-remove-check"
              onClick={() => {
                if (checkedList[idx] == 1) {
                  checkedList[idx] = 0;
                  setRemoveMemberList(
                    removeMemberList.filter(
                      (r) => r.name != user.name && r.pnum != user.pnum
                    )
                  );
                } else {
                  setRemoveMemberList([
                    ...removeMemberList,
                    {
                      name: user.name,
                      pnum: user.pnum,
                    },
                  ]);
                  checkedList[idx] = 1;
                }
              }}
              style={checkedList[idx] == 1 && { backgroundColor: "#d2000f" }}
            />
          )}
        </div>
      )}
    </>
  ));

  const [isColor, setIsColor] = useState(0);

  return (
    <>
      {isAddOpen ? (
        <>
          <MemberAttendance name={name} pnum={pnum} />
        </>
      ) : (
        <div className="div-ranking">
          <div className="div-notice-header"></div>
          <NavLink to="/manage" className="link-header">
            <HiOutlineArrowLeft size="20" className="icon-back" />
          </NavLink>
          <div className="div-month">회원 관리</div>
          {addPageOpen ? (
            <>
              <HiX
                className="button-member-plus"
                onClick={() => {
                  setAddPageOpen(false);
                  setNewName("");
                  setNewPnum("");
                  setNewJoindate("");
                }}
              />
              <HiCheck
                className="button-member-check"
                onClick={() => {
                  if (newName != "" && newPnum != "" && newJoindate != "")
                    addMember(newName, newPnum, newJoindate);
                }}
                style={{
                  backgroundColor:
                    newName != "" && newPnum != "" && newJoindate != ""
                      ? "#e79b42"
                      : "rgba(0, 0, 0, 0.2)",
                }}
              />
            </>
          ) : (
            !isRemoveOpen && (
              <>
                <HiPlus
                  className="button-member-plus"
                  onClick={() => {
                    setAddPageOpen(true);
                  }}
                />
                <HiMinus
                  className="button-member-minus"
                  onClick={() => {
                    setIsRemoveOpen(true);
                  }}
                />
              </>
            )
          )}
          {isRemoveOpen && (
            <>
              <HiCheck
                className="button-member-plus"
                onClick={() => {
                  if (removeMemberList.length != 0) {
                    if (window.confirm("정말 삭제하시겠습니까?")) {
                      removeMember();
                    }
                  }
                }}
                style={{
                  backgroundColor:
                    removeMemberList.length != 0
                      ? "#e79b42"
                      : "rgba(0, 0, 0, 0.2)",
                }}
              />
              <HiX
                className="button-member-minus"
                onClick={() => {
                  setIsRemoveOpen(false);
                  checkedList = [];
                  setRemoveMemberList([]);
                }}
              />
            </>
          )}
          <div className="div-member-section-01">
            {addPageOpen && addPage}
            <div className="div-member-updown-section">
              <div className="div-member-updown">
                <HiChevronUp
                  className={isColor == 0 && "icon-color"}
                  onClick={() => {
                    setIsColor(0);
                    getMember("name", "asc");
                    setRemoveMemberList([]);
                    checkedList = [];
                  }}
                />
                <HiChevronDown
                  className={isColor == 1 && "icon-color"}
                  onClick={() => {
                    setIsColor(1);
                    getMember("name", "desc");
                    setRemoveMemberList([]);
                    checkedList = [];
                  }}
                />
              </div>
              <div className="div-member-updown">
                <HiChevronUp
                  className={isColor == 2 && "icon-color"}
                  onClick={() => {
                    setIsColor(2);
                    getMember("join_date", "asc");
                    setRemoveMemberList([]);
                    checkedList = [];
                  }}
                />
                <HiChevronDown
                  className={isColor == 3 && "icon-color"}
                  onClick={() => {
                    setIsColor(3);
                    getMember("join_date", "desc");
                    setRemoveMemberList([]);
                    checkedList = [];
                  }}
                />
              </div>
            </div>
            {showMember}
          </div>
        </div>
      )}
    </>
  );
}

export default Member;
