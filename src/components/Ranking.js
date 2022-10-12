import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const today = dayjs(new Date());

function Ranking() {
  const [total, setTotal] = useState([{}]);
  const [ranking, setRanking] = useState([{}]);

  const getRanking = () => {
    const year = today.format("YYYY");
    const month = today.format("MM");
    const post1 = {
      query:
        "SELECT COUNT(DISTINCT attendance_date) as t from magnus_attendance WHERE (YEAR(attendance_date) = " +
        year +
        " AND MONTH(attendance_date) = " +
        month +
        ");",
    };
    fetch("http://localhost:8080/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post1),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.t);
        setTotal(json.t);
      });

    const post2 = {
      query:
        "SELECT id, name, COUNT(id) AS c from magnus_attendance WHERE (YEAR(attendance_date) = " +
        year +
        " AND MONTH(attendance_date) = " +
        month +
        ") AND (attendance = 0 OR attendance = 1) GROUP BY id ORDER BY c DESC;",
    };
    fetch("http://localhost:8080/SQL2", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post2),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setRanking(json);
      });
  };

  useEffect(() => {
    getRanking();
  }, []);

  const showRanking = ranking.map((user, idx) => (
    <div key={idx} className="div-ranking-section-02">
      <div>{idx + 1}</div>
      <div> {user.id}</div>
      <div> {user.name}</div>
      <div className="div-ranking-percent">
        {((user.c / total) * 100).toFixed(1)}%
      </div>
    </div>
  ));

  return (
    <div className="div-ranking">
      <div className="div-month">{today.format("YYYY.MM")}</div>
      <div className="div-ranking-section-01"> {showRanking}</div>
    </div>
  );
}

export default Ranking;
