require('dotenv').config()
const mysql = require('mysql2')
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
const { v4: uuidv4 } = require("uuid");

/* Get All Items */
const checkoutCart = async (req: Request, res: Response) => {

const { fname,lname,address,email,cardNumber,expiry,cart } = req.body.cart;

console.log(cart);

const valuesCustomer = [uuidv4(), fname, lname, address, email, cardNumber, expiry];
const insertCustomer = `INSERT INTO customers (id, firstName, lastName, address, email, cardNumber, expiry)
VALUES (?, ?, ?, ?, ?, ?, ?)`;

const valuesItems = [cart.id,"",cart.quantity,cart.price];
const insertItems = `INSERT INTO orders (itemId, customerId, quantity, price)
VALUES (?, ?, ?, ?)`;


//Check if existing existing user with Email, if Not Write it on the DB;
try {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  connection.query(`SELECT * FROM customers WHERE email = "${email}"`, (_err:Error, rows:RowDataPacket[]) => {
    console.log(rows[0].id)

    if(rows.length > 0) {
    console.log("customer exist")
     connection.end()

    } else { 
      connection.query(insertCustomer,valuesCustomer, (_err:Error, insertRow:RowDataPacket[]) => {
        if (_err) {
          res.status(500).json({ status: 500, message: "Error adding customer" });
          connection.end()
        } else {
          res.status(200).json({ status: 200, rows: insertRow, message: "Customer added" });
          connection.end()
        }
    })}
  });
  console.log("Connection Ended")
} catch (err) {
  console.log(err)
}
    };

    module.exports = {
        checkoutCart
        };