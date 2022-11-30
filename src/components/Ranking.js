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
      query:
        "SELECT a.id, a.name, COUNT(a.id) AS c, b.id AS kakaoId from magnus_attendance a LEFT JOIN magnus_user b ON a.id = b.pnum WHERE (YEAR(attendance_date) = " +
        year +
        " AND MONTH(attendance_date) = " +
        (month + 1) +
        ") AND (attendance = 0) AND a.name != '관리자' GROUP BY id ORDER BY c DESC, a.name asc;"
    };
    console.log(JSON.stringify(post2));
    fetch("https://teammagnus.net/SQL2", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post2)
    })
      .catch((err) => console.log(err))
      .then((res) => res.json())
      .then((json) => {
        setRanking(json);
      });
  };

  const setImage = () => {
    ranking.map(async (user, idx) => {
      await fetch("https://kapi.kakao.com/v2/user/me", {
        body: `target_id_type=user_id&target_id=${user.kakaoId}`,
        headers: {
          Authorization: "KakaoAK eabdeb9db1b4c0b9c79cb13040171ddf",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(data => {
          user["image"] = data.properties.thumbnail_image;
        });
    });
  }

  useEffect(() => {
    getRanking(thisYear, thisMonth);
    console.log("start");
  }, []);

  useEffect(() => {
    console.log(ranking);
    setImage();
  }, [ranking]);

  var rank = 1;
  var sameCount = 0;
  const showRanking = ranking.map((user, idx) => {
    if (idx > 0 && ranking[idx].c < ranking[idx - 1].c) {
      rank += sameCount;
      sameCount = 1;
      // console.log("not same");
    } else {
      sameCount++;

      // console.log("same");
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
