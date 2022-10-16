import React, { useEffect, useState } from "react";
import { HiPlus, HiX, HiMinus, HiCheck } from "react-icons/hi";

function Notice() {
  const [notice, setNotice] = useState([{}]);
  const [contentOpen, setContentOpen] = useState(false);
  const [writeOpen, setWriteOpen] = useState(false);

  const getNotice = () => {
    const post = {
      query:
        "SELECT title, content, DATE_FORMAT(notice_time, '%Y-%m-%d') as time FROM magnus_notice ORDER BY notice_time DESC;",
      // "SELECT title, content, DATE_FORMAT(notice_time, '%Y-%m-%d %H:%i:%S') as time FROM magnus_notice ORDER BY notice_time DESC;",
    };

    fetch("http://15.165.207.25:80/SQL2", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        setNotice(json);
      });
  };

  useEffect(() => {
    getNotice();
  }, []);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const writeNotice = () => {
    const post = {
      query:
        "INSERT INTO magnus_notice VALUES ('" +
        newTitle +
        "','" +
        newContent +
        "', NOW());",
    };

    fetch("http://15.165.207.25:80/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    });

    window.location.reload();
  };

  const removeNotice = (title, content) => {
    const post = {
      query:
        "DELETE FROM magnus_notice WHERE ( title = '" +
        title +
        "' AND content = '" +
        content +
        "');",
    };
    fetch("http://15.165.207.25:80/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(window.location.reload());
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const showTitle = notice.map((n) => (
    <div
      className="div-notice-section-02"
      onClick={() => {
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
      <div className="div-notice-content">{content}</div>
      <HiX
        className="icon-notice-close"
        onClick={() => setContentOpen(false)}
      />
      <HiMinus
        className="icon-notice-close"
        onClick={() => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            removeNotice(title, content);
          }
        }}
      />
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
      <HiX
        className="icon-notice-close"
        onClick={() => {
          setWriteOpen(false);
          setNewTitle("");
          setNewContent("");
        }}
      />
      {newTitle == "" || newContent == "" ? (
        <></>
      ) : (
        <HiCheck className="icon-notice-close" onClick={() => writeNotice()} />
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
      <div className="div-month">NOTICE</div>
      <div className="div-notice-section-01"> {showTitle}</div>
      {contentOpen ? showContent : <></>}
      {writeOpen ? writePage : <></>}
      {writeOpen ? (
        <HiX
          className="button-notice-write"
          onClick={() => {
            setWriteOpen(false);
            setNewContent("");
          }}
        />
      ) : (
        <HiPlus
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
