const express = require("express");
const port = 8000;
const server = express();

server.use(express.json());

server.get("/hello", (req, res) => {
  res.send("hello world Web 32");
});

server.listen(port, () => console.log("Yipee your in!"));
