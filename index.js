//import express
const express = require("express"); // similar to import express from "express"

//create a server
const server = express();

//a function to handle GET requests to /

//listen for incoming requests
const port = 8000;

server.listen(port, () => console.log(`\n == API on port ${port} \n`));
