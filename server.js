const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
    host: "localhost",
    database: "data_jbz",
    user: "root",
    password: "",
});

db.connect(err => {
    if (err) throw err;
    console.log("database connected...");

    app.get("/", (req, res) => {
        const sql = "SELECT * FROM tbuser";
        db.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result));
            res.render("index", {
                users: users,
                title: "Data Kepengurusan JBZ",
            });
        });
    });

    app.delete("/del", (req, res) => {
        const delSql = "DELETE FROM `tbuser` WHERE `tbuser`.`ID`";
        db.query(delSql, (err, result) => {
            if (err) throw err;
            res.redirect("/");
        });
    });

    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO tbuser(Nama_Anggota, Jabatan, Alamat, Angkatan) VALUES ('${req.body.Nama}' ,'${req.body.Jabatan}','${req.body.Alamat}','${req.body.Angkatan}')`;
        db.query(insertSql, (err, result) => {
            if (err) throw err;
            res.redirect("/");
        });
    });
});

app.listen(8000, () => {
    console.log("server ready...");
});
