const express = require("express");

const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.locals.title = "Major Tom's Mars List";

app.get("/", (request, response) => {
  response.send("Ground Control to Major Tom!!!!!!!");
});

app.get("/api/v1/mod4final", (request, response) => {
  database("mod4final")
    .select()
    .then(title => {
      response.status(200).json({ title });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get("port"), () => {
  /* eslint-disable no-console */
  console.log(
    `${app.locals.title} is running on ${app.get("port")}. env: ${environment}`
  );
});

module.exports = app;
