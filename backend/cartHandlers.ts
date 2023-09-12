require('dotenv').config()
const mysql = require('mysql2')
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
const { v4: uuidv4 } = require("uuid");

/* Get All Items */
const checkoutCart = async (req: Request, res: Response) => {

const { fname,lname,address,email,cardNumber,expiry,cart } = req.body.cart;

//SQL Data for Customers
const valuesCustomer = [uuidv4(), fname, lname, address, email, cardNumber, expiry];
const insertCustomer = `INSERT INTO customers (id, firstName, lastName, address, email, cardNumber, expiry)
VALUES (?, ?, ?, ?, ?, ?, ?)`;

//SQL Data for Orders
const insertItems = `INSERT INTO orders (itemId, customerId, quantity, price)
VALUES (?, ?, ?, ?)`;


//Check if existing existing user with Email, if Not Write it on the DB;
try {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  connection.query(`SELECT * FROM customers WHERE email = "${email}"`, (_err:Error, rows:RowDataPacket[]) => {

    //If customer exist, add order to the DB with current customer ID
    if(rows.length > 0) {
    
    const queryPromises = [];

    //loop through the cart
    for(let i=0;i<cart.length;i++) {
    const valuesItems = [cart[i].id,rows[0].id,cart[i].quantity,cart[i].price];

  // Create a promise for each query.
  const queryPromise = new Promise((resolve, reject) => {
    connection.query(insertItems, valuesItems, (err: Error, insertRow: RowDataPacket[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(insertRow);
      }
    });
  });
  queryPromises.push(queryPromise);
  }
  // Execute all queries and handle the results.
  Promise.all(queryPromises)
  .then((results) => {
    res.status(200).json({ status: 200, rows: results, message: "Orders added" });
    connection.end();
  })
  .catch((err) => {
    res.status(500).json({ status: 500, err: err, message: "Error adding orders" });
    connection.end();
  });





  //If customer doesn't exist, add customer then add order with customer ID
    } else { 
      connection.query(insertCustomer,valuesCustomer, (_err:Error, insertCustomerRow:RowDataPacket[]) => {
        if (_err) {
          res.status(500).json({ status: 500, message: "Error adding customer" });
          connection.end()
        } else {

          const queryPromises = [];

          //loop through the cart
          for(let i=0;i<cart.length;i++) {
          const valuesItems = [cart.id,valuesCustomer[0].id,cart.quantity,cart.price];
      
        // Create a promise for each query.
        const queryPromise = new Promise((resolve, reject) => {
          connection.query(insertItems, valuesItems, (err: Error, insertRow: RowDataPacket[]) => {
            if (err) {
              reject(err);
            } else {
              resolve(insertRow);
            }
          });
        });
        queryPromises.push(queryPromise);
        }
        // Execute all queries and handle the results.
        Promise.all(queryPromises)
        .then((results) => {
          res.status(200).json({ status: 200, rows: results, message: "Orders & Customer added" });
          connection.end();
        })
        .catch((err) => {
          res.status(500).json({ status: 500, err: err, message: "Error adding orders" });
          connection.end();
        });
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