import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HiPlus, HiX, HiCheck, HiMinus } from "react-icons/hi";
function Technique() {
  const [technique, setTechnique] = useState(["asdf", "qwer"]);
  const [test, setTest] = useState([]);
  const [addPageOpen, setAddPageOpen] = useState(false);
  const [newTechnique, setNewTechnique] = useState("");
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
        />
        <HiCheck
          className="button-technique-add-check"
          onClick={() => {
            addTechnique();
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
        setTest(json);
      });
  };
  console.log(technique);

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
      //   window.location.reload();
    });
  };

  const removeTechnique = (ip) => {
    const post = {
      ip: ip,
    };
    fetch("https://teammagnus.net/removeTechnique", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    getTechnique();
  }, []);

  const showTechnique = test.map((t, idx) => {
    return (
      <div key={idx} className="div-technique-section-02">
        <div>{t.technique}</div>
      </div>
    );
  });

  return (
    <div className="div-ranking">
      <div className="div-title">TECHNIQUE</div>
      {addPageOpen ? (
        <>
          <HiX
            className="button-member-plus"
            onClick={() => {
              setAddPageOpen(false);
            }}
          />
        </>
      ) : (
        <HiPlus
          className="button-member-plus"
          onClick={() => {
            setAddPageOpen(true);
          }}
        />
      )}
      <div className="div-title-sub">
        배우고 싶은 기술, 관심 있는 기술을 자유롭게 적어주세요.
      </div>
      <div className="div-technique-section-01">
        {addPageOpen && addPage}
        {showTechnique}
      </div>
    </div>
  );
}

export default Technique;
