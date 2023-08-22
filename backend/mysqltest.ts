require('dotenv').config()
const mysql = require('mysql2')
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";


const test = async (req: Request, res: Response) => {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    connection.query('SELECT * FROM items', (_err:Error, rows:RowDataPacket[]) => {
      if(_err) {
        res.status(500).json({ status: 500, message: "error" });
      } else { 
        res.status(200).json({status:200,rows:rows,message:"success"})
      }
    });
    connection.end()
    console.log("Connection Ended")
  } catch (err) {
    console.log(err)
  }
  };


  //Get Latest Items Homepage
  const getLatestItems = async (req: Request, res: Response) => {
    try {
      const connection = await mysql.createConnection(process.env.DATABASE_URL);
      connection.query('SELECT * FROM items WHERE id IN (6544,6552,6582,6627,6551,6727,6841,7000);', (_err:Error, rows:RowDataPacket[]) => {
        if(_err) {
          res.status(500).json({ status: 500, message: "error" });
        } else { 
          res.status(200).json({status:200,rows:rows,message:"success"})
        }
      });
      connection.end()
      console.log("Connection Ended")
    } catch (err) {
      console.log(err)
    }
    };
  


module.exports = {
    test,getLatestItems
  };