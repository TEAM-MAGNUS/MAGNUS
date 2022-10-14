import React from "react";

function Ranking() {
  const getRanking = (month) => {
    const post = {
      query:
        "SELECT EXISTS (SELECT * FROM magnus_attendance WHERE Email='" +
        res.profileObj.email +
        "' LIMIT 1) AS SUCCESS;",
    };

    fetch("http://localhost:8080/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {});
  };

  return <div></div>;
}

export default Ranking;
