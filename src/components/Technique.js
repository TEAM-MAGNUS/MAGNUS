import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiPlus, BiX, BiCheck, BiMinus } from "react-icons/bi";
function Technique() {
  const [technique, setTechnique] = useState([]);
  const [addPageOpen, setAddPageOpen] = useState(false);
  const [newTechnique, setNewTechnique] = useState("");
  const id = window.localStorage.getItem("id");
  const onChange = (e) => {
    setNewTechnique(e.target.value);
  };
  const addPage = (
    <>
      <div className="div-technique-write-section">
        <input
          className="input-technique-write"
          onChange={onChange}
          name="technique"
          value={newTechnique}
          placeholder="기술명"
          type="text"
          maxLength="15"
        />
        <BiCheck
          className="button-technique-add-check"
          onClick={() => {
            newTechnique != "" && addTechnique();
          }}
          style={newTechnique != "" && { backgroundColor: "#e79b42" }}
        />
      </div>
    </>
  );
  const getTechnique = () => {
    fetch("https://teammagnus.net/getTechnique", {
      method: "post",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTechnique(json);
      });
  };

  const addTechnique = () => {
    const post = {
      id: window.localStorage.getItem("id"),
      t: newTechnique,
    };
    console.log(post);
    fetch("https://teammagnus.net/addTechnique", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.alert("작성 완료되었습니다.");
      window.location.reload();
    });
  };

  const removeTechnique = (id, num) => {
    const post = {
      id: id,
      num: num,
    };
    fetch("https://teammagnus.net/removeTechnique", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.alert("삭제 완료되었습니다.");
      window.location.reload();
    });
  };

  useEffect(() => {
    getTechnique();
  }, []);

  const showTechnique = technique.map((t, idx) => {
    return (
      <div key={idx} className="div-technique-section-02">
        <div>{t.technique}</div>
        {id == t.id && (
          <BiMinus
            className="button-technique-remove-check"
            onClick={() => {
              if (window.confirm("정말 삭제하시겠습니까?")) {
                removeTechnique(id, t.t_num);
              }
            }}
          />
        )}
      </div>
    );
  });

  return (
    <div className="div-ranking">
      <div className="div-title">TECHNIQUE</div>
      {addPageOpen ? (
        <>
          <BiX
            className="button-technique-plus"
            onClick={() => {
              setAddPageOpen(false);
            }}
          />
        </>
      ) : (
        <BiPlus
          className="button-technique-plus"
          onClick={() => {
            setAddPageOpen(true);
          }}
        />
      )}
      {!addPageOpen && (
        <div className="div-title-sub">
          배우고 싶은 기술, 관심 있는 기술을 자유롭게 적어주세요.
        </div>
      )}
      {addPageOpen && addPage}

      <div className="div-technique-section-01">{showTechnique}</div>
    </div>
  );
}

export default Technique;
