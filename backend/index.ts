"use strict"

import express, { Express, NextFunction, Request, Response } from 'express';

const morgan = require("morgan");
const dotenv = require('dotenv');
dotenv.config();


const {
    test
} = require("./mysqltest")

const app: Express = express();
const PORT = process.env.PORT || 8080;

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
  app.get("/",(res,req)=> {
    req.send("Home");
  })
  app.get("/test",test)

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });