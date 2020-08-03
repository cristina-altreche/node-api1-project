const express = require("express");
const port = 8000;
const server = express();

server.use(express.json());

//ENDPOINTS - REQUEST HANDLER FUNCTIONS
server.get("/", (req, res) => {
  res.send("hello world Web 32");
});

let users = [
  {
    id: 1,
    name: "Tina Altreche",
    bio: "A humble spirit",
  },
  {
    id: 2,
    name: "Ana Altreche",
    bio: "A wise spirit",
  },
];

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
    const user = req.params.id
    res.status(200).json(user);
});

server.post("/api/users", (req, res) => {
  const user = req.body; //needs express.json middleware
  users.push(user);
  res.status(201).json(users);
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter((u) => u.id !== id);
  res.status(204).end();
});

//LISTEN TO PORT 8000
server.listen(port, () => console.log("Yipee your in!"));
