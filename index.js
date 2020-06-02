//import express
const express = require("express"); // similar to import express from "express"

//create a server
const server = express();
// const shortid = require("shortid");

let users = [
  {
    id: "1", // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    id: "2", // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    id: "3", // hint: use the shortid npm package to generate it
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

server.post("/api/users", (req, res) => {});

//listen for incoming requests
const port = 8000;

server.listen(port, () => console.log(`\n == API running on port ${port} \n`));
