import React, { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
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
        console.log(json);
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

  let rank = 1;
  let sameCount = 0;
  const [isSole, setIsSole] = useState(true);

  useEffect(() => {
    ranking.length > 1 && setIsSole(ranking[0].c !== ranking[1].c);
  }, [ranking]);

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
            {rank === 1 ? (
              <div className="div-ranking-crown-name">
                <TbCrown
                  className="icon-ranking-crown"
                  style={{
                    color: isSole && "#d2000f",
                  }}
                />
                {user.name}
              </div>
            ) : (
              <div className="div-ranking-name-font">{user.name}</div>
            )}
          </div>
        ) : (
          <>
            {rank === 1 ? (
              <div className="div-ranking-crown-name">
                <TbCrown
                  className="icon-ranking-crown"
                  style={{
                    color: isSole && "#d2000f",
                  }}
                />
                {user.name}
              </div>
            ) : (
              <div className="div-ranking-name-font">{user.name}</div>
            )}
          </>
        )}
        <div className="div-ranking-count">
          {user.c}
          <div className="div-ranking-percent">
            {((user.c / total) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="div-ranking">
      <div className="div-notice-header"></div>
      <div className="div-month">
        <BiChevronLeft
          className="icon-left"
          size="20"
          onClick={() => preMonth()}
        />
        {year}.{month + 1}
        {year == thisYear && month == thisMonth ? (
          <BiChevronRight
            className="icon-right"
            size="20"
            style={{ color: "transparent" }}
          />
        ) : (
          <BiChevronRight
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
