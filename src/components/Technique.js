import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiPlus, BiX, BiCheck, BiMinus, BiRedo } from "react-icons/bi";
import Connection from "./Connection";
function Technique() {
  const [technique, setTechnique] = useState([]);
  const [addPageOpen, setAddPageOpen] = useState(false);
  const [newTechnique, setNewTechnique] = useState("");
  const [showChecked, setShowChecked] = useState(false);
  const [isManager, setIsManager] = useState(false);

  const id = window.localStorage.getItem("id");

  const checkManager = () => {
    Connection("/IsManager", { id: id }).then((res) => {
      if (res.m === 1) {
        setIsManager(true);
      }
    });
  };

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
    Connection("/getTechnique").then((res) => {
      setTechnique(res);
    });
  };

  const addTechnique = () => {
    Connection("/addTechnique", {
      id: window.localStorage.getItem("id"),
      name: window.localStorage.getItem("name"),
      t: newTechnique,
    });
    window.alert("작성 완료되었습니다.");
    setAddPageOpen(false);
    setNewTechnique("");
    getTechnique();
  };

  const removeTechnique = (id, num) => {
    Connection("/removeTechnique", {
      id: id,
      num: num,
    });
    window.alert("삭제 완료되었습니다.");
    getTechnique();
  };

  const checkTechnique = (num, checked) => {
    Connection(
      "/checkTechnique",
      {
        num: num,
        checked: checked,
      },
      true
    );
    window.location.reload();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    checkManager();
    getTechnique();
  }, []);

  const showTechnique = technique.map((t, idx) => {
    return (
      <>
        {t.checked === 0 && (
          <div key={idx} className="div-technique-section-02">
            <div>
              {t.technique}
              {isManager && (
                <BiCheck
                  className="button-technique-check"
                  onClick={() => {
                    checkTechnique(t.t_num, 1);
                  }}
                />
              )}
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
            <div style={{ fontSize: "10px" }}>{t.name}</div>
          </div>
        )}
      </>
    );
  });

  const showCheckedTechnique = technique.map((t, idx) => {
    return (
      <>
        {t.checked === 1 && (
          <div key={idx} className="div-technique-section-02">
            <div>
              {t.technique}
              {isManager && (
                <BiRedo
                  className="button-technique-check"
                  onClick={() => {
                    checkTechnique(t.t_num, 0);
                  }}
                />
              )}
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
            <div style={{ fontSize: "10px" }}>{t.name}</div>
          </div>
        )}
      </>
    );
  });

  return (
    <div className="div-ranking">
      <div className="div-title">TECHNIQUE</div>
      <BiCheck
        className="button-technique-checked"
        style={{ backgroundColor: showChecked && "#d2000f" }}
        onClick={() => {
          setShowChecked(!showChecked);
        }}
      />
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
          {/* <br /> */}
          {/* (5/17부터 작성자 이름이 공개됩니다.) */}
        </div>
      )}
      {addPageOpen && addPage}
      <div className="div-technique-section-01">
        {showChecked ? showCheckedTechnique : showTechnique}
      </div>
    </div>
  );
}

export default Technique;
