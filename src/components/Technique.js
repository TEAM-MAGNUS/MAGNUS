import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiPlus, BiX, BiCheck, BiMinus, BiRedo } from "react-icons/bi";
function Technique() {
  const [technique, setTechnique] = useState([]);
  const [addPageOpen, setAddPageOpen] = useState(false);
  const [newTechnique, setNewTechnique] = useState("");
  const [showChecked, setShowChecked] = useState(false);
  const [isManager, setIsManager] = useState(false);

  const id = window.localStorage.getItem("id");

  const checkManager = () => {
    const post = {
      id: id,
    };
    fetch("https://teammagnus.net/IsManager", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.m);
        if (json.m == 1) {
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

  const checkTechnique = (num, checked) => {
    const post = {
      num: num,
      checked: checked,
    };
    console.log(post);
    fetch("https://teammagnus.net/checkTechnique", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.location.reload();
      window.scrollTo(0, 0);
    });
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
            </div>{" "}
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
