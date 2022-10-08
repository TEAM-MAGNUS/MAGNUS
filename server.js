const express = require("express");
const app = express();
const port = 8080;
const mysql = require("mysql");

const connection = mysql.connection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "hansori",
});

connection.connect();

app.post("/SQL1", (req, res) => {
  const post = req.body.query;

  connection.query(post, function (err, rows, fields) {
    if (err) {
      console.log("전송 실패");
    } else {
      console.log("전송 성공");
      console.log(rows[0]);
      res.send(rows[0]);
    }
  });
});
app.post("/SQL2", (req, res) => {
  const post = req.body.query;

  connection.query(post, function (err, rows, fields) {
    if (err) {
      console.log("전송 실패");
    } else {
      console.log("전송 성공");
      //console.log(rows[0]);
      res.send(rows);
    }
  });
});
app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
