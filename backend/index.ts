"use strict"

import express, { Express, NextFunction, Request, Response } from 'express';

const morgan = require("morgan");
const dotenv = require('dotenv');
dotenv.config();


const {
  getAllItems,
    getLatestItems,
    getOneItem,
    getItemsByName,
    getItemsByCategory
} = require("./itemsHandlers")

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

  //Items Endpoints
  app.get("/getAllItems",getAllItems)
  app.get("/getLatestItems",getLatestItems)
  app.get("/getOneItem/:id", getOneItem)
  app.get("/getItemsByName/:name",getItemsByName)
  app.get("/getItemsByCategory:category",getItemsByCategory)


  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });