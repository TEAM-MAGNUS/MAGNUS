import React, { useEffect, useState } from "react";
import { BiPlus, BiX, BiMinus, BiCheck } from "react-icons/bi";
import Connection from "./Connection";

function Notice() {
  const [notice, setNotice] = useState([{}]);
  const [contentOpen, setContentOpen] = useState(false);
  const [writeOpen, setWriteOpen] = useState(false);

  const isManager = () => {
    Connection("/isManager", {
      id: window.localStorage.getItem("id"),
    }).then((res) => {
      if (res.m == 1) {
        window.localStorage.setItem("m", 1);
      } else {
        if (window.localStorage.getItem("m") == 1) {
          window.localStorage.setItem("m", 0);
          window.location.reload();
        }
        window.localStorage.setItem("m", 0);
      }
    });
  };

  const getNotice = () => {
    Connection("/getNotice").then((res) => {
      setNotice(res);
    });
  };

  useEffect(() => {
    getNotice();
    isManager();
  }, []);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const writeNotice = () => {
    Connection(
      "/writeNotice",
      {
        title: newTitle,
        content: newContent,
      },
      true
    );
    window.alert("작성 완료되었습니다.");
    window.location.reload();
  };

  const removeNotice = () => {
    Connection(
      "/removeNotice",
      {
        num: num,
      },
      true
    );
    window.alert("삭제 완료되었습니다.");
    window.location.reload();
  };

  const [num, setNum] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const showTitle = notice.map((n) => (
    <div
      className="div-notice-section-02"
      onClick={() => {
        isManager();
        setNum(n.num);
        setTitle(n.title);
        setContent(n.content);
        setContentOpen(true);
      }}
    >
      <div className="div-notice-title">{n.title}</div>
      <div className="div-notice-time">{n.time}</div>
    </div>
  ));

  const showContent = (
    <div className="div-notice-section-03">
      <div className="div-month-title">{title}</div>
      <div className="div-notice-content">
        <pre className="pre-notice-content">{content}</pre>
      </div>
      <BiX
        className="icon-notice-close"
        onClick={() => setContentOpen(false)}
      />
      {window.localStorage.getItem("m") == 1 && (
        <BiMinus
          className="icon-notice-close"
          onClick={() => {
            isManager();
            if (window.confirm("정말 삭제하시겠습니까?")) {
              removeNotice(num);
            }
          }}
        />
      )}
    </div>
  );

  const onChange = (e) => {
    switch (e.target.name) {
      case "title":
        setNewTitle(e.target.value);
        break;
      case "content":
        setNewContent(e.target.value);
        break;
      default:
    }
  };

  const writePage = (
    <div className="div-notice-section-03">
      <div className="div-month">
        <input
          className="input-notice-write-title"
          maxLength={30}
          onChange={onChange}
          name="title"
          value={newTitle}
          placeholder="제목"
        ></input>
      </div>
      <div className="div-notice-content">
        <textarea
          className="textarea-notice-write-content"
          maxLength={500}
          onChange={onChange}
          name="content"
          value={newContent}
          placeholder="내용"
        />
      </div>
      <BiX
        className="icon-notice-close"
        onClick={() => {
          setWriteOpen(false);
          setNewTitle("");
          setNewContent("");
        }}
      />
      {newTitle != "" && newContent != "" && (
        <BiCheck
          className="icon-notice-close"
          onClick={() => writeNotice()}
          style={{ backgroundColor: "#e79b42" }}
        />
      )}
    </div>
  );

  return (
    <div
      className={
        contentOpen || writeOpen ? "div-ranking scrollLock" : "div-ranking"
      }
    >
      <div className="div-notice-header"></div>
      <div className="div-title">NOTICE</div>
      <div className="div-notice-section-01"> {showTitle}</div>
      {contentOpen && showContent}
      {writeOpen
        ? writePage
        : window.localStorage.getItem("m") == 1 && (
            <BiPlus
              className="button-notice-write"
              onClick={() => {
                setWriteOpen(true);
              }}
            />
          )}
    </div>
  );
}

export default Notice;
