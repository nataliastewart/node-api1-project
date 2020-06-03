//import express
const express = require("express"); // similar to import express from "express"

//create a server
const server = express();

//middleware - to teach express new tricks
server.use(express.json()); //teaches how to parse JSON from the body

// const shortid = require("shortid");

let users = [
  {
    id: 1, // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    id: 2, // hint: use the shortid npm package to generate it
    name: "Billy", // String, required
    bio: "Some kind person", // String, required
  },
  {
    id: 3, // hint: use the shortid npm package to generate it
    name: "John", // String, required
    bio: "Some John from the city", // String, required
  },
];

//a function to handle GET requests to /

server.get("/", (req, res) => {
  res.send("hello web 30!!!");
});

server.get("/api/users", function (req, res) {
  try {
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

// When the client makes a POST request to /api/users:

server.post("/api/users", (req, res) => {
  const user = req.body;

  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    try {
      users.push(user);
      res.status(201).json(users);
    } catch {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
  }
});

//When the client makes a GET request to /api/users/:id:

server.get("/api/users/:id", function (req, res) {
  const { id } = req.params;

  const userIndex = users.findIndex((u) => u.id == id);

  if (userIndex > -1) {
    const user = { ...users[userIndex], ...req.body };

    users = [...users.slice(0, userIndex), user, ...users.slice(userIndex + 1)];
    res.send(users);
  } else {
    res.status(404).send({ msg: "user not found" });
  }
});

//When the client makes a DELETE request to /api/users/:id:

server.delete("/api/users/:id", function (req, res) {
  const id = req.params.id;

  users = users.filter((u) => u.id !== Number(id));

  if (!id) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  } else {
    try {
      res.status(200).json(users);
    } catch {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    }
  }
});

// When the client makes a PUT request to /api/users/:id:
server.put(`/api/users/:id`, function (req, res) {
  const id = Number(req.params.id);
  const user = req.body;

  const find = users.find((u) => u.id === id);

  if (!find) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  } else if (!find.name || !find.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    try {
      const updated = users.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: user.name,
            bio: user.bio,
          };
        } else {
          return item;
        }
      });
      users = updated;
      res.status(200).json(users);
    } catch {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    }
  }
});

//listen for incoming requests
const port = 8000;

server.listen(port, () => console.log(`\n == API running on port ${port} \n`));
