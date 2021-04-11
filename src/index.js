const express = require("express");
const app = express();

const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);

const port = 3000;

app.get("/ping", (req, res) => res.send("pong"));

app.get("/fields", (req, res) => {
  knex
    .from("fields")
    .select("*")
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      res.status(500);
    });
});

app.listen(port, () => console.log("Example app listening on port " + port));
