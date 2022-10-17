import React, { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
const td = new Date();

function Ranking() {
  const [total, setTotal] = useState([{}]);
  const [ranking, setRanking] = useState([{}]);

  const thisYear = td.getFullYear();
  const thisMonth = td.getMonth();

  const [year, setYear] = useState(thisYear);
  const [month, setMonth] = useState(thisMonth);

  const preMonth = () => {
    if (month == 0) {
      getRanking(year - 1, 11);
      setYear(year - 1);
      setMonth(11);
    } else {
      getRanking(year, month - 1);
      setMonth(month - 1);
    }
  };
  const nextMonth = () => {
    if (month == 11) {
      getRanking(year + 1, 0);
      setYear(year + 1);
      setMonth(0);
    } else {
      getRanking(year, month + 1);
      setMonth(month + 1);
    }
  };

  const getRanking = (year, month) => {
    const post1 = {
      query:
        "SELECT COUNT(DISTINCT attendance_date) as t from magnus_attendance WHERE (YEAR(attendance_date) = " +
        year +
        " AND MONTH(attendance_date) = " +
        (month + 1) +
        ");",
    };
    console.log(post1.query);
    fetch("https://teammagnus.net/SQL1", {
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
        (month + 1) +
        ") AND (attendance = 0 OR attendance = 1) GROUP BY id ORDER BY c DESC;",
    };
    fetch("https://teammagnus.net/SQL2", {
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
    getRanking(thisYear, thisMonth);
  }, []);

  var rank = 1;
  const showRanking = ranking.map((user, idx) => (
    <div key={idx} className="div-ranking-section-02">
      <div>
        {idx > 0 && ranking[idx].c < ranking[idx - 1].c ? ++rank : rank}
      </div>
      <div> {user.name}</div>
      <div className="div-ranking-percent">
        {((user.c / total) * 100).toFixed(1)}%
      </div>
    </div>
  ));

  return (
    <div className="div-ranking">
      <div className="div-notice-header"></div>
      <div className="div-month">
        <HiChevronLeft
          className="icon-left"
          size="20"
          onClick={() => preMonth()}
        />
        {year}.{month + 1}
        {year == thisYear && month == thisMonth ? (
          <></>
        ) : (
          <HiChevronRight
            className="icon-right"
            size="20"
            onClick={() => nextMonth()}
          />
        )}
      </div>
      <div className="div-ranking-section-01"> {showRanking}</div>
    </div>
  );
}

export default Ranking;
