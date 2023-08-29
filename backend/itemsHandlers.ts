require('dotenv').config()
const mysql = require('mysql2')
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";


/* Get All Items */
const getAllItems = async (req: Request, res: Response) => {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    connection.query('SELECT * FROM items', (_err:Error, rows:RowDataPacket[]) => {
      if(_err) {
        res.status(500).json({ status: 500, message: `error: ${_err.message}`  });
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


  /* Get Filtered Items for Homepage */
  const getLatestItems = async (req: Request, res: Response) => {
    try {
      const connection = await mysql.createConnection(process.env.DATABASE_URL);
      connection.query('SELECT * FROM items WHERE id IN (6544,6552,6582,6627,6551,6727,6841,7000);', (_err:Error, rows:RowDataPacket[]) => {
        if(_err) {
          res.status(500).json({ status: 500, message: `error: ${_err.message}` });
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

  /* Get One Item */
  const getOneItem = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
      const connection = await mysql.createConnection(process.env.DATABASE_URL);
      connection.query(`SELECT * FROM items WHERE id = ${id};`, (_err:Error, rows:RowDataPacket[]) => {
        if(_err) {
          res.status(500).json({ status: 500, message: `error: ${_err.message}` });
        } else { 
          if(rows.length != 0) {
            res.status(200).json({status:200,rows:rows,message:"success"})
          } else {
            res.status(404).json({status:404,message:"Item not found"})
          }
        }
      });
      connection.end()
      console.log("Connection Ended")
    } catch (err) {
      console.log(err)
    }
    };
  
    /* Get multiples Items by their NAME */
    const getItemsByName = async (req: Request, res: Response) => {

    const { name } = req.params;
    
    try {
      const connection = await mysql.createConnection(process.env.DATABASE_URL);
      connection.query(`SELECT * FROM items WHERE name LIKE '%${name}%' LIMIT 30;`, (_err:Error, rows:RowDataPacket[]) => {
        if(_err) {
          res.status(500).json({ status: 500, message: `error: ${_err.message}` });
        } else { 
          if(rows.length != 0) {
            res.status(200).json({status:200,rows:rows,message:"success"})
          } else {
            res.status(404).json({status:404,message:"Item not found"})
          }
        }
      });
      connection.end()
      console.log("Connection Ended")
    } catch(err) {
      console.log(err)
    }
    }

module.exports = {
  getAllItems,getLatestItems,getOneItem,getItemsByName
  };