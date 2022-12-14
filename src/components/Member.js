import React, { useEffect, useState } from "react";
import {
  BiPlus,
  BiX,
  BiCheck,
  BiMinus,
  BiChevronDown,
  BiChevronUp,
  BiLeftArrowAlt,
} from "react-icons/bi";
import { NavLink } from "react-router-dom";
import FormatDate from "./FormatDate";
import FormatPnum from "./FormatPnum";
import MemberAttendance from "./MemberAttendance";

var checkedList = [100];

function Member() {
  const [member, setMember] = useState([{}]);

  const getMember = (order1 = "name", order2 = "asc") => {
    const post = {
      order1: order1,
      order2: order2,
      id: window.localStorage.getItem("id"),
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
        e.target.value = FormatPnum(e.target.value);
        setNewPnum(e.target.value);
        break;
      case "joindate":
        e.target.value = FormatDate(e.target.value);
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
    }).then(() => {
      window.alert("추가 완료되었습니다.");
      window.location.reload();
    });
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
          maxLength={5}
        />
        <input
          className="input-member-write-pnum"
          onChange={onChange}
          name="pnum"
          value={newPnum}
          placeholder="000-0000-0000"
          maxLength={13}
        />
        <input
          className="input-member-write-joindate"
          onChange={onChange}
          name="joindate"
          value={newJoindate}
          placeholder="YYYY.MM.DD"
          maxLength={10}
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
      }).then(() => {
        window.location.reload();
      });
    });
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
            <BiCheck
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
          <BiX
            size="20"
            className="icon-back"
            onClick={() => setIsAddOpen(false)}
          />
        </>
      ) : (
        <div className="div-ranking">
          <div className="div-notice-header"></div>
          <NavLink to="/manage" className="link-header">
            <BiLeftArrowAlt size="20" className="icon-back" />
          </NavLink>
          <div className="div-month-title">회원 관리</div>
          {addPageOpen ? (
            <>
              <BiX
                className="button-member-plus"
                onClick={() => {
                  setAddPageOpen(false);
                  setNewName("");
                  setNewPnum("");
                  setNewJoindate("");
                }}
              />
              <BiCheck
                className="button-member-check"
                onClick={() => {
                  if (newName != "" && newPnum != "" && newJoindate != "")
                    if (
                      window.confirm(
                        "이름, 번호, 가입기수를 확인해주세요.\n이름:" +
                          newName +
                          "\n번호: " +
                          newPnum +
                          "\n가입기수: " +
                          newJoindate
                      )
                    )
                      addMember(newName, newPnum, newJoindate);
                }}
                style={{
                  backgroundColor:
                    newName != "" && newPnum != "" && newJoindate != ""
                      ? "#e79b42"
                      : "rgba(0, 0, 0, 0.05)",
                }}
              />
            </>
          ) : (
            !isRemoveOpen && (
              <>
                <BiPlus
                  className="button-member-plus"
                  onClick={() => {
                    setAddPageOpen(true);
                  }}
                />
                <BiMinus
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
              <BiCheck
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
                      : "rgba(0, 0, 0, 0.05)",
                }}
              />
              <BiX
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
                <BiChevronUp
                  className={isColor == 0 && "icon-color"}
                  onClick={() => {
                    setIsColor(0);
                    getMember("name", "asc");
                    setRemoveMemberList([]);
                    checkedList = [];
                  }}
                />
                <BiChevronDown
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
                <BiChevronUp
                  className={isColor == 2 && "icon-color"}
                  onClick={() => {
                    setIsColor(2);
                    getMember("join_date", "asc");
                    setRemoveMemberList([]);
                    checkedList = [];
                  }}
                />
                <BiChevronDown
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
