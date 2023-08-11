"use strict"

import express, { Express, NextFunction, Request, Response } from 'express';

const morgan = require("morgan");
const dotenv = require('dotenv');

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8080;

console.log("Test")

app.use(function (req:Request, res:Response, next:NextFunction) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST,PATCH, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Origin", "*");
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //REST Endpoints
  app.get("/helloWorld",(req:Request,res:Response) => {
    res.send("Hello World with Typescript and nodeJs")
    console.log("HERE")
  })

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });