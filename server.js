const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // set view engine sebagai ejs
app.set("views", "views"); // memberi tahu bahwa template html ada di views

const db = mysql.createConnection({
  host: "localhost",
  database: "db_sekolah",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log(`DB has connected...`);

  // GET DATA
  app.get("/", (req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (err, result) => {
      // PARSE
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: "TUGAS KELOMPOK DB PBO" });
    });
  });

  // INSERT DATA
  app.post("/tambah", (req, res) => {
    const insertSql = `INSERT INTO mahasiswa (NIM, NAMA, JURUSAN) VALUES ('${req.body.nim}', '${req.body.nama}', '${req.body.jurusan}');`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(8000, () => {
  console.log(`Server is running...`);
});
