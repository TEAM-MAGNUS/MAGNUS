import React, { useEffect, useState } from "react";
import { HiPlus, HiX, HiMinus, HiCheck } from "react-icons/hi";

function Notice() {
  const [notice, setNotice] = useState([{}]);
  const [contentOpen, setContentOpen] = useState(false);
  const [writeOpen, setWriteOpen] = useState(false);

  const getNotice = () => {
    fetch("https://teammagnus.net/getNotice", {
      method: "post",
      headers: { "content-type": "application/json" },
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
      title: newTitle,
      content: newContent,
    };

    fetch("https://teammagnus.net/writeNotice", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(window.location.reload());
  };

  const removeNotice = (num) => {
    const post = {
      num: num,
    };
    fetch("https://teammagnus.net/removeNotice", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(window.location.reload());
  };

  const [num, setNum] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const showTitle = notice.map((n) => (
    <div
      className="div-notice-section-02"
      onClick={() => {
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
      <div className="div-notice-content">{content}</div>
      <HiX
        className="icon-notice-close"
        onClick={() => setContentOpen(false)}
      />
      <HiMinus
        className="icon-notice-close"
        onClick={() => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            removeNotice(num);
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
      <div className="div-month">공지사항</div>
      <div className="div-notice-section-01"> {showTitle}</div>
      {contentOpen ? showContent : <></>}
      {writeOpen ? (
        writePage
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
