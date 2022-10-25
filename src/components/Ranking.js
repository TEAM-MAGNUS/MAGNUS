import React, { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ReactSquircle from "react-squircle";
import logo from "../asset/main/logo.png";

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

  function getProfileImage(id) {
    const post = {
      id: id,
    };
    fetch("https://localhost/getProfileImage", {
      // fetch("https://teammagnus.net/getProfileImage", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.p);
        return '"' + json.p + '"';
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const getRanking = (year, month) => {
    const post = {
      year: year,
      month: month,
    };
    fetch("https://teammagnus.net/getTotal", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        setTotal(json.t);
      });

    // fetch("https://teammagnus.net/getRanking", {
    //   method: "post",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(post),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setRanking(json);
    //     return json;
    //   });

    const post2 = {
      query:
        "SELECT a.id, a.name, COUNT(a.id) AS c, b.image from magnus_attendance a LEFT JOIN magnus_user b ON a.id = b.pnum WHERE (YEAR(attendance_date) = " + 
        year +
        " AND MONTH(attendance_date) = " +
        (month + 1) +
        ") AND (attendance = 0) GROUP BY id ORDER BY c DESC;"
    }
    console.log(JSON.stringify(post2));
    fetch("https://teammagnus.net:443/SQL2", {
      method: "post",
      headers: { "content-type": "application/json"},
      body: JSON.stringify(post2)
    })
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(json => {
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

  // const [profileList, setProfileList] = useState([]);

  // async function setProfileImage() {
  //   var userList = await getRanking(thisYear, thisMonth);
  //   console.log("userList: " + userList);

  //   // var imageUrl;
  //   // userList.map((user) => {
  //   //   imageUrl = getProfileImage(user.id);
  //   //   setProfileList([...profileList, { url: imageUrl }]);
  //   // });
  //   // console.log(profileList);
  // }
  var rank = 1;
  const showRanking = ranking.map((user, idx) => (
    <div key={idx} className="div-ranking-section-02">
      <div>
        {idx > 0 && ranking[idx].c < ranking[idx - 1].c ? ++rank : rank}
      </div>
      <div className="div-ranking-img-name">
        <ReactSquircle className="img-ranking" imageUrl={user.image || logo} />
        <div style={{ color: rank == 1 ? "#e79b42" : "black" }}>{user.name}</div>
      </div>
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
