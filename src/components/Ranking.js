import React, { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { TbCrown } from "react-icons/tb";
import SuperEllipse from "react-superellipse";

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
      year: year,
      month: month,
    };
    fetch("https://teammagnus.net/getTotal", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post1),
    })
      .then((res) => res.json())
      .then((json) => {
        setTotal(json.t);
      });

    const post2 = {
      y: year,
      m: month + 1,
    };
    console.log(JSON.stringify(post2));
    fetch("https://teammagnus.net/getProfileImage", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post2),
    })
      .catch((err) => console.log(err))
      .then((res) => res.json())
      .then((json) => {
        console.log("json: " + json);
        setRanking(json);
      });
  };

  useEffect(() => {
    getRanking(thisYear, thisMonth);
  }, []);

  useEffect(() => {
    console.log(ranking);
    console.log(total);
  }, [ranking]);

  var rank = 1;
  var sameCount = 0;
  const showRanking = ranking.map((user, idx) => {
    if (idx > 0 && ranking[idx].c < ranking[idx - 1].c) {
      rank += sameCount;
      sameCount = 1;
      console.log("not same");
    } else {
      sameCount++;
      console.log("same");
    }
    return (
      <div key={idx} className="div-ranking-section-02">
        <div>{rank}</div>
        {user.image ? (
          <div className="div-ranking-img-name">
            <div className="div-ranking-img">
              <SuperEllipse className="img-ranking" r1={0.14} r2={0.5}>
                <img className="img-ranking-squircle" src={user.image} alt="" />
              </SuperEllipse>
            </div>
            {rank == 1 ? (
              <div className="div-ranking-crown-name">
                <TbCrown className="icon-ranking-crown" />
                {user.name}
              </div>
            ) : (
              <div className="div-ranking-name-font">{user.name}</div>
            )}
          </div>
        ) : (
          <>
            {rank == 1 ? (
              <div className="div-ranking-crown-name">
                <TbCrown className="icon-ranking-crown" />
                {user.name}
              </div>
            ) : (
              <div className="div-ranking-name-font">{user.name}</div>
            )}
          </>
        )}
        <div className="div-ranking-percent">
          {((user.c / total) * 100).toFixed(1)}%
        </div>
      </div>
    );
  });

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
        {(year != thisYear || month != thisMonth) && (
          <HiChevronRight
            className="icon-right"
            size="20"
            onClick={() => nextMonth()}
          />
        )}
      </div>
      <div className="div-ranking-section-01">{showRanking}</div>
    </div>
  );
}

export default Ranking;
