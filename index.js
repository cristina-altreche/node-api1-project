const express = require("express");
const shortid = require("shortid");
const port = 8000;
const server = express();

server.use(express.json());

let users = [
  {
    id: 1,
    name: "Tina Altreche",
    bio: "A humble spirit",
  },
];

//ENDPOINTS - REQUEST HANDLER FUNCTIONS
server.get("/", (req, res) => {
  res.send("hello world Web 32");
});

// server.get("/api/users", (req, res) => {
//   res.status(200).json("<h1>Testing things</h1>");
// });

//GET API/USERS
server.get("/api/users", (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

//POST API/USERS
server.post("/api/users", (req, res) => {
  const newUser = req.body; //needs express.json middleware
  newUser.id = shortid.generate();
  //   users.push(newUser);

  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (newUser.name && newUser.bio) {
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database.",
    });
  }
});

//GET API/USERS/:ID
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  let found = users.find((user) => user.id === id);

  if (found) {
    res.status(200).json(found);
  } else if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

//DELETE API/USERS/:ID
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const deleted = users.find((user) => user.id === id);
  //   users.filter((u) => u.id !== id);

  if (deleted) {
    users = users.filter((user) => user.id !== id);
    res.status(200).json({ message: "The user has been deleted" });
  } else if (!deleted) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res.status(500).json({ errorMessage: "The user could not be removed." });
  }
});

//PUT API/USERS/:ID
server.put("/api/users/:id", (req, res) => {
  //grab id
  const id = req.params.id;
  //grab body
  const changes = req.body;
  //find by id specified
  let found = users.find((h) => h.id === id);

  if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (!changes.name || !changes.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (found && changes.name && changes.bio) {
    //The Object.assign() method copies all enumerable own properties from one or more source objects to a target object. It returns the target object.
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  }
});

//LISTEN TO PORT 8000
server.listen(port, () => console.log("Yipee your in!"));
