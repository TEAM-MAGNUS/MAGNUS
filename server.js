const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 8080;
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "magnus",
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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
      res.send(rows);
    }
  });
});
app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
